import React, { useState, useEffect, useContext } from 'react'
import Card from '../../shared/Card'
import Button from '../../shared/Button'

import { useNavigate } from "react-router-dom";

import { CartContext } from '../../context/cart-context';


const Cart = () => {

  const { cartItems, removeProduct, increase, decrease, total } = useContext(CartContext);

  let navigate = useNavigate();

  const itemsList = cartItems.map(item => {
    return <li key={item.id} className='cart-list__item'>
      <div className='cart-list__item-image'>
        <img src={`${process.env.REACT_APP_AWS_URL}/${item.images[0]}`} alt={item.name} className='img-contain' />
      </div>
      <div className='cart-list__item-name'>
        {item.name}
      </div>
      <div className='cart-list__item-price'>
        {item.price} $
      </div>
      <div className='cart-list__item-remove' >
        <span className='fas fa-times' onClick={() => { removeProduct(item) }}></span>
      </div>
    </li>
  })

  return (
    <div className='cart'>
      <Card>
        {cartItems.length > 0 ? (<div className='cart-container'>
          <div className='cart-list'>
            {itemsList}
          </div>
          <div className='cart-payment'>
            <h2>Cart</h2>
            <div className='cart-payment__container'>
              <div>
                <h5>For your items you will pay:</h5>
                <h3>{total} $</h3>
              </div>
              <div className='pay-button'>
                <Button
                  onClick={() => { alert("This is a demo app, you can't buy it :)") }}
                >PAY</Button>
              </div>
            </div>

            <div className='back-button'>
              <Button
                inverse={true}
                onClick={() => {
                  navigate(-1)
                }}>GO BACK</Button>
            </div>

          </div>
        </div>) : (<div className='cart-empty'>
          <h2 >you have no items</h2>
          <Button onClick={() => {
            window.location.replace('http://localhost:3000/store');
          }}>GO TO STORE</Button>
        </div>)}

      </Card>
    </div>
  )
}

export default Cart