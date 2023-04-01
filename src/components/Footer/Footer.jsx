/*
 * Copyright (c) 2023 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import Config from "../../Config.json";

import "./Footer.scss";

const Footer = () => {
  return (
    <div className="bg-dark bg-gradient footer">
      <span>{Config.Copyright}</span>
    </div>
  );
};

export default Footer;
