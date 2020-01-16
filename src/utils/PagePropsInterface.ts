import {RouteComponentProps} from "react-router";
import { FormWrapperProps } from "./types";

export interface PagePropsInterface extends RouteComponentProps {
  history: any;
}

export interface FormPageProps extends RouteComponentProps {
  history: any;
  form:FormWrapperProps
}
