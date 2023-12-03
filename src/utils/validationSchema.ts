import * as yup from 'yup';

const mobileValidation = yup
  .string()
  .required('Mobile number is required')
  .test('mobile', 'Mobile number is invalid', (value) => {
    return (
      yup.string().email().isValidSync(value) ||
      yup
        .number()
        .integer()
        .positive()
        .test((value) => {
          return !!value && value.toString().length === 10;
        })
        .isValidSync(value)
    );
  });

const passwordValidation = yup
  .string()
  .required('Password is required')
  .min(6, 'Please keep password of more than 6 characters');

const otpSchema = yup
  .string()
  .typeError('Enter a valid OTP')
  .required('OTP is required')
  .test('otp', 'Enter a valid OTP', (value) => {
    return !!value && value.toString().length === 6;
  });

export const loginSchema = yup.object({
  password: passwordValidation,
  phone: mobileValidation
});

export const forgotPasswordSchema = yup.object({
  username: mobileValidation
});

export const enterOtpSchema = yup.object({
  otp: otpSchema
});

export const changePasswordSchema = yup.object({
  password: passwordValidation
});

const fullNameSchema = yup.string().required('Please enter full name');
const mobileNumberSchema = yup
  .string()
  .required('Please enter mobile number')
  .test('mobileNumber', 'Please enter valid mobile number', (value) => {
    return yup
      .number()
      .integer()
      .positive()
      .test((value) => {
        return !!value && value.toString().length === 10;
      })
      .isValidSync(value);
  });
const emailIdSchema = yup
  .string()
  .required('Please enter email')
  .test('emailId', 'Please enter correct email id', (value) => {
    return yup.string().email().isValidSync(value);
  });

export const createAccountSchema = yup.object({
  password: passwordValidation,
  username: fullNameSchema,
  phone: mobileNumberSchema,
});

export const updatePasswordSchema = yup.object({
  currentpassword: passwordValidation,
  newpassword: passwordValidation,
  reEnterpassword: passwordValidation
});
