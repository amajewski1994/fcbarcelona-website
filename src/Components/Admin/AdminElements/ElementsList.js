import React from 'react';
import Item from './SingleElement';

const ElementsList = ({ itemsList, onDelete, request }) => {

    const items = itemsList.map(item => 
        (<Item key={item.id} id={item.id} name={item.name} title={item.title} price={item.price} images={item.images} image={item.image} comment={item.comment} onDelete={onDelete} request={request} />)
    )
    
    return (
        <ul className='items-list admin-content'>
            {items.length >= 1 ? items : "You don't have any items yet"}
        </ul>
    )
}

export default ElementsList
