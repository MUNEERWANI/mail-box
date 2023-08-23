import React from 'react';
import { Editor } from "react-draft-wysiwyg";
import { useDispatch, useSelector } from 'react-redux';
import { emailActions } from '../../store/emailSlice';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import axios from 'axios';
import EmailNavigation from '../navigation/EmailNavigationBox';
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/esm/Button';
import { convertToRaw } from 'draft-js';


const ComposeEmailForm = () => {
    const dispatch = useDispatch();
    const { subject, body } = useSelector(state => state.email)
    const email=localStorage

    //getting token which we need to send data into the server
    const token = useSelector(state => state.auth.token);
    console.log(token);
    //function to handle or store email in the store 
    const handleEmailChange = (event) => {
        dispatch(emailActions.setEmail(event.target.value));
    }
    //function to handle the input of subject and get the input and send to redux store
    const handleSubjectChange = (event) => {
        dispatch(emailActions.setEmailSubject(event.target.value));
    }
    //function to store  body  in the redux
    const handleEditorStateChange = (editorState) => {
        dispatch(emailActions.setEmailBody(editorState));
    }
    //function to send the data to the firebase most important 
    //we will get the data from redux store and then send it to the firebase
    const sendEmail = async () => {
        //now here we will send an http request to the server and we will send the data to the 
        //data will be this email 
        //let convert the body  into raw data
        const rawContentState = JSON.stringify(convertToRaw(body.getCurrentContent()));

        console.log(subject, body, email,rawContentState);
        const mail = email.replace('@', '').replace('.', '');
        const url = 'https://mailbox-beadc-default-rtdb.firebaseio.com';
        const sentEmailData = {
            mail: mail,
            subject: subject,
            body: rawContentState,
        }
        try {
            const response = await axios.post(`${url}/sent/${mail}.json?auth=${token}`, sentEmailData, {
                headers: {
                    'Content-Type': 'application/json'//telling the server we are sending the data in json format 
                }
            });
            if (response.status === 200 || response.status === 201) {
                console.log(response.data);
            } else {
                console.log('error in post');
                throw new Error('something went wrong');
            }

        }
        catch (error) {
            alert(error);
            console.log('error')
        }
        //after sending data to server we will empty the store because we will be sending more data
        dispatch(emailActions.resetEmailComposition);
    }

    return (
        <Container>
            <EmailNavigation />
            <Container>
            <input
                type='email'
                value={email}
                onChange={handleEmailChange}
                placeholder='email'
                style={{width:'40%',padding:'10px'}}
            />
                <br />
            <input
                type='text'
                value={subject}
                onChange={handleSubjectChange}
                placeholder='subject'
                style={{width:'90%',padding:'10px'}}
            />
            <Editor
                editorState={body}
                onEditorStateChange={handleEditorStateChange}
                placeholder='write your body here'
                wrapperStyle={{ width: '100%', border: '1px solid #ccc', padding: '30px' }} // Adjust the wrapper style
            />
            <Button onClick={sendEmail}>Send Email</Button>
            </Container>
        </Container>
    )
}

export default ComposeEmailForm
