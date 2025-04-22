import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { items } from './Data'
import { BsFillCartCheckFill } from 'react-icons/bs';
import { MdOutlineAccountCircle } from "react-icons/md";


const Navbar = ({ setData, cart }) => {
  // console.log(useLocation())
  const location = useLocation()
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("")

  const filterByCategory = (category) => {
    const element = items.filter((product) => product.category === category)
    // console.log(element)
    setData(element)
  }

  const filterByPrice = (price) => {
    const element = items.filter((product) => product.price >= price)
    setData(element)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${searchTerm}`)
    setSearchTerm("")
  }


  return (
    <>
      <header className='sticky-top'>
        <div className="nav-bar">
          <Link to={'/'} className="brand">Boltt</Link>

          <form
            // onClick={handleSubmit} 
            onSubmit={handleSubmit}
            className="mt-2">
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              placeholder='Search Products'
            />
          </form>

          <div className='profile' style={{ display: "flex", width: "140px", justifyContent: "space-between", padding: "10px" }} >
            <Link to={'/cart'} className="cart">
              <button type="button" className="btn btn-primary position-relative">
                <BsFillCartCheckFill style={{ fontSize: '1.5rem' }} />
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cart.length}
                  <span className="visually-hidden">unread messages</span>
                </span>
              </button>
            </Link>
            <Link to={'/login'} className="login">
              <button type="button" className="btn btn-primary position-relative">
                <MdOutlineAccountCircle style={{ fontSize: '1.5rem' }} />
              </button>
            </Link>
          </div>
        </div>

        {
          location.pathname == '/' && (
            <div className="nav-bar-wrapper">
              <div className="items">Filter by {"->"}</div>
              <div
                onClick={() => setData(items)}
                className="items">No Filter</div>
              <div
                onClick={() => filterByCategory('cafe')}
                className="items">Cafe</div>
              <div
                onClick={() => filterByCategory('sweetCravings')}

                className="items">Sweet Cravings</div>
              <div
                onClick={() => filterByCategory('iceCreams')}

                className="items">Ice Creams</div>
            </div>
          )
        }


      </header>
    </>
  )
}

export default Navbar