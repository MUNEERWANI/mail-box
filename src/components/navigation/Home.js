import React from 'react';
import AuthFormm from '../auth/AuthForm';
import EmailNavigation from './EmailNavigationBox';
import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/esm/Container';
const Home = () => {
    const token=useSelector(state=>state.auth.token);
    console.log(token)
    return (
        <Container>
            {token&&<EmailNavigation />}
            {!token&&<AuthFormm />}
        </Container>
    )
}

export default Home
