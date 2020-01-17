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
  IonCardContent,
  IonNote,
  IonProgressBar,
  IonFab,
  IonFabButton,
  IonIcon,
  IonFabList,
  IonList,
  IonItemDivider,
  IonLabel,
} from "@ionic/react";
import ajax from "../../utils/ajax";
import {RouteComponentProps} from "react-router";
import {inject, observer} from "mobx-react";
import {add} from "ionicons/icons";
import {getTimeFormat} from "../../utils/utils";
import PickImage from "../../components/PickImage";
import ObjectiveList from "../../components/cards/ObjectiveList";

interface ObjectiveDetailPageProps extends RouteComponentProps<{
  id: string,
}> {
  app: any,
}

interface ObjectiveDetailPageState {
  objectiveDetail: {
    responsibleUser: any,
    publishUser: any,
    records: Array<any>,
    childrenObjectives: Array<any>,
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
    const {history, match} = this.props;
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
            <div className="et-row large">
              <span className={'label'}>计划开始日期</span>
              <span className="value">{objectiveDetail.planStartDate}</span>
            </div>
            <div className="et-row large">
              <span className={'label'}>计划结束日期</span>
              <span className="value">{objectiveDetail.planEndDate}</span>
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

          <IonList>
            <IonItemDivider>
              <IonLabel>KR</IonLabel>
            </IonItemDivider>
            <ObjectiveList objectiveList={objectiveDetail.childrenObjectives} history={history}/>
          </IonList>
          <IonList>
            <IonItemDivider>
              <IonLabel>计划跟踪记录</IonLabel>
            </IonItemDivider>
            <div className="record-list">
              {objectiveDetail.records.map((record: any) => (

                <div className="record-detail" key={record.id}>
                  <div className="time">{getTimeFormat(record.createdAt)}</div>
                  {record.title && (
                    <h5 className="title">{record.title}</h5>
                  )}
                  <div className="content">
                    <span className="operator">{record.operator.name}</span>
                    {record.content}
                  </div>
                  <PickImage value={record.images || []}/>
                </div>
              ))}
            </div>
          </IonList>

          <IonFab vertical="bottom" horizontal="end" slot="fixed">
            <IonFabButton>
              <IonIcon icon={add}/>
            </IonFabButton>
            <IonFabList side="top">
              <IonFabButton color={'warning'} onClick={() => history.push(`/okr/record/${match.params.id}`)}>
                记录
              </IonFabButton>
              <IonFabButton color={'primary'} onClick={() => history.push(`/okr/add/${match.params.id}`)}>
                KR
              </IonFabButton>
            </IonFabList>
          </IonFab>

        </IonContent>
      </IonPage>
    )
  }
}

export default withIonLifeCycle(ObjectiveDetailPage);
