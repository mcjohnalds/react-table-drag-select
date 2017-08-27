# react-table-drag-select

![Animation of the component](img/demo.gif)

  - Ultra fast
  - Good for user inputted timetables
  - Less than 4kB when gzipped
  - Functionally and stylistically flexible

## Installation

```sh
npm install -S react-table-drag-select
```

## Basic example

This code was used to make the gif you see above.
[See the demo for advanced usage.](https://mcjohnalds.github.io/react-table-drag-select) 

```jsx
import React from "react";
import TableDragSelect from "react-table-drag-select";
import "react-table-drag-select/style.css";

class App extends React.Component {
  state = {
    cells: [
      [false, false, false, false, false, false],
      [false, false, false, false, false, false],
      [false, false, false, false, false, false],
      [false, false, false, false, false, false],
      [false, false, false, false, false, false],
      [false, false, false, false, false, false],
      [false, false, false, false, false, false]
    ]
  };

  render = () =>
    <TableDragSelect
      value={this.state.cells}
      onChange={cells => this.setState({ cells })}
    >
      <tr>
        <td />
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
        <td />
      </tr>
      <tr>
        <td />
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
        <td />
      </tr>
      <tr>
        <td />
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
        <td />
      </tr>
      <tr>
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
      </tr>
    </TableDragSelect>;
}
```
