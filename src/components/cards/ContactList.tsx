/**
 * Created by eaTong on 2020-02-01 .
 * Description: auto generated in  2020-02-01
 */

import React from 'react';
import ContactListItem from "../../pages/contact/ContactListItem";
import Empty from "../Empty";
import {IonButton} from "@ionic/react";

interface ContactListInterface {
  contactList: Array<any>,
  history: any,
}

const ContactList: React.FC<ContactListInterface> = (props: ContactListInterface) => {
  const {contactList, history} = props;
  if (contactList.length === 0) {
    return (
      <Empty title={'暂时没有添加联系人'}>
        <IonButton>开启人脉管理</IonButton>
      </Empty>
    )
  }
  return (
    <>
      {contactList.map((contact: any) => (
        <ContactListItem history={history} contact={contact} key={contact.id}/>
      ))}
    </>
  )
};
export default ContactList;
