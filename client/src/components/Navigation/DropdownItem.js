import React from "react";
import "./Navigation.scss";

export default function DropdownItem(props) {
  return (
    <a href="#" className="menu-item">
      {props.children}
    </a>
  );
}