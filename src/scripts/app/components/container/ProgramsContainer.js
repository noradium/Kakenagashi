import React from 'react'
import { observer } from 'mobx-react'
import { programs } from '../../states/ProgramsState';
import { player } from '../../states/PlayerState';
import { user } from '../../states/UserState';
import Program from "../common/Program";

@observer
class ProgramsContainer extends React.Component {
  /**
   * @enum
   */
  static Filter = {
    Monday: 'monday',
    Tuesday: 'tuesday',
    Wednesday: 'wednesday',
    Thursday: 'thursday',
    Friday: 'friday',
    Holiday: 'holiday',
    FavoriteProgram: 'favorite_program',
    FavoritePerformer: 'favorite_performer'
  };

  constructor() {
    super();
    this.state = {
      currentFilter: null
    };
  }

  render() {
    /** @type Program[] */
    const programList = this._filterPrograms(programs.list);
    if (!programList) {
      return null;
    }
    return <div className="ProgramsContainer">
      <div className="ProgramsContainer_Filter">
        {Object.keys(ProgramsContainer.Filter).map(filterKey => {
          const filterValue = ProgramsContainer.Filter[filterKey];
          const text = (() => {
            switch (filterValue) {
              case ProgramsContainer.Filter.Monday:
                return '月';
              case ProgramsContainer.Filter.Tuesday:
                return '火';
              case ProgramsContainer.Filter.Wednesday:
                return '水';
              case ProgramsContainer.Filter.Thursday:
                return '木';
              case ProgramsContainer.Filter.Friday:
                return '金';
              case ProgramsContainer.Filter.Holiday:
                return '土日';
              case ProgramsContainer.Filter.FavoriteProgram:
                return 'お気に入り番組';
              case ProgramsContainer.Filter.FavoritePerformer:
                return 'お気に入り声優';
            }
          })();
          return <div
            key={filterKey}
            className={`ProgramsContainer_Filter_Item ${this.state.currentFilter === filterValue ? 'is-selected' : ''}`}
            onClick={() => this._onFilterClick(ProgramsContainer.Filter[filterKey])}
          >
            {text}
          </div>;
        })}
      </div>
      <div className="ProgramsContainer_List">
        {programList.map((program) => <Program
          key={program.id}
          imageURL={program.program_image_url}
          title={program.title}
          performers={program.performers}
          isNew={program.new}
          hasGuest={program.has_guest}
          onClick={() => this._onClick(program.id)}
        />)}
      </div>
    </div>;
  }

  componentDidMount() {
    programs.update();
  }

  /**
   * @return {Program[]}
   */
  _filterPrograms(programs) {
    if (!programs) {
      return [];
    }
    return programs.filter(program => {
      switch (this.state.currentFilter) {
        case ProgramsContainer.Filter.Monday:
          return 1 === program.program_delivery_day_of_week;
        case ProgramsContainer.Filter.Tuesday:
          return 2 === program.program_delivery_day_of_week;
        case ProgramsContainer.Filter.Wednesday:
          return 3 === program.program_delivery_day_of_week;
        case ProgramsContainer.Filter.Thursday:
          return 4 === program.program_delivery_day_of_week;
        case ProgramsContainer.Filter.Friday:
          return 5 === program.program_delivery_day_of_week;
        case ProgramsContainer.Filter.Holiday:
          return 6 === program.program_delivery_day_of_week;
        case ProgramsContainer.Filter.FavoriteProgram:
          return !user.favorites || user.favorites.program_ids.includes(program.id);
        case ProgramsContainer.Filter.FavoritePerformer:
          return !user.favorites || program.performers.some(performer => user.favorites.performer_ids.includes(performer.id));
        default:
          return true;
      }
    });
  }

  _onClick = (programId) => {
    player.updateProgram(programId)
      .then(() => {
        window.scroll({ top: 0, behavior: 'smooth' });
      });
  };

  _onFilterClick = (filter) => {
    if (this.state.currentFilter === filter) {
      this.setState({
        currentFilter: null
      });
      return;
    }
    if (
      filter === ProgramsContainer.Filter.FavoriteProgram ||
      filter === ProgramsContainer.Filter.FavoritePerformer
    ) {
      user.fetchFavorites();
    }
    this.setState({
      currentFilter: filter
    });
  };
}

export { ProgramsContainer }
