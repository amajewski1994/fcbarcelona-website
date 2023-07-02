import React, { useState, useContext, useEffect } from 'react';
import logo from '../../photos/logo/logo.png'

import { Link, NavLink } from "react-router-dom";
import Modal from '../../shared/Modal';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import elements from '../../shared/NavigationElements';

import { AuthContext } from '../../context/auth-context';

import { motion } from 'framer-motion';

const Header = () => {

  const [modal, setModal] = useState(false);
  const [isLoginFormOn, setIsLoginFormOn] = useState(true);
  const [isOpen, setIsOpen] = useState(window.innerWidth > 700 ? true : false);

  const auth = useContext(AuthContext);

  useEffect(() => {
    const updateWindowDimensions = () => {
      const newWidth = window.innerWidth;
      if (newWidth > 700) {
        setIsOpen(true)
      } else {
        setIsOpen(false)
      }
    };

    window.addEventListener("resize", updateWindowDimensions);

    return () => window.removeEventListener("resize", updateWindowDimensions)

  }, []);

  const hideModal = () => {
    setModal(false)
  }

  const showModal = () => {
    setModal(true)
  }

  const toggleForm = () => {
    setIsLoginFormOn(!isLoginFormOn)
  }

  const closeNavigation = () => {
    const width = window.innerWidth;
    if (width < 700) {
      setIsOpen(false)
    }
  }

  return (
    <React.Fragment>
      <Modal
        show={modal}
        onCancel={hideModal}
        header={isLoginFormOn ? "Login" : "Register"}
        children={
          <React.Fragment>
            {isLoginFormOn ? <LoginForm auth={auth} hideModal={hideModal} toggleForm={toggleForm} /> : <RegisterForm auth={auth} hideModal={hideModal} toggleForm={toggleForm} />}
          </React.Fragment>
        }
      ></Modal>
      <motion.div className='header'
        initial={window.innerWidth > 700 ? true : false}
        animate={isOpen ? "open" : "closed"}
      >
        <div className='header-logo'>
          <Link to='/'><img src={logo} alt='logo' /></Link>
        </div>

        <span className="fas fa-bars" onClick={() => setIsOpen(prevOpen => !prevOpen)}></span>
        {/* <div onClick={() => setIsOpen(prevOpen => !prevOpen)}>aaa</div> */}
        <motion.ul
          className='header-navigation'
          variants={{
            open: {
              clipPath: "inset(0% 0% 0% 0% round 0 0 10px 10px)",
              transition: {
                type: "spring",
                bounce: 0,
                duration: 0.7,
                delayChildren: 0.3,
                staggerChildren: 0.05
              },
              height: 'auto'
            },
            closed: {
              clipPath: "inset(10% 50% 90% 50% round 10px)",
              transition: {
                type: "spring",
                bounce: 0,
                duration: 0.3
              },
              height: 0
            }
          }}
        >
          {elements.map((element, id) => {
            return <li className='header-navigation__element' key={id} onClick={closeNavigation}><NavLink to={id > 0 ? element.toLowerCase() : '/'}>{element}</NavLink></li>
          })}
          {!auth.isLoggedIn && <li className='header-navigation__element' onClick={() => {
            showModal()
            closeNavigation()
          }}>Login</li>}
          {auth.isLoggedIn && <li className='header-navigation__element logout' onClick={() => {
            auth.logout()
            closeNavigation()
          }}>Logout</li>}
          {auth.isLoggedIn && <li>
            <div>
              <img src={`${process.env.REACT_APP_AWS_URL}/${auth.avatar}`} alt='avatar'></img>
            </div>
            <p>{auth.nickname}</p>
          </li>}
        </motion.ul>

      </motion.div>
    </React.Fragment>
  )
}

export default Header