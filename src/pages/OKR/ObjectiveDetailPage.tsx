/**
 * Created by eatong on 2020/1/3.
 */

import React, {Component} from "react";
import {
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonContent,
  IonBackButton,
  IonButtons,
  withIonLifeCycle,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonList,
  IonLabel,
  IonListHeader,
} from "@ionic/react";
import ajax from "../../utils/ajax";
import {RouteComponentProps} from "react-router";
import {inject, observer} from "mobx-react";
import {Plugins} from '@capacitor/core';

const {Modals} = Plugins;

interface ObjectiveDetailPageProps extends RouteComponentProps<{
  id: string,
}> {
  app: any,
}

interface ObjectiveDetailPageState {
  objectiveDetail: {
  }
}

@inject('app') @observer
class ObjectiveDetailPage extends Component<ObjectiveDetailPageProps, ObjectiveDetailPageState> {
  state = {
    objectiveDetail: {
      name: '',
      description: '',
      id: '',
    },
  };

  ionViewDidEnter() {
    this.getObjectiveDetail()
  }


  async getObjectiveDetail() {
    const objectiveDetail = await ajax({url: '/api/objective/detail', data: {id: this.props.match.params.id}});
    this.setState({
      objectiveDetail
    });
  }

  async quitObjective() {
    let {value} = await Modals.confirm({
      title: '操作确认',
      message: '确定要退出团队吗?'
    });
    if (!value) {
      return
    }
    await ajax({
      url: '/api/objective/quit',
      data: {objectiveId: this.props.match.params.id}
    });
    this.getObjectiveDetail();
  }

  async deleteObjective() {
    let {value} = await Modals.confirm({
      title: '操作确认',
      message: '解散后将不可恢复，确认要解散团队吗?'
    });
    if (!value) {
      return
    }
    await ajax({
      url: '/api/objective/delete',
      data: {ids: [this.props.match.params.id]}
    });
    this.props.history.goBack();
  }

  render() {
    const {objectiveDetail} = this.state;
    return (
      <IonPage className={'objective-detail-page'}>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton/>
            </IonButtons>
            <IonTitle>{objectiveDetail.name || ''}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>{objectiveDetail.name}</IonCardTitle>
              <IonCardSubtitle>{objectiveDetail.description}</IonCardSubtitle>
            </IonCardHeader>
          </IonCard>
          <IonList>
            <IonListHeader>
              <IonLabel>团队成员</IonLabel>
            </IonListHeader>
          </IonList>
        </IonContent>
      </IonPage>
    )
  }
}

export default withIonLifeCycle(ObjectiveDetailPage);
