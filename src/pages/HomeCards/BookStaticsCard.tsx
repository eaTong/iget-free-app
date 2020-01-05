/**
 * Created by eatong on 2020/1/5.
 */

import React, {Component} from 'react';

interface BookStaticsCardInterface {

}

class BookStaticsCard extends Component<{}, BookStaticsCardInterface> {
  state = {
    bookStatics: {
      wanted: {count: 0, covers: []},
      reading: {count: 0, covers: []},
      read: {count: 0, covers: []},
      listened: {count: 0, covers: []},
    }
  };

  render() {
    return (
      <div>
      </div>
    )
  }
}

export default BookStaticsCard;
