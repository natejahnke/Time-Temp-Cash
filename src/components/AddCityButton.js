import React from "react";
import { MyContext } from "./MyProvider";

const AddCityButton = props => (
  <MyContext.Consumer>
    {context => <button onClick={e => context.onClick(e)}>Add City</button>}
  </MyContext.Consumer>
);

export default AddCityButton;
