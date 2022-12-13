import Button from 'react-bootstrap/Button';

export default function Home() {
    return(
      <div class="container">
        <div class="centered">
          <h1 class="home_title">Welcome to BCA - Alumni!</h1>
          <Button  className="mb-2" size="lg" onClick={Authenticate}>Authenticate</Button>
        </div>
      </div>
    );
  }

//Add auth stuff here for this function, for now just put alert for reference
function Authenticate() {
  alert('You clicked me!');
}