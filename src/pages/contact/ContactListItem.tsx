/**
 * Created by eaTong on 2020-02-01 .
 * Description: auto generated in  2020-02-01
 */

import React from 'react';
import {IonBadge, IonItem, IonLabel, IonNote} from "@ionic/react";

interface ContactListItemInterface {
  contact: any,
  key?: any,
  history: any
}

const ContactListItem: React.FC<ContactListItemInterface> = (props: ContactListItemInterface) => {
  const {contact, history} = props;

  function viewDetail(event: any) {
    event.stopPropagation();
    event.preventDefault();
    history.push(`/contact/detail/${contact.id}`)
  }

  return (
    <IonItem button onClick={viewDetail}>
      <IonLabel>
        <h3>
          <IonNote color={contact.gender ? 'danger' : 'primary'}>{contact.name}</IonNote>
          <span className="et-remark">{contact.phone}</span>
          <span className="et-remark">{(contact.birthday || '')}</span>
        </h3>
        <p>{(contact.tags ||[]).map((tag:any)=><IonBadge key={tag.id}>{tag.name}</IonBadge>)}</p>
        {contact.lastContactDate &&(
          <p>{`上次联系日期：${contact.lastContactDate}`}</p>
        )}
        <p>{contact.description}</p>
      </IonLabel>
    </IonItem>
  )
};
export default ContactListItem;
