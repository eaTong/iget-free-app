import React, {Component} from "react";
import {
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar, withIonLifeCycle, IonContent, IonRefresher, IonRefresherContent, IonButtons, IonBackButton
} from "@ionic/react";
import {PagePropsInterface} from "../utils/PagePropsInterface";
import {bookMarkStatus} from "../utils/enums";
import {parse} from "querystring";
import ajax from "../utils/ajax";
import BookListItem from "../components/BookListItem";
import {RefresherEventDetail} from "@ionic/core";

class BookListPage extends Component<PagePropsInterface, { bookList: any, status: number, total: number }> {
  state = {
    bookList: [],
    total: 0,
    status: 0
  };

  ionViewDidEnter() {
    this.setState({status: this.getQuery().status});
    this.getBooks();
  }

  async getBooks(page: number = 0, event?: CustomEvent<RefresherEventDetail>) {
    const {list, total} = await ajax({url: '/api/bookMark/get', data: {page, status: this.getQuery().status}});
    this.setState({bookList: list, total});
    if (event) event.detail.complete();
  }

  getQuery(): any {
    const {location} = this.props;
    return parse(location.search.replace('?', ""));
  }

  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton/>
            </IonButtons>
            <IonTitle>{`${bookMarkStatus[this.state.status]}清单`}</IonTitle>
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
