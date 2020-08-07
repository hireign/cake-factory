import Axios from "axios";

//to call the route returning all cream products
function getAllCreams() {
  return Axios.get("/getallcream")
}

function updateQuantity(id, type, qty) {
  console.log("update quantity called")
  return Axios.put(`/updatecream/${id}/${type}/${qty}`)
}

export default { getAllCreams, updateQuantity };
