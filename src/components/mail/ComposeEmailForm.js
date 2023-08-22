import React from 'react';
import { Editor } from "react-draft-wysiwyg";
import { useDispatch, useSelector } from 'react-redux';
import { emailActions } from '../../store/emailSlice';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


const ComposeEmailForm = () => {
    const dispatch=useDispatch();
    const {subject,body}=useSelector(state=>state.email)
    //function to handle the input of subject and get the input and send to redux store
    const handleSubjectChange=(event)=>{
        dispatch(emailActions.setEmailSubject(event.target.value))
    }
    //function to store  body  in the redux
    const handleEditorStateChange=(editorState)=>{
        dispatch(emailActions.setEmailBody(editorState))
    }
    //function to send the data to the firebase most important 
    //we will get the data from redux store and then send it to the firebase
    const sendEmail=()=>{
        //now here we will send an http request to the server and we will send the data to the 
        //data will be this email
        console.log(subject,body)
        //after sending data to server we will empty the store because we will be sending more data
        dispatch(emailActions.resetEmailComposition);
    }

    return (
        <div>
            {/* <input 
            type='email'
            value={email}
            onChange={handleEmailChange}
            placeholder='email'
            /> */}

            <input
                type='text'
                value={subject}
                onChange={handleSubjectChange}
                placeholder='subject'
            />
            <Editor
                editorState={body}
                onEditorStateChange={handleEditorStateChange}
            />
            <button onClick={sendEmail}>Send Email</button>
        </div>
    )
}

export default ComposeEmailForm
