import React from 'react'

import { useHttpClient } from '../../../hooks/http-hook';

import LoadingSpinner from '../../../shared/LoadingSpinner';
import Input from '../../../shared/Input'
import Button from '../../../shared/Button';
import ImageUpload from '../../../shared/ImageUpload';

import {
    VALIDATOR_REQUIRE,
    VALIDATOR_EMAIL,
    VALIDATOR_MINLENGTH
} from '../../../shared/validators';

import { useForm } from '../../../hooks/form-hook';

const GalleryPhotoNew = ({ auth, hideModal }) => {

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const [formState, inputHandler] = useForm(
        {
            name: {
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
            formData.append('image', formState.inputs.image.value[0]);
            const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/photos/`, 'POST',
                formData,
                {
                    // 'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                }
            );
            window.location.reload();
            //   history.push('/');
        } catch (err) {
            console.log(err);
        }
    };


    return (
        <React.Fragment>
            {isLoading && (<div>
                <LoadingSpinner asOverlay={true} />
            </div>)}
            <form>
                <div>
                    <Input
                        id="name"
                        element="input"
                        type="text"
                        label="Name"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter photo name."
                        onInput={inputHandler}
                    />
                </div>
                <div>
                    <ImageUpload
                        id="image"
                        onInput={inputHandler}
                        errorText="Please provide an image."
                    />
                </div>

                <div>
                    <Button
                        type="submit"
                        disabled={!formState.isValid}
                        onClick={registerHandler}
                    >
                        ADD PHOTO
                    </Button>
                </div>
            </form>
        </React.Fragment>

    )
}

export default GalleryPhotoNew