import React from 'react'

import { useHttpClient } from '../../hooks/http-hook';

import LoadingSpinner from '../../shared/LoadingSpinner';
import Input from '../../shared/Input'
import Button from '../../shared/Button';
import ImageUpload from '../../shared/ImageUpload';

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH
} from '../../shared/validators';

import { useForm } from '../../hooks/form-hook';

const RegisterForm = ({ auth, hideModal, toggleForm }) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler] = useForm(
    {
      name: {
        value: '',
        isValid: false
      },
      surname: {
        value: '',
        isValid: false
      },
      nickname: {
        value: '',
        isValid: false
      },
      email: {
        value: '',
        isValid: false
      },
      password: {
        value: '',
        isValid: false
      },
      image: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const registerHandler = async e => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', formState.inputs.name.value);
      formData.append('surname', formState.inputs.surname.value);
      formData.append('nickname', formState.inputs.nickname.value);
      formData.append('email', formState.inputs.email.value);
      formData.append('password', formState.inputs.password.value);
      formData.append('image', formState.inputs.image.value[0]);
      const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/user/signup`, 'POST',
        formData,
        {
          // 'Content-Type': 'application/json',
          // Authorization: 'Bearer ' + auth.token
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
            id="name"
            element="input"
            type="text"
            label="Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter your name."
            onInput={inputHandler}
          />
          <Input
            id="surname"
            element="input"
            type="text"
            label="Surname"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter your surname."
            onInput={inputHandler}
          />
          <Input
            id="nickname"
            element="input"
            type="text"
            label="Nickname"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter your nickname."
            onInput={inputHandler}
          />
        </div>

        <div className='auth-form__container'>
          <Input
            id="email"
            element="input"
            type="email"
            label="Email"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
            errorText="Please enter your email."
            onInput={inputHandler}
          />
          <Input
            id="password"
            element="input"
            label="Password"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a password."
            onInput={inputHandler}
          />
        </div>


        <ImageUpload
          id="image"
          onInput={inputHandler}
          errorText="Please provide an image."
        />
        <div className='auth-form__submit'>
          <Button
            type="submit"
            disabled={!formState.isValid}
            onClick={registerHandler}
          >
            REGISTER
          </Button>

          <p>Do you have an account? <span style={{ cursor: 'pointer', color: 'blue' }} onClick={toggleForm}>Login</span></p>
        </div>

      </form>
    </React.Fragment>
  )
}

export default RegisterForm