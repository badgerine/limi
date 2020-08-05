import React from 'react';
import Footer from '../Footer/Footer';
import MenuBar from '../MenuBar/MenuBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import './Layout.css';

const Layout = (props) => {
    return (
        <div className='container'>
            <CssBaseline />
            <MenuBar />
            <main className='mainContent'>
                {props.children}
            </main>
            <div className='footer'>
                <Footer />
            </div>
        </div>
    );
}

export default Layout;