import Button from 'react-bootstrap/Button';

export default function Home() {
    return(
      <div>
        <h1>Welcome to BCA - Alumni!</h1>
        <Button variant="primary" onClick={Authenticate}>Authenticate</Button>
      </div>
    );
  }

//Add auth stuff here for this function, for now just put alert for reference
function Authenticate() {
  alert('You clicked me!');
}