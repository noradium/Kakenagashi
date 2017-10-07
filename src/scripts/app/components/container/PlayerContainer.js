import React from 'react'
import { observer } from 'mobx-react'
import { player } from '../../states/PlayerState';
import VideoPlayer from "../common/VideoPlayer";

@observer
class PlayerContainer extends React.Component {
  render() {
    return <div className="PlayerContainer">
      <div className="PlayerContainer_Player">
        <VideoPlayer
          src={player.currentPlayingSrc}
        />
      </div>
      <div className="PlayerContainer_Infomation">
        aaaaaaaa
      </div>
    </div>;
  }
}

export { PlayerContainer }
