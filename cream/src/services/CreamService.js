import Axios from "axios";

//to call the route returning all cream products
function getAllCreams() {
  return Axios.get("/getallcream")
}

export default { getAllCreams };
