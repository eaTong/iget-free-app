import {
  IonContent,
  IonGrid,
  IonLoading,
  IonPage,
  IonRow,
  IonCol,
  IonListHeader,
  IonList,
  IonLabel,
  IonFab,
  IonFabButton,
  IonIcon,
  IonButton,
  IonToolbar, IonTitle, withIonLifeCycle, IonButtons
} from '@ionic/react';
import React, {Component} from 'react';
import {PagePropsInterface} from "../utils/PagePropsInterface";
import {CACHED_LOGIN_USER, HAS_LOGIN} from "../utils/constants";
import ajax from '../utils/ajax';
import {bookMarkStatus} from '../utils/enums';
import BookListItem from "../components/BookListItem";
import {qrScanner, search} from "ionicons/icons";
import Empty from '../components/Empty';
import {BarcodeScanner} from '@ionic-native/barcode-scanner';


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

  async ionViewDidEnter() {
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
        window.sessionStorage.setItem(HAS_LOGIN, '1');
        window.localStorage.setItem(CACHED_LOGIN_USER, JSON.stringify(loggedUser));
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
    this.props.history.replace('/login');
  }

  toggleLoading(loading: Boolean): void {
    this.setState({loading: loading})
  }

  renderRecentlyBooks() {
    return this.state.recentlyReadingBooks.map((item: any) => (
      <BookListItem history={this.props.history} book={item.book} key={item.id}/>
    ))
  }

  renderWantedBooks() {
    return this.state.wantedBooks.map((item: any) => (
      <BookListItem history={this.props.history} book={item.book} key={item.id}/>
    ))
  }

  scanCode() {
    BarcodeScanner.scan().then((barcodeData: any) => {
      console.log('Barcode data', barcodeData);
    }).catch((err: any) => {
      console.log('Error', err);
    });
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
      <IonCol className={'status-item'} onClick={() => this.props.history.push(`/book-list?status=${status}`)}>
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
    const {loading, recentlyReadingCount, wantedCount, bookStatics} = this.state;
    const {reading, wanted, read} = bookStatics;
    const hasBookMark = reading.count > 0 || wanted.count > 0 || read.count > 0;
    return (
      <IonPage className={'home-page'}>
        <IonToolbar>
          <IonTitle>书香</IonTitle>
          <IonButtons slot="end">
            <IonButton color={'primary'} onClick={() => this.scanCode()}>
              <IonIcon icon={qrScanner}/>
            </IonButton>
          </IonButtons>
        </IonToolbar>
        <IonContent>
          <IonLoading
            isOpen={loading}
            onDidDismiss={() => this.toggleLoading(false)}
            message={'自动登录中...'}
            duration={5000}
          />
          {hasBookMark && this.renderStatics()}
          {hasBookMark || (
            <Empty>
              <div>
                <p className="add-more">最美是翻开书页的瞬间，马上开启您的完美书香之旅吧。</p>
                <IonButton onClick={() => this.props.history.push('/search')}>开启书香之旅</IonButton>
              </div>
            </Empty>
          )}
          {recentlyReadingCount > 0 && (
            <IonList>
              <IonListHeader>
                <IonLabel><h2>{`最近在读(${recentlyReadingCount})`}</h2></IonLabel>
              </IonListHeader>
              {this.renderRecentlyBooks()}
            </IonList>
          )}
          {wantedCount > 0 && (
            <IonList>
              <IonListHeader>
                <IonLabel><h2>{`想读(${wantedCount})`}</h2></IonLabel>
              </IonListHeader>
              {this.renderWantedBooks()}
            </IonList>

          )}
        </IonContent>
        {hasBookMark && (
          <IonFab vertical="bottom" horizontal="end" slot="fixed">
            <IonFabButton onClick={() => this.props.history.push('/search')}>
              <IonIcon icon={search}/>
            </IonFabButton>
          </IonFab>
        )}
      </IonPage>
    );
  }
}

export default withIonLifeCycle(Home);
