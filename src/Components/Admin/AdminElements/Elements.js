import React, { useState, useEffect, useContext } from 'react'
import ElementsList from './ElementsList';
import { useHttpClient } from '../../../hooks/http-hook'; 
import LoadingSpinner from '../../../shared/LoadingSpinner';

const Elements = (props) => {
    const [items, setItems] = useState();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    useEffect(() => {
        const fetchItems = async () => {
            try {
              const responseData = await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/${props.request}`
              );
              
              setItems(responseData[props.request])
            } catch (err) {
              console.log(err)
            }
          };
          fetchItems();
    
    }, [sendRequest]);

  const itemDeleteHandler = deletedItemId => {
    setItems(prevItems =>
        prevItems.filter(item => item.id !== deletedItemId)
    );
  };
    
    return (
        <React.Fragment>
            <div className='store'>
              
            {isLoading && (
            <div className='center'>
              <LoadingSpinner />
            </div>
            )}
                {!isLoading && items && <ElementsList itemsList={items} onDelete={itemDeleteHandler} request={props.request} />}
            </div>
        </React.Fragment>
    )
}

export default Elements
