import React, { Component } from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Nav from '../Header/Nav';
import UserProfile from '../Profile/UserProfile';

const App = ({ children }) => (
    <>

        <main>
            {children}

        </main>

    </>
);

export default App;
