import Nav from 'react-bootstrap/Nav';
import React from "react"

function NavBar(props) {
    return (
      <Nav
        activeKey="/home"
        onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
      >
        <Nav.Item>
          <Nav.Link href={props.link}>About</Nav.Link>
        </Nav.Item>
      </Nav>
    );
  }

export default NavBar;