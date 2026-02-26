import { reactive, computed } from 'vue';
export function useForm(initialValues, validationRules = {}) {
  debugger;
  const form = reactive({...initialValues});
  const errors = reactive({});
  const touched = reactive({});
  const validate = (field) => {
    const rules = validationRules[field];
    if(!rules) return true;
    for(const rule of rules) {
      const error = rule(form[field]);
      if(error) {
        errors[field] = error;
        return false;
      }
    }
    errors[field] = null;
    return true;
  };

  const validateAll = () => {
    let isValid = true;
    for (const field in validationRules) {
      touched[field] = true;
      if (!validate(field)) {
        isValid = false;
      }
    }
    return isValid;
  };

  const handleBlur = (field) => {
    debugger;
    touched[field] = true;
    validate(field);
  };

  const handleChange = (field, value) => {
    form[field] = value;
    if(touched[field]) {
      validate(field);
    }
  }

  const reset = () => {
    Object.assign(form, initialValues);
    Object.keys(errors).forEach(key => errors[key] = null);
    Object.keys(touched).forEach(key => touched[key] = false)
  };

  const isValid = computed(() =>
    !Object.values(errors).some(Boolean)
  );

  return {
    form, errors, touched, handleBlur, handleChange, validate, validateAll, reset, isValid
  }

}
