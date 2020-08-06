import React, { Component } from "react";
import axios from "axios";

const Bread = (props) => (
  <tr>
    <td>{props.bread.bread_id}</td>
    <td>{props.bread.bread_type}</td>
    <td>{props.bread.bread_qty}</td>
  </tr>
);

export default class Breads extends Component {
  constructor(props) {
    super(props);
    this.breadList = this.breadList.bind(this);
    this.state = {
      breads: [],
    };
  }

  componentDidMount() {
    axios
      .get(
        "https://dlm008cgo1.execute-api.us-east-1.amazonaws.com/prod/bread/allbreads"
      )
      .then((response) => {
        this.setState({ breads: response.data.result });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  breadList() {
    return this.state.breads.map((currentbread) => {
      return <Bread bread={currentbread} key={currentbread.bread_id} />;
    });
  }

  render() {
    return (
      <div style={{ marginTop: 25 }}>
        <h3 className="text-center">Breads</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Bread ID</th>
              <th>Bread Type</th>
              <th>Bread Quantity</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{this.breadList()}</tbody>
        </table>
      </div>
    );
  }
}
