import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from '../components/LoginButton';
import '../index.css';
import alumni1 from "../images/alumni1.jpg"

export default function Home() {
  const { user, isLoading, isAuthenticated } = useAuth0();
    return(
      <div class="container">
          {/* <img src={alumni1} class="h-48 w-96 rounded-lg"/> */}
          <h1 className="align-bottom text-5xl font-bold">Welcome to BCA Alumni{isAuthenticated ? ", " + user.name: null}!</h1>
          {!isAuthenticated ? (<LoginButton/>) :null}
      </div>
    );
}