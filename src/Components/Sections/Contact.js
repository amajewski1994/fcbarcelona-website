import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';

import { useHttpClient } from '../../hooks/http-hook';

import LoadingSpinner from '../../shared/LoadingSpinner';
import Input from '../../shared/Input'
import Button from '../../shared/Button';

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL
} from '../../shared/validators';

import { useForm } from '../../hooks/form-hook';
import Card from '../../shared/Card';

const Contact = () => {

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [submit, setSubmit] = useState(false);

  const [formState, inputHandler, setFormData] = useForm(
    {
      firstName: {
        value: '',
        isValid: false
      },
      lastName: {
        value: '',
        isValid: false
      },
      email: {
        value: '',
        isValid: false
      },
      phone: {
        value: '',
        isValid: false
      },
      message: {
        value: '',
        isValid: false
      },
    },
    false
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  const submitHandler = async e => {
    e.preventDefault();
    const newFormData = {
      firstName: {
        value: '',
        isValid: false
      },
      lastName: {
        value: '',
        isValid: false
      },
      email: {
        value: '',
        isValid: false
      },
      phone: {
        value: '',
        isValid: false
      },
      message: {
        value: '',
        isValid: false
      }
    }
    setSubmit(prevSubmit => !prevSubmit)
    setFormData(newFormData, false)
    alert('Your message has been sent')
  };

  return (
    <React.Fragment>
      <div
        className='contact'
        style={{ position: 'relative' }}
      >
        <motion.div
          
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, transition: { duration: 0.5, delay: 0.2 } }}
          viewport={{ once: true }}
          className='contact-container'
        >
          <Card>
            {isLoading && (
              <div>
                <LoadingSpinner asOverlay />
              </div>
            )}

            <h2>Contact Us</h2>
            <form className="contact-form" onSubmit={(e) => { e.preventDefault() }}>
              <div className='form-column'>
                <Input
                  id="firstName"
                  submitted={submit}
                  element="input"
                  type="text"
                  label="First Name"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Please enter your first name."
                  onInput={inputHandler}
                />
                <Input
                  id="lastName"
                  submitted={submit}
                  element="input"
                  type="text"
                  label="Last Name"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Please enter your last name."
                  onInput={inputHandler}
                />
              </div>
              <div className='form-column'>
                <Input
                  id="email"
                  submitted={submit}
                  element="input"
                  type="text"
                  label="Email"
                  validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
                  errorText="Please enter your email."
                  onInput={inputHandler}
                />
                <Input
                  id="phone"
                  submitted={submit}
                  element="input"
                  type="number"
                  label="Phone Number"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Please enter your phone number."
                  onInput={inputHandler}
                />
              </div>

              <Input
                id="message"
                submitted={submit}
                element="textarea"
                type="text"
                label="Message"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter your message."
                onInput={inputHandler}
              />

              <Button
                type="submit"
                disabled={!formState.isValid}
                onClick={submitHandler}
              >
                SEND
              </Button>
            </form>
          </Card>
        </motion.div>
      </div>
    </React.Fragment>
  )
}

export default Contact