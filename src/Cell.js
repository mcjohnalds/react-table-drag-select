import React from "react";

export default class extends React.Component {
  // This optimization gave a 10% performance boost while drag-selecting
  // cells
  shouldComponentUpdate = nextProps =>
    this.props.beingSelected !== nextProps.beingSelected ||
    this.props.selected !== nextProps.selected;

  componentDidMount = () => {
    // We need to call addEventListener ourselves so that we can pass
    // {passive: false}
    this.td.addEventListener("touchstart", this.handleTouchStart, {
      passive: false
    });
    this.td.addEventListener("touchmove", this.handleTouchMove, {
      passive: false
    });
  };

  componentWillUnmount = () => {
    this.td.removeEventListener("touchstart", this.handleTouchStart);
    this.td.removeEventListener("touchmove", this.handleTouchMove);
  };

  render = () => {
    let {
      className,
      disabled,
      beingSelected,
      selected,
      onTouchStart,
      onTouchMove,
      ...props
    } = this.props;
    if (disabled) {
      className += " cell-disabled";
    } else {
      className += " cell-enabled";
      if (selected) {
        className += " cell-selected";
      }
      if (beingSelected) {
        className += " cell-being-selected";
      }
    }
    return (
      <td
        ref={td => (this.td = td)}
        className={className}
        onMouseDown={this.handleTouchStart}
        onMouseMove={this.handleTouchMove}
        {...props}
      >
        {this.props.children}&nbsp;
      </td>
    );
  };

  handleTouchStart = e => {
    if (!this.props.disabled) {
      this.props.onTouchStart(e);
    }
  };

  handleTouchMove = e => {
    if (!this.props.disabled) {
      this.props.onTouchMove(e);
    }
  };
}
