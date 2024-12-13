import React from 'react'
// import HeaderImage from "../../assets/header.jpg"
import "./Header.css"

export default function Header() {
  return (
    <div className='menu-header'>
        <div className="menu-header-content">
            <h2>Indulge in Delicious Culinary Journeys</h2>
            <p>Explore a World of Flavors</p>
            <a href="#content"><button>View Menu</button></a>
        </div>
    </div>
  )
}
