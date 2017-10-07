import { observable } from 'mobx';
import OnsenPrivateAPI from "../api/onsen/OnsenPrivateAPI";
import Context from "../Context";

/**
 * @typedef {object} ProgramDetail
 * @property {number} id
 * @property {string} title
 * @property {string} title_kana
 * @property {string} description
 * @property {boolean} free
 * @property {boolean} new
 * @property {boolean} brand_new
 * @property {string} email
 * @property {string} directory_name
 * @property {boolean} display
 * @property {number} display_order
 * @property {number} api_display_order
 * @property {string} sponsor_name
 * @property {string} copyright
 * @property {string[]} title_list
 * @property {string[]} performer_list
 * @property {string[]} medium_list
 * @property {string[]} genre_list
 * @property {string} media_category
 * @property {object} program_image
 * @property {number} program_image.id
 * @property {string} program_image.details_url
 * @property {string} program_image.video_url
 * @property {string} program_image.banner_url
 * @property {string} program_image.recommended_banner_url
 * @property {object} program_delivery
 * @property {number} program_delivery.id
 * @property {string} program_delivery.delivery_interval
 * @property {string} program_delivery.delivery_day_of_week
 * @property {string} program_delivery.started_on
 * @property {array} commercials
 * @property {boolean} favorite
 * @property {boolean} has_guest
 * @property {boolean} has_event
 * @property {array} related_programs
 * @property {Episode[]} episodes
 */
/**
 * @typedef {object} Episode
 * @property {number} id
 * @property {string} title
 * @property {string} description
 * @property {boolean} free
 * @property {string} media_type
 * @property {boolean} bonus
 * @property {EpisodeImage[]} episode_images
 * @property {boolean} current
 * @property {boolean} premium
 * @property {boolean} on_playlist
 * @property {string} updated_on
 * @property {EpisodeFile[]} episode_files
 * @property {EpisodePerformer[]} episode_performers
 */
/**
 * @typedef {object} EpisodeImage
 * @property {number} id
 * @property {string} url
 * @property {boolean} display
 * @property {number} display_order
 */
/**
 * @typedef {object} EpisodeFile
 * @property {number} id
 * @property {string} target
 * @property {string} media_url
 */
/**
 * @typedef {object} EpisodePerformer
 * @property {number} id
 * @property {string} name
 * @property {string} name_kana
 * @property {string} description
 * @property {string} image_url
 * @property {string} role
 * @property {string} display_role
 * @property {boolean} display
 * @property {number} display_order
 * @property {boolean} favorite
 */

class PlayerState {
  /**
   * @type {OnsenPrivateAPI}
   */
  _privateAPI;
  /**
   * @type {ProgramDetail}
   */
  @observable program;
  /**
   * @type {string|null}
   */
  @observable currentPlayingSrc;

  constructor () {
    this._privateAPI = new OnsenPrivateAPI();
  }

  updateProgram(programId) {
    return this._privateAPI.program(programId, Context.oauthAccessToken).then((response) => {
      this.program = response;
      const initialEpisode = this.program.episodes[0];
      const initialEpisodeFile = initialEpisode.episode_files[0];
      this.play(initialEpisode.id, initialEpisodeFile.id);
    });
  }

  play(episodeId, episodeFileId) {
    this.currentPlayingSrc = this._getSrc(episodeId, episodeFileId);
  }

  _getSrc(episodeId, episodeFileId) {
    const episode = this.program.episodes.find((episode) => episode.id === episodeId);
    if (!episode) {
      return null;
    }
    const episodeFile = episode.episode_files.find((episodeFile) => episodeFile.id === episodeFileId);
    if (!episodeFile) {
      return null;
    }
    return episodeFile.media_url;
  }
}

const player = new PlayerState;
export { player }
