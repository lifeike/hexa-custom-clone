import React, { Component } from 'react';
import styled, { withTheme } from 'styled-components';
import { rhythm } from '@/utils/helpers';
import Icon from '@/components/ui/Icons/Icon';
import InputErrorMessage from '@/components/ui/ErrorMessage/InputErrorMessage';

const DropdownForm = styled.div`
  flex: 1;
`;

const Label = styled.label`
  color: ${props => props.theme.color_darkest};
  display: block;
  font-family: ${props => props.theme.font_family};
  font-size: 1.4rem;
  font-weight: ${props => props.theme.font_weight_semi_bold};
  padding-bottom: ${rhythm(1)};
`;

const DropdownContainer = styled.div`
  flex: 1;
  margin-right: ${props => props.marginRight || null};
  position: relative;
`;

const Select = styled.select`
  appearance: button;
  background-color: ${props => inputBackgroundColor(props)};
  border: none;
  border-radius: inherit;
  color: ${props => props.theme.color_darkest};
  font-family: ${props => props.theme.font_family};
  font-size: 1.6rem;
  padding: 1.1rem 3.2rem 1.1rem 1.6rem;
  width: 100%;
`;

const RightCenterIcon = styled.div`
  pointer-events: none;
  position: absolute;
  right: .8rem;
  top: 50%;
  transform: translateY(-50%) rotate(270deg);
  z-index: 10;
`;

const InputError = styled.div`
  bottom: -${rhythm(2.5)};
  left: 0;
  position: absolute;
`;

function inputBackgroundColor(props) {
  if (props.blurred && !props.valid) {
    return props.theme.color_light_red_1;
  }
  else {
    return props.theme.color_grey_0;
  }
}

class FormDropdown extends Component {
  renderListItems() {
    return this.props.listItems.map(item => {
      return (
        <option key={item}>{item}</option>
      );
    });
  }

  render() {
    const {
      label,
      theme,
      error,
      errorImmediate,
      blurred,
      valid,
      name,
      onChange,
      onBlur,
      value,
      type,
      marginRight,
    } = this.props;

    return (
      <DropdownForm>
        {label && <Label>{label}</Label>}
        <DropdownContainer marginRight={marginRight}>
          <Select
            id={name}
            name={name}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            type={type}
            blurred={blurred}
            valid={valid}
          >
            <option value=''></option>
            {this.renderListItems()}
          </Select>
          <RightCenterIcon>
            <Icon
              size={20}
              fill={theme.color_darkest}
              name="chevron"
              className="input-icon"
            />
          </RightCenterIcon>
          {(errorImmediate || blurred) && !valid &&
            <InputError>
              <InputErrorMessage error={error} />
            </InputError>
          }
          {this.props.children}
        </DropdownContainer>
      </DropdownForm>
    );
  }
}

export default withTheme(FormDropdown);
