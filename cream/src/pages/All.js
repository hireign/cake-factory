import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import CreamService from "../services/CreamService";
import ProductCard from "../components/ProductCard";
import MaterialTable from "material-table";
import "./All.css";

class Creams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      creams: [],
    };
  }

  componentDidMount() {
    this.fetchProducts();
  }

  componentDidUpdate() {}

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
        <div className="row row-cols-1 row-cols-md-4 hidden">
          {this.state.creams.map((cream) => (
            <ProductCard
              cream_id={cream.cream_id}
              cream_type={cream.cream_type}
              qty={cream.qty}
              key={cream.cream_id}
            ></ProductCard>
          ))}
        </div>
        <div style={{ maxWidth: "100%" }}>
          <MaterialTable
            title="Cream Table"
            columns={[
              {
                title: "Cream ID",
                field: "cream_id",
                type: "numeric",
                editable: "never",
              },
              { title: "Cream Type", field: "cream_type", editable: "never" },
              { title: "Quantity", field: "qty", type: "numeric" },
            ]}
            data={this.state.creams.map((cream) => cream)}
            editable={{
              onRowAdd: (newData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    // setData([...data, newData]);
                    resolve();
                  }, 1000);
                }),
            }}
            cellEditable={{
              onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
                return new Promise((resolve, reject) => {
                  CreamService.updateQuantity(
                    rowData.cream_id,
                    rowData.cream_type,
                    newValue
                  ).then(() => {
                    this.fetchProducts();
                  });
                  setTimeout(resolve, 1000);
                });
              },
            }}
          />
        </div>
      </>
    );
  }
}

export default withRouter(Creams);
