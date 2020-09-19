import React from 'react';
import PropTypes from 'prop-types';
import Tab from '../Tab/Tab';

import './style.css';

class Tabs extends React.Component {
  static propTypes = {
    children: PropTypes.instanceOf(Array).isRequired,
  } 

  constructor(props){
    super(props);
    this.state = {
      activeTab: this.props.children[0].props.label,
    };
    this.hideModal = this.hideModal.bind(this);
  }

  onClickTabItem = (tab) => {
    this.setState({ activeTab: tab });
  }

  hideModal(){
    this.props.hideModal();
  }

  render() {
    const {
      onClickTabItem,
      props: {
        children,
      },
      state: {
        activeTab,
      }
    } = this;

    return (
      <div className="tabs">
        <ol className="tab-list">
          {children.map((child) => {
            const { label } = child.props; 
            return (
              <Tab
                activeTab={activeTab}
                key={label}
                label={label}
                onClick={onClickTabItem}
              />
            );
          })}
          <div className="close" onClick={this.hideModal}><i className="fas fa-times" aria-hidden="true"></i></div>
        </ol>
        <div className="tab-content">
          {children.map((child) => {
            if (child.props.label !== activeTab) return undefined;
            return child.props.children;
          })}
        </div>
      </div>
    );
  }

}

export default Tabs;
