import BookStaticsCard from "../components/cards/BookStaticsCard";
import BookList from "../components/cards/BookList";

export const bookMarkStatus = [
  '未读', '想读', '在读', '已读',
];
export const bookMarkListenedStatus = ['未听', '已听'];
export const weekEnums = ['周天', '周一', '周二', '周三', '周四', '周五', '周六',];
export const appTabLinks = ['/home', '/mine/home', '/apps'];

export const cardsConfig = [
  {
    title: '总览',
    subtitle: '书香：给心灵的触动一个港湾。',
    key: 'book-statics',
    ajaxConfig: {url: '/api/bookMark/statics'},
    dataResolve: (result: any) => ({bookStatics: result}),
    link: '/book/home',
    hide: false,
    Component: BookStaticsCard
  },
  {
    title: '在读书单',
    subtitle: '书香：我的灵魂在赶路。',
    key: 'book-reading',
    ajaxConfig: {url: '/api/bookMark/get', data: {status: 2}},
    dataResolve: (result: any) => ({bookList: result.list}),
    link: '/book/list?status=2',
    hide: false,
    Component: BookList
  },
  {
    title: '已听书单',
    key: 'book-listened',
    subtitle: '书香：从耳朵传入灵魂的思想。',
    ajaxConfig: {url: '/api/bookMark/get', data: {status: "-1", listenedStatus: "1"}},
    dataResolve: (result: any) => ({bookList: result.list}),
    link: '/book/list?status=-1&listenedStatus=1',
    hide: false,
    Component: BookList
  },
  {
    title: '想读书单',
    subtitle: '书香：我的前方，是否有你在身旁。',
    key: 'book-wanted',
    ajaxConfig: {url: '/api/bookMark/get', data: {status: 1}},
    dataResolve: (result: any) => ({bookList: result.list}),
    link: '/book/list?status=1',
    hide: false,
    Component: BookList
  },
  {
    title: '未读书单',
    key: 'book-unread',
    subtitle: '书香：未知的世界，正在等着我取探索。',
    ajaxConfig: {url: '/api/bookMark/get', data: {status: 0}},
    dataResolve: (result: any) => ({bookList: result.list}),
    link: '/book/list?status=0',
    hide: true,
    Component: BookList
  },
  {
    title: '已读书单',
    key: 'book-read',
    subtitle: '书香：这些思想，已被我收入囊中。',
    ajaxConfig: {url: '/api/bookMark/get', data: {status: 3}},
    dataResolve: (result: any) => ({bookList: result.list}),
    link: '/book/list?status=3',
    hide: true,
    Component: BookList
  },
];
