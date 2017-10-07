import React from 'react';
import PropTypes from 'prop-types';
import {PropTypes as MobxPropTypes} from 'mobx-react';

export default class Program extends React.Component {
  static propTypes = {
    imageURL: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    performers: MobxPropTypes.arrayOrObservableArrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    })).isRequired,
    isNew: PropTypes.bool.isRequired,
    hasGuest: PropTypes.bool.isRequired,
    onClick: PropTypes.func
  };

  render() {
    return <div className="Program" onClick={this.props.onClick}>
      <div className="Program_Thumbnail">
        <img className="Program_Thumbnail_Image" src={this.props.imageURL} alt={this.props.title}/>
      </div>
      <div className="Program_Title">
        {this.props.title}
      </div>
      <div className="Program_Performers">
        {this.props.performers.map(performer => {
          return <span className="Program_Performers_Performer" key={performer.id}>
              {performer.name}
          </span>;
        })}
      </div>
    </div>;
  }
}
