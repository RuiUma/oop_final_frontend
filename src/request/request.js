const restfulPost = async (url, data) => {
    return fetch('api/' + url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
};

const restfulGet = async (url) => {
    return fetch(url)
    
};

export {restfulGet, restfulPost}