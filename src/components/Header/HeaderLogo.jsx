import React from "react";

import Config from "Config.json";

function HeaderLogo() {
  return <React.Fragment>{Config.AppName}</React.Fragment>;
}

export default HeaderLogo;
