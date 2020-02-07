import React, {Component} from "react";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonLabel,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
  withIonLifeCycle
} from "@ionic/react";
import {PagePropsInterface} from "../../utils/PagePropsInterface";
import ajax from "../../utils/ajax";
import Empty from "../../components/Empty";
import TeamList from "../../components/cards/TeamList";
import BackButton from "../../components/BackButton";

interface TeamPageState {
  teamStatus: string,
  teams: Array<any>,
  fetched: boolean,
  total: number,
  page: number
}

class TeamPage extends Component<PagePropsInterface, TeamPageState> {
  state = {
    teamStatus: '-1',
    teams: [],
    fetched: false,
    total: 0,
    page: 0
  };

  async ionViewDidEnter() {
    this.getTeams()
  }

  createTeam() {
    this.props.history.push('/team/add')
  }

  async onIonInfinite(event: any) {
    const {page} = this.state;
    if ((page + 1) * 20 < this.state.total) {

      await this.getTeams(page + 1);
      this.setState({page: page + 1});
    }
    event.target.complete();
  }

  async getTeams(page: number = 0) {
    const {list, total} = await ajax({
      url: '/api/team/get',
      data: {pageIndex: page, status: parseInt(this.state.teamStatus)}
    });
    this.setState({fetched: true, teams: page === 0 ? list : [...this.state.teams, ...list], total});
  }

  onChangeTeamStatus(teamStatus: any) {
    this.setState({teamStatus, page: 0}, () => this.getTeams())
  }

  render() {
    const {teamStatus, teams, fetched} = this.state;
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <BackButton history={this.props.history}/>
            </IonButtons>
            <IonTitle>我的团队</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => this.createTeam()}>创建团队</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonSegment onIonChange={e => this.onChangeTeamStatus(e.detail.value)} value={teamStatus}>
            <IonSegmentButton value="-1">
              <IonLabel>全部</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="1">
              <IonLabel>我创建的</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="0">
              <IonLabel>我加入的</IonLabel>
            </IonSegmentButton>
          </IonSegment>
          {teams.length === 0 && fetched && (
            <Empty title={'您还没有加入任何团队哦'}>
              <IonButton onClick={() => this.createTeam()}>立刻创建</IonButton>
            </Empty>
          )}
          <TeamList history={this.props.history} teamList={teams}/>
          <IonInfiniteScroll threshold="100px" onIonInfinite={(event) => this.onIonInfinite(event)}>
            <IonInfiniteScrollContent loadingText={'正在加载下一页'}/>
          </IonInfiniteScroll>

        </IonContent>

      </IonPage>
    )
  }
}

export default withIonLifeCycle(TeamPage);
