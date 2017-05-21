import React from 'react';
import equal from 'deep-is';
import Model from './Model';
import Cell from './Cell';
import eventToCellLocation from './eventToCellLocation';

export default class extends React.Component {
  constructor(props) {
    super(props);
    const {rows, columns} = this.getChildrenDimensions();
    this.rows = rows;
    this.columns = columns;
    if (this.rows === 0) {
      return;
    }
    if (this.props.onChange !== undefined &&
      typeof this.props.onChange !== 'function')
    {
      throw Error('onChange must be a function');
    }
    this.state = {model: this.initModel()};
    this.validateChildren();
    this.clear = this.clear.bind(this);
    this.handleTouchEndWindow = this.handleTouchEndWindow.bind(this);
    this.handleTouchStartCell = this.handleTouchStartCell.bind(this);
    this.handleTouchMoveCell = this.handleTouchMoveCell.bind(this);
    if (this.props.clearRef) {
      this.props.clearRef(this.clear);
    }
  }

  componentDidMount() {
    window.addEventListener('mouseup', this.handleTouchEndWindow);
    window.addEventListener('touchend', this.handleTouchEndWindow);
  }

  componentWillUnmount() {
    window.removeEventListener('mouseup', this.handleTouchEndWindow);
    window.removeEventListener('touchend', this.handleTouchEndWindow);
  }

  shouldComponentUpdate(nextProps, nextState) {
    // This optimization also reduced JS execution time by 25% when
    // drag-selecting cells.
    return !this.state.model.equals(nextState.model);
  }

  componentDidUpdate(prevProps, prevState) {
    // Call this.props.onChange() if selected cells changed
    const prevCells = prevState.model.getCellsSelected();
    const cells = this.state.model.getCellsSelected();
    if (this.props.onChange && !equal(prevCells, cells)) {
      this.props.onChange({
        cellsSelected: cells
      });
    }
  }

  render() {
    const {onChange, clearRef, ...props} = this.props;
    return (
      <div className="table-drag-select">
        <table {...props}>
          <tbody>
            {this.modifyChildren()}
          </tbody>
        </table>
      </div>
    );
  }

  clear() {
    const model = this.state.model.clone();
    model.clear();
    this.setState({model});
  }

  // Creates children elements based on the user inputed this.props.children.
  //
  //   - Adds event listeners to children.
  //   - Sets disabled, beingSelected, and selected props on children based on
  //     this.state and this.props.
  modifyChildren() {
    return React.Children.map(this.props.children, (tr, i) => {
      const cells = React.Children.map(tr.props.children, (cell, j) => {
        return (
          <Cell
            onTouchStart={this.handleTouchStartCell}
            onTouchMove={this.handleTouchMoveCell}
            selected={this.state.model.getCellsSelected()[i][j]}
            beingSelected={this.state.model.getCellsBeingSelected()[i][j]}
            {...cell.props}
          >
            {cell.props.children}
          </Cell>
        );
      });
      return (
        <tr {...tr.props}>
          {cells}
        </tr>
      );
    });
  }

  // Throws an error if the structure of this.props.children is wrong
  validateChildren() {
    for (const tr of this.props.children) {
      if (tr.type !== 'tr') {
        throw TypeError('A <TableDragSelect> must only contain <tr> children');
      }
      if (React.Children.count(tr.props.children) !== this.columns) {
        throw TypeError('All rows must have the same number of columns');
      }
      for (const cell of tr.props.children) {
        if (cell instanceof Cell) {
          throw TypeError('A <tr> must only contain <Cell> children');
        }
      }
    }
  }

  // Create and return a suitable Model
  initModel() {
    // Init model based on what cells are already selected
    const model = new Model(this.rows, this.columns);
    React.Children.map(this.props.children, (tr, i) => {
      React.Children.map(tr.props.children, (Cell, j) => {
        if (Cell.props.selected) {
          model.startSelection(i, j);
          model.finishSelection();
        }
      });
    });
    return model;
  }

  // Returns the number of rows and columns of this.props.children
  getChildrenDimensions() {
    const rows = React.Children.count(this.props.children);
    if (rows === 0) {
      return {rows: 0, columns: 0};
    }
    const firstRow = this.props.children[0];
    const columns = React.Children.count(firstRow.props.children);
    return {rows, columns};
  }

  handleTouchEndWindow(e) {
    if (e.type === 'mouseup' && e.button !== 0) {
      return;
    }
    const model = this.state.model.clone();
    model.finishSelection();
    this.setState({model});
  }

  handleTouchStartCell(e) {
    if (e.type === 'mousedown' && e.button !== 0) {
      return;
    }
    e.preventDefault();
    const {row, column} = eventToCellLocation(e);
    const model = this.state.model.clone();
    model.startSelection(row, column);
    this.setState({model});
  }

  handleTouchMoveCell(e) {
    e.preventDefault();
    const {row, column} = eventToCellLocation(e);
    const model = this.state.model.clone();
    model.updateSelection(row, column);
    this.setState({model});
  }
}
