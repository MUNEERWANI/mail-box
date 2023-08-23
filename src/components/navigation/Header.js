import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import ReorderIcon from '@mui/icons-material/Reorder';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const Header=() =>{
  const handbleButtonicon=()=>{
    console.log('ddb')
    alert('fun')
  }
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/"><ReorderIcon onClick={handbleButtonicon} />Mail-Box</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to= '/'>Home</Nav.Link>
            <Nav.Link as={Link} to="/link">Link</Nav.Link>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
      <AccountCircleIcon src="sharpne.jpg" />
    </Navbar>
  );
}

export default Header;