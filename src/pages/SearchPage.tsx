import React, {Component} from "react";
import {
  IonContent,
  IonHeader,
  IonPage, IonSearchbar,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonList
} from "@ionic/react";
import {PagePropsInterface} from "../utils/PagePropsInterface";
import ajax from "../utils/ajax";
import BookListItem from "../components/BookListItem";

class SearchPage extends Component<PagePropsInterface, {}> {
  state = {
    bookList: []
  };

  componentDidMount(): void {
    this.search('');
  }

  async search(keywords: string) {
    const bookList = await ajax({url: '/api/book/search', data: {keywords}});
    this.setState({bookList});
  }

  render() {
    const {bookList} = this.state;
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton/>
            </IonButtons>
            <IonTitle>书海寻珍</IonTitle>
          </IonToolbar>
          <IonToolbar>
            <IonSearchbar animated placeholder={'输入书名或ISBN搜索'} onIonChange={(e: any) => this.search(e.target.value)}/>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            {bookList.map((book: any) => (<BookListItem history={this.props.history} book={book} key={book.id}/>))}
          </IonList>
        </IonContent>
      </IonPage>
    )
  }
}

export default SearchPage;
