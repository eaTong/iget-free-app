/**
 * Created by eatong on 2020/1/17.
 */

import React, {Component} from 'react';
import formWrapper from '../../utils/formWrapper';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
  IonInput, IonList, IonItem, IonLabel, IonRadioGroup, IonRadio,IonItemDivider
} from "@ionic/react";
import {FormWrapperProps} from "../../utils/types";

interface AdvancedSearchModalProps {
  onDismiss: Function,
  onSubmit: Function,
  filter: any,
  form: FormWrapperProps
}

class AdvancedSearchModal extends Component<AdvancedSearchModalProps, any> {
  state = {};

  componentDidMount(): void {
    this.props.form.setFieldsValue(this.props.filter);
  }

  onSaveData() {
    this.props.onSubmit(this.props.form.getFieldsValue());
  }

  render() {
    const {onDismiss, form} = this.props;
    return (
      <IonModal isOpen onDidDismiss={() => onDismiss()}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>高级搜索</IonTitle>
            <IonButtons slot="end">
              <IonButton color='primary' onClick={() => onDismiss()}>取消</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonItem>
              <IonLabel position='stacked'>关键字</IonLabel>
              {form.getFieldDecorator('keywords')(
                <IonInput placeholder={'输入名称搜索'}/>
              )}
            </IonItem>
            {form.getFieldDecorator('completeStatus')(
              <IonRadioGroup>
                <IonItemDivider>
                  <IonLabel>是否完成</IonLabel>
                </IonItemDivider>
                <IonItem>
                  <IonLabel>全部</IonLabel>
                  <IonRadio slot="end" value="-1" checked/>
                </IonItem>
                <IonItem>
                  <IonLabel>未开始</IonLabel>
                  <IonRadio slot="end" value="0"/>
                </IonItem>
                <IonItem>
                  <IonLabel>未完成</IonLabel>
                  <IonRadio slot="end" value="1"/>
                </IonItem>
                <IonItem>
                  <IonLabel>已完成</IonLabel>
                  <IonRadio slot="end" value="2"/>
                </IonItem>
              </IonRadioGroup>
            )}
            {form.getFieldDecorator('publishStatus')(
              <IonRadioGroup>
                <IonItemDivider>
                  <IonLabel>发布人</IonLabel>
                </IonItemDivider>
                <IonItem>
                  <IonLabel>全部</IonLabel>
                  <IonRadio slot="end" value="-1" checked/>
                </IonItem>
                <IonItem>
                  <IonLabel>我发布的</IonLabel>
                  <IonRadio slot="end" value="0"/>
                </IonItem>
                <IonItem>
                  <IonLabel>我负责的</IonLabel>
                  <IonRadio slot="end" value="1"/>
                </IonItem>
              </IonRadioGroup>
            )}

          </IonList>
        </IonContent>
        <IonButton color='primary' expand={'block'} onClick={() => this.onSaveData()}>确定</IonButton>
      </IonModal>
    )
  }
}

export default formWrapper(AdvancedSearchModal);
