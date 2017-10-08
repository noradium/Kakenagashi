import React from 'react';
import PropTypes from 'prop-types';
import Hls from 'hls.js/lib/hls';
import plyr from 'plyr';

export default class VideoPlayer extends React.Component {
  static propTypes = {
    src: PropTypes.string,
    poster: PropTypes.string
  };

  _hlsPlayer;

  componentWillReceiveProps(nextProps) {
    if (this.props.src !== nextProps.src && nextProps.src) {
      this.videoNode.poster = nextProps.poster;
      this._hlsPlayer.loadSource(nextProps.src);
      this._hlsPlayer.attachMedia(this.videoNode);
    }
  }

  componentDidMount() {
    if (Hls.isSupported()) {
      this._hlsPlayer = new Hls();
      this._hlsPlayer.on(Hls.Events.MANIFEST_PARSED, () => {
        this.videoNode.play();
      });
    }

    plyr.setup(this.videoNode);
  }

  // destroy player on unmount
  componentWillUnmount() {
    // if (this.player) {
    //   this.player.dispose()
    // }
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    return (
      <div className="VideoPlayer">
        <video ref={ node => this.videoNode = node }/>
      </div>
    )
  }
}
