import React, {Component} from "react";
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonLabel,
  IonItem,
  IonList,
  IonModal, IonButton, IonInput
} from "@ionic/react";
import {getLoginUser} from "../../utils/utils";
import showToast from "../../utils/toastUtil";

interface UserSettingProps {
  onDismiss: Function,
  onSubmit: Function,
  type: string
}

interface UserSettingState {
  value: string,
  valueConfirm: string
}

class UserSettingModal extends Component<UserSettingProps, UserSettingState> {
  constructor(props: any) {
    super(props);
    this.state = {
      value: '',
      valueConfirm: ''
    }
  }

  componentDidMount() {
    const {type} = this.props;
    const loginUser = getLoginUser();
    if (type === 'name') {
      this.setState({value: loginUser.name})
    }
    if (type === 'account') {
      this.setState({value: loginUser.account})
    }
  }

  onChangeValue(value: string) {
    this.setState({value});
  }

  onChangeConfirmValue(valueConfirm: string) {
    this.setState({valueConfirm});
  }

  onSaveData() {
    const {onSubmit, type} = this.props;
    const {value, valueConfirm} = this.state;
    if (type === 'password' && value !== valueConfirm) {
      showToast('两次密码不一致');
      return;
    }
    const values = getLoginUser();
    values[type] = value;
    onSubmit(values);
  }

  getTitle() {
    const {type} = this.props;
    switch (type) {
      case 'account':
        return '账号';
      case 'name':
        return '昵称';
      case 'password':
        return '密码';
    }
  }


  render() {
    const title = this.getTitle();
    const {value, valueConfirm} = this.state;
    const {onDismiss, type} = this.props;

    return (
      <IonModal isOpen onDidDismiss={() => onDismiss()}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>{`${title}设置`}</IonTitle>
            <IonButtons slot="end">
              <IonButton color='primary' onClick={() => onDismiss()}>取消</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonItem>
              <IonLabel position="stacked">{title}</IonLabel>
              <IonInput
                placeholder={`请输入${title}`}
                value={value}
                type={type === 'password' ? 'password' : 'text'}
                onIonChange={(event: any) => this.onChangeValue(event.target.value)}/>
            </IonItem>
            {type === 'password' && (
              <IonItem>
                <IonLabel position="stacked">确认密码</IonLabel>
                <IonInput
                  placeholder={'确认密码'}
                  type={'password'}
                  value={valueConfirm}
                  onIonChange={(event: any) => this.onChangeConfirmValue(event.target.value)}/>
              </IonItem>
            )}
          </IonList>
        </IonContent>
        <IonButton color='primary' onClick={() => this.onSaveData()}>确定</IonButton>
      </IonModal>
    )
  }
}

export default UserSettingModal;
