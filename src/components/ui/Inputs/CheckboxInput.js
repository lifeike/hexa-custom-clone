import React, { Component } from 'react';
import styled, { withTheme } from 'styled-components/macro';
import PropTypes from 'prop-types';

import Icon from '@/components/ui/Icons/Icon';

const CheckboxContainer = styled.div`
  display: flex;
`;

const CheckboxWrapper = styled.div`
  align-items: center;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  height: 2.4rem;
  position: relative;
  width: 2.4rem;

  &:focus,
  &:active {
    outline-color: Highlight;
    outline-style: solid;
    outline-width: 2px;
  }
`;

const StyledCheckbox = styled.input.attrs({
  type: 'checkbox',
  className: "visuallyHidden",
})`
  bottom: 0;
  cursor: pointer;
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

const Label = styled.label`
  cursor: pointer;
  font-size: 1.4rem;
  font-weight: ${props => props.theme.font_weight_bold};
  line-height: 1.7;
  padding-left: 1rem;
`;

const Checkmark = styled.div`
  transition: 0.2s;
  transform: scale(0);
`;

const CheckboxContent = styled.div`
  align-items: center;
  border: solid 0.1rem rgba(0, 0, 0, 0.25);
  display: flex;
  flex-shrink: 0;
  height: 2.4rem;
  justify-content: center;
  transition: 0.2s;
  width: 2.4rem;

  ${StyledCheckbox}:checked + & {
    background-color: ${props => props.theme.color_yellow_1};

    ${Checkmark} {
      transform: scale(1);
    }
  }
`;

class Checkbox extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    defaultChecked: PropTypes.bool,
    value: PropTypes.string.isRequired,
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
  }

  constructor(props) {
    super(props);

    this.checkbox = React.createRef();
  }

  handleKeyDown(e) {
    if (e.keyCode === 32){
      this.handleChange(true);
    }
  }

  handleChange(setValue) {
    let checked = this.checkbox.current.checked;

    if (setValue) {
      checked = !checked;
      this.checkbox.current.checked = checked;
    }

    if (this.props.onChange) {
      this.props.onChange(checked);
    }
  }

  render() {
    const {id, name, defaultChecked, value, label} = this.props;

    return (
      <CheckboxContainer>
        <CheckboxWrapper tabIndex="0" onKeyDown={e => this.handleKeyDown(e)} onClick={() => this.handleChange(true)}>
          <StyledCheckbox
            ref={this.checkbox}
            tabIndex="-1"
            id={id}
            name={name}
            value={value}
            onChange={e => this.handleChange()}
            defaultChecked={defaultChecked}
          />
          <CheckboxContent>
            <Checkmark>
              <Icon size={12} name="circleCheck" />
            </Checkmark>
          </CheckboxContent>
        </CheckboxWrapper>
        <Label onClick={() => this.handleChange(true)}>{label}</Label>
      </CheckboxContainer>
    );
  }
}

export default withTheme(Checkbox);
