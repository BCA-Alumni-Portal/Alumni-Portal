import Button from 'react-bootstrap/Button';

export default function Home() {
    return(
      <div>
        <h1>Welcome to BCA - Alumni!</h1>
        <button variant="primary" onClick={Authenticate}>Authenticate</button>
      </div>
    );
  }

//Add auth stuff here for this function, for now just put alert for reference
function Authenticate() {
  alert('You clicked me!');
}