import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";



export default class CreateBread extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      bread_id: "",
      bread_type: "",
      bread_qty: "",
    };
  }

  handleChange(e) {
    let target = e.target;
    let name = target.id;
    let value = target.value;

    this.setState({
      [name]: value,
    });
  }

  async handleSubmit(e) {
    e.preventDefault();

    if (this.state.bread_id !== "" && this.state.bread_type !== "" && this.state.bread_qty !== "") {
      axios
        .post('https://dlm008cgo1.execute-api.us-east-1.amazonaws.com/prod/bread/addbread', {
          bread_id: this.state.bread_id,
          bread_type: this.state.bread_type,
          bread_qty: this.state.bread_qty,
        })
        .then((res) => {
            console.log(res.data)
            if(res.data.status===true){
                this.setState({ allBreads: "temp" });
            }else{
                alert("bread with provided id or name already exists");
            }
        });

    } else {
      alert("Please fill all the fields");
    }
  }

  render() {
    return (
    <div style={{ marginTop: 25 }}>
        {this.state.allBreads === "temp" ? <Redirect to="/" /> : null}
        <h3 className="text-center">Create new bread type</h3>
        <form onSubmit={this.handleSubmit} className="text-center">
          <div className="m-5">
            <input
            type="number"
              id="bread_id"
              name="bread_id"
              placeholder="id of bread"
              value={this.state.bread_id}
              onChange={this.handleChange}
            ></input>
            <br/>
            <br/>
            <input
            type="text"
              id="bread_type"
              name="bread_type"
              placeholder="type of bread"
              value={this.state.bread_type}
              onChange={this.handleChange}
            ></input>
            <br/>
            <br/>
            <input
            type="number"
              id="bread_qty"
              name="bread_qty"
              placeholder="quentity of bread"
              value={this.state.bread_qty}
              onChange={this.handleChange}
            ></input>
            <br/>
            <br/>
            <button className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}
