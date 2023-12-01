const toJson = async (res) => {
    const json = await res.json();
    if(res.ok){
        return json;
    }else{
        throw new Error(json.message);
    }
}

//日報一覧を取得
export const getSuperMarket = async () =>{
    const res = await fetch('http://127.0.0.1:8000/api/list/', {
        method: 'GET',
    })
    return await toJson(res);
}

//1日の詳細を取得
export const getSuperDetail = async (id) => {
    const res = await fetch(`http://localhost:8000/api/supermarkets/${id}/foods`, {
        method : 'GET',
    })
    return await toJson(res);
}

//カテゴリ別一覧を取得
// export const getCategory = async (cat) => {
//     const res = await fetch(`http://localhost:8000/daily/${cat}`, {
//         method: 'GET',
//     })
//     return await toJson(res)
// }

// 一致した店の情報を取得
export const searchSuperMarket = async (query) => {
    const res = await fetch('http://127.0.0.1:8000/api/search/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Search: query }),
    });
  
    return await toJson(res);
  };