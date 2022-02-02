import React from "react";
import "./Navigation.scss";
import DropdownItem from "./DropdownItem";

export default function DropdownMenu() {
  return (
    <div className="dropdown">
      <DropdownItem>My Profile</DropdownItem>
      <DropdownItem>My Listings</DropdownItem>
      <DropdownItem>My Offers</DropdownItem>
      <DropdownItem>Create New Listing</DropdownItem>
      <DropdownItem>Logout</DropdownItem>
    </div>
  );
}