import React from "react";

const Marker = ({ children, feature }) => {
    return (
      <button className="marker">
        {/* <Link to={`/location/${feature.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        </Link> */}
        {children}
      </button>
    );
  };

  export default Marker;