import { put, call, fork, takeEvery } from "redux-saga/effects";
import * as actions from "../actions/productActions";
import { api } from "../services/productsService";

export function* getAllProducts() {
  const products = yield call(api.getProducts);
  yield put(actions.getAllProductsSuccess(products));
}

export function* watchGetProducts() {
  yield takeEvery(actions.GET_ALL_PRODUCTS_REQUEST, getAllProducts);
}

export default [fork(getAllProducts), fork(watchGetProducts)];
