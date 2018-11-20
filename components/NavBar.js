import React from 'react';
import { connect } from 'react-redux';
import { fetchLocationsData } from './../actions/karmaActions.js';
import './../css/navbar.css';

class NavBar extends React.Component {
  handleNavLinkClick = e => {
    e.preventDefault();
  };

  render() {
    const currentUrl = '#';

    return (
      <div className={`navbarWrapper`}>
        <div className={`navbar widthWrapper`}>
          <a
            href={currentUrl}
            className={`active`}
            onClick={this.handleNavLinkClick}
          >
            <img src={`/static/img/icons/pin_active.svg`} alt="Upptäck" />
            Upptäck
          </a>
          <a href={currentUrl} onClick={this.handleNavLinkClick}>
            <img src={`/static/img/icons/house.svg`} alt="Ställen" />
            Ställen
          </a>
          <a href={currentUrl} onClick={this.handleNavLinkClick}>
            <img src={`/static/img/icons/check.svg`} alt="Ordrar" />
            Ordrar
          </a>
          <a href={currentUrl} onClick={this.handleNavLinkClick}>
            <img src={`/static/img/icons/user.svg`} alt="Profil" />
            Profil
          </a>
        </div>
      </div>
    );
  }
}

export default connect(store => {
  return {
    store,
  };
})(NavBar);
