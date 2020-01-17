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
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent, IonNote, IonProgressBar,
} from "@ionic/react";
import ajax from "../../utils/ajax";
import {RouteComponentProps} from "react-router";
import {inject, observer} from "mobx-react";

interface ObjectiveDetailPageProps extends RouteComponentProps<{
  id: string,
}> {
  app: any,
}

interface ObjectiveDetailPageState {
  objectiveDetail: {
    responsibleUser: any,
    publishUser: any,
  }
}

@inject('app') @observer
class ObjectiveDetailPage extends Component<ObjectiveDetailPageProps, ObjectiveDetailPageState> {
  state = {
    objectiveDetail: {
      name: '',
      description: '',
      id: '',
      reward: '',
      rewarded: false,
      progress: 0,
      responsibleUser: {name: ''},
      publishUser: {name: ''},
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
          <IonProgressBar value={objectiveDetail.progress / 100}/>
          <IonCardHeader>
            <IonCardTitle>{objectiveDetail.name}</IonCardTitle>
            <IonCardSubtitle>{objectiveDetail.description}</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <div className="et-row large">
              <span className={'label'}>发布人</span>
              <span className="value">{objectiveDetail.publishUser.name}</span>
            </div>
            <div className="et-row large">
              <span className={'label'}>负责人</span>
              <span className="value">{objectiveDetail.responsibleUser.name}</span>
            </div>
            {objectiveDetail.reward && (
              <div className="et-row large">
                <span className={'label'}>完成奖励</span>
                <span className="value">{objectiveDetail.reward}</span>
              </div>

            )}
            {objectiveDetail.reward && (
              <div className="et-row large">
                <span className={'label'}>奖励已发放</span>
                <IonNote color={objectiveDetail.rewarded ? 'success' : 'danger'} slot={'end'}>
                  {objectiveDetail.rewarded ? '已发放' : '未发放'}
                </IonNote>
              </div>
            )}

          </IonCardContent>

        </IonContent>
      </IonPage>
    )
  }
}

export default withIonLifeCycle(ObjectiveDetailPage);
