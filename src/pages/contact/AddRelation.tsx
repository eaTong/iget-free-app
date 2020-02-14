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
import formWrapper from "../../utils/formWrapper";
import ajax from "../../utils/ajax";
import AsyncSelect from "../../components/AsyncSelect";
import BackButton from "../../components/BackButton";
import {RouteComponentProps} from "react-router";
import {FormWrapperProps} from "../../utils/types";

interface AddContactRelationProps extends RouteComponentProps<{
  id: string,
}> {
  app: any,
  form: FormWrapperProps,
}

class AddRelation extends Component<AddContactRelationProps, {}> {
  state = {};

  componentDidMount(): void {

  }

  async onSaveData() {
    const values = this.props.form.getFieldsValue();
    await ajax({url: '/api/contact/addRelation', data: {...values, contactId: this.props.match.params.id}});
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
                <AsyncSelect placeholder={'选择关系'} api={'/api/relation/get'} resultResolve={relationDataResolve}/>
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

function relationDataResolve(data: any, keywords: string) {
  if (!keywords || data.list.find((relation: any) => relation.name === keywords)) {
    return data.list;
  }
  return [{id: `temp~${keywords}`, name: keywords, ...data.list}]
}

export default withIonLifeCycle(formWrapper(AddRelation));
