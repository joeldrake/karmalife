import React from 'react';
import { connect } from 'react-redux';
import { fetchLocationItems } from './../actions/karmaActions.js';
import { toggleProducts } from './../actions/layoutActions.js';
import GoogleMapReact from 'google-map-react';
import supercluster from 'points-cluster';
import Pin from './Pin';
import './../css/map.css';

class Map extends React.Component {
  handlePinClick(marker) {
    console.log(marker);

    const { mapZoom } = this.props.store;

    const pointsLength = marker.points.length;
    let numberOfItems = 0;
    marker.points.forEach(point => {
      numberOfItems += point.item_count;
    });

    if (numberOfItems === 0) {
      //just pan there
      this.props.dispatch({
        type: 'UPDATE_MAP',
        mapCenter: {
          lat: marker.points[0].latitude,
          lng: marker.points[0].longitude,
        },
        mapZoom,
      });
    } else if (pointsLength === 1) {
      //load location
      this.props
        .dispatch(fetchLocationItems(marker.points[0].location_id))
        .then(() => {
          this.props.dispatch(toggleProducts(true)).then(() => {
            window.scrollBy({
              top: 200,
              behavior: 'smooth',
            });
            console.log(marker.points[0]);
            this.props.dispatch({
              type: 'UPDATE_MAP',
              mapCenter: {
                lat: marker.points[0].latitude,
                lng: marker.points[0].longitude,
              },
              mapZoom,
            });
          });
        });
    } else {
      //zoom
      this.props.dispatch({
        type: 'UPDATE_MAP',
        mapCenter: {
          lat: marker.points[0].latitude,
          lng: marker.points[0].longitude,
        },
        mapZoom: mapZoom + 1,
      });
    }
  }

  handleMapChange = e => {
    const locations = this.props.store.locations;
    if (locations) {
      const sc = supercluster(locations.data.locations);

      const markers = sc({
        bounds: e.bounds,
        zoom: e.zoom,
      });

      this.props.dispatch({
        type: 'MARKERS_DATA',
        markers,
      });
    }
  };

  render() {
    const { locations, markers, mapCenter, mapZoom } = this.props.store;
    let renderMap = ``;
    let renderPins = [];
    if (locations) {
      if (markers) {
        renderPins = markers.map((marker, i) => {
          return (
            <Pin
              key={i}
              lat={marker.wy}
              lng={marker.wx}
              marker={marker}
              handlePinClick={() => this.handlePinClick(marker)}
            />
          );
        });
      }

      renderMap = (
        <GoogleMapReact
          bootstrapURLKeys={{
            key: 'AIzaSyDqNnOK93Qt5HSsUJCz-rN507UebKDH2Tg',
          }}
          center={mapCenter}
          zoom={mapZoom}
          onChange={this.handleMapChange}
          ref={e => (this.map = e)}
        >
          {renderPins}
        </GoogleMapReact>
      );
    }

    return <div className={`mapWrapper`}>{renderMap}</div>;
  }
}

export default connect(store => {
  return {
    store,
  };
})(Map);
