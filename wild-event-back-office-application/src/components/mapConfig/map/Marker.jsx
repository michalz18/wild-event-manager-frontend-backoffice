import React from "react";

const Marker = ({ children, feature, index }) => {
    return (
      <button className="marker">
        {/* <Link to={`/location/${feature.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        </Link> */}
        {index}
        {children}
      </button>
    );
  };

  export default Marker;