import { Link, useMatch, useResolvedPath } from "react-router-dom"

export default function AdminNavBar() {
  return (
    <nav className="nav">
      <Link to="/" className="Admin">
        Admin
      </Link>
      <ul>
        <CustomLink to="/customize">Customize</CustomLink>
        <CustomLink to="/data">Data</CustomLink>
        <CustomLink to="/email">Email</CustomLink>
      </ul>
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