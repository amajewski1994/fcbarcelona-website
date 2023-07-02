import React, { useRef, useContext, useEffect, useState } from 'react';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../../shared/validators';

import Input from '../../../shared/Input'
import Button from '../../../shared/Button';
import ImageUpload from '../../../shared/ImageUpload';

import { useHttpClient } from '../../../hooks/http-hook';
import { useForm } from '../../../hooks/form-hook';
import { AuthContext } from '../../../context/auth-context';
import LoadingSpinner from '../../../shared/LoadingSpinner';


const NewElement = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [multipleInputsLength, setMultipleInputsLength] = useState([''])
  const [formState, inputHandler, setFormData] = useForm(
    {
      name: {
        value: '',
        isValid: false
      },
      price: {
        value: 0,
        isValid: false
      },
      type: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      },
      images: {
        value: null,
        isValid: false
      }
    },
    false
  );

  const itemSubmitHandler = async e => {
    e.preventDefault();
    try {
      const formData = new FormData();
      if (props.request === 'news') {
        formData.append('title', formState.inputs.name.value);
        multipleInputsLength.forEach((element, id) => {
          formData.append('articleTitles', formState.inputs[`newsTitle${id}`].value)
          formData.append('articleDescriptions', formState.inputs[`newsDescription${id}`].value)
        })
        formData.append('image', formState.inputs.images.value[0]);
      } else if (props.request === 'items') {
        formData.append('price', formState.inputs.price.value);
        formData.append('type', formState.inputs.type.value);
        formData.append('description', formState.inputs.description.value);
        formData.append('name', formState.inputs.name.value);
        const im = formState.inputs.images.value
        im.forEach(
          i => formData.append('images', i)
        )
      } else if (props.request === 'comments') {
      } else {
        formData.append('name', formState.inputs.name.value);
        formData.append('image', formState.inputs.images.value[0]);
      }

      if (props.request === 'players') {
        formData.append('number', formState.inputs.number.value);
        formData.append('position', formState.inputs.position.value);
        formData.append('country', formState.inputs.country.value);
        formData.append('height', formState.inputs.height.value);
        formData.append('weight', formState.inputs.weight.value);
        formData.append('born', formState.inputs.born.value);
        multipleInputsLength.forEach((element, id) => {
          formData.append('playerDescriptions', formState.inputs[`playerDescription${id}`].value)
        })
      }
      let request = `${process.env.REACT_APP_BACKEND_URL}/${props.request}`;
      if (props.request === 'comments') {
        request = `${process.env.REACT_APP_BACKEND_URL}/${props.request}/${formState.inputs.name.value}`
        await sendRequest(request, 'POST',
          JSON.stringify({
            comment: formState.inputs.description.value
          }), {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token
        }
        );
      } else {
        await sendRequest(request, 'POST',
          formData,
          {
            Authorization: 'Bearer ' + auth.token
          }
        );
      }
      // history.push('/');
    } catch (err) {
      console.log(err);
    }
  };

  const addMultipleDescriptionInput = () => {
    setMultipleInputsLength(prevMultipleInputsLength => [
      ...prevMultipleInputsLength,
      ''
    ])
  }

  const multipleInputs = multipleInputsLength.map((element, id) => {
    if (props.request === 'news') {
      return (<div key={id} className='admin-form__news-inputs'>
        <Input
          id={`newsTitle${id}`}
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
        />
        <Input
          id={`newsDescription${id}`}
          element="textarea"
          label="Description"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a description."
          onInput={inputHandler}
        />
      </div>)
    } else if (props.request === 'players') {
      return (<div key={id} className='admin-form__players-inputs'>
        <Input
          id={`playerDescription${id}`}
          element="textarea"
          label="Description"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a description."
          onInput={inputHandler}
        />
      </div>)
    }
  })


  return (
    <React.Fragment>
      {isLoading && (
        <div>
          <LoadingSpinner asOverlay />
        </div>
      )}
      <form className="admin-form" onSubmit={itemSubmitHandler}>

        {props.request !== 'comments' && <Input
          id="name"
          element="input"
          type="text"
          label="Name"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid name."
          onInput={inputHandler}
        />}
        {props.request === 'comments' && <Input
          id="name"
          element="input"
          type="text"
          label="News Id"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid news id."
          onInput={inputHandler}
        />}
        {props.request === 'items' && <Input
          id="type"
          element="input"
          label="Type"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid type."
          onInput={inputHandler}
        />}
        {props.request === 'items' && <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a description with minimum 5 letters."
          onInput={inputHandler}
        />}
        {props.request === 'comments' && <Input
          id="description"
          element="textarea"
          label="Comment"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a comment."
          onInput={inputHandler}
        />}
        {props.request === 'items' && <Input
          id="price"
          element="input"
          type="number"
          label="Price"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid price."
          onInput={inputHandler}
        />}

        {props.request !== 'comments' && <ImageUpload
          id="images"
          onInput={inputHandler}
          request={props.request}
          errorText="Please provide an image."
        />}

        {props.request === 'players' && (<div className='admin-form__team'>
          <div className='admin-form__team-info'>
            <Input
              id="number"
              element="input"
              type="number"
              label="Number"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid number."
              onInput={inputHandler}
            />
            <Input
              id="height"
              element="input"
              type="number"
              label="Height (cm)"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid height in cm."
              onInput={inputHandler}
            />
            <Input
              id="weight"
              element="input"
              type="number"
              label="Weight (cm)"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid weight in cm."
              onInput={inputHandler}
            />
          </div>
          <div className='admin-form__team-info'>
            <Input
              id="position"
              element="input"
              type="text"
              label="Position"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid position."
              onInput={inputHandler}
            />
            <Input
              id="country"
              element="input"
              type="text"
              label="Country"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid country."
              onInput={inputHandler}
            />
            <Input
              id="born"
              element="input"
              type="date"
              label="Born date"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid born date."
              onInput={inputHandler}
            />
          </div>
        </div>)}

        {(props.request === 'news' || props.request === 'players') && multipleInputs}
        {(props.request === 'news' || props.request === 'players') && <Button
          type='button'
          size='small'
          inverse={true}
          onClick={addMultipleDescriptionInput}
        >
          Add description
        </Button>}

        <div className='admin-form__submit-button'>
          <Button type="submit"
          >
            ADD
          </Button>
        </div>
      </form>
    </React.Fragment>
  )
}

export default NewElement;
