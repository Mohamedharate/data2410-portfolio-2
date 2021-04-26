import axios from "axios";
import {FETCH_PRODUCT, GET_ERROR} from "./constants";

export const fetchProduct = () => (dispatch) => {
    fetch("http://localhost:3001/api/products/allProducts")
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
export const deleteProduct = (id) => (dispatch) => {

}
export const updateProduct = (id) => (dispatch) => {

}

