import React, {Component} from "react";
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  withIonLifeCycle
} from "@ionic/react";
import {PagePropsInterface} from "../../utils/PagePropsInterface";
import {bookMarkListenedStatus, bookMarkStatus} from "../../utils/enums";
import {parse} from "querystring";
import ajax from "../../utils/ajax";
import BookListItem from "../../components/BookListItem";
import {RefresherEventDetail} from "@ionic/core";
import BackButton from "../../components/BackButton";

class BookListPage extends Component<PagePropsInterface, { bookList: any, status: number, listenedStatus: number, total: number }> {
  state = {
    bookList: [],
    total: 0,
    status: -1,
    listenedStatus: -1
  };

  componentDidMount() {
    this.setState({status: this.getQuery().status, listenedStatus: this.getQuery().listenedStatus});
  }

  ionViewDidEnter() {
    this.setState({status: this.getQuery().status});
    this.getBooks();
  }

  async getBooks(page: number = 0, event?: CustomEvent<RefresherEventDetail>) {
    const query = this.getQuery();
    const {list, total} = await ajax({
      url: '/api/bookMark/get',
      data: {page, status: query.status, listenedStatus: query.listenedStatus}
    });
    this.setState({bookList: list, total});
    if (event) event.detail.complete();
  }

  getQuery(): any {
    const {location} = this.props;
    return parse(location.search.replace('?', ""));
  }

  getTitle() {
    const {status, listenedStatus} = this.state;

    if (status > -1) {
      return `${bookMarkStatus[status]}书单`;
    }
    if (listenedStatus > -1) {
      return `${bookMarkListenedStatus[listenedStatus]}书单`;
    }
    return '';
  }

  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <BackButton history={this.props.history}/>
            </IonButtons>
            <IonTitle>{this.getTitle()}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonRefresher slot="fixed" onIonRefresh={(event) => this.getBooks(0, event)}>
            <IonRefresherContent/>
          </IonRefresher>
          {this.state.bookList.map((book: any) => (
            <BookListItem book={book.book} history={this.props.history} key={book.id}/>
          ))}
        </IonContent>
      </IonPage>
    )
  }
}

export default withIonLifeCycle(BookListPage);
