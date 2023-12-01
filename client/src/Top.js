import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { getSuperMarket } from './discount/api/getList'
import { Wrapper } from "@googlemaps/react-wrapper";
import "./Top.css"


export const Top = () => {
    // let data = [
    //     {id: 1, df: true, name: 'Taro', pv: Math.random()},
    //     {id: 1, df: true, name: 'Taro', pv: Math.random()},
    // ];

    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = async () => {
        // POSTリクエストで検索結果をサーバーに送信
        const response = await fetch('/api/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Search: searchTerm }), 
        });
        if (response.ok) {
            // 検索が成功した場合の処理（例：ページ遷移）
            navigate(`/search/${searchTerm}`);
        } else {
            // 検索が失敗した場合の処理
            navigate(`/search/${searchTerm}`);
            //とりあえず遷移
            //console.error('Search failed');
        }
    };

    const initialState = {
        Supermarket_ID: '',
        Supermarket_Name: '',
        Discount_Flag: false,
        Maximum_Discount_Rate: '',
    }

    const[superlist, setDaily] = useState(initialState);
    const[loading, setLoading] = useState(true);

    useEffect(() => {
        getSuperMarket()
        .then(d => {
            setDaily(d)
            setLoading(false)
        })
        .catch(e => {
            throw new Error(e)
        })
    },[])

    const Map = () => {
        const ref = React.useRef(null);
        const [map, setMap] = React.useState(null);
    
        React.useEffect(() => {
            if (ref.current && !map) {
                setMap(new window.google.maps.Map(ref.current, {
                    center: { lat: 26.5013, lng: 128.0593 },
                    zoom: 9,
                }));
            }
        }, [ref, map]);
        
    
        return <div ref={ref} style={{ height: '500px', width: '100%' }} />;
    };

    return(
        <div>
            <Wrapper apiKey={process.env.REACT_APP_POSIPAN_API_KEY}>
                <Map />
            </Wrapper>
            <center>
            <h1>Refine Search</h1>
                <input 
                    type="text" 
                    placeholder="SuperMarket Search." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>            
            
            <h1>Nearby shops</h1>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d207446.3291583094!2d139.57605851250543!3d35.66841030665742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188b857628235d%3A0xcdd8aef709a2b520!2sTokyo!5e0!3m2!1sen!2sjp!4v1694676640160!5m2!1sen!2sjp" 
                title="Maps"
                width="600" 
                height="450" 
                style={{border:"0"}}  
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade">
            </iframe>

                {loading ?
                        <h1>Loading....</h1>
                        :
                    <table id="list" className="table" border="1" width="300">
                        <thead className="table-dark">
                            <tr>
                                <th scope="col-2">Discount Flag</th>
                                <th scope="col-2">Supermarket Name</th>
                                <th scope="col-4">Discount Flag</th>
                                <th scope="col-6"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.values(superlist).map((value) =>
                                <tr>
                                    <td>{value.Discount_Flag ? "🚩" : " "}</td>
                                    <th scope="row">{value.Supermarket_Name}</th>
                                    <td>{value.Maximum_Discount_Rate} %</td>
                                    <td><Link to={`/supermarket/${value.Supermarket_ID}/foods`}><button>Detail</button></ Link></td>
                                </tr>
                            )}
                
                            {/* {data.map((value) =>
                                <tr>
                                    <th scope="row">{value.id}</th>
                                    <td>{{value} ? "🚩" : " "}</td>
                                    <td>{value.name}</td>
                                    <td>{value.pv}</td>
                                </tr>
                            )} */}
                        </tbody>
                    </table>
                }
            </center>
        </div>
    )
}
