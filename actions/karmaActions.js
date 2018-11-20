export function fetchLocationItems(location_id) {
  return async (dispatch, getState) => {
    let url = `/api`;

    const postdata = {
      endpoint: `locationItems`,
      location_id,
    };

    const customHeaders = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postdata),
    };

    const res = await fetch(url, customHeaders);

    let data;
    try {
      data = await res.json();
      console.log(JSON.stringify(data, null, 2));
    } catch (e) {
      console.log(e);
    }

    dispatch({
      type: 'LOCATION_ITEMS',
      locationItems: data,
    });

    return data;
  };
}

export function fetchLocations() {
  return async (dispatch, getState) => {
    if (!getState().locations) {
      //only get locations if they are not already in state
      let url = `/api`;

      const postdata = {
        endpoint: `locations`,
      };

      const customHeaders = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postdata),
      };

      const res = await fetch(url, customHeaders);

      let data;
      try {
        data = await res.json();
        console.log(JSON.stringify(data, null, 2));
      } catch (e) {
        console.log(e);
      }

      dispatch({
        type: 'LOCATIONS',
        locations: data,
      });
    }

    return;
  };
}
