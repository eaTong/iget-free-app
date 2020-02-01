
/**
 * Created by eaTong on 2020-02-01 .
 * Description: auto generated in  2020-02-01
 */

import React from 'react';
import ContactListItem from "../../pages/contact/ContactListItem";

interface ContactListInterface {
  contactList: Array<any>,
  history: any,
}

const ContactList: React.FC<ContactListInterface> = (props: ContactListInterface) => {
  const {contactList, history} = props;
  return (
    <>
      {contactList.map((contact: any) => (
        <ContactListItem history={history} contact={contact} key={contact.id}/>
      ))}
    </>
  )
};
export default ContactList;
