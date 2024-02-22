import React from "react";

const Logo = () => {
  return (
    <div className="logo">
      {/* Les images importées depuis la balise IMG sont accessibles dans "public" */}
      <img src="https://woody.cloudly.space/app/dist/saintnazaire/img/logo/fr/logo.svg" alt="Saint-nazaire" style={{ width: 200, height: 60 }} />
    </div>
  );
};

export default Logo;
