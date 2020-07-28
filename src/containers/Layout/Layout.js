import React from 'react';
import Footer from '../Footer/Footer';
import MenuBar from '../MenuBar/MenuBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import './Layout.css';

const Layout = (props) => {
    return (
        <div  class='mainContent'>
            <CssBaseline />
            <div>
                <MenuBar />
                <main>
                    {props.children}
                </main>
            </div>
            <div class='footer'>
                <Footer />
            </div>
        </div>
    );
}

export default Layout;