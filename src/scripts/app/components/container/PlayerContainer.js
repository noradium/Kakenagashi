import React from 'react'
import { observer } from 'mobx-react'
import { player } from '../../states/PlayerState';
import { user } from '../../states/UserState';
import { programs } from '../../states/ProgramsState';
import VideoPlayer from "../common/VideoPlayer";
import HeartIcon from "../common/HeartIcon";

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
    const isFavoriteProgram = user.favoriteProgramIds.includes(player.program.id);
    return <div className="PlayerContainer_Information">
      <div className={`PlayerContainer_Information_Title ${isFavoriteProgram ? 'is-favorite' : ''}`}>
        {player.program.title}
        <HeartIcon
          onClick={() => isFavoriteProgram ? user.deleteProgramFavorite(player.program.id) : user.addProgramFavorite(player.program.id)}
        />
      </div>
      <div className="PlayerContainer_Information_Performers">
        {player.program.performer_list.map(performer => {
          const performerId = this._getPerformerId(performer);
          const isFavorite = this._isFavoritePerformer(performerId);
          return <span
            className={`PlayerContainer_Information_Performers_PerformerName ${isFavorite ? 'is-favorite' : ''}`}
            key={performer}
          >
            {performer}
            <HeartIcon
              onClick={() => isFavorite ? user.deletePerformerFavorite(performerId) : user.addPerformerFavorite(performerId)}
            />
          </span>;
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

  _isFavoritePerformer(performerId) {
    return user.favoritePerformerIds.includes(performerId);
  }

  _getPerformerId(performerName) {
    if (!player.program) {
      return null;
    }
    const program = programs.list.find(program => program.id === player.program.id);
    if (!program) {
      return null;
    }
    const performer = program.performers.find(performer => performer.name === performerName);
    if (!performer) {
      return null;
    }
    return performer.id;
  }

  _onEpisodeClick = (episodeId) => {
    player.play(episodeId);
  };
}

export { PlayerContainer }
