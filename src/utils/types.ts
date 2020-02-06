export interface DynamicObject {
  [key: string]: any
}

export interface FormWrapperProps {
  getFieldsValue: Function,
  setFieldsValue: Function,
  getFieldDecorator: Function
}

export interface TagType {
  id: number,
  name: string,
}
