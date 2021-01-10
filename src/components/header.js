import React from 'react';
import { Avatar } from '@material-ui/core'


// Header component
const Header = () => {

    return (
        <div className='header'> 
            <span className='header__logo'>
                <span className='size-1-6'>JOB DEKHO</span>
            </span>
            <nav className='nav'>
                <Avatar>Y</Avatar>
            </nav>
         </div> 
    )

}


export default Header;