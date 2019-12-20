import React, {Component} from "react";
import {
  IonPage,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonList,
  IonButton,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonRippleEffect
} from "@ionic/react";
import {PagePropsInterface} from "../utils/PagePropsInterface";
import {CACHED_LOGIN_USER, HAS_LOGIN} from "../utils/constants";
import ajax from "../utils/ajax";
import {Plugins} from '@capacitor/core';

class LoginPage extends Component<PagePropsInterface, {}> {
  state = {form: {account: '', password: ''}};

  onChangeFormItem(val: string, key: string) {
    const {form} = this.state;
    if (key === 'password') {
      form.password = val;
    } else {
      form.account = val;
    }
    this.setState({form});
  }

  async quickLogin() {
    const deviceInfo = await Plugins.Device.getInfo();
    await ajax({url: '/api/pub/quickLogin', data: {uuid: deviceInfo.uuid}});
    window.sessionStorage.setItem(HAS_LOGIN, '1');
    this.props.history.replace('/home');
  }

  async login() {
    await ajax({url: '/api/user/login', data: this.state.form});
    window.sessionStorage.setItem(HAS_LOGIN, '1');
    window.localStorage.setItem(CACHED_LOGIN_USER, JSON.stringify(this.state.form));
    this.props.history.replace('/home');
  }

  render() {
    return (
      <IonPage className='login-page'>
        <IonContent>
          <IonCardHeader>
            <IonCardTitle>
              书香
            </IonCardTitle>
            <IonCardSubtitle>记录心灵每一次触动</IonCardSubtitle>
          </IonCardHeader>
          <IonList>
            <IonItem>
              <IonLabel position="floating">账号</IonLabel>
              <IonInput onIonChange={(event: any) => this.onChangeFormItem(event.target.value, 'account')}/>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">密码</IonLabel>
              <IonInput
                type={'password'}
                onIonChange={(event: any) => this.onChangeFormItem(event.target.value, 'password')}/>
            </IonItem>
          </IonList>
          <IonButton expand="full" onClick={() => this.login()}>登录</IonButton>

          <div className="quick-login" onClick={() => this.quickLogin()}>
            快速登录
            <IonRippleEffect type='bounded'/>
          </div>

        </IonContent>
      </IonPage>
    )
  }
}

export default LoginPage;
