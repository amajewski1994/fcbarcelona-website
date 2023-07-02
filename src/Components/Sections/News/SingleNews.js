import React, { useState, useEffect, useContext } from 'react'
import Card from '../../../shared/Card'
import Button from '../../../shared/Button'
import Input from '../../../shared/Input'

import {
  VALIDATOR_REQUIRE
} from '../../../shared/validators';

import { useHttpClient } from '../../../hooks/http-hook';
import LoadingSpinner from '../../../shared/LoadingSpinner';

import { useParams, useNavigate } from 'react-router-dom'

import { CartContext } from '../../../context/cart-context';
import { useForm } from '../../../hooks/form-hook';
import { AuthContext } from '../../../context/auth-context';

const SingleNews = () => {

  const auth = useContext(AuthContext);
  const [news, setNews] = useState(false);
  const [comments, setComments] = useState(false);
  const [like, setLike] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  let params = useParams()
  const navigate = useNavigate()

  const [formState, inputHandler] = useForm(
    {
      comment: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const submitCommentHandler = async (e) => {
    e.preventDefault();
    try {
      const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/comments/${params.nid}`, 'POST',
        JSON.stringify({
          comment: formState.inputs.comment.value
        }), {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + auth.token
      }
      );
    } catch (err) { }
    fetchComments();
  }

  const addLikeHandler = async (e) => {
    e.preventDefault();
    try {
      const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/news/likes/${params.nid}`, 'PATCH',
        JSON.stringify({
        }), {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + auth.token
      }
      );
      setLike(prevLike => !prevLike)
      setNews(responseData.news)
    } catch (err) { }
  }

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/news/${params.nid}`
        );
        setNews(responseData.news)
      } catch (err) { }
    };
    fetchNews();
    fetchComments();

    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 250)
  }, [sendRequest]);

  const fetchComments = async () => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/comments/${params.nid}`
      );
      setComments(responseData.comments)
    } catch (err) { }
  };

  useEffect(() => {
    if (auth.userId && news.likes) {
      const isLiked = news.likes.find(id => id === auth.userId)
      console.log(!!isLiked)
      setLike(!!isLiked)
    } else {
      setLike(false)
    }
  }, [auth.userId, news.likes])

  const deleteCommentHandler = async (e) => {
    try {
      const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/comments/${e.target.id}`, 
      'DELETE',
      null, 
      {
        Authorization: 'Bearer ' + auth.token
      }
      );
    } catch (err) { }
    fetchComments()
  }


  const commentsList = comments && comments.map((element, id) => {
    return (
      <div key={element.id} className={`comment ${(parseInt(id) % 2) && 'even'}`}>
        <span className={`fas fa-times ${element.author.id === auth.userId && 'visible'}`} id={element.id} onClick={deleteCommentHandler}></span>
        <div className='comment-author'><b>{element.author.nickname}</b></div>
        <div className='comment-content'>{element.comment}</div>
      </div>
    )
  })

  const description = news && news.article.map((element, id) => {
    return (<div key={id} className='news-single__article'>
      <div className='news-single__article-title'>
        <h3>{element.title}</h3>
      </div>
      <div className='news-single__article-description'>
        {element.description}
      </div>
    </div>)
  })

  return (

    <div className='news-single'>
      {isLoading && (
        <div className='center'>
          <LoadingSpinner asOverlay={true} />
        </div>
      )}
      {!isLoading && news && (
        <Card>

          {news && <div className='news-single__container'>
            <div className='news-single__image'>
              <img src={`${process.env.REACT_APP_AWS_URL}/${news.image}`} alt={news.name} />
            </div>
            <div className='news-single__info'>
              <div className='news-single__info-title'>
                <h2>{news.title}</h2>
              </div>
              {description}
              <div className='news-single__info-bottom'>
                <div className='news-single__info-bottom-date'>{news.createdAt.slice(0, 10)}</div>
                <div className='news-single__info-bottom-author'>Author: <b>{news.author.nickname}</b></div>
                <div className='news-single__info-bottom-likes'><span onClick={addLikeHandler} className="fas fa-thumbs-up"></span> {news.likes.length}{like && <div>You like it!</div>}</div>
              </div>
            </div>
            <div className='news-single__comments'>
              <div className='back'>
                <Button
                  onClick={() => { navigate(-1) }}>
                  Back to list
                </Button>
              </div>

              {auth.isLoggedIn && <div style={{ margin: '50px auto' }}>
                <Input
                  id={'comment'}
                  element="textarea"
                  label="Your Comment"
                  validators={[VALIDATOR_REQUIRE()]}
                  // errorText="Please enter a comment."
                  onInput={inputHandler}
                />
                <Button
                  size='small'
                  inverse={true}
                  disabled={!formState.isValid}
                  onClick={submitCommentHandler}
                >Add Comment</Button>
              </div>}
              <h4>Comments</h4>
              {commentsList.length > 0 ? <div className='news-single__comments-container'>

                {commentsList}
              </div> : <span style={{ display: 'block', textAlign: 'center' }}>no comments yet</span>}

            </div>
          </div>}

        </Card>
      )}
    </div>
  )
}

export default SingleNews