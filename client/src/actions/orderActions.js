import axios from "axios";

export const getOrder = (orderId) => dispatch => {
    axios.get("http://localhost:3001/api/orders/${orderId}")
        .then(res => dispatch({
            payload: res.data
        }))
}
export const addOrder = (orderId, userId) => dispatch => {
    axios.post("http://localhost:3001/api/orders/${orderId/${userId}")
        .then(res => dispatch({
            payload: res.data
        }))
}