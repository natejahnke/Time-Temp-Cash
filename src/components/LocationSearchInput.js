import React from 'react';
import { MyContext } from './MyProvider';

import PlacesAutocomplete from 'react-places-autocomplete';

class LocationSearchInput extends React.Component {

  render() {
    const searchOptions = {
      types: ['(cities)']
    };

    return (
      <div>
           <MyContext.Consumer>
          {( context ) => (
            <PlacesAutocomplete
              searchOptions={searchOptions}
              value={context.state.address}
              onChange={context.handleChange}
              onSelect={context.handleSelect}>
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading
              }) => (
                <div>
                  <input
                    {...getInputProps({
                      placeholder: 'Search Places ...',
                      className: 'location-search-input'
                    })}
                  />
                  <div className='autocomplete-dropdown-container'>
                    {loading && <div>Loading...</div>}
                    {suggestions.map(suggestion => {
                      const className = suggestion.active
                        ? 'suggestion-item--active'
                        : 'suggestion-item';
                      // inline style for demonstration purpose
                      const style = suggestion.active
                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                      return (
                        <div
                          {...getSuggestionItemProps(suggestion, {
                            className,
                            style
                          })}>
                          <span>{suggestion.description}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
          )}
        </MyContext.Consumer>
        </div>
    );
  }
}

export default LocationSearchInput;
