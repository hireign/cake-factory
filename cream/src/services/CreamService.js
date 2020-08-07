import Axios from "axios";

//to call the route returning all cream products
function getAllCreams() {
  return Axios.get("/getallcream")
}

//to call route to update quantity
function updateQuantity(id, type, qty) {
  console.log("update quantity called")
  return Axios.put(`/updatecream/${id}/${type}/${qty}`)
}

//to call route to add row
function addCream(id, type, qty) {
  console.log("addRow called")
  return Axios.post(`/addcream/${id}/${type}/${qty}`)
}

export default { getAllCreams, updateQuantity, addCream };
