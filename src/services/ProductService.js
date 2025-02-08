

const API_URL = process.env.REACT_APP_API_URL ?? "http://localhost:5000/api";

async function createProduct(params) { 

    const token = localStorage.getItem("merakihr-token");
    console.log("Create Product Service ",params)
    const result = await fetch(`${API_URL}/product/create`, {
        method: 'POST',
         body: JSON.stringify(params),
         headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    if(result) {
         return result 
    }
}

async function updateProduct(id,body) {
    
    const token = localStorage.getItem("merakihr-token");

    const result = await fetch(`${API_URL}/product/update/${id}`,{
        method: 'PATCH',
        body: JSON.stringify(body),
         headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    if(result) {
         return result 
    }
}

async function deleteProduct(id) {
    const token = localStorage.getItem("merakihr-token");
    const result = await fetch(`${API_URL}/product/delete/${id}`,{
        method: 'DELETE',
         headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    })
    if(result) {
         return result 
    } 
}

async function getProductByUserId(id) {
    const token = localStorage.getItem("merakihr-token");
    const result = await fetch(`${API_URL}/product/${id}`,{
        method: 'GET',
         headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    })
    if(result) {
         return result 
    } 
}

async function getProducts() {
    const token = localStorage.getItem("merakihr-token");
    const result = await fetch(`${API_URL}/product`,{
        method: 'GET',
         headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    })
    if(result) {
         return result 
    } 
}

async function  createProductsTask(id,data) {   
    const token = localStorage.getItem("merakihr-token");
    console.log("Create Product Service ",id)
    const result = await fetch(`${API_URL}/product/create/task/${id}`, {
        method: 'PATCH',
         body: JSON.stringify(data),
         headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    if(result) {
         return result 
    }
}

async function getProductById(id) {

    const token = localStorage.getItem("merakihr-token");
    console.log("Get  Product ID ",id)
    const result = await fetch(`${API_URL}/product/${id}`, {
        method: 'GET',
         headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    if(result) {
         return result 
    }

}

async function getProductsByUser(id) {

    const token = localStorage.getItem("merakihr-token");
    console.log("Get  Product ID ",id)
    const result = await fetch(`${API_URL}/product/user/${id}`, {
        method: 'GET',
         headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    if(result) {
         return result 
    }
}


export const ProductService = {
    createProduct,
    updateProduct,
    deleteProduct,
    getProductByUserId,
    getProducts,
    createProductsTask,
    getProductById,
    getProductsByUser
};