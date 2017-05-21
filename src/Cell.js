import React from 'react';
import ReactDOM from 'react-dom';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    // This optimization gave a 10% performance boost while drag-selecting
    // cells
    return this.props.beingSelected !== nextProps.beingSelected ||
      this.props.selected !== nextProps.selected;
  }

  componentDidMount() {
    // We need to call addEventListener ourselves so that we can pass
    // {passive: false}
    const td = ReactDOM.findDOMNode(this);
    td.addEventListener(
      'touchstart',
      this.handleTouchStart,
      {passive: false}
    );
    td.addEventListener(
      'touchmove',
      this.handleTouchMove,
      {passive: false}
    );
  }

  componentWillUnmount() {
    const td = ReactDOM.findDOMNode(this);
    td.removeEventListener('touchstart', this.handleTouchStart);
    td.removeEventListener('touchmove', this.handleTouchMove);
  }

  render() {
    let {
      className, disabled, beingSelected, selected, onTouchStart, onTouchMove,
      ...props
    } = this.props;
    if (disabled) {
      className += ' cell-disabled';
    } else {
      className += ' cell-enabled';
      if (selected) {
        className += ' cell-selected';
      }
      if (beingSelected) {
        className += ' cell-being-selected';
      }
    }
    return (
      <td
        className={className}
        onMouseDown={this.handleTouchStart}
        onMouseMove={this.handleTouchMove}
        {...props}
      >
        {this.props.children}
      </td>
    );
  }

  handleTouchStart(e) {
    if (!this.props.disabled) {
      this.props.onTouchStart(e);
    }
  }

  handleTouchMove(e) {
    if (!this.props.disabled) {
      this.props.onTouchMove(e);
    }
  }
}
