import React from 'react'

import { useHttpClient } from '../../hooks/http-hook';

import LoadingSpinner from '../../shared/LoadingSpinner';
import Input from '../../shared/Input'
import Button from '../../shared/Button';

import {
  VALIDATOR_REQUIRE
} from '../../shared/validators';

import { useForm } from '../../hooks/form-hook';

const LoginForm = ({ auth, hideModal, toggleForm }) => {

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler] = useForm(
    {
      email: {
        value: '',
        isValid: false
      },
      password: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const loginHandler = async e => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('email', formState.inputs.email.value);
      formData.append('password', formState.inputs.password.value);
      const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/user/login`, 'POST',
        JSON.stringify({
          email: formState.inputs.email.value,
          password: formState.inputs.password.value
        }),
        // formData,
        {
          // Authorization: 'Bearer ' + auth.token,
          'Content-Type': 'application/json'
        }
      );
      hideModal()
      auth.login(responseData.userId, responseData.token, responseData.role, responseData.nickname, responseData.image)
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>

      <form className="auth-form" onSubmit={(e) => { e.preventDefault() }}>
        {isLoading && (
          <div>
            <LoadingSpinner asOverlay />
          </div>
        )}
        <div className='auth-form__container'>
          <Input
            id="email"
            element="input"
            type="text"
            label="Email"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter your email."
            onInput={inputHandler}
          />
          <Input
            id="password"
            element="input"
            label="Password"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a password."
            onInput={inputHandler}
          />
        </div>

        <div className='auth-form__submit'>
          <Button
            type="submit"
            disabled={!formState.isValid}
            onClick={loginHandler}
          >
            LOGIN
          </Button>

          <p>You don't have account? <span style={{ cursor: 'pointer', color: 'blue' }} onClick={toggleForm}>Register</span></p>
        </div>
      </form>
    </React.Fragment>
  )
}

export default LoginForm