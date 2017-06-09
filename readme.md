# react-table-drag-select

![Animation of the component](img/demo.gif)

[View the live demo with code.](https://mcjohnalds.github.io/react-table-drag-select)

  - Ultra fast
  - Good for user inputted timetables
  - Less than 5kB when gzipped

## Installation

```sh
npm i -S react-table-drag-select
```

## Import

```jsx
import React from 'react';
import TableDragSelect from 'react-table-drag-select';
import 'react-table-drag-select/style.css';
// Assumes your using webpack, css-loader, and style-loader, if not, just copy
// the stylesheet into your project and use a <link> tag in your HTML
```

## Basic usage

```jsx
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      model: new TableDragSelect.Model(5, 5) // Specify rows and columns
    };
    this.handleModelChange = this.handleModelChange.bind(this);
  }

  render() {
    return (
      <TableDragSelect
        model={this.state.model}
        onModelChange={this.handleModelChange}
      >
        <tr>
          <td />
          <td />
          <td />
          <td />
          <td />
        </tr>
        <tr>
          <td />
          <td />
          <td />
          <td />
          <td />
        </tr>
        <tr>
          <td />
          <td />
          <td />
          <td />
          <td />
        </tr>
        <tr>
          <td />
          <td />
          <td />
          <td />
          <td />
        </tr>
        <tr>
          <td />
          <td />
          <td />
          <td />
          <td />
        </tr>
      </TableDragSelect>
    );
  }

  handleModelChange(model) {
    this.setState({model});
    console.log(model.getCellsSelected());
  }
}

const div = document.createElement('div');
document.body.appendChild(div);
ReactDOM.render(<App />, div);
```

Thanks to the `onModelChange` handler, whenever the user changes the selected
cells, the above example prints stuff like:

```js
[
  [true, false, false, false, false, false],
  [true, false, false, false, false, false],
  [true,  true, false, false,  true, false],
  [true,  true, false, false,  true, false],
  [true,  true, false, false, false, false],
  [true,  true, false, false, false, false],
  [true, false, false, false, false, false]
]
```

Selected cells are `true`, unselected cells are `false`.

## Clearing all cells

`onModelChange` passes back a `TableDragSelect.Model` object which has some
handy functions, for example, you may want to clear all cells:

```jsx
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      model: new TableDragSelect.Model(8, 7) // Specify rows and columns
    };
    this.handleModelChange = this.handleModelChange.bind(this);
    this.resetTable = this.resetTable.bind(this);
  }

  render() {
    return (
      <div>
        <h2>Timetable</h2>
        <TableDragSelect
          model={this.state.model}
          onModelChange={this.handleModelChange}
        >
          ...
        </TableDragSelect>
        <button onClick={this.resetTable}>Reset</button>
      </div>
    );
  }

  handleModelChange(model) {
    this.setState({model});
    console.log(model.getCellsSelected());
  }

  resetTable() {
    let model = this.state.model.clone();
    model.clear();
    this.setState({model});
    console.log(model.getCellsSelected());
  }
}

const div = document.createElement('div');
document.body.appendChild(div);
ReactDOM.render(<App />, div);
```

## Disabling some cells

You can disable cells individually. Example:

```jsx
<TableDragSelect>
  <tr>
    <td disabled>This is disabled</td>
    <td disabled>This is disabled</td>
    <td disabled>This is disabled</td>
  </tr>
  <tr>
    <td disabled>This is disabled</td>
    <td>Not disabled</td>
    <td>Not disabled</td>
  </tr>
  <tr>
    <td disabled>This is disabled</td>
    <td>Not disabled</td>
    <td>Not disabled</td>
  </tr>
</TableDragSelect>
```

Now the cells in the first row and column are disabled.

## CSS

If you're using webpack, css-loader, and style-loader, then just
`import 'react-table-drag-select/style.css'`.

If not, copy `node_modules/react-table-drag-select/style.css` into your project
`<link>` to it in your html.

## Customizing styles

This isn't required, but changing the colors can really spruce things up.

```css
/* Cells that can be interacted with */
.table-drag-select td.cell-enabled {
  color: #806E52;
  background-color: #FBF1E8;
}

/* Cells that cannot be interacted with */
.table-drag-select td.cell-disabled {
  /* Put yer css here, or don't */
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
```

## Contributing

[Open an issue on github](https://github.com/mcjohnalds/react-table-drag-select/issues/new)
or submit a pull request (remember to run `npm test` first!)
