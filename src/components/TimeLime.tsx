/**
 * Created by eatong on 2020/1/28.
 */

import React, {ReactElement} from 'react';

interface TimeLimeInterface {
  children: Array<ReactElement>
}

const TimeLime: React.FC<TimeLimeInterface> = (props: TimeLimeInterface) => {
  const {children} = props;
  return (
    <div className={'et-timeline'}>
      {children}
    </div>
  )
};
export default TimeLime;
