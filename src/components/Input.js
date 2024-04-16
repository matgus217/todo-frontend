import React from "react";

function Input(props) {
  return (
    <input
      placeholder="Type Here."
      onChange={props.handleChange}
      value={props.input}
      onKeyPress={props.input && props.onKeyPress}
    >
    </input>
  );
}

export default Input;