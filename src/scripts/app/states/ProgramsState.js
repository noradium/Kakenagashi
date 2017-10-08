import { observable, computed } from 'mobx';
import OnsenPublicAPI from "../api/onsen/OnsenPublicAPI";
import OnsenPrivateAPI from "../api/onsen/OnsenPrivateAPI";

/**
 * @typedef {object} Performer
 * @property {number} id
 * @property {string} image_url
 * @property {string} description
 * @property {string} role
 * @property {string} display_role
 * @property {boolean} display
 * @property {number} display_order
 * @property {string} name
 * @property {string} name_kana
 */
/**
 * @typedef {object} Program
 * @property {number} id
 * @property {string} title
 * @property {boolean} free
 * @property {boolean} new
 * @property {boolean} brand_new
 * @property {string} directory_name
 * @property {boolean} display
 * @property {number} display_order
 * @property {number} api_display_order
 * @property {string} media_category
 * @property {number} serial
 * @property {boolean} has_guest
 * @property {string} program_image_url
 * @property {number} program_delivery_day_of_week
 * @property {Performer[]} performers
 */

class ProgramsState {
  /**
   * @type {OnsenPublicAPI}
   */
  _publicAPI;
  /**
   * @type {Program[]}
   */
  @observable list;
  /**
   * @type {string|null}
   */
  @observable currentFilter;

  constructor () {
    this._publicAPI = new OnsenPublicAPI();
    this._privateAPI = new OnsenPrivateAPI();
  }

  update() {
    return this._publicAPI.programs().then((response) => {
      this.list = response;
    });
  }
}

const programs = new ProgramsState;
export { programs }
