import React, {Component} from "react";
import {
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonContent,
  IonButtons,
  IonBackButton,
  IonButton,
  withIonLifeCycle,
  IonInfiniteScroll,
  IonInfiniteScrollContent, IonSearchbar, IonIcon, IonFab, IonFabButton
} from "@ionic/react";
import {PagePropsInterface} from "../../utils/PagePropsInterface";
import Empty from "../../components/Empty";
import ajax from "../../utils/ajax";
import ObjectiveList from "../../components/cards/ObjectiveList";
import {add, search} from "ionicons/icons";
import AdvancedSearchModal from "./AdvancedSearchModal";

interface ObjectivePageState {
  objectiveStatus: string,
  objectives: Array<any>,
  fetched: boolean,
  total: number,
  page: number,
  filter: any,
  showModal: boolean
}

class OKRHomePage extends Component<PagePropsInterface, ObjectivePageState> {
  state = {
    objectiveStatus: '-1',
    objectives: [],
    fetched: false,
    total: 0,
    page: 0,
    showModal: false,
    filter: {
      keywords: ''
    }
  };

  async ionViewDidEnter() {
    this.setState({page:0},()=>this.getObjectives());
  }

  createObjective() {
    this.props.history.push('/okr/add')
  }

  toggleModal(showModal: boolean) {
    this.setState({showModal})
  }

  onAdvancedSearch(filter: any) {
    this.setState({filter: {...this.state.filter, ...filter}, showModal: false}, () => this.getObjectives(0));
  }

  async onIonInfinite(event: any) {
    const {page} = this.state;
    if ((page + 1) * 20 < this.state.total) {
      await this.getObjectives(page + 1);
      this.setState({page: page + 1});
    }
    event.target.complete();
  }

  async getObjectives(page: number = 0) {
    const {list, total} = await ajax({
      url: '/api/objective/get',
      data: {pageIndex: page, ...this.state.filter}
    });
    this.setState({fetched: true, objectives: page === 0 ? list : [...this.state.objectives, ...list], total});
  }

  render() {
    const {objectives, fetched, showModal, filter} = this.state;
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton/>
            </IonButtons>
            <IonTitle>我的团队</IonTitle>
            <IonButtons slot="end">
              <IonButton slot={'end'} fill={'clear'} onClick={() => this.toggleModal(true)}>
                <IonIcon slot="icon-only" icon={search}/>
              </IonButton>
            </IonButtons>
          </IonToolbar>
          <IonSearchbar
            placeholder={'输入名称搜索'}
            animated
            value={filter.keywords}
            onIonChange={(event: any) => this.onAdvancedSearch({keywords: event.target.value})}
          />
        </IonHeader>
        <IonContent>
          {objectives.length === 0 && fetched && (
            <Empty title={'还没有定计划？'}>
              <IonButton onClick={() => this.createObjective()}>立刻定下一个小目标</IonButton>
            </Empty>
          )}
          <ObjectiveList history={this.props.history} objectiveList={objectives}/>
          <IonInfiniteScroll threshold="100px" onIonInfinite={(event) => this.onIonInfinite(event)}>
            <IonInfiniteScrollContent loadingText={'正在加载下一页'}/>
          </IonInfiniteScroll>
        </IonContent>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => this.createObjective()}>
            <IonIcon icon={add}/>
          </IonFabButton>
        </IonFab>
        {showModal && (
          <AdvancedSearchModal
            filter={filter}
            onDismiss={() => this.toggleModal(false)}
            onSubmit={(data: any) => this.onAdvancedSearch(data)}/>
        )}
      </IonPage>
    )
  }
}

export default withIonLifeCycle(OKRHomePage);
