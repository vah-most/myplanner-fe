/*
 * Created on Sat Jul 23 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import Config from "../Config.json";

import "./AppFooter.scss";

const AppFooter = () => {
  return (
    <div className="footer">
      <span>{Config.Copyright}</span>
    </div>
  );
};

export default AppFooter;
