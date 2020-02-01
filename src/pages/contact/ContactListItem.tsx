
/**
 * Created by eaTong on 2020-02-01 .
 * Description: auto generated in  2020-02-01
 */

import React from 'react';
import {IonItem, IonLabel} from "@ionic/react";

interface ContactListItemInterface {
  contact: any,
  key: any,
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
        <h3>{contact.name}</h3>
      </IonLabel>
    </IonItem>
  )
};
export default ContactListItem;
