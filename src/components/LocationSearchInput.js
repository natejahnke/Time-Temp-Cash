import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

class LocationSearchInput extends React.Component {
  state = {
    address: null,
    city: null,
    state: null,
    country: null,
    latitude: null,
    longitude: null
  };

  splitAddress = address => {
    let split = address.split(", ");

    console.log(address.split(",").length - 1);

    if (address.split(",").length - 1 === 2) {
      const city = split[0];
      const state = split[1];
      const country = split[2];

      this.setState({
        address: address,
        city: city,
        state: state,
        country: country
      });
    } else {
      const city = split[0];
      const country = split[1];

      this.setState({
        address: address,
        city: city,
        state: null,
        country: country
      });
    }
  };

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    geocodeByAddress(address)
      .then(this.splitAddress(address))
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) =>
        this.setState({
          latitude: lat,
          longitude: lng
        })
      )
      .catch(error => console.error("Error", error));
  };

  render() {
    const searchOptions = {
      types: ["(cities)"]
    };

    return (
      <PlacesAutocomplete
        searchOptions={searchOptions}
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: "Search Places ...",
                className: "location-search-input"
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: "#fafafa", cursor: "pointer" }
                  : { backgroundColor: "#ffffff", cursor: "pointer" };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

export default LocationSearchInput;
