const restfulPost = async (url, data) => {
    return fetch('api/' + url, {
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
    
    return fetch('http://localhost:5173/api' + url, {
        method: 'GET',
    })
};

const restfulPut = async (url, data) => {
    return fetch('api/' + url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
};

export {restfulGet, restfulPost, restfulPut}