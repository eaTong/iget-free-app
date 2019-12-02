import React from 'react';
import {IonItem, IonLabel} from "@ionic/react";

interface BookListInterface {
  book: any,
  key: number
}

const BookListItem: React.FC<BookListInterface> = (props: BookListInterface) => {
  const book = props.book;
  return (
    <IonItem className={'book-list-item'}>
      <div className="cover-container" slot="start">
        <img src={book.book.coverImage} alt="" className={'cover-image'}/>
      </div>
      <IonLabel>
        <div className="info">
          <div className="title">{book.book.name}</div>
          <div className="author">
            <span className="label">作者</span>
            <span className="value">{book.book.author}</span>
          </div>
          <div className="author">
            <span className="label">出版日期</span>
            <span className="value">{book.book.publishTime}</span>
          </div>
        </div>
      </IonLabel>
    </IonItem>
  )
};
export default BookListItem;
