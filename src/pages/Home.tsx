import {IonContent, IonLoading, IonPage, withIonLifeCycle,} from '@ionic/react';
import React, {Component} from 'react';
import {PagePropsInterface} from "../utils/PagePropsInterface";
import {CACHED_LOGIN_USER, HAS_LOGIN} from "../utils/constants";
import ajax from '../utils/ajax';

class Home extends Component<PagePropsInterface, {}> {
  state = {loading: false};

  async ionViewDidEnter() {
    const hasLogged = window.sessionStorage.getItem(HAS_LOGIN);
    if (hasLogged) {
      this.jumpToIndex();
      return;
    }
    const loginUserSting = window.localStorage.getItem(CACHED_LOGIN_USER);
    if (loginUserSting) {
      try {
        const loggedUser = JSON.parse(loginUserSting);
        await this.toggleLoading(true);
        await ajax({url: '/api/user/login', data: loggedUser});
        this.toggleLoading(false);
        window.sessionStorage.setItem(HAS_LOGIN, '1');
        window.localStorage.setItem(CACHED_LOGIN_USER, JSON.stringify(loggedUser));
        this.jumpToIndex();
      } catch (e) {
        this.redirectLogin();
      }
    } else {
      this.redirectLogin();
    }
  }

  redirectLogin() {
    this.props.history.replace('/login');
  }

  toggleLoading(loading: Boolean): void {
    this.setState({loading: loading})
  }

  jumpToIndex() {
    this.props.history.replace('/book/home');
  }


  render() {
    const {loading} = this.state;
    return (
      <IonPage>
        <IonContent>
          <IonLoading
            isOpen={loading}
            onDidDismiss={() => this.toggleLoading(false)}
            message={'自动登录中...'}
            duration={5000}
          />
        </IonContent>
      </IonPage>
    );
  }
}

export default withIonLifeCycle(Home);
