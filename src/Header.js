import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

function Header() {
    return (
        <div className="header__container">
            <div className="header__sitename">
                <Link to="/">JSON TOOL</Link>
            </div>
            <div className="header__tool">
                <Link to="/">JSON To CSV</Link>
                <Link to="/format">Format JSON</Link>
            </div>
        </div>
    )
}

export default Header
