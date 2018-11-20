import React from 'react';
import { connect } from 'react-redux';
import Layout from './../components/Layout.js';
import Searchbar from './../components/Searchbar.js';
import { fetchLocations } from './../actions/karmaActions.js';
import SubCategories from './../components/SubCategories.js';
import Map from '../components/Map.js';
import Products from './../components/Products.js';
import NavBar from '../components/NavBar.js';

class Index extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchLocations());
  }

  render() {
    return (
      <Layout>
        <Searchbar />

        <SubCategories />

        <Map />

        <Products />

        <NavBar />
      </Layout>
    );
  }
}

export default connect()(Index);
