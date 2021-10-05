import React from 'react';
import styled, { withTheme } from 'styled-components/macro';
import { rhythm } from '@/utils/helpers';
import InputPropTypes from './InputPropTypes';
import InputErrorMessage from '@/components/ui/ErrorMessage/InputErrorMessage';
import Icon from '@/components/ui/Icons/Icon';

const Label = styled.label`
  color: ${props => props.theme.color_darkest};
  display: block;
  font-family: ${props => props.theme.font_family};
  font-size: 1.4rem;
  font-weight: ${props => props.labelStyle || props.theme.font_weight_bold};
  padding-bottom: ${rhythm(1)};
`;

const InputWrapper = styled.div`
  border: none;
  position: relative;
`;

const MaskableButton = styled.button`
  position: absolute;
  right: 1em;
  top: 24%;
  z-index: 10;
`;

const InputElement = styled.input`
  background-color: ${props => inputBackgroundColor(props)};
  border: none;
  color: ${props => props.theme.color_darkest};
  display: block;
  font-family: ${props => props.theme.font_family};
  font-size: 1.6rem;
  padding: 1.1rem 1.6rem 1.1rem;
  position: relative;
  width: 100%;
  z-index: 2;
`;

const MaskableInputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0;
  position: relative;
`;

const InputError = styled.div`
  bottom: -${rhythm(2.5)};
  left: 0;
`;

function inputBackgroundColor(props) {
  if (props.blurred && !props.valid) {
    return props.theme.color_light_red_1;
  }
  else {
    return props.theme.color_grey_0;
  }
}

function renderInputLabel(name, labelStyle, label) {
  return (
    <Label htmlFor={name} labelStyle={labelStyle}>
      {label}
    </Label>
  );
}

function renderError(error) {
  return (
    <InputError>
      <InputErrorMessage error={error} />
    </InputError>
  );
}

function showError(errorImmediate, blurred, valid) {
  return (errorImmediate || blurred) && !valid;
}

export function TextInput(props) {
  const {
    label,
    error,
    name,
    valid,
    blurred,
    onChange,
    onBlur,
    type,
    placeholder,
    errorImmediate,
    labelStyle,
    defaultValue,
    maxLength,
    className,
  } = props;

  return (
    <div className="input">
      {renderInputLabel(name, labelStyle, label)}
      <InputWrapper>
        <InputElement
          id={name}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          type={type}
          placeholder={placeholder}
          blurred={blurred}
          valid={valid}
          defaultValue={defaultValue}
          maxLength={maxLength}
          className={className}
        />
        {
          showError(errorImmediate, blurred, valid) &&
          renderError(error)
        }
        {props.children}
      </InputWrapper>
    </div>
  );
}

export function TextInputManaged(props) {
  const {
    label,
    error,
    name,
    valid,
    blurred,
    onChange,
    onBlur,
    type,
    placeholder,
    errorImmediate,
    labelStyle,
    defaultValue,
    maxLength,
    value,
    onKeyPress,
  } = props;

  return (
    <div className="input">
      {renderInputLabel(name, labelStyle, label)}
      <InputWrapper>
        <InputElement
          id={name}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          type={type}
          placeholder={placeholder}
          blurred={blurred}
          valid={valid}
          defaultValue={defaultValue}
          maxLength={maxLength}
          value={value}
          onKeyPress={onKeyPress}
        />
        {
          showError(errorImmediate, blurred, valid) &&
          renderError(error)
        }
        {props.children}
      </InputWrapper>
    </div>
  );
}

export function TextInputMaskable(props) {
  const {
    label,
    error,
    name,
    valid,
    blurred,
    onChange,
    onBlur,
    type,
    placeholder,
    errorImmediate,
    labelStyle,
    defaultValue,
    maxLength,
    handleToggleMask,
    maskIcon,
    onKeyPress,
  } = props;

  const iconAttrs = {
    size: 20,
    name: maskIcon,
    className: 'inputIcon',
    fill: '#000000',
  };

  return (
    <div className="input">
      {renderInputLabel(name, labelStyle, label)}
      <InputWrapper>
        <MaskableInputWrapper>
          <InputElement
            id={name}
            name={name}
            onChange={onChange}
            onBlur={onBlur}
            type={type}
            placeholder={placeholder}
            blurred={blurred}
            valid={valid}
            defaultValue={defaultValue}
            maxLength={maxLength}
            onKeyPress={onKeyPress}
          />
          <MaskableButton onClick={handleToggleMask}>
            <Icon {...iconAttrs} />
          </MaskableButton>
        </MaskableInputWrapper>
        {
          showError(errorImmediate, blurred, valid) &&
          renderError(error)
        }
        {props.children}
      </InputWrapper>
    </div>
  );
}

TextInput.propTypes = InputPropTypes;
TextInputManaged.propTypes = InputPropTypes;
TextInputMaskable.propTypes = InputPropTypes;

export default withTheme(TextInput);
