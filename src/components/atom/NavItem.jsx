import React from "react";

const NavItem = ({ page, item, deviceType }) => {
  if (deviceType === "desktop") {
    return (
      <li>
        <a className={`mx-1 ${page === item && "focus"}`}>{item}</a>
      </li>
    );
  }

  if (deviceType === "mobile") {
    return (
      <li>
        <a className={`mx-1 ${page === item && "focus"}`}>{item}</a>
      </li>
    );
  }
};

export default NavItem;
