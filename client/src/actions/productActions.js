import axios from "axios";
import {FETCH_PRODUCT, GET_ERROR} from "./constants";

export const fetchProduct = () => (dispatch) => {
    axios.get("http://localhost:3001/api/products/allProducts")
        .then((res) => res.json())
        .then((post) => dispatch({
            type: FETCH_PRODUCT,
            payload: post,
        })
        );
}
export const createProduct = (newProduct, history) => (dispatch) => {
    axios
    .post("http://localhost:3001/api/products/addProduct", newProduct)
        .then((res) => history.push("/allProducts"))
        .catch((err) => dispatch({
            type: GET_ERROR,
            payload: err.response.data,
            })
        )
}
export const deleteProduct = (itemid) => (dispatch) => {
    axios.delete("http://localhost:3001/api/products/${itemId}")
        .then(res => dispatch({
            payload: itemid
        }))
}
export const updateProduct = (itemId) => (dispatch) => {
    axios.put("http://localhost:3001/api/products/${itemId}")
        .then(res => dispatch({
            payload: Promise.all([itemId, res.data])
        }))
}

