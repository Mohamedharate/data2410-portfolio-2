import axios from "axios";

export const addToCart = (product, itemId, quantity) => dispatch => {
    axios.post("http://localhost:3001/api/cart/${id}/${itemId}") //skal dette gå under order kanskje
        .then(res => dispatch({
        }))
}
export const removeFromCart = (itemId) => dispatch => {
    axios.delete("http://localhost:3001/api/cart/${id}/${itemId}")
        .then(res => dispatch({
        }))
}
export const updateCartQuantity = (productId, quantity) => dispatch => {

}
export const emptyCart = () => dispatch => {

}