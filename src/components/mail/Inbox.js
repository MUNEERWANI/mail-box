import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/esm/Container'
import axios from 'axios'

const Inbox = () => {
  //will define a state which will hold the email data which we fetch from the server

  const [emails,setEmails]=useState([]);

  //getting email,token and url to send request to server
  const email=localStorage.getItem('email');
  const token=localStorage.getItem('token')
  const mail = email.replace('@', '').replace('.', '');
  const url = 'https://mailbox-beadc-default-rtdb.firebaseio.com';


  //in this useeffect i will define an async function in order to get data from server
  //that data i will map as an array then to display that data
    useEffect(()=>{
      const fetchData=async()=>{
        try{
          const response=await axios.get(`${url}/sent/${mail}.json?auth=${token}`);
          console.log(response)
          if(response.status===200||response.status===201){
            const emailData=await response.data;
            console.log(emailData)
            const emailArray=Object.keys(emailData).map(key=>({
              id:key,
              ...emailData[key]
            }));
            setEmails(emailArray);
          }
          else{
            console.log('not able to fetch')
          }
        }catch(error){
          alert('error fetch ing')
          console.log(error)
        }
      }
      fetchData();
  },[mail,token])
  return (
    <Container>
        {/* Display email data */}
      <ul>
        {emails.map(email => (
          <li key={email.id}>
            <h3>{email.subject}</h3>
            <p>{email.body}</p>
          </li>
        ))}
      </ul>
    </Container>
  )
}

export default Inbox
