import React, {Component} from "react";
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonSearchbar,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonNote,
  IonLabel,
  IonItem,
  IonList,
  IonListHeader,
  IonFab,
  IonFabButton,
  IonIcon,
  IonFabList
} from "@ionic/react";
import {PagePropsInterface} from "../utils/PagePropsInterface";
import ajax from "../utils/ajax";
import {parse} from 'querystring';
import {bookMarkStatus} from "../utils/enums";
import Rate from "../components/Rate";
import {add, card, settings, star, bookmarks, more} from "ionicons/icons";

const statusColor = ['default', 'warning', 'secondary', 'success'];

class BookDetailPage extends Component<PagePropsInterface, {}> {
  state = {
    bookDetail: {
      name: '',
      summary: '',
      subTitle: '',
      coverImage: '',
      publishTime: '',
      publisher: '',
      author: '',
      isbn13: '',
      mark: {
        status: 0,
        rate: 5,
        finishTime: '',
      },
      bookNotes: [],
      rateHistories: []
    }
  };

  componentDidMount() {
    this.getBookDetail();

  }

  async getBookDetail() {
    const {location} = this.props;
    const query = parse(location.search.replace('?', ""));
    const bookDetail = await ajax({url: '/api/book/detail', data: {id: query.id}});
    this.setState({bookDetail});
  }

  render() {
    const {location} = this.props;
    const query = parse(location.search.replace('?', ""));
    const {bookDetail} = this.state;
    return (
      <IonPage className={'book-detail-page'}>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton/>
            </IonButtons>
            <IonTitle>{bookDetail.name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonNote color={statusColor[bookDetail.mark.status]} className='mark-status'>
            {bookMarkStatus[bookDetail.mark.status]}
          </IonNote><br/>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>{bookDetail.name}</IonCardTitle>
              <IonCardSubtitle>
                {bookDetail.subTitle}
              </IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              <div className={'book-info'}>
                <div className="cover-container" slot="start">
                  <img src={bookDetail.coverImage} alt="" className={'cover-image'}/>
                </div>
                <IonLabel>
                  <div className="info">
                    <div className="et-row">
                      <span className="label">作者</span>
                      <span className="value">{bookDetail.author}</span>
                    </div>
                    <div className="et-row">
                      <span className="label">出版日期</span>
                      <span className="value">{bookDetail.publishTime}</span>
                    </div>
                    <div className="et-row">
                      <span className="label">出版社</span>
                      <span className="value">{bookDetail.publisher}</span>
                    </div>
                    <div className="et-row">
                      <span className="label">ISBN</span>
                      <span className="value">{bookDetail.isbn13}</span>
                    </div>
                    <div className="et-row">
                      <span className="label">我的评分</span>
                      <span className="value">
                        <Rate value={bookDetail.mark.rate} onChange={() => null}/>
                      </span>
                    </div>
                  </div>
                </IonLabel>
              </div>
            </IonCardContent>
          </IonCard>
          {bookDetail.bookNotes.length > 0 && (
            <IonList>
              <IonListHeader>
                <IonLabel>我的笔记</IonLabel>
              </IonListHeader>
              {bookDetail.bookNotes.map((note: any) => (
                <div className="note-detail" key={note.id}>
                  <div className="time">{note.createdAt}</div>
                  <p className="content">{note.content}</p>
                  {note.reference && (
                    <p className="reference">{note.reference}</p>
                  )}
                </div>
              ))}
            </IonList>
          )}
          {bookDetail.rateHistories.length > 0 && (
            <IonList>
              <IonListHeader>
                <IonLabel>历史评价</IonLabel>
              </IonListHeader>
              <Rate value={2} onChange={() => console.log(234)}/>
            </IonList>
          )}

          <IonFab vertical="bottom" horizontal="end" slot="fixed">
            <IonFabButton>
              <IonIcon icon={more}/>
            </IonFabButton>
            <IonFabList side="top">
              <IonFabButton color={'danger'} onClick={() => this.props.history.push(`/add-note?id=${query.id}`)}>
                <IonIcon icon={bookmarks}/>
              </IonFabButton>
              <IonFabButton color={'warning'}><IonIcon icon={star}/></IonFabButton>
            </IonFabList>
          </IonFab>

        </IonContent>
      </IonPage>
    )
  }
}

export default BookDetailPage;
