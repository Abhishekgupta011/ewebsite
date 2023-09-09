import React from "react";
import Icon from "./Icons";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-primary text-white">
      <h1 className="p-3">
        <span className="ml-3">
          The Generics{" "}
          <Link to="/about" className="text-white">
            <Icon />
          </Link>
        </span>
      </h1>
    </div>
  );
};

export default Footer;
