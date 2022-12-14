import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from '../components/LoginButton';
import '../index.css';
import backgroundImage from '../images/alumni1.jpg';

export default function Home() {
  const { user, isLoading, isAuthenticated } = useAuth0();
    return(
      <div style={{backgroundImage: `url(${backgroundImage}); background-size:cover`}}>
        <div className="container">
          {/* <img src={backgroundImage} class="inline-block h-48 w-96 rounded-lg"/>  */}
          <div className="centered">
            <h1 className="align-bottom text-5xl font-bold">Welcome to BCA Alumni{isAuthenticated ? ", " + user.name: null}!</h1>
            {!isAuthenticated ? (<LoginButton/>) :null}
          </div>
        </div>
      </div>
    );
}