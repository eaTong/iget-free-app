/**
 * Created by eatong on 2020/1/6.
 */

import React, {Component} from "react";
import {IonPage, IonContent, withIonLifeCycle} from "@ionic/react";
import {PagePropsInterface} from "../utils/PagePropsInterface";
import {inject, observer} from "mobx-react";
import {CACHED_LOGIN_USER, HAS_LOGIN} from "../utils/constants";
import showLoading from "../utils/loadingUtil";
import {Storage} from "@capacitor/core";


interface CheckAuthInterface extends PagePropsInterface {
  app?: any
}

@inject('app') @observer
class CheckAuth extends Component<CheckAuthInterface, any> {
  async ionViewDidEnter() {

    const hasLogged = window.sessionStorage.getItem(HAS_LOGIN);
    if (hasLogged) {
      this.props.app.autoLogin();
      this.jumpToIndex();
      return;
    }
    const {value} = await Storage.get({key: CACHED_LOGIN_USER});
    if (value) {
      try {
        const loading = showLoading('自动登陆中...');
        await this.props.app.login(JSON.parse(value));
        this.jumpToIndex();
        loading.destroy()
      } catch (e) {
        this.redirectLogin();
      }
    } else {
      this.redirectLogin();
    }
  }

  jumpToIndex() {
    this.props.history.replace('/home');
  }

  redirectLogin() {
    this.props.history.replace('/login');
  }

  render() {
    return (
      <IonPage>
        <IonContent>

        </IonContent>

      </IonPage>
    )
  }
}

export default withIonLifeCycle(CheckAuth);
