import React, { useState, useContext, useEffect } from 'react';
import Button from '../../../shared/Button'
import { AuthContext } from '../../../context/auth-context';
import { useHttpClient } from '../../../hooks/http-hook';
import LoadingSpinner from '../../../shared/LoadingSpinner'

const SingleElement = ({ id, name, title, price, images, image, comment, onDelete, request }) => {
  const auth = useContext(AuthContext);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const deleteHandler = async () => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/${request}/${id}`,
        'DELETE',
        null,
        {
          Authorization: 'Bearer ' + auth.token
        }
      );
      onDelete(id);
    } catch (err) { }
  };

  return (
    <React.Fragment>
      <li className='item admin-content__container'>
        {isLoading && <LoadingSpinner asOverlay />}
        {(images || image) && <div className="item-image">
          <img
            src={`${process.env.REACT_APP_AWS_URL}/${request === 'items' ? images[0] : image}`}
            alt={name ? name : 'image'}
          />
        </div>}
        {name && <div>
          <h3>{name}</h3>
        </div>}
        {title && <div>
          <h3>{title}</h3>
        </div>}
        {comment && <div>
          <h3>{comment}</h3>
        </div>}
        {price && <div>
          <p>{price} $</p>
        </div>}
        {request === 'news' && id && <div>
          <p>ID: {id}</p>
        </div>}
        <div className="item-actions">
          <Button inverse onClick={deleteHandler}>
            Delete
          </Button>
        </div>
      </li>
    </React.Fragment>
  )

}

export default SingleElement
