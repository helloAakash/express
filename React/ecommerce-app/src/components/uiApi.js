import { API } from '../config'


//to fetch product by arrival date
export const getProducts = (sortBy) => {
    return fetch(`${API}/productList?sortBy=${sortBy}&order=desc&limit=8`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(error =>
            console.log(error));

}

//to fetch single product

export const productDetails = (productId) => {

    return fetch(`${API}/singleproduct/${productId}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(error =>
            console.log(error));

}

//related product

export const listRelated = (productId) => {

    return fetch(`${API}/products/related/${productId}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(error =>
            console.log(error));

}

//to filter products by category and price range

export const getFilteredProducts = (skip, limit, filters = {}) => {
    let data = { limit, skip, filters }

    return fetch(`${API}/products/by/search`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};


export const getCategories = () => {
    return fetch(`${API}/categorylist`, {
        method: 'GET',

    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })

}