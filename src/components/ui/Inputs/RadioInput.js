
import React, { Component } from 'react';
import styled, { withTheme } from 'styled-components/macro';
import PropTypes from 'prop-types';

const RadioWrapper = styled.div`
  align-items: center;
  display: inline-flex;
  justify-content: center;
  height: 2rem;
  position: relative;
  width: 2rem;
`;

const StyledRadio = styled.input.attrs({
  type: 'radio',
})`
  bottom: 0;
  cursor: ${props => props.disabled ? 'default' : 'pointer'};
  height: 100%;
  left: 0;
  margin: 0;
  opacity: 0;
  padding: 0;
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  z-index: 10;
`;

const RadioCircle = styled.div`
  background-color: ${props => props.theme.color_darkest};
  border-radius: 50%;
  height: 1rem;
  transition: 0.2s;
  transform: scale(0);
  width: 1rem;
`;

const RadioContent = styled.div`
  align-items: center;
  border: solid 0.1rem rgba(0, 0, 0, 0.25);
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  flex-shrink: 0;
  height: 2rem;
  justify-content: center;
  transition: 0.2s;
  width: 2rem;

  ${StyledRadio}:checked + & {
    background-color: ${props => props.theme.color_yellow_1};

    ${RadioCircle} {
      transform: scale(1);
    }
  }

  ${StyledRadio}:focus + &,
  ${StyledRadio}:active + & {
    outline-color: Highlight;
    outline-style: solid;
    outline-width: 2px;
  }

  ${StyledRadio}:disabled + & {
    outline: none;
  }
`;

const Label = styled.label`
  color: ${props => props.disabled ? props.theme.color_grey_dark : props.theme.color_darkest};
  cursor: ${props => props.disabled ? 'default' : 'pointer'};
  font-size: 1.4rem;
  padding-left: 1rem;
`;

class Radio extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    defaultChecked: PropTypes.bool,
    value: PropTypes.string.isRequired,
    label: PropTypes.string,
  }

  handleChange() {
    if (this.props.onChange) {
      this.props.onChange();
    }
  }

  render() {
    const {id, name, defaultChecked, value, label, disabled} = this.props;

    return (
      <div>
        <RadioWrapper>
          <StyledRadio
            tabIndex="0"
            id={id}
            name={name}
            value={value}
            onChange={() => this.handleChange()}
            defaultChecked={defaultChecked}
            disabled={disabled} />
          <RadioContent>
            <RadioCircle />
          </RadioContent>
        </RadioWrapper>
        <Label disabled={disabled} htmlFor={id}>{label}</Label>
      </div>
    );
  }
}

export default withTheme(Radio);
