import React, {Component} from "react";
import {
  IonButton,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCheckbox,
  IonContent,
  IonFooter,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRippleEffect
} from "@ionic/react";
import {PagePropsInterface} from "../utils/PagePropsInterface";
import {inject, observer} from "mobx-react";
import {Browser} from "@capacitor/core";
import showToast from "../utils/toastUtil";

interface LoginPageInterface extends PagePropsInterface {
  app?: any
}

@inject('app') @observer
class LoginPage extends Component<LoginPageInterface, {}> {
  state = {form: {account: '', password: ''}, agreed: true};

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
    if (this.state.agreed) {

      await this.props.app.quickLogin();
      this.props.history.replace('/home');
    } else {
      showToast('请先同意「书香-得寸进尺」隐私政策')
    }
  }

  async login() {
    await this.props.app.login(this.state.form);
    this.props.history.replace('/home');
  }

  viewPrivacy() {
    Browser.open({url: 'https://eatong.cn/blog/10'});
  }

  render() {
    return (
      <IonPage className='login-page'>
        <IonContent>
          <IonCardHeader>
            <IonCardTitle>
              书香
            </IonCardTitle>
            <IonCardSubtitle>给心灵的触动一个港湾.</IonCardSubtitle>
            <IonCardTitle>得寸进尺</IonCardTitle>
            <IonCardSubtitle>怕什么真理无穷，进一寸有进一寸的欢喜。</IonCardSubtitle>
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
        <IonFooter className={'login-footer'}>
          <IonCheckbox
            color="primary"
            checked={this.state.agreed}
            onIonChange={(event: any) => this.setState({agreed: event.target.checked})}
          />
          <span className={'tip-content'}>
            我同意「书香-得寸进尺」
          </span>
          <IonButton fill={'clear'} onClick={() => this.viewPrivacy()}>隐私政策</IonButton>

        </IonFooter>
      </IonPage>
    )
  }
}

export default LoginPage;
