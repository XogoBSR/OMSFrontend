import {createSelector} from "@reduxjs/toolkit";

const productSelector = (state) => state.product;

const getProducts = () => createSelector(
    productSelector,
    product => product.products
)

const getPagination = () => createSelector(
    productSelector,
    product => product.pagination
)

const getProductById = () => createSelector(
    productSelector,
    product => product.product
)

export const ProductSelector = {
    getProducts,
    getPagination,
    getProductById 
}