/**
 * Created by eatong on 2020/1/17.
 */

import React, {Component} from "react";
import {
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonContent,
  IonBackButton,
  IonButtons, withIonLifeCycle, IonInput, IonButton, IonList, IonItem, IonLabel, IonTextarea, IonRange
} from "@ionic/react";
import formWrapper from "../../utils/formWrapper";
import ajax from "../../utils/ajax";
import PickImage from "../../components/PickImage";
import {RouteComponentProps} from "react-router";
import {FormWrapperProps} from "../../utils/types";

interface AddObjectiveRecordProps extends RouteComponentProps<{
  id: string,
}> {
  app: any,
  form: FormWrapperProps,
}


class AddObjectiveRecord extends Component<AddObjectiveRecordProps, { objectiveDetail: any }> {
  state = {
    objectiveDetail: {
      name: '',
      description: '',
      id: '',
      reward: '',
      planStartDate: '',
      planEndDate: '',
      rewarded: false,
      progress: 0,
      responsibleUser: {name: ''},
      publishUser: {name: ''},
      records: [],
      childrenObjectives: [],
    },
  };

  componentDidMount() {
    this.getObjectiveDetail()
  }


  async getObjectiveDetail() {
    const objectiveDetail = await ajax({url: '/api/objective/detail', data: {id: this.props.match.params.id}});
    this.props.form.setFieldsValue({progress: objectiveDetail.progress || 0});
    this.setState({
      objectiveDetail
    });
  }

  async onSaveData() {
    const {match} = this.props;
    const values = this.props.form.getFieldsValue();
    await ajax({url: '/api/objective/record', data: {...values, objectiveId: match.params.id}});
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
              <IonLabel position={'fixed'}>标题</IonLabel>
              {form.getFieldDecorator('title')(
                <IonInput required placeholder={'记录标题'}/>
              )}
            </IonItem>
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
          <IonList>
            {form.getFieldDecorator('progress')(
              <IonRange min={0} max={100} color="secondary">
                <IonLabel slot="start">完成进度</IonLabel>
                <IonLabel slot="end">{`${form.getFieldsValue().progress || 0}%`}</IonLabel>
              </IonRange>
            )}

          </IonList>

        </IonContent>

      </IonPage>
    )
  }
}

export default withIonLifeCycle(formWrapper(AddObjectiveRecord));
