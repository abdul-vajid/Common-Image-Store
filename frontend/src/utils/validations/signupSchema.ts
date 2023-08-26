import * as Yup from 'yup';

interface SignUpFormValues {
    fullname: string;
    email: string;
    password: string;
}

export const signupSchema: Yup.ObjectSchema<SignUpFormValues> = Yup.object({
    fullname: Yup.string()
        .required('Fullname field is required')
        .typeError('Fullname must be a string')
        .test('string.empty', 'Fullname field cannot be left empty', value => value !== ''),
    email: Yup.string()
        .email('Email field must be a valid email address')
        .required('Email field is required')
        .typeError('Email must be a string')
        .test('string.empty', 'Email field cannot be left empty', value => value !== ''),
    password: Yup.string()
        .required('Password field is required')
        .typeError('Password must be a string')
        .matches(/[a-z]/, 'Password must include at least one lowercase letter')
        .matches(/[A-Z]/, 'Password must include at least one uppercase letter')
        .matches(/\d/, 'Password must include at least one digit')
        .matches(/[@$!%*?&]/, 'Password must include at least one special character (@, $, !, %, *, ?, &)')
        .min(8, 'Password must be at least 8 characters')
        .max(16, 'Password must be at most 16 characters')
        .test('string.empty', 'Password field cannot be left empty', value => value !== ''),
});
