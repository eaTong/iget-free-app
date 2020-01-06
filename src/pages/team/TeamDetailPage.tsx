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
  IonButtons, withIonLifeCycle
} from "@ionic/react";
import ajax from "../../utils/ajax";
import {RouteComponentProps} from "react-router";

interface TeamDetailPageProps extends RouteComponentProps<{
  id: string;
}> {
}

interface TeamDetailPageState {
  teamDetail: any
}

class TeamDetailPage extends Component<TeamDetailPageProps, TeamDetailPageState> {
  state = {
    teamDetail: {
      name: ''
    }
  };

  ionViewDidEnter() {
    this.getTeamDetail()
  }

  async getTeamDetail() {
    const teamDetail = await ajax({url: '/api/team/detail', data: {id: this.props.match.params.id}})
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
          {JSON.stringify(teamDetail)}

        </IonContent>

      </IonPage>
    )
  }
}

export default withIonLifeCycle(TeamDetailPage);
