import React from 'react';
import PropTypes from 'prop-types';

import './style.css';


class Tab extends React.Component {
  static propTypes = {
    activeTab: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  onClick = () => {
    const { label, onClick } = this.props;
    onClick(label);
  }

  render() {
    const {
      onClick,
      props: {
        activeTab,
        label,
      },
    } = this;

    let className = 'tab-list-item tab';

    if (activeTab === label) {
      className += ' tab-list-active tab';
    }

    return (
      <li
        className={className}
        onClick={onClick}
      >
        {label}
        {/* TODO: change above to icon that is passed in  */}
      </li>
    );
  }
}

export default Tab;
