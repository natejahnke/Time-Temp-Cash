import React from "react";
import "./styles/styles.scss";
// import Card from './components/Card';
import HomeCard from "./components/HomeCard";
import MyProvider from "./components/MyProvider";
// import HomeButton from './components/HomeButton';
import LocationSearchInput from "./components/LocationSearchInput";
import HomeButton from "./components/HomeButton";

export default class App extends React.Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <MyProvider>
          <LocationSearchInput />
          <HomeButton />
          <HomeCard />
        </MyProvider>
      </React.Fragment>
    );
  }
}
