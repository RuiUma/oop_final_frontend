const baseUrl = 'http://localhost:5173/api';

const restfulPost = async (url, data) => {
    return fetch(baseUrl + url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
};

const restfulGet = (url, data) => {
    if (data) {
        url += '?' + new URLSearchParams(data).toString();
    }
    
    return fetch(baseUrl + url, {
        method: 'GET',
    })
};

const restfulPut = async (url, data) => {
    return fetch(baseUrl + url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
};

export {restfulGet, restfulPost, restfulPut}