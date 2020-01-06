/**
 * Created by eatong on 2020/1/6.
 */

import React from 'react';
import BookListItem from "../BookListItem";

interface BookListInterface {
  bookList: Array<any>,
  history: any
}

const BookList: React.FC<BookListInterface> = (props: BookListInterface) => {
  const {bookList, history} = props;
  return (
    <>
      {bookList.map((item: any) => (
        <BookListItem history={history} book={item.book} key={item.id}/>
      ))}
    </>
  )
};
export default BookList;
