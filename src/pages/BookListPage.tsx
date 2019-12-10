import React, {Component} from "react";
import {
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import {PagePropsInterface} from "../utils/PagePropsInterface";
import {bookMarkStatus} from "../utils/enums";
import {parse} from "querystring";

class BookListPage extends Component<PagePropsInterface, {}> {
  state = {
    bookList: [],
    total: 0
  };

  getQuery(): any {
    const {location} = this.props;
    return parse(location.search.replace('?', ""));
  }

  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>{`${bookMarkStatus[this.getQuery().status]}清单`}</IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonPage>
    )
  }
}

export default BookListPage;
