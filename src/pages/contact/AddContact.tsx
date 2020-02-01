
/**
 * Created by eaTong on 2020-02-01 .
 * Description: auto generated in  2020-02-01
 */

import React, {Component} from "react";
import {
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonContent,
  IonBackButton,
  IonButtons, withIonLifeCycle, IonInput, IonButton, IonList, IonItem, IonLabel,
} from "@ionic/react";
import formWrapper from "../../utils/formWrapper";
import {RouteComponentProps} from "react-router";
import {FormWrapperProps} from "../../utils/types";
import ajax from "../../utils/ajax";

interface AddContactProps extends RouteComponentProps<{
  id?: string,
  operation?: string,
}> {
  app: any,
  form: FormWrapperProps,
}

class AddContact extends Component<AddContactProps, any> {
  async onSaveData() {
    const { history, form} = this.props;
    const values = form.getFieldsValue();
    await ajax({url: '/api/contact/add', data: {...values}});
    history.goBack();
  }

  render() {
    const {form} = this.props;
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton/>
            </IonButtons>
            <IonTitle>新建XXX</IonTitle>
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
              <IonLabel>名称</IonLabel>
              {form.getFieldDecorator('name')(
                <IonInput required placeholder={'请输入名称'}/>
              )}
            </IonItem>
          </IonList>
        </IonContent>
      </IonPage>
    )
  }
}
export default withIonLifeCycle(formWrapper(AddContact));
