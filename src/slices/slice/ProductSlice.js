
const { createSlice } = require("@reduxjs/toolkit");

export const ProductSlice = createSlice({
    name:"product",
    initialState: {
        products:[],
        pagination:{},
        product :{}
    },
    reducers: {
        createProduct : () => {},
        deleteProduct: () => {},
        updateProduct: () => {},
        getProductById: () => {},
        getSuccessfullyProducts: (state,action) => {

            if(action.payload.length === 0) {
                state.pagination = {}
                 state.products = []
            } else {
                state.products = action.payload.data
                state.pagination = action.payload.pagination
            }  
            console.log("State Product ",state.products)
        },
        getSuccessfullyProductById: (state,action) => {
            if(action.payload.length === 0) {
                state.pagination = {}
                 state.product = []
            } else {
                state.product = action.payload.data
                state.pagination = action.payload.pagination
            }  
            console.log("State Product ",state.product,action.payload.data)
        },
        getProducts: () => {},
        createTaskByAdmin: () => {},
        createProductsTaskByUser: () => {},
        getProductsByUser: () => {}
    }
})

export default ProductSlice