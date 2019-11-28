import axios, {Method} from 'axios';
import showToast from './toastUtil';

interface AjaxConfig {
  url: string,
  method?: Method,
  data?: object,
}

export default function ajax(config: AjaxConfig): Promise<any> {
  const {url, data, method} = config;
  return new Promise(((resolve, reject) => {
    axios(
      {
        withCredentials:true,
        url: 'https://iget.eatong.cn' + url,
        data,
        method: method || 'POST'
      }
    ).then((result: any) => {
      if (result.data.success) {
        resolve(result.data.data);
      } else {
        showToast(`请求错误:${result.data.message}`);
        reject();
      }
    }).catch((reason: any) => {
      console.log(reason);
      showToast(`请求错误:${JSON.stringify(reason)}`);
      reject();
    })
  }))
}
