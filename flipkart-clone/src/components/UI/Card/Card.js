import React from "react";
import "./Card.css";

const Card = (props) => {
  return (
    <div className="card" {...props}>
      {(props.headerLeft || props.headerRight) && (
        <div className="cardHeader">
          {props.headerLeft && (
            <div
              style={{
                alignSelf: "center",
                fontSize: "20px",
                fontWeight: "500",
              }}
            >
              {props.headerLeft}
            </div>
          )}
          {props.headerRight && <div>{props.headerRight}</div>}
        </div>
      )}

      {props.children}
    </div>
  );
};

export default Card;