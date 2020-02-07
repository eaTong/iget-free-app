/**
 * Created by eatong on 2020/1/3.
 */

import React, {Component} from "react";
import {
  IonButton,
  IonButtons,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
  IonHeader,
  IonIcon,
  IonItemDivider,
  IonLabel,
  IonList,
  IonNote,
  IonPage,
  IonProgressBar,
  IonTitle,
  IonToolbar,
  withIonLifeCycle,
} from "@ionic/react";
import ajax from "../../utils/ajax";
import {RouteComponentProps} from "react-router";
import {inject, observer} from "mobx-react";
import {add} from "ionicons/icons";
import {getTimeFormat} from "../../utils/utils";
import PickImage from "../../components/PickImage";
import ObjectiveListItem from "./ObjectiveListItem";
import ChangeRewardModal from "./ChangeRewardModal";
import {Modals} from "@capacitor/core";
import TimeLime from "../../components/TimeLime";
import TimeLineItem from "../../components/TimeLineItem";
import Tips from "../../components/Tips";
import BackButton from "../../components/BackButton";

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
  },
  showRewardModal: boolean
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
      responsibleUser: {name: '', id: 0},
      publishUser: {name: ''},
      records: [],
      childrenObjectives: [],
    },
    showRewardModal: false,
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

  async updateReward(reward: String) {
    await ajax({url: '/api/objective/update', data: {reward, id: this.props.match.params.id}});
    this.toggleRewardModal(false);
    this.getObjectiveDetail();
  }

  async sendReward() {
    let {value} = await Modals.confirm({
      title: '操作确认',
      message: '本次操作只是更改标记，是否确认?'
    });
    if (!value) {
      return
    }
    await ajax({url: '/api/objective/update', data: {rewarded: true, id: this.props.match.params.id}});
    this.getObjectiveDetail();
  }

  toggleRewardModal(showRewardModal: boolean) {
    this.setState({showRewardModal})
  }

  render() {
    const {history, match, app} = this.props;
    const {objectiveDetail, showRewardModal} = this.state;
    const selfUse = objectiveDetail.responsibleUser.id === app.loginUser.id;
    return (
      <IonPage className={'objective-detail-page'}>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <BackButton history={this.props.history}/>
            </IonButtons>
            <IonTitle>{objectiveDetail.name || ''}</IonTitle>
          </IonToolbar>
          <IonProgressBar value={objectiveDetail.progress / 100}/>
        </IonHeader>
        <IonContent>
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
              <span className={'label'}>计划日期</span>
              <span className="value">
                {`${objectiveDetail.planStartDate || ''}~${objectiveDetail.planEndDate || ''}`}
              </span>
            </div>
            <div className="et-row large">
              <span className={'label'}>完成奖励</span>
              {!objectiveDetail.reward && (
                <span className="value">
                  <IonButton
                    fill={'clear'}
                    size={'small'}
                    onClick={() => this.toggleRewardModal(true)}>没有设置奖励，点击设置</IonButton>
                </span>
              )}
              {objectiveDetail.reward && (
                <>
                  <span className="value">
                  {objectiveDetail.reward}
                </span>
                  <IonNote color={'primary'} onClick={() => this.toggleRewardModal(true)}>修改奖励</IonNote>
                </>
              )}
            </div>
            {objectiveDetail.reward && objectiveDetail.progress === 100 && (
              <Tips>
                <>
                  <p>{`太棒了，计划完成！给「${selfUse?'自己':objectiveDetail.responsibleUser.name}」${objectiveDetail.rewarded?'的奖励也到手了':'一个奖励吧'}！`}</p>
                  {!objectiveDetail.rewarded && (
                    <IonButton size='small' onClick={() => this.sendReward()}>发放奖励</IonButton>)}
                </>
              </Tips>
            )}

          </IonCardContent>

          <IonList>
            <IonItemDivider>
              <IonLabel>KR</IonLabel>
            </IonItemDivider>
            {objectiveDetail.childrenObjectives.map((objective: any, index: number) => (
              <ObjectiveListItem objective={objective} key={objective.id} history={history} renderThumbnail={() => (
                <div slot={'start'} className={'objective-list-badge'}>
                  <small>KR</small><br/>
                  <strong>{index + 1}</strong>
                </div>
              )}/>
            ))}
          </IonList>
          <IonList>
            <IonItemDivider>
              <IonLabel>计划跟踪记录</IonLabel>
            </IonItemDivider>
            <div className="record-list">
              <TimeLime>
                {objectiveDetail.records.map((record: any) => {
                  const diff = (record.currentProgress || 0) - (record.originProgress || 0);
                  return (
                    <TimeLineItem key={record.id} title={getTimeFormat(record.createdAt)}>
                      <div className="record-detail">
                        {record.title && (
                          <h5 className="title">{record.title}</h5>
                        )}
                        <div className="content">
                          <span className="operator">{record.operator.name}</span>
                          {record.content}
                        </div>
                        {diff !== 0 && (
                          <div className={'progress-info'}>
                            <span>本次完成计划</span>
                            <IonNote color={'primary'}>{`${diff}%`}</IonNote>
                            <span>，达到</span>
                            <IonNote color={'danger'}>{`${record.currentProgress}%`}</IonNote>
                          </div>

                        )}
                        <PickImage value={record.images || []}/>
                      </div>
                    </TimeLineItem>

                  )
                })}
              </TimeLime>

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
        {showRewardModal && (
          <ChangeRewardModal
            reward={objectiveDetail.reward}
            onDismiss={() => this.toggleRewardModal(false)}
            onSubmit={(reword: string) => this.updateReward(reword)}/>
        )}
      </IonPage>
    )
  }
}

export default withIonLifeCycle(ObjectiveDetailPage);
