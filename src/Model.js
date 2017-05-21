import clone from 'clone';
import equal from 'deep-is';

// The 'model' part of the model-view pattern
export default class {
  // Create a Model for the TableDragSelect with a number of rows and columns
  constructor(rows, columns) {
    this._rows = rows;
    this._columns = columns;
    this._resetSelectionMembers();
    this._resetSelectedCells();
  }

  // Returns an array indication which cells have been selected. For example
  // the return value
  //
  //   [ [false, false, true],
  //     [false, false, true] ]
  //
  // Indicates the last column is selected.
  getCellsSelected() {
    return this._cellsSelected;
  }

  // Returns an array indication which cells are being selected. For example
  // the return value
  //
  //   [ [false, false, true],
  //     [false, false, true] ]
  //
  // Indicates the last column is being selected.
  getCellsBeingSelected() {
    const cells = [];
    for (let i = 0; i < this._rows; i++) {
      cells.push([]);
      for (let j = 0; j < this._columns; j++) {
        cells[i][j] = this._isCellBeingSelected(i, j);
      }
    }
    return cells;
  }

  // Start a selection at a location. Does nothing if we are already selecting
  // cells.
  startSelection(row, column) {
    if (this._selectionStarted) {
      return;
    }
    this._selectionStarted = true;
    this._startRow = row;
    this._startColumn = column;
    this._endRow = row;
    this._endColumn = column;
    this._addMode = !this._cellsSelected[row][column];
  }

  // Update a selection. Does nothing if we aren't selected cells.
  updateSelection(row, column) {
    if (!this._selectionStarted) {
      return;
    }
    this._endRow = row;
    this._endColumn = column;
  }

  // Finish a selection at a location, marking cells under current selection as
  // selected. Does nothing when we aren't selecting cells.
  finishSelection() {
    if (!this._selectionStarted) {
      return;
    }
    const rect = this._getSelectionRectangle();
    for (let i = rect.minRow; i <= rect.maxRow; i++) {
      for (let j = rect.minColumn; j <= rect.maxColumn; j++) {
        this._cellsSelected[i][j] = this._addMode;
      }
    }
    this._resetSelectionMembers();
  }

  // Deselect all cells and stop any current active selection
  clear() {
    this._resetSelectionMembers();
    this._resetSelectedCells();
  }

  // Returns true iff this is the same as model
  equals(model) {
    return equal(this, model);
  }

  // Return a clone of this
  clone() {
    return clone(this);
  }

  // Is the cell at the given location currently under an selection?
  _isCellBeingSelected(row, column) {
    if (!this._selectionStarted) {
      return false;
    }
    // Axis-aligned bounding box test
    const rect = this._getSelectionRectangle();
    return row >= rect.minRow &&
      row <= rect.maxRow &&
      column >= rect.minColumn &&
      column <= rect.maxColumn;
  }

  // Return corners of an axis-aligned bounding box
  _getSelectionRectangle() {
    return {
      minRow: Math.min(this._startRow, this._endRow),
      maxRow: Math.max(this._startRow, this._endRow),
      minColumn: Math.min(this._startColumn, this._endColumn),
      maxColumn: Math.max(this._startColumn, this._endColumn)
    };
  }

  // Set members that handle the current state selection to their defaults
  _resetSelectionMembers() {
    // True when box select mode is active
    this._selectionStarted = false;
    // Where user began their selection box from
    this._startRow = null;
    this._startColumn = null;
    // Where the selection box is currently up to
    this._endRow = null;
    this._endColumn = null;
    // If you begin a selection from an unselected cell, addMode = true, if
    // toy begin a selection from an already selected cell,
    // addMode = false.
    this._addMode = null;
  }

  // Set this._cellsSelected to default
  _resetSelectedCells() {
    this._cellsSelected = [];
    for (let i = 0; i < this._rows; i++) {
      this._cellsSelected.push([]);
      for (let j = 0; j < this._columns; j++) {
        this._cellsSelected[i][j] = false;
      }
    }
  }
}
