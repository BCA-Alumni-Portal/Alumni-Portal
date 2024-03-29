import { Link, useMatch, useResolvedPath } from "react-router-dom"
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./styles/NavBar.css";
import logo from "../images/logo.png";
import personImage2 from '../images/person2.png';
import CommunicationHandler from './CommunicationHandler';


export default function NavBar() {
  const [auth, setAuth] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [profilePictureFile, setProfilePictureFile] = useState(null);


  useEffect(() => {
    axios.get('/auth/current-session').then(({ data }) => {
      setAuth(data);
    })
    CommunicationHandler.isAdmin().then((result) => {
      console.log(result);
      if (result != null) {
        setIsAdmin(result);
      }
    });
  }, [])

  useEffect(() => {
    if (auth !== null) {
      setProfilePictureFile(auth.picture)
    }
  }, [auth])




  return (
    !auth ? (
      <nav className="nav-empty"></nav>
    ) : (
      <nav className="nav">
        <ul>
          <Link to="/">
            <img src={logo}></img>
          </Link>
          <CustomLink to="/people">
            <p className="nav-item text-2xl font-semibold border rounded py-2 px-2 hover:bg-gradient-to-r hover:from-amber-400 hover:to-amber-500  border border-amber-50 rounded py-2 px-2  hover:border-amber-400 hover:text-white">People</p>
          </CustomLink>
          <CustomLink to="/messages">
            <p className="nav-item text-2xl font-semibold border rounded py-2 px-2 hover:bg-gradient-to-r hover:from-amber-400 hover:to-amber-500  border border-amber-50 rounded py-2 px-2  hover:border-amber-400 hover:text-white">Messages</p>
          </CustomLink>
          {
            isAdmin ?
              <CustomLink to="/admin">
                <p className="nav-item text-2xl font-semibold border rounded py-2 px-2 hover:bg-gradient-to-r hover:from-amber-400 hover:to-amber-500  border border-amber-50 rounded py-2 px-2  hover:border-amber-400 hover:text-white">Admin</p>
              </CustomLink>
              : null
          }

        </ul>
        <div className="dropdown dropdown-hover dropdown-end">
          {isAdmin ?
            <Link to='/admin'>
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={profilePictureFile} referrerPolicy="no-referrer" />
              </div>
            </label>
          </Link>
            :
            <Link to='/me'>
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src={profilePictureFile} referrerPolicy="no-referrer" />
                </div>
              </label>
            </Link>
          }
          <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40 mt-16">
            <a href="/auth/logout" className="nav-item text-lg font-semibold border rounded hover:bg-gradient-to-r hover:from-amber-400 hover:to-amber-500  border border-amber-50 rounded py-2 px-2  hover:border-amber-400 hover:text-white">
              Logout
            </a>
          </ul>
        </div>
      </nav>
    )
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