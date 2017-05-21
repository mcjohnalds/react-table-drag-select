import React from 'react';
import ReactDOM from 'react-dom';
import TableDragSelect from '../src';
import '../table-drag-select.css';
import './style.css';

const jsCode = `import React from 'react';
import ReactDOM from 'react-dom';
import TableDragSelect from 'react-table-drag-select';

function App() {
  return (
    <TableDragSelect
      onChange={e => ... /* Your handler goes here */}
      clearRef={clear => ... /* clear() clears all cells */}
    >
      <tr>
        <td disabled />
        <td disabled>Monday</td>
        <td disabled>Tuesday</td>
        <td disabled>Wednesday</td>
        <td disabled>Thursday</td>
        <td disabled>Friday</td>
        <td disabled>Saturday</td>
      </tr>
      <tr>
        <td disabled>10:00</td>
        <td />
        <td />
        <td />
        <td />
        <td />
        <td>overtime</td>
      </tr>
      <tr>
        <td disabled>11:00</td>
        <td />
        <td />
        <td />
        <td />
        <td />
        <td>overtime</td>
      </tr>
      <tr>
        <td disabled>12:00</td>
        <td />
        <td />
        <td />
        <td />
        <td />
        <td>overtime</td>
      </tr>
      <tr>
        <td disabled>13:00</td>
        <td />
        <td />
        <td />
        <td />
        <td />
        <td>overtime</td>
      </tr>
      <tr>
        <td disabled>14:00</td>
        <td />
        <td />
        <td />
        <td />
        <td />
        <td>overtime</td>
      </tr>
      <tr>
        <td disabled>15:00</td>
        <td />
        <td />
        <td />
        <td />
        <td />
        <td>overtime</td>
      </tr>
      <tr>
        <td disabled>16:00</td>
        <td />
        <td />
        <td />
        <td />
        <td />
        <td>overtime</td>
      </tr>
    </TableDragSelect>
  );
}

ReactDOM.render(<App />, document.getElementById('timetable'));`;

const resultingDOM = `<div id="timetable">
  <table className="table-drag-select">
    <tbody>
      <tr>
        <td className="cell-disabled" />
        <td className="cell-disabled">Monday</td>
        <td className="cell-disabled">Tuesday</td>
        <td className="cell-disabled">Wednesday</td>
        <td className="cell-disabled">Thursday</td>
        <td className="cell-disabled">Friday</td>
        <td className="cell-disabled">Saturday</td>
      </tr>
      <tr>
        <td className="cell-disabled">10:00</td>
        <td className="cell-enabled"/>
        <td className="cell-enabled"/>
        <td className="cell-enabled"/>
        <td className="cell-enabled"/>
        <td className="cell-enabled"/>
        <td className="cell-enabled">overtime</td>
      </tr>
      <tr>
        <td className="cell-disabled">11:00</td>
        <td className="cell-enabled"/>
        <td className="cell-enabled"/>
        <td className="cell-enabled"/>
        <td className="cell-enabled"/>
        <td className="cell-enabled"/>
        <td className="cell-enabled">overtime</td>
      </tr>
      <tr>
        <td className="cell-disabled">12:00</td>
        <td className="cell-enabled"/>
        <td className="cell-enabled"/>
        <td className="cell-enabled"/>
        <td className="cell-enabled"/>
        <td className="cell-enabled"/>
        <td className="cell-enabled">overtime</td>
      </tr>
      <tr>
        <td className="cell-disabled">13:00</td>
        <td className="cell-enabled"/>
        <td className="cell-enabled"/>
        <td className="cell-enabled"/>
        <td className="cell-enabled"/>
        <td className="cell-enabled"/>
        <td className="cell-enabled">overtime</td>
      </tr>
      <tr>
        <td className="cell-disabled">14:00</td>
        <td className="cell-enabled"/>
        <td className="cell-enabled"/>
        <td className="cell-enabled"/>
        <td className="cell-enabled"/>
        <td className="cell-enabled"/>
        <td className="cell-enabled">overtime</td>
      </tr>
      <tr>
        <td className="cell-disabled">15:00</td>
        <td className="cell-enabled"/>
        <td className="cell-enabled"/>
        <td className="cell-enabled"/>
        <td className="cell-enabled"/>
        <td className="cell-enabled"/>
        <td className="cell-enabled">overtime</td>
      </tr>
      <tr>
        <td className="cell-disabled">16:00</td>
        <td className="cell-enabled"/>
        <td className="cell-enabled"/>
        <td className="cell-enabled"/>
        <td className="cell-enabled"/>
        <td className="cell-enabled"/>
        <td className="cell-enabled">overtime</td>
      </tr>
    </tbody>
  </table>
</div>
`;

const cssCode = `<link rel="stylesheet" href="table-drag-select.css">
<style>
  /* Cells that can be interacted with */
  .table-drag-select td.cell-enabled {
    color: #806E52;
    background-color: #FBF1E8;
  }
  
  /* Cells that cannot be interacted with */
  .table-drag-select td.cell-disabled {
    /* Put yer css here */
  }
  
  /* Cells that have been selected */
  .table-drag-select td.cell-selected {
    background-color: #FBD5D4;
  }
  
  /* Cells that are in the process of being selected */
  .table-drag-select td.cell-being-selected {
    background-color: #EACA96;
  }
  
  /* Cells in first row */
  .table-drag-select tr:first-child td {
    /* Remove empty space at top of table */
    border-top: 0;
    line-height: 1rem;
  }
  
  /* Cells in first column */
  .table-drag-select td:first-child {
    /* Consume less whitespace */
    width: 3rem;
  }
</style>`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cellsSelected: [
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false]
      ] 
    };
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    return (
      <div>
        <h1>
          <a href="https://github.com/mcjohnalds/react-table-drag-select">
            <code>react-table-drag-select</code>
          </a> demo
        </h1>
        <h2>Timetable</h2>
        <div className="table-container">
          <TableDragSelect
            onChange={this.handleChange}
            clearRef={clear => this.clearTable = clear}
          >
            <tr>
              <td disabled />
              <td disabled>Monday</td>
              <td disabled>Tuesday</td>
              <td disabled>Wednesday</td>
              <td disabled>Thursday</td>
              <td disabled>Friday</td>
              <td disabled>Saturday</td>
            </tr>
            <tr>
              <td disabled>10:00</td>
              <td />
              <td />
              <td />
              <td />
              <td />
              <td>overtime</td>
            </tr>
            <tr>
              <td disabled>11:00</td>
              <td />
              <td />
              <td />
              <td />
              <td />
              <td>overtime</td>
            </tr>
            <tr>
              <td disabled>12:00</td>
              <td />
              <td />
              <td />
              <td />
              <td />
              <td>overtime</td>
            </tr>
            <tr>
              <td disabled>13:00</td>
              <td />
              <td />
              <td />
              <td />
              <td />
              <td>overtime</td>
            </tr>
            <tr>
              <td disabled>14:00</td>
              <td />
              <td />
              <td />
              <td />
              <td />
              <td>overtime</td>
            </tr>
            <tr>
              <td disabled>15:00</td>
              <td />
              <td />
              <td />
              <td />
              <td />
              <td>overtime</td>
            </tr>
            <tr>
              <td disabled>16:00</td>
              <td />
              <td />
              <td />
              <td />
              <td />
              <td>overtime</td>
            </tr>
          </TableDragSelect>
        </div>
        <button onClick={this.clearTable}>Reset</button>
        <h2><code>{'onChange={e => ...}'}</code> callback</h2>
        <pre ref="output">
          e.cellsSelected = {stringifyBoolMatrix(this.state.cellsSelected)}
        </pre>
        <h2>JS code</h2>
        <pre>{jsCode}</pre>
        <h2>Resulting DOM</h2>
        <pre>{resultingDOM}</pre>
        <h2>CSS</h2>
        <pre>{cssCode}</pre>
      </div>
    );
  }

  handleChange(e) {
    this.setState({cellsSelected: e.cellsSelected});
    // Restart flash animation
    this.refs.output.classList.remove('flash');
    setTimeout(() => this.refs.output.classList.add('flash'), 50);
  }
}

// Takes a 2D array of booleans and returns a pretty-printed string
function stringifyBoolMatrix(matrix) {
  return '[\n  [' + matrix.map(row2Str).join('],\n  [') + ']\n]';

  function row2Str(row) {
    return row.map(cell => cell ? ' true' : 'false').join(', ');
  }
}

const div = document.createElement('div');
document.body.appendChild(div);
ReactDOM.render(<App />, div);
