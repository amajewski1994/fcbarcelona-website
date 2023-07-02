import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import Card from '../../../shared/Card';

import { useHttpClient } from '../../../hooks/http-hook';
import LoadingSpinner from '../../../shared/LoadingSpinner';

import { Link } from 'react-router-dom'

const Team = () => {

  const [players, setPlayers] = useState([]);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    
    const fetchPlayers = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/players`
        );

        setPlayers(responseData.players.sort((a, b) => a.number - b.number))
      } catch (err) { }
    };
    fetchPlayers();
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 250);

  }, [sendRequest]);

  const getPlayers = (position) => {
    return players.map(player => {
      if (player.position === position) {
        return (<motion.li
          key={player.id}
          className='team-player'
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, transition: { duration: 0.5, delay: 0.2 } }}
          viewport={{ once: true }}
        >
          <Link to={player.id.toString()}>
            <div className='team-player__image'><img src={`${process.env.REACT_APP_AWS_URL}/${player.image}`} alt={player.name}></img></div>
            <div className='team-player__info'>{player.number}. {player.name}</div>
          </Link></motion.li>)
      }
    })
  }

  return (
    <React.Fragment>
      {isLoading && (
        <div className='center'>
          <LoadingSpinner 
          asOverlay={true} 
          center
          />
        </div>
      )}
      {!isLoading && (
        <div className='team'>
          <motion.div
            className='section-title__container'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1, transition: { duration: 0.5, delay: 0.2 } }}
            viewport={{ once: true }}
          >
            <h1>Team</h1>
          </motion.div>
          <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, transition: { duration: 0.5, delay: 0.4 } }}
          viewport={{ once: true }}
          >
          <Card>
            <motion.div 
            className='team-container'
            >
              <div className='team-goalkeepers'>
                <h3>Goalkeepers</h3>
                <div className='players-container'>
                  {getPlayers('Goalkeeper')}
                </div>
              </div>
              <div className='team-defenders'>
                <h3>Defenders</h3>
                <div className='players-container'>
                  {getPlayers('Defender')}
                </div>
              </div>
              <div className='team-midfielders'>
                <h3>Midfielders</h3>
                <div className='players-container'>
                  {getPlayers('Midfielder')}
                </div>
              </div>
              <div className='team-strikers'>
                <h3>Forwards</h3>
                <div className='players-container'>
                  {getPlayers('Striker')}
                </div>
              </div>
            </motion.div>
          </Card>
          </motion.div>
        </div>
      )}

    </React.Fragment>
  )
}

export default Team;