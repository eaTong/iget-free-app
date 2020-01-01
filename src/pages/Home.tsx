import {IonContent, IonLoading, IonPage, withIonLifeCycle,} from '@ionic/react';
import React, {Component} from 'react';
import {PagePropsInterface} from "../utils/PagePropsInterface";
import {CACHED_LOGIN_USER, HAS_LOGIN} from "../utils/constants";
import {inject, observer} from "mobx-react";

interface LoginPageInterface extends PagePropsInterface{
  app?:any
}

@inject('app') @observer
class Home extends Component<LoginPageInterface, {}> {
  state = {loading: false};

  async ionViewDidEnter() {
    const hasLogged = window.sessionStorage.getItem(HAS_LOGIN);
    if (hasLogged) {
      this.props.app.autoLogin();
      this.jumpToIndex();
      return;
    }
    const loginUserSting = window.localStorage.getItem(CACHED_LOGIN_USER);
    if (loginUserSting) {
      try {
        await this.props.app.login(JSON.parse(loginUserSting));
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
