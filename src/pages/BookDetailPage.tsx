import React, {Component} from "react";
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
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
  IonFabList, withIonLifeCycle, IonActionSheet
} from "@ionic/react";
import {PagePropsInterface} from "../utils/PagePropsInterface";
import ajax from "../utils/ajax";
import {parse} from 'querystring';
import {bookMarkStatus} from "../utils/enums";
import Rate from "../components/Rate";
import {star, bookmarks, more, flag} from "ionicons/icons";
import {getTimeFormat} from "../utils/utils";

const statusColor = ['default', 'warning', 'secondary', 'success', 'tertiary'];

class BookDetailPage extends Component<PagePropsInterface, { bookDetail: any, showActions: boolean }> {
  state = {
    showActions: false,
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

  ionViewDidEnter() {
    this.getBookDetail();
  }

  toggleActions(showActions: boolean) {
    this.setState({showActions})
  }

  changeMarkStatus(status: number) {
    this.doChange(status);
  }

  async doChange(status: number) {
    const {location} = this.props;
    const query = parse(location.search.replace('?', ""));
    const {isNew} = await ajax({url: '/api/bookMark/mark', data: {bookId: query.id, status}});
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
    const {bookDetail, showActions} = this.state;
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
        <IonContent className={'book-detail-content'}>
          <IonNote
            color={statusColor[bookDetail.mark.status]}
            className='mark-status'
            onClick={() => this.toggleActions(true)}
          >
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
                        <Rate value={bookDetail.mark.rate}/>
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
                <IonItem key={note.id}>
                  <div className="note-detail">
                    <div className="time">{getTimeFormat(note.createdAt)}</div>
                    {note.reference && (
                      <div className="reference">{note.reference}</div>
                    )}
                    <div className="content">{note.content}</div>
                  </div>
                </IonItem>
              ))}
            </IonList>
          )}
          {bookDetail.rateHistories.length > 0 && (
            <IonList>
              <IonListHeader>
                <IonLabel>历史评价</IonLabel>
              </IonListHeader>
              {bookDetail.rateHistories.map((history: any) => (
                <IonItem key={history.id}>
                  <div className="rate-detail">
                    <div className="header">
                      <div className="rate"><Rate value={history.rate}/></div>
                      <div className="time">
                        {getTimeFormat(history.createdAt)}
                      </div>
                    </div>
                    <div className="content">{history.reason}</div>
                  </div>
                </IonItem>
              ))}
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
              <IonFabButton color={'warning'} onClick={() => this.props.history.push(`/add-rate?id=${query.id}`)}>
                <IonIcon icon={star}/>
              </IonFabButton>
              <IonFabButton color={'primary'} onClick={() => this.toggleActions(true)}>
                <IonIcon icon={flag}/>
              </IonFabButton>
            </IonFabList>
          </IonFab>
          <IonActionSheet
            header={'更换已读状态'}
            isOpen={showActions}
            onDidDismiss={() => this.toggleActions(false)}
            buttons={
              [
                {text: '未读', handler: () => this.changeMarkStatus(0)},
                {text: '想读', handler: () => this.changeMarkStatus(1)},
                {text: '在读', handler: () => this.changeMarkStatus(2)},
                {text: '已读', handler: () => this.changeMarkStatus(3)},
                {text: '已听', handler: () => this.changeMarkStatus(4)},
                {text: '取消', role: 'cancel', icon: 'close', handler: () => this.toggleActions(false)},
              ]
            }
          >
          </IonActionSheet>
        </IonContent>
      </IonPage>
    )
  }
}

export default withIonLifeCycle(BookDetailPage);
