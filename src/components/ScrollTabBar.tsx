/**
 * Created by eatong on 2020/2/6.
 */

import React, {Component} from 'react';


interface ScrollTabBarPropsInterface {
  dataSource: Array<any>
  onChangeTab?: Function,
  label?: string,
  defaultTab: string,
}

interface ScrollTabBarInterface {

}

class ScrollTabBar extends Component<ScrollTabBarPropsInterface, ScrollTabBarInterface> {
  state = {currentTab: ''};

  componentDidMount(): void {
    this.setState({currentTab: this.props.defaultTab})
  }

  onChangeIndex(key: string) {
    if (this.state.currentTab === key) {
      return;
    }
    this.setState({currentTab: key});
    this.props.onChangeTab && this.props.onChangeTab(key);
  }

  render() {
    return (
      <div className="et-scroll-tab-bar-container">
        <ul className="et-scroll-tab-bar-list">
          {this.props.dataSource.map((item, index) => (
            <li key={item.key}
                onClick={this.onChangeIndex.bind(this, item.key)}
                className={`et-scroll-tab-bar-item ${this.state.currentTab === item.key ? 'active' : ''}`}>
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default ScrollTabBar;
