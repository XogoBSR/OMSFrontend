
import { ProductService } from "services/ProductService";
import {ProductActions, GeneralActions} from "../slices/actions";
import {all, call, put, takeLatest} from 'redux-saga/effects';



function *createProduct({type, payload}) {
    try {
        yield put(GeneralActions.removeError(type));
        yield put(GeneralActions.startLoading(type));
        console.warn("Create Product ",payload)
        const result = yield call(ProductService.createProduct, payload);
        const resultHis = yield call(ProductService.getProducts);
        const data = yield resultHis.json()
        console.warn("Create Product data ",data)
        yield put(ProductActions.getSuccessfullyProducts(data));
        yield put(GeneralActions.stopLoading(type))
    } catch (err) {
        yield put(GeneralActions.stopLoading(type));
        yield put(GeneralActions.addError({
            action: type,
            message: err.response?.data?.error
        }));
    }
}

function *createProductByAdmin({type, payload}) {
    try {
        yield put(GeneralActions.removeError(type));
        yield put(GeneralActions.startLoading(type));
        console.warn("Create Product ",payload)
        const result = yield call(ProductService.createProduct, payload);
        const resultHis = yield call(ProductService.getProducts);
        const data = yield resultHis.json()
        console.warn("Create Product data ",data)
        yield put(ProductActions.getSuccessfullyProducts(data));
        yield put(GeneralActions.stopLoading(type))
    } catch (err) {
        yield put(GeneralActions.stopLoading(type));
        yield put(GeneralActions.addError({
            action: type,
            message: err.response?.data?.error
        }));
    }
}

function *updateProduct({type,payload}) {

    try {
        yield put(GeneralActions.removeError(type));
        yield put(GeneralActions.startLoading(type));
        console.warn("Update Product ",payload.id,payload) 
        const result1 = yield call(ProductService.updateProduct,payload.id,payload);
        const data1 = yield result1.json()
        console.log(" Updated Product Result ",data1)
        const result = yield call(ProductService.getProducts)
        const data = yield result.json()
        yield put(ProductActions.getSuccessfullyProducts(data));
        yield put(GeneralActions.stopLoading(type))
    } catch (err) {
        yield put(GeneralActions.stopLoading(type));
        yield put(GeneralActions.addError({
            action: type,
            message: err.response?.data?.error
        }));
    }
}

function *deleteProduct({type,payload}) {
    try {
        yield put(GeneralActions.removeError(type));
        yield put(GeneralActions.startLoading(type));
         console.warn("payload check out ",payload)
        const result = yield call(ProductService.deleteProduct,payload);
        const data = yield result.json()
        console.warn("payload check out ",payload.user)
        const result1 = yield call(ProductService.getProducts);
        const data1 = yield result1.json()
        yield put(ProductActions.getSuccessfullyProducts(data1));
        yield put(GeneralActions.stopLoading(type))
    } catch (err) {
        yield put(GeneralActions.stopLoading(type));
        yield put(GeneralActions.addError({
            action: type,
            message: err.response?.data?.error
        }));
    }
}

function *getProducts({type,payload}) {
    try {
        yield put(GeneralActions.removeError(type));
        yield put(GeneralActions.startLoading(type));
        console.warn("payload break in ",payload)
        const result = yield call(ProductService.getProducts);
        const data = yield result.json()
        yield put(ProductActions.getSuccessfullyProducts(data));
        yield put(GeneralActions.stopLoading(type))
    } catch (err) {
        yield put(GeneralActions.stopLoading(type));
        yield put(GeneralActions.addError({
            action: type,
            message: err.response?.data?.error
        }));
    }
}


function *createProductsTask({type,payload}) {

    try {
        yield put(GeneralActions.removeError(type));
        yield put(GeneralActions.startLoading(type));
        console.warn("Update Product ",payload.id,payload) 
        const result1 = yield call(ProductService.createProductsTask,payload.id,payload);
        const result = yield call(ProductService.getProductById,payload.id);
        const data = yield result.json()
        console.log(" Updated Product Result ",data)
        yield put(ProductActions.getSuccessfullyProductById(data));
        yield put(GeneralActions.stopLoading(type))
    } catch (err) {
        yield put(GeneralActions.stopLoading(type));
        yield put(GeneralActions.addError({
            action: type,
            message: err.response?.data?.error
        }));
    }
}

function *getProductsByUser({type,payload}){
    try {
        yield put(GeneralActions.removeError(type));
        yield put(GeneralActions.startLoading(type));
        console.warn("Get Products By User ",payload.id) 
        const result = yield call(ProductService.getProductsByUser,payload.id);
        const data = yield result.json()
        console.log(" Get Products By User Result ",data)
        yield put(ProductActions.getSuccessfullyProducts(data));
        yield put(GeneralActions.stopLoading(type))
    } catch (err) {
        yield put(GeneralActions.stopLoading(type));
        yield put(GeneralActions.addError({
            action: type,
            message: err.response?.data?.error
        }));
    }
}

function *getProductById({type,payload}) {

    try {
        yield put(GeneralActions.removeError(type));
        yield put(GeneralActions.startLoading(type));
        console.warn("Update Product ",payload) 
        const result = yield call(ProductService.getProductById,payload.id);
        const data = yield result.json()
        console.log(" Updated Product Result ",data)
        yield put(ProductActions.getSuccessfullyProductById(data));
        yield put(GeneralActions.stopLoading(type))
    } catch (err) {
        yield put(GeneralActions.stopLoading(type));
        yield put(GeneralActions.addError({
            action: type,
            message: err.response?.data?.error
        }));
    }
}


export function *ProductWatcher() {
    yield all([
        yield takeLatest(ProductActions.createProduct.type, createProduct),
        yield takeLatest(ProductActions.getProducts.type, getProducts),
        yield takeLatest(ProductActions.updateProduct.type, updateProduct),
        yield takeLatest(ProductActions.deleteProduct.type, deleteProduct),
        yield takeLatest(ProductActions.createProductByAdmin.type, createProductByAdmin),
        yield takeLatest(ProductActions.createProductsTask.type, createProductsTask),
        yield takeLatest(ProductActions.getProductById.type, getProductById),
        yield takeLatest(ProductActions.getProductsByUser.type, getProductsByUser)
 ]);
}