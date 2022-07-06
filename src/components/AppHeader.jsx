/*
 * Created on Sat Jun 25 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import AppSearchBar from "./common/AppSearchBar";

import "./AppHeader.scss";

const Header = ({ className }) => {
  return (
    <div className={`${className} header`}>
      <AppSearchBar />
    </div>
  );
};

export default Header;
