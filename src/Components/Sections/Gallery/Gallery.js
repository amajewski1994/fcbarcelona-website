import React, { useState, useEffect, useContext } from 'react'
import { motion } from 'framer-motion';

import Button from '../../../shared/Button';

import { useHttpClient } from '../../../hooks/http-hook';
import LoadingSpinner from '../../../shared/LoadingSpinner';

import GalleryPhoto from './GalleryPhoto';
import GalleryPhotoNew from './GalleryPhotoNew';
import Modal from '../../../shared/Modal';

import { AuthContext } from '../../../context/auth-context';

const Gallery = () => {

    const auth = useContext(AuthContext);

    const [photoList, setPhotoList] = useState([]);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const [modal, setModal] = useState(false);
    const [newPhotoModal, setNewPhotoModal] = useState(false);
    const [activePhoto, setActivePhoto] = useState(false);

    const hideModal = () => {
        setModal(false)
        setNewPhotoModal(false)
    }

    const showModal = (e) => {
        if (e.target) {
            setNewPhotoModal(true)
        } else {
            setModal(true)
        }

    }

    const onChange = (e) => {
        if (photoList.length > 1) {
            const side = e.target.getAttribute('data-side')
            const activeId = parseInt(e.target.id)
            let nextPhoto
            if (side === 'left') {
                if (activeId === 0) {
                    nextPhoto = photoList[photoList.length - 1]
                } else {
                    nextPhoto = photoList[activeId - 1]
                }
            } else {
                if (activeId === photoList.length - 1) {
                    nextPhoto = photoList[0]
                } else {
                    nextPhoto = photoList[activeId + 1]
                }
            }
            setActivePhoto(nextPhoto)
        }
    }

    useEffect(() => {

        const fetchPhotos = async () => {
            let photosWithIndex = []
            try {
                const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/photos`
                );
                responseData.photos.forEach((element, id) => {
                    const newElement = {
                        ...element,
                        index: id
                    }
                    photosWithIndex.push(newElement)
                })
                setPhotoList(photosWithIndex)
            } catch (err) { }
        };
        fetchPhotos();

        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 250);

    }, [sendRequest]);

    const photos = photoList.map((element, id) => {
        const clickHandler = () => {
            setActivePhoto(element)
            showModal(element)
        }
        return <motion.div
            key={element.id}
            className='gallery-element'
            onClick={clickHandler}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1, transition: { duration: 0.5, delay: 0.2 } }}
            viewport={{ once: true }}
        >
            <div className='gallery-element__image'>
                <img src={`${process.env.REACT_APP_AWS_URL}/${element.image}`} alt={element.name} />
            </div>
            <div className='gallery-element__info'>
                <div className='gallery-element__bottom'>
                    <div className='gallery-element__bottom-author'><p>Author:</p><p>{element.author.nickname}</p></div>
                    <div className='gallery-element__bottom-name'>
                        <h3>{element.name}</h3>
                    </div>
                </div>
            </div>
        </motion.div>

    })

    return (
        <React.Fragment>
            <Modal
                className='gallery-modal'
                show={modal}
                onCancel={hideModal}
                header={activePhoto && activePhoto.name}
                headerClass='gallery-modal__header'
                children={
                    <React.Fragment>
                        <GalleryPhoto id={activePhoto.index} image={activePhoto.image} name={activePhoto.name} onChange={onChange} />
                    </React.Fragment>
                }
                contentClass='gallery-content'
                footerClass='gallery-footer'
            ></Modal>
            <Modal
                className='gallery-modal'
                show={newPhotoModal}
                onCancel={hideModal}
                header='New Photo'
                headerClass='gallery-modal__header'
                children={
                    <React.Fragment>
                        <GalleryPhotoNew auth={auth} hideModal={hideModal} />
                    </React.Fragment>
                }
                contentClass='gallery-content'
                footerClass='gallery-footer'
            ></Modal>
            <div className='gallery'>
                {isLoading && (
                    <div className='center'>
                        <LoadingSpinner asOverlay={true} />
                    </div>
                )}
                {!isLoading && (
                    <div>
                        <motion.div
                            className='section-title__container'
                            style={{ position: 'relative' }}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1, transition: { duration: 0.5, delay: 0.2 } }}
                            viewport={{ once: true }}
                        >
                            <h1>Gallery</h1>
                            {auth.isLoggedIn && (<div className='section-title__container-button'>
                                <Button onClick={showModal}>ADD NEW</Button>
                            </div>)}

                        </motion.div>
                        <div className='gallery-container'>
                            {photoList.length > 0 && photos}
                        </div>
                    </div>


                )}
            </div>
        </React.Fragment>
    )
}

export default Gallery