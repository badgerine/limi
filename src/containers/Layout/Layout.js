import React from 'react';
import Footer from '../Footer/Footer';
import MenuBar from '../MenuBar/MenuBar2';
import CssBaseline from '@material-ui/core/CssBaseline';
import './Layout.css';

const Layout = (props) => {
    return (
        <React.Fragment>
            <CssBaseline />
            <MenuBar />
            <main>
                {props.children}
            </main>
            <Footer />
        </React.Fragment>
    );
}

export default Layout;