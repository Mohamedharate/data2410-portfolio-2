import axios from "axios";
import {FETCH_PRODUCT, GET_ERROR} from "./constants";

export const fetchProduct = () => (dispatch) => {
    fetch("api/allProducts")
        .then((res) => res.json())
        .then((post) => dispatch({
            type: FETCH_PRODUCT,
            payload: post,
        })
        );
}
export const createProduct = (newProduct, history) => (dispatch) => {
    axios
    .post("api/addProduct", newProduct)
        .then((res) => history.push("/allProducts"))
        .catch((err) => dispatch({
            type: GET_ERROR,
            payload: err.response.data,
            })
        )
}
