import React from 'react';
import { connect } from 'react-redux';
import { fetchLocationsData } from './../actions/karmaActions.js';
import './../css/subcategory.css';

const transitionTime = 200;
const transitionStyle = `left ${transitionTime}ms, right ${transitionTime}ms`;

class SubCategories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subcategories: [
        {
          text: 'Allt',
          active: true,
        },
        {
          text: 'Måltider',
          active: false,
        },
        {
          text: 'Fika',
          active: false,
        },
        {
          text: 'Bröd',
          active: false,
        },
        {
          text: 'Matvaror',
          active: false,
        },
        {
          text: 'Följer',
          active: false,
        },
      ],
      activeTab: 0,
      sizes: {},
    };
    this.categories = {};
  }

  componentDidMount() {
    this.getSizes();
  }

  handleSubcategoryClick = clickedIndex => e => {
    e.preventDefault();
    let subcategories = this.state.subcategories;
    subcategories.forEach((item, i) => {
      item.active = clickedIndex === i ? true : false;
    });
    this.setState({
      subcategories,
      activeTab: clickedIndex,
    });

    const { navOpen } = this.props.store;
  };

  getSizes() {
    const rootBounds = this.root.getBoundingClientRect();

    const sizes = {};

    Object.keys(this.categories).forEach((key, i) => {
      const categories = this.categories[key];
      const bounds = categories.getBoundingClientRect();

      const left = bounds.left - rootBounds.left;
      const right = rootBounds.right - bounds.right;

      sizes[i] = { left, right };
    });

    this.setState({ sizes });
    return sizes;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.activeTab !== this.state.activeTab) {
      this.getSizes();
    }
  }

  getUnderlineStyle = () => {
    const activeTab = this.state.activeTab;
    if (Object.keys(this.state.sizes).length === 0) {
      return { left: '0', right: '100%' };
    }

    const size = this.state.sizes[activeTab];
    return {
      left: `${size.left}px`,
      right: `${size.right}px`,
      transition: transitionStyle,
    };
  };

  render() {
    const currentUrl = '#';
    const renderSubcategories = this.state.subcategories.map((item, i) => {
      const active = item.active;
      return (
        <a
          href={currentUrl}
          className={active ? `active` : null}
          onClick={this.handleSubcategoryClick(i)}
          key={i}
          ref={e => (this.categories[item.text] = e)}
        >
          {item.text}
        </a>
      );
    });

    return (
      <div
        className={`subcategoryWrapper widthWrapper`}
        ref={e => (this.root = e)}
      >
        {renderSubcategories}
        <div
          className="subCategoryUnderline"
          style={this.getUnderlineStyle()}
        />
      </div>
    );
  }
}

export default connect(store => {
  return {
    store,
  };
})(SubCategories);
