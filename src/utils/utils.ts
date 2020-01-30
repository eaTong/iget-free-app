import moment from "moment";
import {appTabLinks, weekEnums} from "./enums";
import {CURRENT_LOGIN_USER} from "./constants";
import ajax from "./ajax";
import showLoading from "./loadingUtil";
import {isPlatform} from "@ionic/react";
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {ImagePicker, OutputType} from "@ionic-native/image-picker";
import {FileTransferObject, FileTransfer} from "@ionic-native/file-transfer";
import AppConfig from "../AppConfig";


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

export async function takePicture() {

  if (isPlatform('mobileweb')) {
    return ['https://eatong-iget.oss-cn-beijing.aliyuncs.com/0916192d-87bc-4d9c-8f80-50f66cd3d808.jpg']
  }
  try {
    const options = {
      maximumImagesCount: 9,
      quality: 50,
      outputType: OutputType.FILE_URL
    };

    let result = await ImagePicker.getPictures(options);
    console.log(result);
    if (typeof result === "string" && result.toLocaleLowerCase() === 'ok') {
      result = await ImagePicker.getPictures(options);
    }
    const fileTransfer: FileTransferObject = FileTransfer.create();
    const loading = showLoading('正在上传图片');
    const promise: Promise<any>[] = [];
    result.forEach((path: string) => {
      const options = {
        fileKey: 'file',
        fileName: path.replace(/^.*\//, ''),
      };
      promise.push(fileTransfer.upload(path, `${AppConfig.host}/api/pub/image/upload`, options))
    });
    const finalResult = formatResult(await Promise.all(promise));
    loading.destroy();
    return finalResult

  } catch (e) {
    console.log(e);
    return []
  }
}

export async function scanQrCode(history: any) {
  // history.push('/book/home')
  const loading = showLoading('正在加载中....');
  if (isPlatform('mobileweb')) {
    await analyseScanResult('joinTeam:d44e7556-f084-4574-9d28-9e0d1d78d5a2', history);
    loading.destroy();
  } else {
    BarcodeScanner.scan().then(async (barcodeData: any) => {
      try {
        await analyseScanResult(barcodeData.text, history);
        loading.destroy();
      } catch (e) {
        loading.destroy();
      }
    }).catch((err: any) => {

      loading.destroy();
    });
  }
}

async function analyseScanResult(text: string, history: any) {
  // If is ISBN  then search book and jump to bookDetailPage
  if (/^\d{13}$/.test(text)) {
    const bookList = await searchBook(text);
    if (bookList && bookList.length === 1) {
      history.push(`/book/detail?id=${bookList[0].id}`)
    }
  } else if (/^joinTeam/.test(text)) {
    history.push(`/team/detail/${text.replace(/^joinTeam:/, '')}`)
  }
}

async function searchBook(ISBN: string) {
  return ajax({url: '/api/book/search', data: {keywords: ISBN}});
}


export function hideTabBar() {
  const tabBar = document.querySelector("ion-tab-bar");
  if (tabBar) {
    tabBar.style.display = 'none'
  }
}

export function showTabBar() {
  const tabBar = document.querySelector("ion-tab-bar");
  if (tabBar) {
    tabBar.style.display = ''
  }
}

export function checkTabBarShouldHide(history: any, location: any) {
  if (history.action === 'PUSH' && appTabLinks.indexOf(location.pathname) === -1) {
    hideTabBar();
  }
}

export function getThumbnailList(list: Array<string> = []) {
  return list.map((url: string) => getThumbnail(url));
}

export function getThumbnail(url: string) {
  return `${url.replace(/\?.*$/, '')}?x-oss-process=image/resize,w_300`
}

function formatResult(responseBodies: Array<any>): Array<string> {
  return responseBodies.map((responseBody: any) => {
    if (responseBody.responseCode === 200) {
      try {
        const responseData = JSON.parse(responseBody.response);
        return responseData.data;
      } catch (e) {
        return '';
      }
    }
    return '';
  }).filter(item => item);
}
