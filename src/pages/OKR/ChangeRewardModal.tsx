/**
 * Created by eatong on 2020/1/25.
 */

import React, {Component} from 'react';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonModal, IonTextarea,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import formWrapper from "../../utils/formWrapper";
import {FormWrapperProps} from "../../utils/types";

interface ChangeRewardModalProps {
  onDismiss: Function,
  onSubmit: Function,
  title?: string,
  reward?: string,
  form: FormWrapperProps
}

interface ChangeRewardModalState {

}

class ChangeRewardModal extends Component<ChangeRewardModalProps, ChangeRewardModalState> {
  state = {};

  componentDidMount(): void {

    const {reward, form} = this.props;
    if (reward) {
      form.setFieldsValue({reward});
    }
  }

  onSaveData() {
    const {onSubmit, form} = this.props;

    onSubmit(form.getFieldsValue().reward);
  }

  render() {
    const {onDismiss, form} = this.props;
    return (
      <IonModal isOpen onDidDismiss={() => onDismiss()}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>{`添加完成奖励`}</IonTitle>
            <IonButtons slot="end">
              <IonButton color='primary' onClick={() => onDismiss()}>取消</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonItem>
            <IonLabel position={'fixed'}>完成奖励</IonLabel>

            {form.getFieldDecorator('reward')(
              <IonTextarea
                rows={4}
                required
                autoGrow
                placeholder={'完成奖励。'}
              />
            )}

          </IonItem>
        </IonContent>
        <IonButton color='primary' onClick={() => this.onSaveData()}>确定</IonButton>
      </IonModal>
    )
  }
}

export default formWrapper(ChangeRewardModal);
