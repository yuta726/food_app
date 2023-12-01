import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import { searchSuperMarket } from '../api/getList'

export const Search = () => {
    const { query } = useParams();
    const [searchResults, setSearchResults] = useState([]);
    console.log("Query:", query);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const data = await searchSuperMarket(query);
            setSearchResults(data);  
        } catch (error) {
            console.error('Fetching or parsing failed:', error);
        }
        };
        fetchData();
    }, [query]);  // queryが変更された場合に再実行

    return (
        <div>
            <center>
                <h1>Search Query: {query}</h1>
                <h2>Search Results:</h2>
                <table id="list" className="table" border="1" width="300">
                    <thead className="table-dark">
                        <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Discount Flag</th>
                        <th scope="col">Supermarket Name</th>
                        <th scope="col">Maximum Discount Rate</th>
                        <th scope="col">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchResults.map((result) => (
                        <tr key={result.Supermarket_ID}>
                            <th scope="row">{result.Supermarket_ID}</th>
                            <td>{result.Discount_Flag ? "🚩" : " "}</td>
                            <td>{result.Supermarket_Name}</td>
                            <td>{result.Maximum_Discount_Rate}</td>
                            <td><Link to={`/supermarket/${result.Supermarket_ID}/foods`}><button>Detail</button></ Link></td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </center>
        </div>
    );
    };

export default Search;