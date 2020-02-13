/**
 * Created by eatong on 2020/2/13.
 */

import React, {Component} from "react";
import {
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonContent,
  IonButtons, withIonLifeCycle, IonButton, IonList, IonItem, IonLabel
} from "@ionic/react";
import {FormPageProps} from "../../utils/PagePropsInterface";
import formWrapper from "../../utils/formWrapper";
import ajax from "../../utils/ajax";
import AsyncSelect from "../../components/AsyncSelect";
import BackButton from "../../components/BackButton";

interface AddRelationState {

}

class AddRelation extends Component<FormPageProps, AddRelationState> {
  state = {};

  componentDidMount(): void {

  }

  async onSaveData() {
    const values = this.props.form.getFieldsValue();
    console.log(values);
    await ajax({url: '/api/contact/addRelation', data: {values}});
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
            <IonTitle>添加一个小目标</IonTitle>
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
              <IonLabel position={'fixed'}>关系</IonLabel>
              {form.getFieldDecorator('relation', {trigger: 'onIonChange'})(
                <AsyncSelect placeholder={'选择关系'} api={'/api/tag/get'}/>
              )}
            </IonItem>
            <IonItem>
              <IonLabel position={'fixed'}>联系人</IonLabel>
              {form.getFieldDecorator('contact', {trigger: 'onIonChange'})(
                <AsyncSelect placeholder={'选择联系人'} api={'/api/contact/get'}/>
              )}
            </IonItem>
          </IonList>

        </IonContent>

      </IonPage>
    )
  }
}

export default withIonLifeCycle(formWrapper(AddRelation));
