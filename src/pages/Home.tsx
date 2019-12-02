import {
  IonContent, IonGrid,
  IonLoading,
  IonPage,
  IonRow,
  IonCol
} from '@ionic/react';
import React, {Component} from 'react';
import {PagePropsInterface} from "../utils/PagePropsInterface";
import {CACHED_LOGIN_USER, HAS_LOGIN} from "../utils/constants";
import ajax from '../utils/ajax';
import {bookMarkStatus} from '../utils/enums';

class Home extends Component<PagePropsInterface, {}> {
  state = {
    loading: false,
    bookStatics: {
      wanted: {count: 0, covers: []},
      reading: {count: 0, covers: []},
      read: {count: 0, covers: []},
    },
    status: -1
  };

  async componentDidMount() {
    const hasLogged = window.sessionStorage.getItem(HAS_LOGIN);
    if (hasLogged) {
      await this.getMyBookMark();
      return;
    }
    const loginUserSting = window.localStorage.getItem(CACHED_LOGIN_USER);
    if (loginUserSting) {
      try {
        const loggedUser = JSON.parse(loginUserSting);
        await this.toggleLoading(true);
        await ajax({url: '/api/user/login', data: loggedUser});
        this.toggleLoading(false);
        await this.getMyBookMark();
      } catch (e) {
        this.redirectLogin();
      }
    } else {
      this.redirectLogin();
    }
  }

  async getMyBookMark() {
    const {status} = this.state;
    const bookStatics = await ajax({url: '/api/bookMark/statics', data: {status}});
    this.setState({bookStatics});
  }

  redirectLogin() {
    this.props.history.push('/login');
  }

  toggleLoading(loading: Boolean): void {
    this.setState({loading: loading})
  }

  renderStatusStatics(status: number) {
    let statics = {count: 0, covers: []};
    const {bookStatics} = this.state;
    switch (status) {
      case 1:
        statics = bookStatics.wanted || statics;
        break;
      case 2:
        statics = bookStatics.reading || statics;
        break;
      case 3:
        statics = bookStatics.read || statics;
        break;
    }
    return (
      <IonCol className={'status-item'}>
        <div className="covers">
          {statics.covers.map(img => (
            <img className={'cover-item'} key={img} src={img} alt=""/>
          ))}
        </div>
        <div className="footer">
          <span className="label">{bookMarkStatus[status]}</span>
          <span className="num">{statics.count}</span>
        </div>
      </IonCol>
    )
  }

  renderStatics() {
    return (
      <IonGrid>
        <IonRow>
          {this.renderStatusStatics(1)}
          {this.renderStatusStatics(2)}
          {this.renderStatusStatics(3)}
        </IonRow>
      </IonGrid>
    )
  }

  render() {
    const {loading} = this.state;
    return (
      <IonPage className={'home-page'}>
        <IonContent>
          <IonLoading
            isOpen={loading}
            onDidDismiss={() => this.toggleLoading(false)}
            message={'自动登录中...'}
            duration={5000}
          />
          {this.renderStatics()}
        </IonContent>
      </IonPage>
    );
  }
}

export default Home;
