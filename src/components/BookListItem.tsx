import React from 'react';
import {IonItem, IonLabel} from "@ionic/react";

interface BookListInterface {
  book: any,
  history: any,
  key: number
}

const BookListItem: React.FC<BookListInterface> = (props: BookListInterface) => {
  const {book, history} = props;
  return (
    <IonItem className={'book-list-item'} onClick={() => history.push(`/book?id=${book.id}`)}>
      <div className="cover-container" slot="start">
        <img src={book.coverImage} alt="" className={'cover-image'}/>
      </div>
      <IonLabel>
        <div className="info">
          <div className="title">{book.name}</div>
          <div className="et-row">
            <span className="label">作者</span>
            <span className="value">{book.author}</span>
          </div>
          <div className="et-row">
            <span className="label">出版日期</span>
            <span className="value">{book.publishTime}</span>
          </div>
        </div>
      </IonLabel>
    </IonItem>
  )
};
export default BookListItem;
