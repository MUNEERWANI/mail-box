import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Accordion from 'react-bootstrap/Accordion';
import { Col } from 'react-bootstrap';




const Inbox = () => {
  //will define a state which will hold the email data which we fetch from the server

  const [emails, setEmails] = useState([]);

  //getting email,token and url to send request to server
  const email = localStorage.getItem('email');
  const token = localStorage.getItem('token')
  const mail = email.replace('@', '').replace('.', '');
  const url = 'https://mailbox-beadc-default-rtdb.firebaseio.com';


  //in this useeffect i will define an async function in order to get data from server
  //that data i will map as an array then to display that data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}/sent/${mail}.json?auth=${token}`);
        console.log(response)
        if (response.status === 200 || response.status === 201) {
          const emailData = await response.data;
          console.log(emailData)
          const emailArray = Object.keys(emailData).map(key => ({
            id: key,
            ...emailData[key]
          }));
          console.log(emailArray)
          setEmails(emailArray);
        }
        else {
          console.log('not able to fetch')
        }
      } catch (error) {
        alert('error fetch ing')
        console.log(error)
      }
    }
    fetchData();
  }, [mail, token])
  const readMessageHandler = async(emailId) => {
    try {
      await axios.patch(`${url}/sent/${mail}/${emailId}.json?auth=${token}`, { read: true });
      // Update the local state to reflect the change
      setEmails(prevEmails =>
        prevEmails.map(email =>
          email.id === emailId ? { ...email, read: true } : email
        )
      );
    } catch (error) {
      console.error('Error marking email as read:', error);
    }
  }
  const unreadCount = emails.reduce((count, email) => count + (email.read ? 0 : 1), 0);
  console.log(unreadCount)
  // Display the unread count
  {/* <div>Total Unread: {unreadCount}</div> */ }
  
  return (

    <Accordion>
      {emails.map(email => (
        <Accordion.Item key={email.id} eventKey={email.id}>
          <Accordion.Header onClick={() => readMessageHandler(email.id)}>
            <span>{email.read ? "" : "•"}</span>

            {email.subject}
          </Accordion.Header>
          <Accordion.Body>{email.body}</Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>

  )
}

export default Inbox
