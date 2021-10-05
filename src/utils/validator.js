function validate(value, rules) {
  let isValid = true,
    error = '';
  const isRequired = rules.isRequired;

  if (!isRequired && !value) {
    return { isValid: true, error };
  }

  for (let rule in rules) {
    let validationObject;

    switch (rule) {
    case 'minLength':
      if (!isValid) break;

      validationObject = minLengthValidator(value, rules[rule]);
      isValid = validationObject.isValid;
      if (!isValid) {
        error = validationObject.error;
      }
      break;

    case 'maxLength':
      if (!isValid) break;

      validationObject = maxLengthValidator(value, rules[rule]);
      isValid = validationObject.isValid;
      if (!isValid) {
        error = validationObject.error;
      }
      break;

    case 'isRequired':
      if (!isValid) break;

      validationObject = requiredValidator(value);
      isValid = validationObject.isValid;
      if (!isValid) {
        error = validationObject.error;
      }
      break;

    case 'isEmail':
      if (!isValid) break;

      validationObject = emailValidator(value);
      isValid = validationObject.isValid;
      if (!isValid) {
        error = validationObject.error;
      }
      break;

    case 'onlyNumbers':
      if (!isValid) break;

      validationObject = numberValidator(value);
      isValid = validationObject.isValid;
      if (!isValid) {
        error = validationObject.error;
      }
      break;

    case 'positiveNumber':
      if (!isValid) break;

      validationObject = numberValidator(value, true);
      isValid = validationObject.isValid;
      if (!isValid) {
        error = validationObject.error;
      }

      break;

    case 'password':
      if (!isValid) break;

      validationObject = passwordValidator(value);
      isValid = validationObject.isValid;
      if (!isValid) {
        error = validationObject.error;
      }
      break;

    case 'isCreditCard':
      if (!isValid) break;

      validationObject = creditCardValidator(value);
      isValid = validationObject.isValid;
      if (!isValid) {
        error = validationObject.error;
      }
      break;

    default: isValid = true;
    }

  }

  return {isValid, error};
}

/**
 * validate password input
 * @param {string} value 
 * @returns {ValidationObject} validationObject
 */
function passwordValidator(value) {
  let length = passwordLengthValidator(value);

  let complexity = passwordComplexityValidator(value);

  let isValid = length.isValid && complexity.isValid;

  let error = '';

  if (!isValid && (complexity.isValid || length.isValid)) {
    error = length.isValid ? complexity.error : length.error;
  } else if (!isValid) {
    error = `${length.error} ${complexity.error}`;
  }

  return { isValid, error };
}

function passwordComplexityValidator(value) {
  const re = new RegExp(/^(?=.*\d)*(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*?[#?!@$%^&*-])+.{8,}$/);

  return {
    'isValid': re.test(value),
    'error': ERRORS.PASSWORD_COMPLEXITY,
  };
}

function passwordLengthValidator(value) {
  return {
    'isValid': value.length >= 8,
    'error': ERRORS.PASSWORD_LENGTH,
  };
}

function minLengthValidator(value, minLength) {
  return {
    'isValid': value.length >= minLength,
    'error': ERRORS.INVALID_ENTRY,
  };
}

function maxLengthValidator(value, maxLength) {
  return {
    'isValid': value.length <= maxLength,
    'error': ERRORS.INVALID_ENTRY,
  };
}

function requiredValidator(value) {
  return {
    'isValid': value.trim() !== '',
    'error': ERRORS.REQUIRED_FIELD,
  };
}

function emailValidator(value) {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  return {
    'isValid': re.test(String(value).toLowerCase()),
    'error': ERRORS.INVALID_EMAIL,
  };
}

/**
 * 
 * @param {*} value 
 * @param {boolean} abs - absolute value flag 
 */
function numberValidator(value, abs = false) {
  const absCheck = abs ? value > 0 : true;

  return {
    'isValid': !isNaN(value) && absCheck,
    'error': !absCheck ? ERRORS.POSITIVE_NUMBER : ERRORS.INVALID_ENTRY,
  };
}

function creditCardValidator(value) {
  // Accept only digits, dashes or spaces
  if (/[^0-9-\s]+/.test(value)) return false;

  let nCheck = 0, bEven = false;

  value = value.replace(/\D/g, "");

  for (var n = value.length - 1; n >= 0; n--) {
    var cDigit = value.charAt(n),
      nDigit = parseInt(cDigit, 10);

    if (bEven && (nDigit *= 2) > 9) nDigit -= 9;

    nCheck += nDigit;
    bEven = !bEven;
  }

  return {
    'isValid': (nCheck % 10) === 0,
    'error': ERRORS.INVALID_ENTRY,
  };
}
export default validate;


const ERRORS = {
  'REQUIRED_FIELD': 'Required Field',
  'INVALID_ENTRY': 'Invalid Entry',
  'POSITIVE_NUMBER': 'Value must be a greater than zero',
  'INVALID_EMAIL': 'Please enter a valid email.',
  'PASSWORD_LENGTH': 'Password must be at least 8 characters in length.',
  'PASSWORD_COMPLEXITY': 'Must contain at least one uppercase character, one lowercase character, and one special character.',
};
