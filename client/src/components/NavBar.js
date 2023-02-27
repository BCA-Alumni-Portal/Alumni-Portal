import { Link, useMatch, useResolvedPath } from "react-router-dom"
import { useAuth0 } from '@auth0/auth0-react';
import { CgProfile } from 'react-icons/cg';

export default function NavBar() {
  const { user, isLoading, isAuthenticated, loginWithRedirect, logout } = useAuth0();
  return (
    <nav className="nav">
      <Link to="/">
        <p class="text-3xl font-bold">BCA Alumni</p>
      </Link>
        {!isAuthenticated ? (
          <ul>
            {/* <CustomLink to="/about">
              <p class="text-2xl font-semibold hover:font-bold">About</p>
            </CustomLink> */}
            <Link onClick={() => {loginWithRedirect({ redirectUri: 'http://localhost:3000'})}}>
              <p class="text-2xl font-semibold hover:font-bold">Login</p>
            </Link>
          </ul>
        ): (
          <ul>
            <CustomLink to="/people">
              <p class="text-2xl font-semibold hover:font-bold">People</p>
            </CustomLink>
            <CustomLink to="/messages">
              <p class="text-2xl font-semibold hover:font-bold">Messages</p>
            </CustomLink>
            {/* <CustomLink to="/about">
              <p class="text-2xl font-semibold hover:font-bold">About</p>
            </CustomLink> */}
            <Link onClick={() => logout({ returnTo: "http://localhost:3000" })}>
              <p class="text-2xl font-semibold hover:font-bold">Logout</p>
            </Link>
            <CustomLink to="/me">
              <CgProfile onMouseOver={({target})=>target.style.color="#267ded"}
              onMouseOut={({target})=>target.style.color="#4691f2"}
              size="1.5em"/>
            </CustomLink>
          </ul>)}
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