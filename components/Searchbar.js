import React from 'react';
import './../css/searchbar.css';

class Map extends React.Component {
  render() {
    return (
      <div className={`widthWrapper addPadding`} style={{ paddingBottom: '0' }}>
        <div className={`searchbarWrapper`}>
          <input
            className={`searchbar`}
            placeholder={`Sök ställen eller mat på kartan`}
          />
        </div>
      </div>
    );
  }
}

export default Map;
