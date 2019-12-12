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
        url: 'http://127.0.0.1:3001' + url,
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
      try{
        const error =  reason.response.data.message;
        showToast(`${error}`);
        reject();
      }catch (e) {
        reject();
      }

    })
  }))
}
