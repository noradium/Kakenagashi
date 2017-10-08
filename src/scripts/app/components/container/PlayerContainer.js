import React from 'react'
import { observer } from 'mobx-react'
import { player } from '../../states/PlayerState';
import VideoPlayer from "../common/VideoPlayer";

@observer
class PlayerContainer extends React.Component {
  render() {
    return <div className="PlayerContainer">
      <div className="PlayerContainer_Main">
        <div className="PlayerContainer_Main_Player">
          <VideoPlayer
            src={player.currentPlayingSrc}
            poster={player.program ? player.program.program_image.video_url : null}
          />
        </div>
        {this._renderEpisodes()}
      </div>
      {this._renderInformation()}
    </div>;
  }

  _renderInformation() {
    if (!player.program) {
      return null;
    }
    return <div className="PlayerContainer_Information">
      <div className="PlayerContainer_Information_Title">
        {player.program.title}
      </div>
      <div className="PlayerContainer_Information_Performers">
        {player.program.performer_list.map(performer => {
          return <span className="PlayerContainer_Information_Performers_PerformerName" key={performer}>{performer}</span>;
        })}
      </div>
      <div className="PlayerContainer_Information_Description"
        dangerouslySetInnerHTML={{__html: player.program.description}}
      />
    </div>;
  }

  _renderEpisodes() {
    if (!player.program || !player.program.episodes) {
      return null;
    }
    return <div className="PlayerContainer_Episodes">
      {player.program.episodes.map(episode => {
        const updatedAt = new Date(episode.updated_on);
        return <div
          className={`PlayerContainer_Episode ${episode.id === player.currentPlayingEpisodeId ? 'is-playing' : ''}`}
          key={episode.id}
          onClick={() => this._onEpisodeClick(episode.id)}
        >
          <div className="PlayerContainer_Episode_Image">
            <img src={episode.episode_images.length > 0 ? episode.episode_images[0].url : ''} alt=''/>
          </div>
          <div className="PlayerContainer_Episode_Information">
            <div className="PlayerContainer_Episode_InformationHead">
              <span className="PlayerContainer_Episode_Title">{episode.title}</span>
              <span className="PlayerContainer_Episode_Update">{`${updatedAt.getFullYear()}/${updatedAt.getMonth() + 1}/${updatedAt.getDate()} 更新`}</span>
            </div>
            <div className="PlayerContainer_Episode_Labels">
              {episode.current ? <span className="PlayerContainer_Episode_NewLabel">new</span> : null}
              {episode.premium ? <span className="PlayerContainer_Episode_PremiumLabel">premium</span> : null}
            </div>
          </div>
        </div>;
      })}
    </div>;
  }

  _onEpisodeClick = (episodeId) => {
    player.play(episodeId);
  };
}

export { PlayerContainer }
