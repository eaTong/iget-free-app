import {Component} from 'react';
import {PagePropsInterface} from "../utils/PagePropsInterface";

class FormBase extends Component<PagePropsInterface, any> {
  onChangeFormItem(key: string, value: any) {
    const {form} = this.state;
    form[key] = value;
    this.setState({form})

  }
}

export default FormBase
