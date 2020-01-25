/**
 * Created by eatong on 2020/1/8.
 */

import React from 'react';
import ObjectiveListItem from "../../pages/OKR/ObjectiveListItem";

interface ObjectiveListInterface {
  objectiveList: Array<any>,
  history: any,
}

const ObjectiveList: React.FC<ObjectiveListInterface> = (props: ObjectiveListInterface) => {
  const {objectiveList, history} = props;
  return (
    <>
      {objectiveList.map((objective: any) => (
        <ObjectiveListItem history={history} objective={objective} key={objective.id}/>
      ))}
    </>
  )
};
export default ObjectiveList;
