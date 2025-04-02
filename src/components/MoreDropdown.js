import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import css from "../css/MoreDropdown.module.css";

import Icon from "./Icon";

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const ThreeDots = React.forwardRef(({ onClick }, ref) => {
  return (
    <div
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      style={{
        cursor: "pointer",
        padding: "5px",
        display: "inline-block",
      }}
    >
      <Icon name="three-dots-vertical" size={24} />
    </div>
  );
});

export const MoreDropdown = ({ handleEdit, handleDelete }) => {
  return (
    <Dropdown className="ml-auto" drop="left">
      <Dropdown.Toggle as={ThreeDots} />
      <Dropdown.Menu className="text-center">
        <Dropdown.Item
          className={css.DropdownItem}
          onClick={handleEdit}
          aria-label="edit"
        >
          <Icon name="pencil-square" />
        </Dropdown.Item>
        <Dropdown.Item
          className={css.DropdownItem}
          onClick={handleDelete}
          aria-label="delete"
        >
          <Icon name="trash" />
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
