import React, {Component} from "react";
import {
  IonContent,
  IonHeader,
  IonPage, IonSearchbar,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonList,
  IonButton,
  IonIcon, isPlatform
} from "@ionic/react";
import {PagePropsInterface} from "../../utils/PagePropsInterface";
import ajax from "../../utils/ajax";
import BookListItem from "../../components/BookListItem";
import {qrScanner} from "ionicons/icons";
import Empty from "../../components/Empty";
import { BarcodeScanner } from "@ionic-native/barcode-scanner";

class SearchBookPage extends Component<PagePropsInterface, {}> {
  state = {
    bookList: [],
    fetched:false
  };

  componentDidMount(): void {
    this.search('');
  }

  async search(keywords: string) {
    const bookList = await ajax({url: '/api/book/search', data: {keywords}});
    this.setState({bookList,fetched:true});
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

  render() {
    const {bookList,fetched} = this.state;
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton/>
            </IonButtons>
            <IonTitle>书海寻珍</IonTitle>
            <IonButtons slot="end">
            <IonButton color={'primary'} onClick={() => this.scanCode()}>
              <IonIcon icon={qrScanner}/>
            </IonButton>
          </IonButtons>
          </IonToolbar>
          <IonToolbar>
            <IonSearchbar animated placeholder={'输入书名或ISBN搜索'} onIonChange={(e: any) => this.search(e.target.value)}/>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {fetched && bookList.length === 0 && (
            <Empty>
              <p>糟糕，找不到您搜索的书，点击右上角扫描书籍条形码试试？或者输入13位ISBN编码重新搜索</p>
            </Empty>
          )}
          <IonList>
            {bookList.map((book: any) => (<BookListItem history={this.props.history} book={book} key={book.id}/>))}
          </IonList>
        </IonContent>
      </IonPage>
    )
  }
}

export default SearchBookPage;
