import React from 'react';
import { connect } from 'react-redux';
import { toggleProducts, getLocation } from './../actions/layoutActions.js';
import './../css/products.css';

class Products extends React.Component {
  handleToggleProductsClick = () => {
    this.props.dispatch(toggleProducts()).then(productsOpen => {
      console.log(productsOpen);
      if (productsOpen) {
        window.scrollBy({
          top: 200,
          behavior: 'smooth',
        });
      }
    });
  };

  _renderLocationItems() {
    const { locationItems } = this.props.store;
    const render = locationItems.data.items.map((item, i) => {
      //item.image_url
      const tags = item.tags.map((tag, i) => {
        return (
          <div className={`tag`} key={i}>
            {tag.key}
          </div>
        );
      });

      let productItemStyle = {};
      if (!item.image_url.includes(`ASSETS`)) {
        productItemStyle.backgroundImage = `url(https://res.cloudinary.com/karmalicious-ab/image/upload/v1/${
          item.image_url
        })`;
      }
      return (
        <div
          className={
            `productItem` + (item.available_count === 0 ? ` noleft` : ``)
          }
          style={productItemStyle}
          key={i}
        >
          <div className={`tagsWrapper`}>
            <div className={`left`}>{item.available_count} kvar</div>
            {tags}
          </div>
          <div className={`title`}>{item.title}</div>
          <div className={`priceWrapper`}>
            <div className={`baseprice`}>{item.base_price_string}</div>
            <div className={`price`}>{item.price_string}</div>
          </div>
        </div>
      );
    });
    return render;
  }

  handleCenterLocationClick = e => {
    e.preventDefault();
    this.props.dispatch(getLocation());
  };

  render() {
    const { productsOpen, locationItems } = this.props.store;

    let productsHeadline = '';

    let renderLocationsItems = '';
    if (locationItems && locationItems.data && locationItems.data.success) {
      renderLocationsItems = this._renderLocationItems();
      productsHeadline = (
        <span>
          Visar {locationItems.data.items.length} varor från{' '}
          <b>{locationItems.data.items[0].location_name}</b>
        </span>
      );
    }

    return (
      <div className={`productsWrapper`}>
        <div className={`products widthWrapper addPadding`}>
          <a href="#" onClick={this.handleCenterLocationClick}>
            <img
              className={`centerNavigation`}
              src={`/static/img/icons/navigation.svg`}
              alt="Center"
            />
          </a>

          <div className={`productsTopText`}>{productsHeadline}</div>

          <button
            className={`toggleProducts` + (productsOpen ? ` open` : ``)}
            onClick={this.handleToggleProductsClick}
          />
          <div className={`clearfix`} />
          {productsOpen ? (
            <div className={`productsContent`}>{renderLocationsItems}</div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default connect(store => {
  return {
    store,
  };
})(Products);
