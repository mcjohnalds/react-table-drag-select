# react-table-drag-select

![Animation of the component](img/demo.gif)

[View the live demo.](https://mcjohnalds.github.io/react-table-drag-select)

  - Ultra fast
  - Good for user inputted timetables
  - Less than 5kB when gzipped

## Installation

```sh
npm i -S react-table-drag-select
```

## Basic usage

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import TableDragSelect from 'react-table-drag-select'

// A table like what is seen in the gif
function App() {
  return (
    <TableDragSelect onChange={e => console.log(e)}>
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

ReactDOM.render(<App />, document.getElementById('timetable'));
```

Thanks to the `onChange` handler, whenever the user changes the selected cells,
the above example prints stuff like

```js
{
  cellsSelected: [
    [true, false, false, false, false, false],
    [true, false, false, false, false, false],
    [true,  true, false, false,  true, false],
    [true,  true, false, false,  true, false],
    [true,  true, false, false, false, false],
    [true,  true, false, false, false, false],
    [true, false, false, false, false, false]
  ]
}
```

## Clearing all cells

The component can pass you a function which clears all cells.

```jsx
class App extends React.Component {
  return (
    <div>
      <TableDragSelect clearRef={clear => this.clearTable = clear}>
        ...
      </TableDragSelect>
      <button onClick={e => this.clearTable()}>Reset cells</button>
    <div>
  );
}
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

## CSS

Copy `node_modules/react-table-drag-select/table-drag-select.css` into
your static folder and link to it in your html.

The default theme is flexible but you'll want to change the colors. This can be
done by editing the nicely commented `table-drag-select.css`, or by adding some
global css rules:

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
```

## Contributing

[Open an issue on github](https://github.com/mcjohnalds/react-table-drag-select/issues/new)
or submit a pull request (remember to run `npm test` first)
