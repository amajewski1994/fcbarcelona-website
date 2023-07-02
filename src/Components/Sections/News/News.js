import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion';

import { useHttpClient } from '../../../hooks/http-hook';
import LoadingSpinner from '../../../shared/LoadingSpinner';

import { Link } from 'react-router-dom'

import Card from '../../../shared/Card';

const News = () => {

    const [newsList, setNewsList] = useState([]);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/news`
                );
                setNewsList(responseData.news.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
            } catch (err) { }
        };
        fetchNews();
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 250)

    }, [sendRequest]);

    const news = newsList.map(element => {
        return <motion.div
            key={element.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1, transition: { duration: 0.5, delay: 0.2 } }}
            viewport={{ once: true }}
        ><Card><div className='news-element'>
            <Link to={element.id.toString()}>
                <div className='news-element__image'>
                    <img src={`${process.env.REACT_APP_AWS_URL}/${element.image}`} alt={element.title} />
                </div>
                <div className='news-element__info'>
                    <div className='news-element__title'>
                        <h3>{element.title}</h3>
                    </div>
                    <div className='news-element__description'>{element.article[0].description.slice(0, 500)}...</div>
                    <div className='news-element__bottom'>
                        <div className='news-element__bottom-author'><b>Author:</b> {element.author.nickname}</div>
                        <div className='news-element__bottom-comments'><b>Comments:</b> {element.comments.length}</div>
                        <div className='news-element__bottom-likes'><span className="fas fa-thumbs-up" onClick={() => {
                        }}></span> {element.likes.length}</div>
                    </div>
                </div>
            </Link>
        </div></Card></motion.div>

    })


    return (
        <React.Fragment>
            <div className='news'>
                {isLoading && (
                    <div className='center'>
                        <LoadingSpinner asOverlay={true} />
                    </div>
                )}
                {!isLoading && (

                    <div className='news-container'>
                        <motion.div
                            className='section-title__container'
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1, transition: { duration: 0.5, delay: 0.2 } }}
                            viewport={{ once: true }}
                        >
                            <h1>News</h1>
                        </motion.div>
                        {news.length > 0 && news}
                    </div>

                )}
            </div>
        </React.Fragment>
    )
}

export default News