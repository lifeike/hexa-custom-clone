import validate from '@/utils/validator';
import { INPUTS } from '@/utils/constants/constants';

export function handleInputChange(event, $this) {
  let value = event.target.value;
  const name = event.target.name;

  if (event.target.type === "checkbox") {
    value = event.target.checked;
  }

  const updatedInputs = {
    ...$this.state.formInputs,
  };

  const updatedFormElement = {
    ...updatedInputs[name],
  };

  updatedFormElement.value = value;
  updatedFormElement.touched = true;

  updatedInputs[name] = fullInputValidation(updatedFormElement, value);

  const formIsValid = isFormValid(updatedInputs);
  const formIsActive = isFormActive(updatedInputs);

  $this.setState({
    formInputs: updatedInputs,
    formIsValid,
    formIsActive,
  });
}

export function handleInputBlur(event, $this) {
  let value = event.target.value;
  const name = event.target.name;

  if (event.target.type === "checkbox") {
    value = event.target.checked;
  }

  updateInput(name, value, $this);

}

export function updateInput(name, value, $this) {
  const updatedInputs = {
    ...$this.state.formInputs,
  };

  const updatedFormElement = {
    ...updatedInputs[name],
  };

  // Previously wrapped in check for touched.
  updatedFormElement.blurred = true;

  updatedInputs[name] = fullInputValidation(updatedFormElement, value);

  const formIsValid = isFormValid(updatedInputs);
  const formIsActive = isFormActive(updatedInputs);

  $this.setState({
    formInputs: updatedInputs,
    formIsValid,
    formIsActive,
  });
}

export function validateAllInputs($this, initial = false) {
  const updatedInputs = {
    ...$this.state.formInputs,
  };

  for (let input in updatedInputs) {
    const updatedFormElement = {
      ...updatedInputs[input],
    };

    updatedInputs[input] = initial ?
      initialInputValidation(updatedFormElement) :
      fullInputValidation(updatedFormElement);
  }

  const formIsValid = isFormValid(updatedInputs);

  $this.setState({
    formIsValid,
    formInputs: updatedInputs,
  });
}

function initialInputValidation(updatedFormElement) {
  if (updatedFormElement.value) {
    const validation = validate(updatedFormElement.value, updatedFormElement.validationRules);

    updatedFormElement.valid = validation.isValid;
  }
  else if (!updatedFormElement.validationRules.isRequired) {
    updatedFormElement.valid = true;
  }

  return updatedFormElement;
}

function fullInputValidation(updatedFormElement, value) {
  const validation = validate(value || updatedFormElement.value, updatedFormElement.validationRules);

  updatedFormElement.valid = validation.isValid;
  updatedFormElement.error = validation.error;

  return updatedFormElement;
}

export function isFormValid(inputs) {
  let formIsValid = true;

  for (let inputName in inputs) {
    formIsValid = inputs[inputName].valid && formIsValid;
  }

  return formIsValid;
}

export function isFormActive(inputs) {
  let formIsActive = true;

  for (let inputName in inputs) {
    formIsActive = formIsActive || inputs[inputName].touched;
  }

  return formIsActive;
}

export function handleFormSubmit(event, $this, options) {
  event.preventDefault();
  const { onSuccess, onFailure, callback } = options;

  validateAllInputs($this);

  if (callback) {
    callback();
  }
  else {
    // Do fetch stuff
    setTimeout(() => {
      // fake submit time to show disabled state when submitted and waiting for a response
      Math.random() > .1 ? onSuccess() : onFailure();
    }, 2500);
  }
}

export function changeObfuscation(e, $this, target) {
  e.preventDefault();
  e.stopPropagation();

  const updatedInputs = {
    ...$this.state.formInputs,
  };

  const updatedPasswordElement = {
    ...updatedInputs[target],
  };

  if (updatedPasswordElement.type === INPUTS.PASSWORD) {
    updatedPasswordElement.type = INPUTS.TEXT;
  }
  else {
    updatedPasswordElement.type = INPUTS.PASSWORD;
  }

  updatedInputs[target] = updatedPasswordElement;

  $this.setState({
    formInputs: updatedInputs,
  });
}
