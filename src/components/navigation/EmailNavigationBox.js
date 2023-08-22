import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';
const EmailNavigation = () => {
    //In this component i will describe how to go to email inbox check email
    //compose email option should come 
    //sent email component should come
    return (
        <div>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Inbox
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="/inbox">Inbox</Dropdown.Item>
                    <Dropdown.Item as={Link} to="composeemail">Compose</Dropdown.Item>
                    <Dropdown.Item as={Link} to="sent">Sent</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}

export default EmailNavigation
