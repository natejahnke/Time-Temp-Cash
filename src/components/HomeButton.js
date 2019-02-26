import React from "react";
import { MyContext } from "./MyProvider";

const HomeButton = props => (
  <MyContext.Consumer>
    {context => <button onClick={e => context.onClick(e)}>Set Home</button>}
  </MyContext.Consumer>
);

export default HomeButton;
