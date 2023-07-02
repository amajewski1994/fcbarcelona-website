import React, { useState } from 'react'
import Elements from './AdminElements/Elements';
import NewElement from './AdminElements/NewElement';

const ADMIN_NAV = ['store', 'gallery', 'news', 'team', 'comments']

const Admin = () => {

    const [activeElement, setActiveElement] = useState(ADMIN_NAV.length);
    const [addIsActive, setAddIsActive] = useState(false);

    const handleAdminNavigation = (e) => {
        const navElements = document.querySelectorAll('li.adminNavElement')
        navElements.forEach(element => element.classList.remove('active'))

        if (e.target.classList.contains('add')) {
            setAddIsActive(true)
        } else {
            setAddIsActive(false)
        }
        e.target.classList.add('active')
        setActiveElement(parseInt(e.target.id))
    }

    const adminNavigation = ADMIN_NAV.map((element, id) => {
        return (<div key={id} className='admin-navigation'>
            <h5>{element.toUpperCase()}</h5>
            <li id={id} className='adminNavElement add' onClick={handleAdminNavigation}>ADD</li>
            <li id={id} className='adminNavElement delete' onClick={handleAdminNavigation}>DELETE</li>
        </div>)
    })

    return (
        <div className='admin'>
            <div className='admin__container'>
                <div className='admin-navigation__container'>
                    {adminNavigation}
                </div>
                <div className='admin-content'>
                    {addIsActive && activeElement === 0 && <NewElement request='items' />}
                    {!addIsActive && activeElement === 0 && <Elements request='items' />}
                    {addIsActive && activeElement === 1 && <NewElement request='photos' />}
                    {!addIsActive && activeElement === 1 && <Elements request='photos' />}
                    {addIsActive && activeElement === 2 && <NewElement request='news' />}
                    {!addIsActive && activeElement === 2 && <Elements request='news' />}
                    {addIsActive && activeElement === 3 && <NewElement request='players' />}
                    {!addIsActive && activeElement === 3 && <Elements request='players' />}
                    {addIsActive && activeElement === 4 && <NewElement request='comments' />}
                    {!addIsActive && activeElement === 4 && <Elements request='comments' />}
                    {activeElement === ADMIN_NAV.length && <p>SELECT FROM THE LEFT</p>}
                </div>
            </div>
        </div>
    )
}

export default Admin