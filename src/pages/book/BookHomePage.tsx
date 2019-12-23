import {
  IonContent,
  IonGrid,
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
  IonToolbar, IonTitle, withIonLifeCycle, IonButtons, IonSkeletonText, IonMenuButton, IonHeader
} from '@ionic/react';
import React, {Component} from 'react';
import {PagePropsInterface} from "../../utils/PagePropsInterface";
import ajax from '../../utils/ajax';
import {bookMarkStatus} from '../../utils/enums';
import BookListItem from "../../components/BookListItem";
import {qrScanner, search} from "ionicons/icons";
import Empty from '../../components/Empty';
import {isPlatform} from '@ionic/react'
import {BarcodeScanner} from '@ionic-native/barcode-scanner';

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

  scanCode() {
    if (isPlatform('mobileweb')) {
      this.search("6953631801604");
    } else {
      BarcodeScanner.scan().then((barcodeData: any) => {
        if (/^\d{13}$/.test(barcodeData.text)) {
          this.search(barcodeData.text);
        }
      }).catch((err: any) => {

      });

    }
  }

  async search(keywords: string) {
    const bookList = await ajax({url: '/api/book/search', data: {keywords}});
    if (bookList && bookList.length === 1) {
      this.props.history.push(`/book/detail?id=${bookList[0].id}`)
    }
  }


  renderStatusStatics(status: number, listenedStatus?: number) {
    let statics = {count: 0, covers: []};
    const {bookStatics} = this.state;
    if (listenedStatus) {
      statics = bookStatics.listened || statics;
    } else {

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
    }
    if (!statics.count) {
      return null;
    }
    return (
      <IonCol className={'status-item'}
              onClick={() => this.props.history.push(`/book/list?status=${status}&listenedStatus=${listenedStatus}`)}>
        <div className="covers">
          {statics.covers.map(img => (
            <img className={'cover-item'} key={img} src={img} alt=""/>
          ))}
        </div>
        <div className="footer">
          <span className="label">{listenedStatus ? '已听' : bookMarkStatus[status]}</span>
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
          {this.renderStatusStatics(-1, 1)}
        </IonRow>
      </IonGrid>
    )
  }

  render() {
    const { recentlyReadingCount, wantedCount, bookStatics, fetched} = this.state;
    const {reading, wanted, read} = bookStatics;
    const hasBookMark = reading.count > 0 || wanted.count > 0 || read.count > 0;
    return (
      <IonPage className={'home-page'}>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton/>
            </IonButtons>
            <IonTitle>书香</IonTitle>
            <IonButtons slot="end">
              <IonButton color={'primary'} onClick={() => this.scanCode()}>
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
          {hasBookMark && fetched && this.renderStatics()}
          {!hasBookMark && fetched && (
            <Empty>
              <div>
                <p className="add-more">最美是翻开书页的瞬间，马上开启您的完美书香之旅吧。</p>
                <IonButton onClick={() => this.props.history.push('/book/search')}>开启书香之旅</IonButton>
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
