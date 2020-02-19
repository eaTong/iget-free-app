/**
 * Created by eatong on 2020/1/16.
 */

import React, {Component} from "react";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToggle,
  IonToolbar,
  withIonLifeCycle
} from "@ionic/react";
import formWrapper from "../../utils/formWrapper";
import {RouteComponentProps} from "react-router";
import {FormWrapperProps} from "../../utils/types";
import {Calendar} from '@ionic-native/calendar';
import ajax from "../../utils/ajax";
import BackButton from "../../components/BackButton";

interface AddObjectiveProps extends RouteComponentProps<{
  id?: string,
  operation?: string,
}> {
  app: any,
  form: FormWrapperProps,
}

class AddObjective extends Component<AddObjectiveProps, any> {
  state = {};

  componentDidMount(): void {

  }

  async onSaveData() {
    const {match, history, form} = this.props;
    const values = form.getFieldsValue();
    if (match.params.id) {
      if (match.params.operation === 'edit') {
        values.id = match.params.id;
      } else {
        values.parentObjectiveId = match.params.id;
      }
    }
    if (values.addToEvent) {
      const options = await Calendar.getCalendarOptions();
      options.calendarName = '得寸进尺';
      values.calendarId = await Calendar.createEventWithOptions(values.name, values.description, '得寸进尺', new Date(values.planStartDate || ''), new Date(values.planEndDate || ''), options)
    }
    await ajax({url: '/api/objective/add', data: {...values}});

    history.goBack();
  }


  render() {
    const {form} = this.props;
    const values = form.getFieldsValue();
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <BackButton history={this.props.history}/>
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
                <IonDatetime displayFormat="YYYY-MM-DD" placeholder={'计划开始日期'} max={values.planEndDate}/>
              )}
            </IonItem>
            <IonItem>
              <IonLabel>计划结束日期</IonLabel>
              {form.getFieldDecorator('planEndDate')(
                <IonDatetime displayFormat="YYYY-MM-DD" placeholder={'计划结束日期'} min={values.planStartDate}
                             max={(new Date().getFullYear() +2) + ''}/>
              )}
            </IonItem>
            <IonItem>
              <IonLabel>添加到日历</IonLabel>
              {form.getFieldDecorator('addToEvent', {valuePropName: 'checked'})(
                <IonToggle disabled={!values.planStartDate || !values.planEndDate}/>
              )}
            </IonItem>
          </IonList>

        </IonContent>

      </IonPage>
    )
  }
}

export default withIonLifeCycle(formWrapper(AddObjective));
