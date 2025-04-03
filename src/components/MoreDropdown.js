import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import css from "../css/MoreDropdown.module.css";

import Icon from "./Icon";
import { useNavigate } from "react-router-dom";

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
      <Dropdown.Menu className={css.DropdownMenu}>
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

export function ProfileEditDropdown({ id }) {
  const navigate = useNavigate();
  return (
    <Dropdown className={`ml-auto px-3 ${css.Absolute}`} drop="left">
      <Dropdown.Toggle as={ThreeDots} />
      <Dropdown.Menu>
        <Dropdown.Item
          onClick={() => navigate(`/profiles/${id}/edit`)}
          aria-label="edit-profile"
        >
          <i className="fas fa-edit" /> edit profile
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => navigate(`/profiles/${id}/edit/username`)}
          aria-label="edit-username"
        >
          <i className="far fa-id-card" />
          change username
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => navigate(`/profiles/${id}/edit/password`)}
          aria-label="edit-password"
        >
          <i className="fas fa-key" />
          change password
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
