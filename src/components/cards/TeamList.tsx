/**
 * Created by eatong on 2020/1/8.
 */

import React from 'react';
import TeamListItem from "../../pages/team/TeamListItem";

interface TeamListInterface {
  teamList: Array<any>,
  history: any
}

const TeamList: React.FC<TeamListInterface> = (props: TeamListInterface) => {
  const {teamList, history} = props;
  return (
    <>
      {teamList.map((team: any) => (
        <TeamListItem history={history} team={team} key={team.id}/>
      ))}
    </>
  )
};
export default TeamList;
