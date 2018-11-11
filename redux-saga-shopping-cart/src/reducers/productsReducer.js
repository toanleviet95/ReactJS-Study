import { GET_ALL_PRODUCTS_REQUEST, GET_ALL_PRODUCTS_SUCCESS } from '../actions/productActions';

export default(state = {}, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS_REQUEST: {
      return { ...state, products: [], loading: true };
    }
    case GET_ALL_PRODUCTS_SUCCESS: {
      return { ...state, products: action.products, loading: false };
    }
    default:
      return state
  }
}