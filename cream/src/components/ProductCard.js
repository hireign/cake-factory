import React from "react";
import { withRouter } from "react-router-dom";

function ProductCard(props) {
  return (
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">{props.cream_type}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{props.cream_id}</h6>
          <h6 className="card-subtitle mb-2 text-muted">{props.qty}</h6>
          <a href="/update" className="card-link">
            Update
          </a>
          <a href="/delete" className="card-link">
            Delete
          </a>
        </div>
      </div>
  );
}

export default withRouter(ProductCard);
