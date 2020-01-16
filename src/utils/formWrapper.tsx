import React, {cloneElement, ReactElement} from "react";
import {DynamicObject, FormWrapperProps} from "./types";

interface FormWrapperState {
  form: DynamicObject
}


function formWrapper<T>(WrappedComponent: React.ComponentType<T>) {
  return class FormBase extends React.Component<any, FormWrapperState> {
    state = {form: {}};

    getFormInstance() {
      const setFieldsValue = (form: any) => this.setState({form: {...this.state.form, ...form}});
      const form: FormWrapperProps = {
        setFieldsValue,
        getFieldsValue: () => this.state.form,
        getFieldDecorator: (field: string, options: any = {}) => {
          const {form} = this.state;
          return function (children: ReactElement) {
            const onChange = (event: any) => {
              setFieldsValue({[field]: (event && event.target) ? event.target[options.valuePropName || 'value'] : event})
            };
            const propsInject: DynamicObject = {};
            propsInject.onChange = onChange;
            propsInject.onIonChange = onChange;
            if (options.trigger) {
              propsInject[options.trigger] = onChange;
            }
            if (options.valuePropName) {
              propsInject[options.valuePropName] = form[field];
            } else {
              propsInject.value = form[field];
            }
            return cloneElement(children, {...propsInject})
          }
        }
      };
      return form;
    }

    render() {
      return <WrappedComponent {...(this.props as T)} form={this.getFormInstance()}/>;
    }
  };
}

export default formWrapper;
