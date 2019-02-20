import React from "react";
import { MyContext } from "./MyProvider";

const HomeButton = props => (
  <MyContext.Consumer>
    {context => (
      <button
        onClick={context.onClick}
        className="action-button shadow animate blue"
      >
        Locate Me
      </button>
    )}
  </MyContext.Consumer>
);

export default HomeButton;
