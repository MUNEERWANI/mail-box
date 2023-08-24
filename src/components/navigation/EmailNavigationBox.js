import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useState } from 'react';
import ComposeEmailModal from '../mail/ComposeEmailModal';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import Inbox from '../mail/Inbox';




const EmailNavigation = () => {
  const [showInbox,setShowInbox]=useState(false);
    //In this component i will describe how to go to email inbox check email
    //compose email option should come 
    //sent email component should come
    const [showModal,setShowModal]=useState(false);
    const handleClose=()=>{
      setShowModal(false);
    }
    const handleOpen=()=>{
      setShowModal(true);
      console.log('show modal clicked but not working')
    }
    const inboxHandler=()=>{
      setShowInbox(true);
    }
    return (
      <Container>
            <Stack>
            <ButtonGroup vertical>
      <Button onClick={inboxHandler}>Inbox</Button>
      <Button onClick={handleOpen} >Compose</Button>

      <Button as={Link} to="sent">Sent</Button>
      <Button>Starred</Button>
    </ButtonGroup>
    {showModal&&(<ComposeEmailModal show={showModal} handleClose={handleClose}/>)}
    </Stack>
    {showInbox&&(<Inbox />)}
    </Container>
    )
}

export default EmailNavigation
