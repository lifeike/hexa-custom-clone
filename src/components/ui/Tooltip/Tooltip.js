import React, { Component } from 'react';
import styled from 'styled-components/macro';

const Element = styled.div`
  background-color: ${props => props.theme.color_white};
  bottom: 0;
  box-shadow: 0 .3rem 1rem 0 rgba(0, 0, 0, 0.23);
  ${props => props.rightAligned ? 'right: 0' : 'left: 0'};
  padding: 1.2rem 1.6rem;
  position: absolute;
  transform: translateY(100%);
  width: 15rem;
`;

export class Tooltip extends Component {
  constructor() {
    super();

    this.handleBodyClick = this.handleBodyClick.bind(this);
    this.tooltip = React.createRef();
  }

  componentDidMount() {
    document.body.addEventListener('click', this.handleBodyClick);
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.handleBodyClick);
  }


  handleBodyClick(e) {
    const tooltip = this.tooltip.current;
    const target = e.target;
    const button = this.props.buttonRef.current;

    if (target === button || button.contains(target)) {
      return;
    }

    if (target !== tooltip && !tooltip.contains(target)) {
      this.props.handleClose();
    }
  }

  render() {
    return (
      <Element {...this.props} ref={this.tooltip}>
        {this.props.children}
      </Element>
    );
  }
}

export default Tooltip;
