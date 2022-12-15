import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from '../components/LoginButton';
import '../index.css';
import backgroundImage from '../images/alumni1.jpg';

export default function Home() {
  const { user, isLoading, isAuthenticated } = useAuth0();
    return(
      <div style={{backgroundImage: `url(${backgroundImage})`}}>
        <div className="container">
          <div className="centered space-y-2">
            <div className="rounded-2xl bg-blue">
            <h1 className="text-cream align-bottom text-5xl font-bold">Welcome to BCA Alumni{isAuthenticated ? ", " + user.name: null}!</h1>
            </div>
            {!isAuthenticated ? (<LoginButton/>) :null}
          </div>
        </div>
      </div>
    );
}