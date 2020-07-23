import React from 'react';
import Footer from '../Footer/Footer';
import MenuBar from '../MenuBar/MenuBar';
import './Layout.css';

const Layout = (props) => {
    return (
        <div className="Layout">
            <MenuBar />
            <main>
                {props.children}
            </main>
            <Footer />
        </div>
    );
}

export default Layout;