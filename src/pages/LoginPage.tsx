import React, {Component} from "react";
import {
  IonPage,
  IonContent, IonItem, IonLabel, IonInput, IonList, IonButton
} from "@ionic/react";
import {PagePropsInterface} from "../utils/PagePropsInterface";
import {CACHED_LOGIN_USER, HAS_LOGIN} from "../utils/constants";
import ajax from "../utils/ajax";

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

  async login() {
    await ajax({url: '/api/user/login', data: this.state.form});
    window.sessionStorage.setItem(HAS_LOGIN, '1');
    window.localStorage.setItem(CACHED_LOGIN_USER, JSON.stringify(this.state.form));
    this.props.history.replace('/home');
  }

  render() {
    return (
      <IonPage>
        <IonContent>
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
        </IonContent>
      </IonPage>
    )
  }
}

export default LoginPage;
