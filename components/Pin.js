import React from 'react';
import './../css/pin.css';

class Pin extends React.Component {
  render() {
    const pointsLength = this.props.marker.points.length;
    let numberOfItems = 0;
    this.props.marker.points.forEach(point => {
      numberOfItems += point.item_count;
    });
    let addedClass = `cluster`;
    if (pointsLength === 1) {
      addedClass = `pin`;
    }
    if (numberOfItems === 0) {
      addedClass = addedClass + ` empty`;
    }

    return (
      <div className={addedClass} onClick={this.props.handlePinClick}>
        <div className={`pinContent`}>{numberOfItems}</div>
      </div>
    );
  }
}

export default Pin;
