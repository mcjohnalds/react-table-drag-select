// Takes a mouse or touch event and returns the corresponding row and cell.
// Example:
//
// > this._getCellLocationFromEvent({...})
// {row: 2, column: 3}
const eventToCellLocation = e => {
  let target;
  // For touchmove and touchend events, e.target and e.touches[n].target are
  // wrong, so we have to rely on elementFromPoint(). For mouse clicks, we have
  // to use e.target.
  if (e.touches) {
    const touch = e.touches[0];
    target = document.elementFromPoint(touch.clientX, touch.clientY);
  } else {
    target = e.target;
    while (target.tagName !== "TD") {
      target = target.parentNode;
    }
  }
  return getCellLocation(target);
};

// Take a <td> and return its row and column
const getCellLocation = tdElement => ({
  row: tdElement.parentNode.rowIndex,
  column: tdElement.cellIndex
});

export default eventToCellLocation;
