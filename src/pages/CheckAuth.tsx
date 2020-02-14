/**
 * Created by eatong on 2020/1/6.
 */

import React, {Component} from "react";
import {IonContent, IonPage, withIonLifeCycle} from "@ionic/react";
import {PagePropsInterface} from "../utils/PagePropsInterface";
import {inject, observer} from "mobx-react";
import {USER_HAS_QUITED} from "../utils/constants";
import { Storage} from "@capacitor/core";


interface CheckAuthInterface extends PagePropsInterface {
  app?: any
}

@inject('app') @observer
class CheckAuth extends Component<CheckAuthInterface, any> {
  async ionViewDidEnter() {
    const {value} = await Storage.get({key:USER_HAS_QUITED});
    if(!value){
      await this.props.app.quickLogin();
      this.props.history.replace('/home');
    }else{

      this.props.history.replace('/login');
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
