# react-tabular-multi-select

![Animation of the component](img/demo.gif)

[View the live demo.](https://mcjohnalds.github.io/react-tabular-select)

  - Runs fast
  - Good for making timetables
  - Efficient and intuitive way to handle user input of any large boolean matrix
  - Less than 5kB when gzipped

## Installation

```sh
npm i -S react-tabular-multi-select
```

## Basic usage

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import TabularMultiSelect from 'react-tabular-multi-select'

// A 7x6 table like what is seen in the gif
function App() {
  return (
    <TabularMultiSelect onChange={e => console.log(e)}>
      <tr><td /> <td /> <td /> <td /> <td /> <td /></tr>
      <tr><td /> <td /> <td /> <td /> <td /> <td /></tr>
      <tr><td /> <td /> <td /> <td /> <td /> <td /></tr>
      <tr><td /> <td /> <td /> <td /> <td /> <td /></tr>
      <tr><td /> <td /> <td /> <td /> <td /> <td /></tr>
      <tr><td /> <td /> <td /> <td /> <td /> <td /></tr>
      <tr><td /> <td /> <td /> <td /> <td /> <td /></tr>
    </TabularMultiSelect>
  );
}

ReactDOM.render(<App />, document.getElementById('timetable'));
```

Prints stuff like

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

The component can pass a function to its parent which clears all cells.

```jsx
class App extends React.Component {
  return (
    <div>
      <TabularMultiSelect clearRef={clear => this.clearTable = clear}>
        ...
      </TabularMultiSelect>
      <button onClick={this.clearTable}>Reset cells</button>
    <div>
  );
}
```

## Disabling some cells

You can disable some cells. Example:

```jsx
<TabularMutliSelect>
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
</TabularMultiSelect>
```

## CSS

Copy `node_modules/react-tabular-multi-select/tabular-multi-select.css` into
your static folder and link to it in your html.

The default theme is good for any website but you might want to change the
colors. This can be done by editing the nicely commented
`tabular-multi-select.css`, or by adding some global css rules:

```css
/* Cells that can be interacted with */
.tabular-multi-select td.cell-enabled {
  color: #806E52;
  background-color: #FBF1E8;
}

/* Cells that cannot be interacted with */
.tabular-multi-select td.cell-disabled {
  /* Put yer css here, or don't */
}

/* Cells that have been selected */
.tabular-multi-select td.cell-selected {
  background-color: #FBD5D4;
}

/* Cells that are in the process of being selected */
.tabular-multi-select td.cell-being-selected {
  background-color: #EACA96;
}
```

## Contributing

[Open an issue on github](https://github.com/mcjohnalds/react-tabular-multi-select/issues/new)
or submit a pull request (remember to run `npm test` first)
