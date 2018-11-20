import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const initialState = {
  navOpen: false,
  locations: null,
  locationItems: null,
  markers: null,
  productsOpen: false,
  themeColor: '#f56085',
  mapCenter: {
    lat: 59.3455247,
    lng: 18.0588195,
  },
  mapZoom: 14,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_MAP':
      return {
        ...state,
        mapCenter: action.mapCenter,
        mapZoom: action.mapZoom || 14,
      };
    case 'TOGGLE_PRODUCTS':
      return {
        ...state,
        productsOpen: action.productsOpen,
      };
    case 'TOGGLE_NAV':
      return {
        ...state,
        navOpen: action.navOpen,
      };
    case 'LOCATION_ITEMS':
      return {
        ...state,
        locationItems: action.locationItems,
      };
    case 'LOCATIONS':
      return {
        ...state,
        locations: action.locations,
      };
    case 'MARKERS_DATA':
      return {
        ...state,
        markers: action.markers,
      };
    default:
      return state;
  }
};

const makeStore = (initialState, options) => {
  return createStore(reducer, initialState, applyMiddleware(thunk));
};

export default makeStore;
