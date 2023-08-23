import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const EmailNavigation = () => {
    //In this component i will describe how to go to email inbox check email
    //compose email option should come 
    //sent email component should come
    return (
            
            <ButtonGroup vertical>
      <Button as={Link} to="/inbox">Inbox</Button>
      <Button as={Link} to="composeemail">Compose</Button>

      <Button as={Link} to="sent">Sent</Button>
      <Button>Starred</Button>
    </ButtonGroup>
    )
}

export default EmailNavigation
