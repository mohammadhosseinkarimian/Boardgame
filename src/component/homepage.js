import React from "react";
import "../style/homepage.css";
class HomePage extends React.Component {
  render() {
    return (
      <div className="body">
        <div className="header"></div>
        <div className="menu"></div>
        <div className="all">
          <div className="main"></div>
          <div className="description"></div>
        </div>
      </div>
    );
  }
}
export default HomePage;
