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
  IonListHeader, IonNote, IonItemSliding, IonItemOptions, IonItemOption, IonIcon,
} from "@ionic/react";
import ajax from "../../utils/ajax";
import {RouteComponentProps} from "react-router";
import QRCode from 'qrcode.react';
import { trash } from "ionicons/icons";

interface TeamDetailPageProps extends RouteComponentProps<{
  id: string;
}> {
}

interface TeamDetailPageState {
  teamDetail: {
    users: Array<any>
  }
}

class TeamDetailPage extends Component<TeamDetailPageProps, TeamDetailPageState> {
  state = {
    teamDetail: {
      name: '',
      description: '',
      id: '',
      users: []
    }
  };

  ionViewDidEnter() {
    this.getTeamDetail()
  }

  async getTeamDetail() {
    const teamDetail = await ajax({url: '/api/team/detail', data: {id: this.props.match.params.id}});
    this.setState({teamDetail});
  }


  render() {
    const {teamDetail} = this.state;
    return (
      <IonPage>
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
              <IonItem>
                <QRCode value={`joinTeam:${teamDetail.id}`} style={{width: '100%', height: 'auto'}}/>
              </IonItem>

              <IonList>
                <IonListHeader>
                  <IonLabel>团队成员</IonLabel>
                </IonListHeader>
                {teamDetail.users.map((user: any) => {
                  const isOwner = user.teamUser.isOwner;
                  return (
                    <IonItemSliding>
                      <IonItem>
                        <IonLabel>
                          {user.name}
                        </IonLabel>
                        <IonNote slot={'end'} color={isOwner ? 'success' : 'default'}>
                          {isOwner ? '管理员' : '普通成员'}
                        </IonNote>

                      </IonItem>
                      {isOwner && (
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

            </IonCardContent>
          </IonCard>
        </IonContent>
      </IonPage>
    )
  }
}

export default withIonLifeCycle(TeamDetailPage);
