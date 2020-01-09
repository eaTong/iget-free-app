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
  IonCardContent,
  IonCardSubtitle,
  IonItem,
  IonList,
  IonLabel,
  IonListHeader, IonNote, IonItemSliding, IonItemOptions, IonItemOption, IonIcon, IonFooter, IonButton, IonInput,
} from "@ionic/react";
import ajax from "../../utils/ajax";
import {RouteComponentProps} from "react-router";
import QRCode from 'qrcode.react';
import {trash} from "ionicons/icons";
import {inject, observer} from "mobx-react";
import {Plugins} from '@capacitor/core';

const {Modals} = Plugins;

interface TeamDetailPageProps extends RouteComponentProps<{
  id: string,
}> {
  app: any,
}

interface TeamDetailPageState {
  teamDetail: {
    users: Array<any>
    creator: any,
  },
  insideTeam: boolean,
  joinPassword: string
}

@inject('app') @observer
class TeamDetailPage extends Component<TeamDetailPageProps, TeamDetailPageState> {
  state = {
    teamDetail: {
      name: '',
      description: '',
      id: '',
      needPassword: false,
      users: [],
      creator: {id: 0, name: ''}
    },
    insideTeam: true,
    joinPassword: ''
  };

  ionViewDidEnter() {
    this.getTeamDetail()
  }

  async joinTeam() {
    await ajax({
      url: '/api/team/join',
      data: {password: this.state.joinPassword, teamId: this.props.match.params.id}
    });
    this.getTeamDetail();
  }

  async getTeamDetail() {
    const teamDetail = await ajax({url: '/api/team/detail', data: {id: this.props.match.params.id}});
    this.setState({
      teamDetail,
      insideTeam: !!teamDetail.users.find((user: any) => user.id === this.props.app.loginUser.id)
    });
  }

  async quitTeam() {
    let {value} = await Modals.confirm({
      title: '操作确认',
      message: '确定要退出团队吗?'
    });
    if (!value) {
      return
    }
    await ajax({
      url: '/api/team/quit',
      data: {teamId: this.props.match.params.id}
    });
    this.getTeamDetail();
  }

  async deleteTeam() {
    let {value} = await Modals.confirm({
      title: '操作确认',
      message: '解散后将不可恢复，确认要解散团队吗?'
    });
    if (!value) {
      return
    }
    await ajax({
      url: '/api/team/delete',
      data: {ids: [this.props.match.params.id]}
    });
    this.props.history.goBack();
  }

  onChangeJoinPassword(event: any) {
    this.setState({joinPassword: event.target.value})
  }


  render() {
    const {teamDetail, insideTeam} = this.state;
    const imOwner = teamDetail.creator.id === this.props.app.loginUser.id;
    return (
      <IonPage className={'team-detail-page'}>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton/>
            </IonButtons>
            <IonTitle>{teamDetail.name || ''}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>{teamDetail.name}</IonCardTitle>
              <IonCardSubtitle>{teamDetail.description}</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              <div className="et-row large">
                <span className={'label'}>加入是否需要密码</span>
                <IonNote slot={'end'} color={teamDetail.needPassword ? 'danger' : 'success'}>
                  {teamDetail.needPassword ? '需要' : '不需要'}
                </IonNote>
              </div>
              {insideTeam && (
                <div className="et-row align-top large">
                  <span className="label">推广二维码</span>
                  <div className="value">
                    <QRCode value={`joinTeam:${teamDetail.id}`} size={150}/>
                  </div>
                </div>
              )}
            </IonCardContent>
          </IonCard>
          <IonList>
            <IonListHeader>
              <IonLabel>团队成员</IonLabel>
            </IonListHeader>
            {teamDetail.users.map((user: any) => {
              const userIsOwner = user.teamUser.isOwner;
              return (
                <IonItemSliding key={user.id}>
                  <IonItem>
                    <IonLabel>
                      {user.name}
                    </IonLabel>
                    <IonNote slot={'end'} color={userIsOwner ? 'success' : 'default'}>
                      {userIsOwner ? '管理员' : '普通成员'}
                    </IonNote>
                  </IonItem>
                  {!userIsOwner && imOwner && (
                    <IonItemOptions side="end">
                      <IonItemOption color="danger">
                        <IonIcon slot="icon-only" icon={trash}/>
                      </IonItemOption>
                    </IonItemOptions>
                  )}
                </IonItemSliding>
              )
            })}
          </IonList>
          {imOwner && (

            <IonButton expand={'full'} color={'danger'} onClick={() => this.deleteTeam()}>解散团队</IonButton>
          )}
          {insideTeam && !imOwner && (
            <IonButton expand={'full'} color={'warning'} onClick={() => this.quitTeam()}>退出团队</IonButton>
          )}
        </IonContent>
        {!insideTeam && (
          <IonFooter className={`join-team-footer ${teamDetail.needPassword ? 'need-password' : 'free'}`}>
            {teamDetail.needPassword && (
              <IonInput placeholder={'该团队需要验证密码'} onIonChange={(event: any) => this.onChangeJoinPassword(event)}/>
            )}
            <IonButton expand={'full'} onClick={() => this.joinTeam()}>加入团队</IonButton>
          </IonFooter>
        )}
      </IonPage>
    )
  }
}

export default withIonLifeCycle(TeamDetailPage);
