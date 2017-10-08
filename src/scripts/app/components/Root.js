import React from 'react'
import { observer } from 'mobx-react'
import {ProgramsContainer} from './container/ProgramsContainer';
import {HeaderContainer} from "./container/HeaderContainer";
import {PlayerContainer} from "./container/PlayerContainer";
import {user} from '../states/UserState';

@observer
class Root extends React.Component {
  render() {
    return <div>
      <HeaderContainer/>
      <PlayerContainer/>
      <ProgramsContainer/>
    </div>;
  }

  componentDidMount() {
    user.fetchMyInfo();
  }
}

export { Root }
