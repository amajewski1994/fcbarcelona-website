import React, { useState, useEffect, useContext } from 'react'
import Card from '../../../shared/Card'
import Button from '../../../shared/Button'

import { useHttpClient } from '../../../hooks/http-hook';
import LoadingSpinner from '../../../shared/LoadingSpinner';

import { useParams, useNavigate } from 'react-router-dom'

import { CartContext } from '../../../context/cart-context';

const SingleItem = () => {

  const [item, setItem] = useState([]);
  const [isInCart, setIsInCart] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1000 ? true : false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [activeImage, setActiveImage] = useState()
  const [imageStyleScale, setImageStyleScale] = useState(1)
  const [imageStyleTransform, setImageStyleTransform] = useState('center')

  const { addProduct, cartItems } = useContext(CartContext)
  let navigate = useNavigate();

  let params = useParams()

  useEffect(() => {
    window.scrollTo(0, 0)
    const fetchItem = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/items/${params.iid}`
        );
        setItem(responseData.item)
        setActiveImage(responseData.item.images[0])
      } catch (err) { }
    };
    fetchItem();
  }, [sendRequest]);

  useEffect(() => {
    cartItems.forEach(element => {
      if (element.id === item.id) return setIsInCart(true)
    });
  }, [cartItems, item])

  useEffect(() => {
    const updateWindowDimensions = () => {
      const newWidth = window.innerWidth;
      if (newWidth < 1000) {
        setIsMobile(true)
      } else {
        setIsMobile(false)
      }
    };

    window.addEventListener("resize", updateWindowDimensions);

    return () => window.removeEventListener("resize", updateWindowDimensions)

  }, []);

  const mouseInEvent = () => {
    if (!isMobile) {
      setImageStyleScale(2)
    }
  }

  const mouseOutEvent = () => {
    setImageStyleScale(1)
    setImageStyleTransform('-50%, -50%')
  }

  const mouseMoveEvent = (e) => {

    const x = e.clientX - e.target.offsetLeft
    const y = e.clientY - e.target.offsetTop

    const iWidth = e.target.offsetWidth
    const iHeight = e.target.offsetHeight

    const transformX = x / iWidth * -100
    const transformY = y / iHeight * -100

    if (!isMobile) {
      setImageStyleTransform(`${transformX}%, ${transformY}%`)
    }
  }

  const elementClick = (e) => {
    const id = parseInt(e.target.id)
    setActiveImage(item.images[id])
  }

  return (

    <div className='single-item'>
      {isLoading && (
        <div className='center'>
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && item && activeImage && (
        <div>
          {/* <div ref={card} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}> */}
          <Card>
            <div className='single-item__container'>
              <div className='single-item__container-left'>
                <div className='main-image' onMouseEnter={mouseInEvent} onMouseLeave={mouseOutEvent} onMouseMove={mouseMoveEvent}>
                
                  <img src={`${process.env.REACT_APP_AWS_URL}/${activeImage}`} alt={item.name} style={{ transform: `translate(${imageStyleTransform}) scale(${imageStyleScale})` }} />
                </div>
                <div className='images-container'>
                  {item.images.map((image, id) => {
                    return (<div key={id} id={id} className='images-container__element' onClick={elementClick}><img className='img-contain' src={`${process.env.REACT_APP_AWS_URL}/${item.images[id]}`} alt={item.name} style={{ pointerEvents: 'none' }} /></div>)
                  })}
                </div>
              </div>
              <div className='single-item__container-right'>
                <h1>{item.name}</h1>
                <div className='item-description'>
                  <h4>Description:</h4>
                  <p>{item.description}</p>
                </div>
                <div className='container'>
                  <div className='item-price'>
                    <h4>Price: <span>{item.price} $ </span></h4>
                  </div>
                  <div className='item-button'>
                    {!isInCart ? (<Button size='big' onClick={() => {
                      addProduct(item);
                    }}>ADD TO CART</Button>) : (<Button size='big' onClick={() => {
                      navigate("cart")
                    }}>GO TO CART</Button>)}
                  </div>
                </div>
                <div className='item-back-button'>
                  <Button
                    size='small'
                    inverse={true}
                    onClick={() => { navigate(-1) }}
                  >Back to list</Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )
      }
    </div >
  )
}

export default SingleItem