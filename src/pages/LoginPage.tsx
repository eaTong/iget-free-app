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
import {inject, observer} from "mobx-react";

interface LoginPageInterface extends PagePropsInterface{
  app?:any
}
@inject('app') @observer
class LoginPage extends Component<LoginPageInterface, {}> {
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
    this.props.app.quickLogin();
    this.props.history.replace('/home');
  }

  async login() {
    await this.props.app.login(this.state.form);

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
