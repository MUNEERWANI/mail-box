import React, { useEffect,useState } from 'react';
import { Editor } from "react-draft-wysiwyg";
import { useDispatch, useSelector } from 'react-redux';
import { emailActions } from '../../store/emailSlice';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import axios from 'axios';
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal';


const ComposeEmailModal = (props) => {
    
    console.log(props)
    const dispatch = useDispatch();
    const [mailBody, setMailBody] = useState("");

    //lets get body and subject using  redux toolkit
    const { subject, body ,email} = useSelector(state => state.email)
    const senderEmail=localStorage.getItem('email') //sender email

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
    //so we will need to change the editor content into plain content 
    useEffect(()=>{
        setMailBody(body.getCurrentContent().getPlainText());
    },[body])
    //function to send the data to the firebase most important 
    //we will get the data from redux store and then send it to the firebase
    const sendEmail = async () => {
        //now here we will send an http request to the server and we will send the data to the 
        //data will be this email 
        //let convert the body  into raw data
        // const rawContentState = JSON.stringify(convertToRaw(body.getCurrentContent()));

        // console.log(subject, body, email,rawContentState);
        const recieverMail = email.replace('@', '').replace('.', '');
        const url = 'https://mailbox-beadc-default-rtdb.firebaseio.com';
        //when sending email its important to send time and data 
        const formatDate = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');
        
            return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
        };
        const formattedDate = formatDate(new Date());
        const sentEmailData = {
            to: email,
            subject: subject,
            body: mailBody,
            time:formattedDate,
            read:false,
            recieve:false,
            send:true,
            sender:senderEmail
        }
        try {
            const response = await axios.post(`${url}/sent/${recieverMail}.json`, sentEmailData, {
                headers: {
                    'Content-Type': 'application/json'//telling the server we are sending the data in json format 
                }
            });
            if (response.status === 200 || response.status === 201) {
                console.log(response.data);
                dispatch(emailActions.resetEmailComposition);
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
    }

    return (
        <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Compose  Email</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <label>To</label>
        <input
                type='email'
                value={email}
                onChange={handleEmailChange}
                placeholder='email'
                style={{width:'100%',padding:'10px'}}
            />
                <br />
            <input
                type='text'
                value={subject}
                onChange={handleSubjectChange}
                placeholder='subject'
                style={{width:'100%',padding:'10px'}}
            />
            <Editor
                editorState={body}
                onEditorStateChange={handleEditorStateChange}
                placeholder='write your body here'
                wrapperStyle={{ width: '100%', border: '1px solid #ccc', padding: '5px' }} // Adjust the wrapper style
            />
        </Modal.Body>
        <Modal.Footer>
        <Button onClick={sendEmail} >Send Email</Button>
        </Modal.Footer>


            
        </Modal>
    )
}

export default ComposeEmailModal
