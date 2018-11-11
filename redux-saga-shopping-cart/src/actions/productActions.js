export const GET_ALL_PRODUCTS_REQUEST = 'GET_ALL_PRODUCTS_REQUEST';
export const GET_ALL_PRODUCTS_SUCCESS = 'GET_ALL_PRODUCTS_SUCCESS';
export const GET_ALL_PRODUCTS_FAILURE = 'GET_ALL_PRODUCTS_FAILURE';

export const getAllProducts = () => {
    return {
        type: GET_ALL_PRODUCTS_REQUEST,
    }
};

export const getAllProductsSuccess = (products) => {
    return {
        type: GET_ALL_PRODUCTS_SUCCESS,
        products
    }
};

export const getAllProductsFailure = (products, error) => {
    return {
        type: GET_ALL_PRODUCTS_FAILURE,
        products,
        error
    }
};