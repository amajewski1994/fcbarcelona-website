import React, { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion';

import img1 from '../../photos/articles/article1.jpg';
import img2 from '../../photos/articles/article2.jpg';
import img3 from '../../photos/articles/article3.jpg';

import lewandowski from '../../photos/players/robert-lewandowski-178.png';

import { useNavigate } from 'react-router-dom'
import { useHttpClient } from '../../hooks/http-hook';

import Button from '../../shared/Button'
import LoadingSpinner from '../../shared/LoadingSpinner';

const Home = () => {

    const [firstImageBottom, setFirstImageBottom] = useState(10)
    const [secondImageTop, setSecondImageTop] = useState(0)
    const [thirdImageLeft, setThirdImageLeft] = useState(0)
    const [activeFaQ, setActiveFaQ] = useState(false)
    const [newsList, setNewsList] = useState([])

    const refHeader = useRef(null);
    const isHeaderInView = useInView(refHeader, { once: true });

    const refNews = useRef(null);
    const isNewsInView = useInView(refNews, { once: true });

    const refStore = useRef(null);
    const isStoreInView = useInView(refStore, { once: true });

    const refTeam = useRef(null);
    const isTeamInView = useInView(refTeam, { once: true });

    const refFAQ = useRef(null);
    const isFAQInView = useInView(refFAQ, { once: true });

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const navigate = useNavigate()

    const FAQ = [
        {
            question: "What is this site?",
            answer: "This site is about Football Club Barcelona. You can read interesting news, buy a jersey or view beautiful photos from the stadium."
        }, {
            question: "What items can I buy?",
            answer: "You can buy anything related to FC Barcelona. Home jersey, away jersey, souvenirs or many others."
        }, {
            question: "Can I add a photo?",
            answer: "Yes, if you are logged in, you should go to the Gallery section. We can't wait to see your photo!"
        }, {
            question: "Can I add a news article?",
            answer: "Only users with a special status can add an article. Otherwise, you can comment on news or add a like."
        },
    ];

    useEffect(() => {
        window.addEventListener('scroll', (e) => {
            const positionVertical = window.scrollY / 50;
            const positionHorizontal = window.scrollY / 70 - 70;
            setFirstImageBottom(positionVertical)
            setSecondImageTop(positionVertical)
            setThirdImageLeft(positionHorizontal)
        })

        const fetchNews = async () => {
            try {
                const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/news`
                );
                setNewsList(responseData.news.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
            } catch (err) { }
        };
        fetchNews();
        window.scrollTo(0, 0);

    }, [sendRequest])

    const shwoAnswerHandler = (id) => {
        if (id === activeFaQ) {
            setActiveFaQ(false)
        } else {
            setActiveFaQ(id)
        }
    }

    return (
        <div className='home'>
            {isLoading && (
                <div className='center'>
                    <LoadingSpinner asOverlay={true} />
                </div>
            )}
            <section className='home-header' ref={refHeader}>
                <div className='home-header__title section-title__container'>
                    <motion.h1
                        style={{
                            opacity: isHeaderInView ? 1 : 0,
                            transition: `all 1.5s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s`
                        }}
                    >FC Barcelona</motion.h1>
                    <motion.h3
                        style={{
                            opacity: isHeaderInView ? 1 : 0,
                            transition: `all 1.5s cubic-bezier(0.17, 0.55, 0.55, 1) 1s`
                        }}
                    >Més que un club</motion.h3>
                    <motion.ul
                        style={{
                            opacity: isHeaderInView ? 1 : 0,
                            transition: `all 1.5s cubic-bezier(0.17, 0.55, 0.55, 1) 1.5s`
                        }}
                    >Welcome to the FC Barcelona website where you can:
                        <li>read the latest articles about the club,</li>
                        <li>add a beautifull Camp Nou photo,</li>
                        <li>read about your favourite players,</li>
                        <li>buy a new item.</li></motion.ul>

                </div>
            </section>
            <section className='home-news'>
                <h2 className='home-news__title'>News</h2>
                <div
                    className='home-news__articles-container'
                    ref={refNews}
                >
                    {newsList.length > 0 && newsList.map((element, id) => {
                        return <motion.article className='article' key={id} onClick={() => navigate(`/news/${element.id}`)}
                            style={{
                                transform: isNewsInView ? "none" : "translateX(-200px)",
                                opacity: isNewsInView ? 1 : 0,
                                transition: `all 1s cubic-bezier(0.17, 0.55, 0.55, 1) ${id / 2}s`
                            }}
                        >
                            <div className='article-top__container'>
                                <div className='article-image__container'>
                                    <img src={`${process.env.REACT_APP_AWS_URL}/${element.image}`} alt={element.title} />
                                </div>

                                <h4 className='article-title'>{element.title}</h4>
                                <p className='article-description'>{element.article[0].description.slice(0, 450)}...</p>
                            </div>
                            <div className='article-bottom__container'>
                                <div className='article-footer'>
                                    <div className='article-footer__date'>{element.createdAt.slice(0, 10)}</div>
                                    <div className='article-footer__comments'>{element.comments.length} comments</div>
                                    <div className='article-footer__author'>{element.author.nickname}</div>
                                </div>
                            </div>

                        </motion.article>
                    })}
                </div>
                <button className='home-news__button' onClick={() => navigate('/news')}>
                    Show more
                </button>
            </section>
            <section className='home-store' ref={refStore}>
                <motion.div
                    className='home-store__left-container'
                    style={{
                        opacity: isStoreInView ? 1 : 0,
                        transition: `all 1.5s cubic-bezier(0.17, 0.55, 0.55, 1) 1s`
                    }}
                >
                    <h2 className='home-store__title'>Store</h2>
                    <p className='home-store__description'>
                        If you are a real FC Barcelona fan, you need to have special cule equipment.
                    </p>
                    <p className='home-store__description'>
                        Check out our store and buy anything you want!
                    </p>
                    <Button
                        onClick={() => navigate('/store')}
                    >Go to store</Button>
                </motion.div>
                <div className='home-store__right-container'>
                    <div className='home-store__image-container image-first' style={{ bottom: `${firstImageBottom}%` }}>
                        <img src={img1} alt='store' />
                    </div>
                    <div className='home-store__image-container image-second' style={{ top: `${secondImageTop}%` }}>
                        <img src={img2} alt='store' />
                    </div>
                    <div className='home-store__image-container image-third' style={{ left: `${thirdImageLeft}%`, bottom: `-5%` }}>
                        <img src={img3} alt='store' />
                    </div>
                </div>
                <div className='home-store__small-device'>
                    <div className='home-store__image-container'>
                        <img src={img1} alt='store' />
                    </div>
                    <div className='home-store__image-container'>
                        <img src={img2} alt='store' />
                    </div>
                </div>

            </section>
            <section className='home-team' ref={refTeam} >
            <motion.div 
                    className='home-team__photo'
                    style={{
                        opacity: isTeamInView ? 1 : 0,
                        transition: `all 1.5s cubic-bezier(0.17, 0.55, 0.55, 1) 1.25s`
                    }}
                    >
                        <img src={lewandowski} alt='lewandowski'></img>
                    </motion.div>
                    <motion.div 
                    className='home-team__info'
                    style={{
                        opacity: isTeamInView ? 1 : 0,
                        transition: `all 1.5s cubic-bezier(0.17, 0.55, 0.55, 1) 1s`
                    }}
                    >
                        <h2>TEAM</h2>
                        <h3>Barca is one of the best football clubs and attracts world class players from all over the world.</h3> 
                        <h3>Get to know Barca players!</h3>
                        <Button
                        onClick={() => navigate('/team')}
                        size='big'
                        >Go to team</Button>
                    </motion.div>
                    
            </section>
            <section className='home-faq' >
                <h2 className='home-faq__title'>FAQ</h2>
                <div className='home-faq__container' ref={refFAQ}>
                    {FAQ.map((element, id) => {
                        return (<motion.div
                            className='home-faq__element'
                            style={{
                                transform: isFAQInView ? "none" : "translateX(-50px)",
                                opacity: isFAQInView ? 1 : 0,
                                transition: `all 1.25s cubic-bezier(0.17, 0.55, 0.55, 1) ${id / 2}s`
                            }}
                            key={id}
                        >
                            <p className='home-faq__element-question'>{element.question} <span className={`${activeFaQ === id ? 'fas fa-minus' : 'fas fa-plus'}`} onClick={() => shwoAnswerHandler(id)}></span></p>
                            <p className={`home-faq__element-answer ${activeFaQ === id && 'active'}`}>{element.answer}</p>
                        </motion.div>)
                    })}
                </div>
                <motion.div className='home-faq__contact'
                    style={{
                        opacity: isFAQInView ? 1 : 0,
                        transition: `all 1.25s cubic-bezier(0.17, 0.55, 0.55, 1) 1.5s`
                    }}>
                    <p>You didn't find an answer?</p>
                    <p>No problem, you can ask us anything you want!</p>
                    <button className='home-faq__button' onClick={() => navigate('contact')}>
                        Contact Us!
                    </button>
                </motion.div>
            </section>
        </div>
    )
}

export default Home