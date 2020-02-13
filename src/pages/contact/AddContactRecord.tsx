/**
 * Created by eatong on 2020/1/17.
 */

import React, {Component} from "react";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToolbar,
  withIonLifeCycle
} from "@ionic/react";
import formWrapper from "../../utils/formWrapper";
import ajax from "../../utils/ajax";
import PickImage from "../../components/PickImage";
import {RouteComponentProps} from "react-router";
import {FormWrapperProps} from "../../utils/types";
import BackButton from "../../components/BackButton";

interface AddContactRecordProps extends RouteComponentProps<{
  id: string,
}> {
  app: any,
  form: FormWrapperProps,
}


class AddContactRecord extends Component<AddContactRecordProps, { contactDetail: any }> {

  async onSaveData() {
    const {match} = this.props;
    const values = this.props.form.getFieldsValue();
    await ajax({url: '/api/contact/record', data: {...values, contactId: match.params.id}});
    this.props.history.goBack();
  }

  render() {
    const {form} = this.props;
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <BackButton history={this.props.history}/>
            </IonButtons>
            <IonTitle>目标记录</IonTitle>
            <IonButtons slot='end'>
              <IonButton onClick={() => this.onSaveData()}>
                保存
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonItem>
              <IonLabel position={'fixed'}>正文</IonLabel>
              {form.getFieldDecorator('content')(
                <IonTextarea required placeholder={'记录内容'}/>
              )}
            </IonItem>
            <IonItem>
              <IonLabel position={'fixed'}>图片</IonLabel>
              {form.getFieldDecorator('images')(
                <PickImage/>
              )}
            </IonItem>
          </IonList>


        </IonContent>

      </IonPage>
    )
  }
}

export default withIonLifeCycle(formWrapper(AddContactRecord));
