import React from "react";
import ReactDOM from "react-dom";
import equal from "deep-is";
import TableDragSelect from "./index.js";
import "./style.css"; // TableDragSelect stylesheet
import "./demo.css"; // Demo stylesheet

const jsCode = `class App extends React.Component {
  state = {
    cells: [
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

  render = () =>
    <div>
      <TableDragSelect value={this.state.cells} onChange={this.handleChange}>
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
      <button onClick={this.handleClick}>Reset</button>
    </div>;

  handleChange = cells => this.setState({ cells });

  handleClick = () => {
    const cells = [
      [false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false]
    ];
    this.setState({ cells });
  };
}`;

const cssCode = `/* Cells that can be interacted with */
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
}`;

const resultingDOM = `<div>
  <table class="table-drag-select">
    <tbody>
      <tr>
        <td class="cell-disabled" />
        <td class="cell-disabled">Monday</td>
        <td class="cell-disabled">Tuesday</td>
        <td class="cell-disabled">Wednesday</td>
        <td class="cell-disabled">Thursday</td>
        <td class="cell-disabled">Friday</td>
        <td class="cell-disabled">Saturday</td>
      </tr>
      <tr>
        <td class="cell-disabled">10:00</td>
        <td class="cell-enabled" />
        <td class="cell-enabled" />
        <td class="cell-enabled" />
        <td class="cell-enabled" />
        <td class="cell-enabled" />
        <td class="cell-enabled">overtime</td>
      </tr>
      <tr>
        <td class="cell-disabled">11:00</td>
        <td class="cell-enabled" />
        <td class="cell-enabled" />
        <td class="cell-enabled" />
        <td class="cell-enabled" />
        <td class="cell-enabled" />
        <td class="cell-enabled">overtime</td>
      </tr>
      <tr>
        <td class="cell-disabled">12:00</td>
        <td class="cell-enabled" />
        <td class="cell-enabled" />
        <td class="cell-enabled" />
        <td class="cell-enabled" />
        <td class="cell-enabled" />
        <td class="cell-enabled">overtime</td>
      </tr>
      <tr>
        <td class="cell-disabled">13:00</td>
        <td class="cell-enabled" />
        <td class="cell-enabled" />
        <td class="cell-enabled" />
        <td class="cell-enabled" />
        <td class="cell-enabled" />
        <td class="cell-enabled">overtime</td>
      </tr>
      <tr>
        <td class="cell-disabled">14:00</td>
        <td class="cell-enabled" />
        <td class="cell-enabled" />
        <td class="cell-enabled" />
        <td class="cell-enabled" />
        <td class="cell-enabled" />
        <td class="cell-enabled">overtime</td>
      </tr>
      <tr>
        <td class="cell-disabled">15:00</td>
        <td class="cell-enabled" />
        <td class="cell-enabled" />
        <td class="cell-enabled" />
        <td class="cell-enabled" />
        <td class="cell-enabled" />
        <td class="cell-enabled">overtime</td>
      </tr>
      <tr>
        <td class="cell-disabled">16:00</td>
        <td class="cell-enabled" />
        <td class="cell-enabled" />
        <td class="cell-enabled" />
        <td class="cell-enabled" />
        <td class="cell-enabled" />
        <td class="cell-enabled">overtime</td>
      </tr>
    </tbody>
  </table>
  <button>Reset</Reset>
</div>`;

class App extends React.Component {
  state = {
    cells: [
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

  render = () =>
    <div>
      <h1>
        <a href="https://github.com/mcjohnalds/react-table-drag-select">
          <code>react-table-drag-select</code>
        </a>{" "}
        demo
      </h1>
      <h2>Timetable</h2>
      <div className="table-container">
        <TableDragSelect value={this.state.cells} onChange={this.handleChange}>
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
      <button onClick={this.handleReset}>Reset</button>
      <h2>
        <code>{"onChange={cells => ...}"}</code> callback
      </h2>
      <pre ref="output">
        cells = {stringifyBoolMatrix(this.state.cells)}
      </pre>
      <h2>Javascript</h2>
      <pre>
        {jsCode}
      </pre>
      <h2>Optional styling</h2>
      <p>
        This isn't required, but changing the colors can really spruce things
        up.
      </p>
      <pre>
        {cssCode}
      </pre>
      <h2>Resulting DOM</h2>
      <pre>
        {resultingDOM}
      </pre>
    </div>;

  handleChange = cells => {
    if (!equal(this.state.cells, cells)) {
      this.restartFlashAnimation();
      this.setState({ cells });
    }
  };

  handleReset = () => {
    const cells = [
      [false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false]
    ];
    if (!equal(this.state.cells, cells)) {
      this.restartFlashAnimation();
      this.setState({ cells });
    }
  };

  restartFlashAnimation = () => {
    this.refs.output.classList.remove("flash");
    setTimeout(() => this.refs.output.classList.add("flash"), 50);
  };
}

// Takes a 2D array of booleans and returns a pretty-printed string
const stringifyBoolMatrix = matrix => {
  const row2Str = row => {
    return row.map(cell => (cell ? " true" : "false")).join(", ");
  };

  return "[\n  [" + matrix.map(row2Str).join("],\n  [") + "]\n]";
};

const div = document.createElement("div");
document.body.appendChild(div);
ReactDOM.render(<App />, div);
