import * as Yup from 'yup';

interface SignInFormValues {
    email: string;
    password: string;
}

export const signinSchema: Yup.ObjectSchema<SignInFormValues> = Yup.object({
    email: Yup.string()
        .email('Email field must be a valid email address')
        .required('Email field is required')
        .typeError('Email must be a string')
        .test('string.empty', 'Email field cannot be left empty', value => value !== ''),
    password: Yup.string()
        .required('Password field is required')
        .typeError('Password must be a string')
        .test('string.empty', 'Password field cannot be left empty', value => value !== ''),
});
