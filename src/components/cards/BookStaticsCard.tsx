/**
 * Created by eatong on 2020/1/6.
 */

import React from 'react';
import {IonButton, IonCol, IonGrid, IonRow} from "@ionic/react";
import {bookMarkStatus} from "../../utils/enums";
import Empty from "../Empty";
import {getThumbnail} from "../../utils/utils";

interface BookStaticsCardInterface {
  bookStatics: any,
  history: any
}

const BookStaticsCard: React.FC<BookStaticsCardInterface> = (props: BookStaticsCardInterface) => {
  const {bookStatics, history} = props;

  function renderStatusStatics(status: number, listenedStatus?: number) {
    let statics = {count: 0, covers: []};
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

    function viewDetail(event: any) {
      event.stopPropagation();
      event.preventDefault();
      history.push(`/book/list?status=${status}&listenedStatus=${listenedStatus}`)
    }

    if (!statics.count) {
      return null;
    }

    return (
      <IonCol className={'status-item'}
              onClick={(event: any) => viewDetail(event)}>
        <div className="covers">
          {statics.covers.map(img => (
            <img className={'cover-item'} key={img} src={getThumbnail(img)} alt=""/>
          ))}
        </div>
        <div className="footer">
          <span className="label">{listenedStatus ? '已听' : bookMarkStatus[status]}</span>
          <span className="num">{statics.count}</span>
        </div>
      </IonCol>
    )
  }

  function viewSearch(event: any) {
    event.stopPropagation();
    event.preventDefault();
    history.push('/book/search')
  }


  const {reading, wanted, read} = bookStatics;
  const hasBookMark = reading.count > 0 || wanted.count > 0 || read.count > 0;
  return (
    <IonGrid className={'book-statics-card'}>
      {!hasBookMark && (
        <Empty>
          <div>
            <p className="add-more">最美是翻开书页的瞬间，马上开启您的完美书香之旅吧。</p>
            <IonButton onClick={(event: any) => viewSearch(event)}>开启书香之旅</IonButton>
          </div>
        </Empty>
      )}
      <IonRow>
        {renderStatusStatics(1)}
        {renderStatusStatics(2)}
        {renderStatusStatics(3)}
        {renderStatusStatics(-1, 1)}
      </IonRow>
    </IonGrid>
  )
};
export default BookStaticsCard;
