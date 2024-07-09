import React from "react";
import NavItem from "../atom/NavItem";

const NavMiddleSection = ({ navigationItems, page, deviceType }) => {
  if (deviceType === "desktop") {
    return (
      <ul className="menu menu-horizontal">
        {navigationItems.map((item) => (
          <NavItem page={page} item={item} deviceType="desktop" />
        ))}
      </ul>
    );
  }

  if (deviceType === "mobile") {
    return (
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
      >
        {navigationItems.map((item) => (
          <NavItem page={page} item={item} deviceType="mobile" />
        ))}
      </ul>
    );
  }

  return <div>NavMiddleSection</div>;
};

export default NavMiddleSection;
