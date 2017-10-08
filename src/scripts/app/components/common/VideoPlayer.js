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
      if (Hls.isSupported()) {
        this._hlsPlayer.loadSource(nextProps.src);
        this._hlsPlayer.attachMedia(this.videoNode);
      }
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

  render() {
    return (
      <div className="VideoPlayer">
        <video ref={ node => this.videoNode = node }/>
      </div>
    )
  }
}
