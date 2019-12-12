import axios, { Method } from 'axios';
import showToast from './toastUtil';
import { isPlatform } from '@ionic/react';
import { HTTP } from '@ionic-native/http';

interface AjaxConfig {
  url: string,
  method?: Method,
  data?: object,
}

export default function ajax(config: AjaxConfig): Promise<any> {
  const { url, data = {}, method } = config;
  const urlPrefix = 'https://iget.eatong.cn';
  return new Promise(((resolve, reject) => {
    if (isPlatform('ios')) {
      HTTP.sendRequest(urlPrefix + url, { method: 'post', data }).then((result: any) => {
        if (result.status === 200) {
          const resultData = JSON.parse(result.data);
          console.log(resultData);
          if (resultData.success) {
            resolve(resultData.data);
          } else {
            showToast(`${resultData.message}`);
            reject();
          }
        } else {
          reject();
        }
      }).catch((reason: any) => {
        try {
          const error = JSON.parse(reason.error).message;
          showToast(`${error}`);
          reject();
        } catch (e) {
          reject();
        }
      })
    } else {
      axios(
        {
          withCredentials: true,
          url: urlPrefix + url,
          data,
          method: method || 'POST'
        }
      ).then((result: any) => {
        console.log(result);
        if (result.data.success) {
          resolve(result.data.data);
        } else {
          showToast(`${result.data.message}`);
          reject();
        }
      }).catch((reason: any) => {
        try {
          const error = reason.response.data.message;
          showToast(`${error}`);
          reject();
        } catch (e) {
          reject();
        }

      })
    }
  }))
}
