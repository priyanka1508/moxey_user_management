import React, { useEffect, useState } from "react";
import "./header.css";

const Header = (props) => {
    const {openDrawer} = props;
  return (
    <>
    <>{console.log("openDrawer: ", openDrawer)}</>
        <div className={`${openDrawer ? "header-opacity" : "bg-white flex flex-row items-center"}`}>
      <div className="pw-header flex flex-row grow justify-between p-4 items-center">
        <div className="flex flex-row gap-5">
          Rudra Transporter - Transporter
        </div>
        <div>hi</div>
      </div>
    </div>
    </>
  );
};

// Header.propTypes = {}

export default Header;
