import React from 'react';
import logo from '../../photos/logo/logo.png'

import { NavLink } from "react-router-dom";

import elements from '../../shared/NavigationElements';

const Footer = () => {

  const navigationElements = elements.map((element, id) => {
    return <div key={id} className='footer-navigation__element'><NavLink to={id > 0 ? element.toLowerCase() : '/'}>{element}</NavLink></div>
  })

  return (
    <div className='footer'>
      <div className='footer__container'>
        <div className='footer__container-navigation'>
          {navigationElements}
        </div>
        <div className='footer__container-logo'>
          <div className='logo__container'>
            <img src={logo} alt='logo' />
          </div>
        </div>
        <div className='footer__container-media'>
        <span className="fab fa-facebook"></span>
        <span className="fab fa-instagram"></span>
        <span className="fab fa-youtube"></span>
        </div>
      </div>
      <div className='footer-copyright'>
        Copyright © 2023 Adrian Majewski. All rights reserved.
      </div>
    </div>
  )
}

export default Footer