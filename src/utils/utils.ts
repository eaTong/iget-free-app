import moment from "moment";
import {weekEnums} from "./enums";
import {CURRENT_LOGIN_USER} from "./constants";
import ajax from "./ajax";

export function getTimeFormat(timeStr: string = '') {
  const date = moment(timeStr);
  const now = moment();
  const diff = dateDiff(now, date, true);
  if (diff < 1) {
    return date.format('HH:mm');
  } else if (diff === 1) {
    return `昨天 ${date.format('HH:mm')}`
  } else if (diff === 2) {
    return `前天 ${date.format('HH:mm')}`
  } else if (diff < 7) {
    return `${weekEnums[parseInt(date.format('d'))]} ${date.format('HH:mm')}`
  } else {
    if (date.year() === now.year()) {
      return date.format('MM-DD HH:mm')
    } else {
      return date.format('YYYY-MM-DD HH:mm')
    }
  }
}

//计算日期间的差异
export function dateDiff(a: any, b: any, disableAutoAdd: boolean) {
  if (!a && !b) {
    return 0;
  }
  const dateA = moment(a ? moment(a).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD'));
  const dateB = moment(b ? moment(b).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD'));
  return Math.round((dateA.valueOf() - dateB.valueOf()) / (1000 * 60 * 60 * 24) + (disableAutoAdd ? 0 : 1)) || 0;
}

export function getLoginUser() {
  try {
    return JSON.parse(window.sessionStorage.getItem(CURRENT_LOGIN_USER) || '{}');
  } catch (e) {
    return {}
  }
}

export async function logout() {
  await ajax({url: '/api/user/logout'});

}
