import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion';

import { useHttpClient } from '../../../hooks/http-hook';
import LoadingSpinner from '../../../shared/LoadingSpinner';

import { Link } from 'react-router-dom'

const Store = () => {

    const [fullItemsList, setFullItemsList] = useState([]);
    const [itemsTypes, setItemsTypes] = useState([]);
    const [itemsList, setItemsList] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const [filters, setFilters] = useState({
        searchValue: false,
        type: false,
        minPriceValue: 0,
        maxPriceValue: 100,
        numberOfImages: 0,
    });

    const itemVariants = {
        open: {
            opacity: 1,
            y: 0,
            height: '30px',
            transition: { type: "spring", stiffness: 300, damping: 24 }
        },
        closed: { height: 0, opacity: 0, y: 0, transition: { duration: 0.2 } }
    };

    let radioOptionsArr = [0, 1, 2, 3, 4]

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/items`
                );
                setItemsList(responseData.items)
                setFullItemsList(responseData.items)

                let types = []
                responseData.items.forEach(element => {
                    types.push(element.type.toLowerCase())
                });
                const typesArrayWithNoDuplicates = types.reduce(
                    (accumulator, currentValue) => {
                        if (!accumulator.includes(currentValue)) {
                            return [...accumulator, currentValue];
                        }
                        return accumulator;
                    },
                    [],
                );
                setItemsTypes(typesArrayWithNoDuplicates)
            } catch (err) { }
        };
        fetchItems();


    }, [sendRequest]);

    useEffect(() => {

        const fullItemsArr = [...fullItemsList]
        let filteredArr
        filteredArr = fullItemsArr.filter(item => {
            return (item.price >= filters.minPriceValue && item.price <= filters.maxPriceValue)
        })
        if (filters.searchValue.length > 0) {
            filteredArr = filteredArr.filter(item => {
                const itemName = item.name.toUpperCase()
                const searchValue = filters.searchValue.toUpperCase()
                return itemName.includes(searchValue)
            })
        }
        if (filters.type.length > 0) {
            filteredArr = filteredArr.filter(item => {
                const itemType = item.type.toUpperCase()
                const searchValue = filters.type.toUpperCase()
                return itemType.includes(searchValue)
            })
        }
        if (filters.numberOfImages > 0) {
            filteredArr = filteredArr.filter(item => {
                let num = filters.numberOfImages
                if (num === 4) return item.images.length >= num
                else return item.images.length === num
            })
        }
        setItemsList(filteredArr)
    }, [filters])

    const items = itemsList.map(item => {
        return <motion.div
            key={item.id}
            className='item'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1, transition: { duration: 0.5, delay: 0.2 } }}
            viewport={{ once: true }}
        >
            <Link to={item.id}>
                <div className='item-container'>
                    <div className='item-image'>
                        <img src={`${process.env.REACT_APP_AWS_URL}/${item.images[0]}`} alt={item.name} />
                    </div>
                    <div className='item-info'>
                        <div className='item-info__name'>{item.name}</div>
                        <div className='item-info__price'>
                            <div>
                                <span>{item.price}$</span>
                            </div>
                            </div>
                    </div>
                </div>
            </Link>
        </motion.div>

    })

    const inputHandler = (e) => {
        if (e.target.id === 'search') {
            setFilters(prevFilters => {
                return {
                    ...prevFilters,
                    searchValue: e.target.value.toUpperCase()
                }
            })
        } else if (e.target.id === 'price-range') {
            if (e.target.name === 'min-price') {
                const value = e.target.value
                if (parseInt(value) < parseInt(filters.maxPriceValue)) {
                    setFilters(prevFilters => {
                        return {
                            ...prevFilters,
                            minPriceValue: value
                        }
                    })
                }
            } else if (e.target.name === 'max-price') {
                const value = e.target.value
                if (parseInt(value) > parseInt(filters.minPriceValue)) {
                    setFilters(prevFilters => {
                        return {
                            ...prevFilters,
                            maxPriceValue: value
                        }
                    })
                }
            }
        } else if (e.target.type === 'radio') {
            setFilters(prevFilters => {
                return {
                    ...prevFilters,
                    numberOfImages: parseInt(e.target.value)
                }
            })
        } else if (e.target.id === 'type-select') {
            setFilters(prevFilters => {
                return {
                    ...prevFilters,
                    type: e.target.dataset.value
                }
            })
            setIsOpen(false)
        }
    }

    const typeOptions = itemsTypes.map((type, id) => {
        return <motion.li key={id} data-value={type} variants={itemVariants} id="type-select" onClick={(e) => { inputHandler(e) }}>{type}</motion.li>
    })

    const radioOptions = radioOptionsArr.map(option => {
        return <div key={option}><input type="radio" id={option} name={option} value={option}
            checked={filters.numberOfImages === option ? true : false}
            onChange={(e) => { inputHandler(e) }}
        />
            <label htmlFor={option}>{option === 0 ? 'Any' : option}</label>
        </div>
    })



    return (
        <React.Fragment>
            <div className='store'>
                {isLoading && (
                    <div className='center'>
                        <LoadingSpinner />
                    </div>
                )}
                {!isLoading && (
                    <>
                        <div className='store-header'>
                            <div className='store-header__navbar'>
                                <div>
                                    <input id='search' type='text' placeholder='SEARCH' onChange={inputHandler} />

                                </div>
                                <div className='cart__container'>
                                    <Link to='0/cart'><span className='fas fa-shopping-cart'></span></Link>
                                </div>
                            </div>
                            <motion.h2
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1, transition: { duration: 0.5, delay: 0.2 } }}
                                viewport={{ once: true }}
                            >STORE</motion.h2>
                        </div>
                        <div className='store-container'>
                            <div className='store-container__left'>
                                <h3>Filters</h3>
                                <div className='input-container filters-container'>
                                    <label htmlFor="type-select" className='select-label'>Type</label>
                                    <motion.nav
                                        initial={false}
                                        animate={isOpen ? "open" : "closed"}
                                        className="menu"

                                    >
                                        <motion.span
                                            onClick={() => {
                                                setIsOpen(!isOpen)
                                            }}>
                                            {filters.type ? filters.type : 'Choose an option'}
                                        </motion.span>
                                        {filters.type && <motion.span
                                            className='fas fa-times'
                                            onClick={() => {
                                                setFilters(prevFilters => {
                                                    return {
                                                        ...prevFilters,
                                                        type: false
                                                    }
                                                })
                                            }}
                                        >
                                        </motion.span>}
                                        <motion.ul
                                            variants={{
                                                open: {
                                                    clipPath: "inset(0% 0% 0% 0% round 10px)",
                                                    transition: {
                                                        type: "spring",
                                                        bounce: 0,
                                                        duration: 0.7,
                                                        delayChildren: 0.3,
                                                        staggerChildren: 0.05
                                                    },
                                                    marginTop: '0.5em'
                                                },
                                                closed: {
                                                    clipPath: "inset(10% 50% 90% 50% round 10px)",
                                                    transition: {
                                                        type: "spring",
                                                        bounce: 0,
                                                        duration: 0.3
                                                    },
                                                    marginTop: 0
                                                }
                                            }}
                                        >
                                            {typeOptions}
                                        </motion.ul>
                                    </motion.nav>
                                    <span style={{ width: '10%' }}></span>
                                </div>
                                <div className='input-container filters-container'>
                                    <label htmlFor="min-price">Min Price</label>
                                    <input type="range" id="price-range" name="min-price"
                                        min="0" max="100" value={filters.minPriceValue} step="10" onChange={inputHandler} />
                                    <span style={{ width: '10%' }}>{filters.minPriceValue}$</span>
                                </div>
                                <div className='input-container filters-container'>
                                    <label htmlFor="max-price">Max Price</label>
                                    <input type="range" id="price-range" name="max-price"
                                        min="0" max="100" value={filters.maxPriceValue} step="10" onChange={inputHandler} />
                                    <span style={{ width: '10%' }}>{filters.maxPriceValue}$</span>
                                </div>
                                <div className='input-container-images filters-container'>
                                    <legend>Number of images:</legend>
                                    <div className='radio-container'>{radioOptions}</div>
                                </div>
                            </div>
                            <div className='store-container__right'>
                                {items}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </React.Fragment>
    )

}

export default Store