import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import CreamService from "../services/CreamService";
import ProductCard from "../components/ProductCard";
import MaterialTable from "material-table";

class Creams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      creams: [],
    };
  }

  componentDidMount() {
    this.fetchProducts();
    // this.forceUpdate();
  }

  componentDidUpdate() {
    // this.fetchProducts();
    console.log(this.state.creams);
  }

  fetchProducts() {
    CreamService.getAllCreams()
      .then((data) => {
        this.setState({
          creams: data.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <>
        <h1 className="display-4" style={{ textAlign: "center" }}>
          Creams
        </h1>
        {/* <div className="row row-cols-1 row-cols-md-4">
              {this.state.creams.map((cream) => (
                  <ProductCard
                    cream_id = {cream.cream_id}
                    cream_type = {cream.cream_type}
                    qty = {cream.qty}
                    key = {cream.cream_id}
                  >
                  </ProductCard>
              ))}
                </div> */}
        <div style={{ maxWidth: "100%" }}>
          <MaterialTable
            columns={[
              { title: "Cream ID", field: "id", type: "numeric" },
              { title: "Cream Type", field: "type" },
              { title: "Quantity", field: "qty", type: "numeric" },
            ]}
            data={[
              {
                id: 1,
                type: "Baran",
                qty: 1987,
              },
            ]}
            title="Cream Table"
          />
        </div>
      </>
    );
  }
}

export default withRouter(Creams);
