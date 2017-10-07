import React from 'react'
import { observer } from 'mobx-react'
import { programs } from '../../states/ProgramsState';
import { player } from '../../states/PlayerState';
import Program from "../common/Program";

@observer
class ProgramsContainer extends React.Component {
  render() {
    /** @type Program[] */
    const programList = programs.list;
    if (!programList) {
      return null;
    }
    return <div className="ProgramsContainer">
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

  _onClick = (programId) => {
    player.updateProgram(programId);
  }
}

export { ProgramsContainer }
