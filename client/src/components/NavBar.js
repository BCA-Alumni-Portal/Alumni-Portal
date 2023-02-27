import { Link, useMatch, useResolvedPath } from "react-router-dom"
import { useAuth0 } from '@auth0/auth0-react';
import { CgProfile } from 'react-icons/cg';
import "./styles/NavBar.css";
import logo from "../images/logo.png";

export default function NavBar() {
  const { user, isLoading, isAuthenticated, loginWithRedirect, logout } = useAuth0();
  return (
    <nav className="nav">
      {!isAuthenticated ? (
        <div>
          <ul>
            <Link onClick={() => { loginWithRedirect({ redirectUri: 'http://localhost:3000' }) }}>
              <p className="nav-item text-2xl font-semibold border rounded py-2 px-2 hover:bg-gradient-to-r border-amber-50 hover:from-amber-400 hover:to-amber-500  border  rounded py-2 px-2  hover:border-amber-400 hover:text-white">Login</p>
            </Link>
          </ul>
        </div>
        ) : (
          <ul>
            <CustomLink to="/me">
              <p class="text-2xl font-semibold hover:font-bold">Me</p>
            </CustomLink>  
            <CustomLink to="/people">
              <p class="text-2xl font-semibold hover:font-bold">People</p>
            </CustomLink>
            <CustomLink to="/messages">
              <p class="text-2xl font-semibold hover:font-bold">Messages</p>
            </CustomLink>
          <Link onClick={() => logout({ returnTo: "http://localhost:3000" })}>
            <p className="nav-item text-2xl font-semibold border rounded py-2 px-2 hover:bg-gradient-to-r hover:from-amber-400 hover:to-amber-500  border border-amber-50 rounded py-2 px-2  hover:border-amber-400 hover:text-white">Logout</p>
          </Link>
        </ul>)}
      <Link to="/">
        <img src={logo}></img>
      </Link>
    </nav>
  )
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}