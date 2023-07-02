import React, { useState, useEffect } from 'react'

import Card from '../../../shared/Card'
import Button from '../../../shared/Button';

import { useHttpClient } from '../../../hooks/http-hook';
import LoadingSpinner from '../../../shared/LoadingSpinner';

import { useParams, useNavigate } from 'react-router-dom'

const SinglePlayer = () => {

    const [player, setPlayer] = useState();

    const navigate = useNavigate()
    let params = useParams()

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchPlayer = async () => {
            try {
                const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/players/${params.pid}`
                );
                setPlayer(responseData.player)
            } catch (err) { }
        };
        fetchPlayer();
    }, [sendRequest]);

    return (
        <div className='single-player'>
            <div>
                <Card>
                    {isLoading && (
                        <div className='center'>
                            <LoadingSpinner asOverlay={true} />
                        </div>
                    )}
                    {!isLoading && player && <><div className='single-player__container'>
                        <div className='single-player__image'>
                            <img src={`${process.env.REACT_APP_AWS_URL}/${player.image}`} alt={player.name}></img>
                        </div>
                        <div className='single-player__info'>
                            <h2>{player.name}</h2>
                            <div className='single-player__info-container'>
                                <div>
                                    <p><span>Number:</span> {player.number}</p>
                                    <p><span>Position:</span> {player.position}</p>
                                    <p><span>Born:</span> {player.born}</p>
                                </div>
                                <div>
                                    <p><span>Height:</span> {player.height} cm</p>
                                    <p><span>Weight:</span> {player.weight} kg</p>
                                    <p><span>Country:</span> {player.country}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                        <div className='single-player__description'>
                            {player.description && player.description.map((description, id) => {
                                return (<p key={id}>
                                    {description}
                                </p>)
                            })}
                        </div>
                        <Button
                            onClick={() => { navigate(-1) }}
                        >Back to list</Button></>}
                </Card>
            </div>
        </div>
    )
}

export default SinglePlayer