export function getLocation() {
  return async (dispatch, getState) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const { mapZoom } = getState();
        const mapCenter = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        console.log(position);

        dispatch({
          type: 'UPDATE_MAP',
          mapCenter,
          mapZoom,
        });
      });
    }
  };
}

export function toggleProducts(forcedState) {
  return async (dispatch, getState) => {
    let { productsOpen } = getState();

    if (forcedState) {
      productsOpen = forcedState;
    } else {
      productsOpen = !productsOpen;
    }

    dispatch({
      type: 'TOGGLE_PRODUCTS',
      productsOpen,
    });

    return productsOpen;
  };
}
