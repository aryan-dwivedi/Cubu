function FormText(props) {
  const formStep = props.formStep;

  if (formStep === 1) {
    return `Welcome Back, ${props.name}`;
  } else if (formStep === 2) {
    return 'What is make of your car?';
  } else if (formStep === 3) {
    return 'What is model of your car?';
  } else if (formStep === 4) {
    return 'What is year of your car?';
  } else if (formStep === 5) {
    return 'Where is your car located?';
  }
}

export default FormText;
