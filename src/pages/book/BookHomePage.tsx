import {
  IonContent,
  IonPage,
  IonListHeader,
  IonList,
  IonLabel,
  IonFab,
  IonFabButton,
  IonIcon,
  IonButton,
  IonToolbar, IonTitle, withIonLifeCycle, IonButtons, IonSkeletonText, IonHeader, IonBackButton
} from '@ionic/react';
import React, {Component} from 'react';
import {PagePropsInterface} from "../../utils/PagePropsInterface";
import ajax from '../../utils/ajax';
import BookListItem from "../../components/BookListItem";
import {qrScanner, search} from "ionicons/icons";
import {scanQrCode} from "../../utils/utils";
import BookStaticsCard from "../../components/cards/BookStaticsCard";

class BookHomePage extends Component<PagePropsInterface, {}> {

  state = {
    fetched: false,
    recentlyReadingBooks: [],
    recentlyReadingCount: 0,
    wantedBooks: [],
    wantedCount: 0,
    bookStatics: {
      wanted: {count: 0, covers: []},
      reading: {count: 0, covers: []},
      read: {count: 0, covers: []},
      listened: {count: 0, covers: []},
    }
  };

  async ionViewDidEnter() {
    this.getMyBookMark();
  }

  async getMyBookMark() {
    const bookStatics = await ajax({url: '/api/bookMark/statics'});
    this.setState({bookStatics, fetched: true});
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


  render() {
    const {recentlyReadingCount, wantedCount, bookStatics, fetched} = this.state;
    const {reading, wanted, read} = bookStatics;
    const hasBookMark = reading.count > 0 || wanted.count > 0 || read.count > 0;
    return (
      <IonPage className={'home-page'}>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton/>
            </IonButtons>
            <IonTitle>书香</IonTitle>
            <IonButtons slot="end">
              <IonButton color={'primary'} onClick={() => scanQrCode(this.props.history)}>
                <IonIcon icon={qrScanner}/>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {!fetched && (
            <div className="ion-padding custom-skeleton">
              <IonSkeletonText animated style={{width: '60%'}}/>
              <IonSkeletonText animated/>
              <IonSkeletonText animated style={{width: '88%'}}/>
              <IonSkeletonText animated style={{width: '70%'}}/>
            </div>
          )}
          {fetched && (
            <BookStaticsCard bookStatics={bookStatics} history={this.props.history}/>
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
            <IonFabButton onClick={() => this.props.history.push('/book/search')}>
              <IonIcon icon={search}/>
            </IonFabButton>
          </IonFab>
        )}
      </IonPage>
    )
  }
}

export default withIonLifeCycle(BookHomePage);
