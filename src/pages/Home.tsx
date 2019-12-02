import {
  IonContent, IonGrid,
  IonLoading,
  IonPage,
  IonRow,
  IonCol, IonListHeader, IonList, IonLabel, IonItem
} from '@ionic/react';
import React, {Component} from 'react';
import {PagePropsInterface} from "../utils/PagePropsInterface";
import {CACHED_LOGIN_USER, HAS_LOGIN} from "../utils/constants";
import ajax from '../utils/ajax';
import {bookMarkStatus} from '../utils/enums';
import BookListItem from "../components/BookListItem";

class Home extends Component<PagePropsInterface, {}> {
  state = {
    loading: false,
    recentlyReadingBooks: [],
    recentlyReadingCount: 0,
    wantedBooks: [],
    wantedCount: 0,
    bookStatics: {
      wanted: {count: 0, covers: []},
      reading: {count: 0, covers: []},
      read: {count: 0, covers: []},
    }
  };

  async componentDidMount() {
    const hasLogged = window.sessionStorage.getItem(HAS_LOGIN);
    if (hasLogged) {
      await this.getMyBookMark();
      return;
    }
    const loginUserSting = window.localStorage.getItem(CACHED_LOGIN_USER);
    if (loginUserSting) {
      try {
        const loggedUser = JSON.parse(loginUserSting);
        await this.toggleLoading(true);
        await ajax({url: '/api/user/login', data: loggedUser});
        this.toggleLoading(false);
        await this.getMyBookMark();
      } catch (e) {
        this.redirectLogin();
      }
    } else {
      this.redirectLogin();
    }
  }

  async getMyBookMark() {
    const bookStatics = await ajax({url: '/api/bookMark/statics'});
    this.setState({bookStatics});
    this.recentlyReading();
    this.wanted();
  }

  async recentlyReading() {
    const {list, total} = await ajax({url: '/api/bookMark/get', data: {status: 2}});
    this.setState({recentlyReadingBooks: list, recentlyReadingCount: total});
  }

  async wanted() {
    const {list, total} = await ajax({url: '/api/bookMark/get', data: {status: 1}});
    this.setState({wantedBooks: list, wantedCount: total});
  }

  redirectLogin() {
    this.props.history.push('/login');
  }

  toggleLoading(loading: Boolean): void {
    this.setState({loading: loading})
  }

  renderRecentlyBooks() {
    return this.state.recentlyReadingBooks.map((item: any) => (
     <BookListItem book={item} key={item.id}/>
    ))
  }

  renderWantedBooks() {
    return this.state.wantedBooks.map((item: any) => (
     <BookListItem book={item} key={item.id}/>
    ))
  }

  renderStatusStatics(status: number) {
    let statics = {count: 0, covers: []};
    const {bookStatics} = this.state;
    switch (status) {
      case 1:
        statics = bookStatics.wanted || statics;
        break;
      case 2:
        statics = bookStatics.reading || statics;
        break;
      case 3:
        statics = bookStatics.read || statics;
        break;
    }
    return (
      <IonCol className={'status-item'}>
        <div className="covers">
          {statics.covers.map(img => (
            <img className={'cover-item'} key={img} src={img} alt=""/>
          ))}
        </div>
        <div className="footer">
          <span className="label">{bookMarkStatus[status]}</span>
          <span className="num">{statics.count}</span>
        </div>
      </IonCol>
    )
  }

  renderStatics() {
    return (
      <IonGrid>
        <IonRow>
          {this.renderStatusStatics(1)}
          {this.renderStatusStatics(2)}
          {this.renderStatusStatics(3)}
        </IonRow>
      </IonGrid>
    )
  }

  render() {
    const {loading, recentlyReadingCount, wantedCount} = this.state;
    return (
      <IonPage className={'home-page'}>
        <IonContent>
          <IonLoading
            isOpen={loading}
            onDidDismiss={() => this.toggleLoading(false)}
            message={'自动登录中...'}
            duration={5000}
          />
          {this.renderStatics()}
          <IonList>
            <IonListHeader>
              <IonLabel><h2>{`最近在读(${recentlyReadingCount})`}</h2></IonLabel>
            </IonListHeader>
            {this.renderRecentlyBooks()}
          </IonList>
          <IonList>
            <IonListHeader>
              <IonLabel><h2>{`想读(${recentlyReadingCount})`}</h2></IonLabel>
            </IonListHeader>
            {this.renderWantedBooks()}
          </IonList>
        </IonContent>
      </IonPage>
    );
  }
}

export default Home;
