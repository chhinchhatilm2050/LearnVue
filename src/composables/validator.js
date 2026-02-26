export const required = (message) => {
  return (value) => {
    return value && value.trim() ? null : message;
  }
}

export const minLength = (min, message) => {
  return (value) => {
    return value && value.length >= min ? null: message || `Mininmum ${min} characters required`;
  }
}

export const email = (message = 'Invalid email format') => {
  return (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? null : message;
  }
}

export const match = (otherField, otherFieldName, message) => {
  return (value, form) => {
    return value === form[otherField] ? null : message || `Must match ${otherFieldName}`;
  }
}
