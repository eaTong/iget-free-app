/**
 * Created by eatong on 2020/1/16.
 */

import React, {Component} from "react";
import {
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonContent,
  IonBackButton,
  IonButtons, withIonLifeCycle, IonInput, IonButton, IonList, IonItem, IonLabel, IonTextarea,  IonDatetime
} from "@ionic/react";
import {FormPageProps} from "../../utils/PagePropsInterface";
import formWrapper from "../../utils/formWrapper";
import ajax from "../../utils/ajax";

interface AddObjectiveState {

}

class AddObjective extends Component<FormPageProps, AddObjectiveState> {
  state = {};

  componentDidMount(): void {

  }

  async onSaveData() {
    const values = this.props.form.getFieldsValue();
    await ajax({url: '/api/objective/add', data: {...values}});
    this.props.history.goBack();
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
            <IonTitle>创建小目标</IonTitle>
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
              <IonLabel>目标名称</IonLabel>
              {form.getFieldDecorator('name')(
                <IonInput required placeholder={'请输入目标名称'}/>
              )}
            </IonItem>
            <IonItem>
              <IonLabel>目标描述</IonLabel>
              {form.getFieldDecorator('description')(
                <IonTextarea
                  rows={3}
                  required
                  autoGrow
                  placeholder={'目标描述。'}
                />
              )}
            </IonItem>
            <IonItem>
              <IonLabel>计划开始日期</IonLabel>
              {form.getFieldDecorator('planStartDate', {trigger: 'onIonChange'})(
                <IonDatetime displayFormat="YYYY-MM-DD" placeholder={'计划开始日期'}/>
              )}
            </IonItem>
            <IonItem>
              <IonLabel>计划结束日期</IonLabel>
              {form.getFieldDecorator('planEndDate')(
                <IonDatetime displayFormat="YYYY-MM-DD" placeholder={'计划结束日期'}/>
              )}
            </IonItem>
          </IonList>

        </IonContent>

      </IonPage>
    )
  }
}

export default withIonLifeCycle(formWrapper(AddObjective));
