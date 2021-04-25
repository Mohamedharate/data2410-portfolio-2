import axios from "axios";
import {FETCH_PRODUCT, GET_ERROR} from "./constants";

export const fetchProduct = () => (dispatch) => {
    fetch("http://localhost:3000/allProducts")
        .then((res) => res.json())
        .then((post) => dispatch({
            type: FETCH_PRODUCT,
            payload: post,
        })
        );
}
export const createProduct = (newProduct, history) => (dispatch) => {
    axios
    .post("http://localhost:3000/addProduct", newProduct)
        .then((res) => history.push("/allProducts"))
        .catch((err) => dispatch({
            type: GET_ERROR,
            payload: err.response.data,
            })
        )
}