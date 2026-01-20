import './App.css'
import {BrowserRouter as Router, Routes, Route, Link, useNavigate} from 'react-router-dom'
import HomePage from './Pages/HomePage'
import BlogPage from './Pages/BlogPage'
import ContactPage from './Pages/ContactPage'
import Login from './Pages/Login'
import AdminDashboard from './Pages/AdminDashboard'
import { useState } from 'react'
import Logout from './Components/Logout'
import Signup from './Pages/Signup'
import AdminBooks from './Pages/AdminBooks'
import AddBook from './Pages/AddBook'
import AdminUsers from './Pages/AdminUsers'
import BookPage from './Pages/BookPage'
import ProtectedRoute from './Pages/ProtectedRoute'
import CartPage from './Pages/CartPage'
import WishlistPage from './Pages/WishlistPage'

function App() {

  const [loggedUser, setLoggedUser] = useState(() => {
    const user = sessionStorage.getItem("loggedUser");
    return user ? JSON.parse(user) : null;
  })

  const userId = loggedUser?.id;

  //const [wishCount, setWishCount] = useState(JSON.parse(localStorage.getItem("wishlist"))?.length || 0);

  const [wishCount, setWishCount] = useState(()=> {
    if(!userId) return 0;
    return JSON.parse(localStorage.getItem(`wishlist_${userId}`))?.length || 0;
  })
  //const [cartCount, setCartCount] = useState(JSON.parse(localStorage.getItem("cart"))?.length || 0);
 
  const [cartCount, setCartCount] = useState(()=> {
    if(!userId) return 0;
    return JSON.parse(localStorage.getItem(`cart_${userId}`))?.length || 0;
  });

  const myNavigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("loggedUser");
    setLoggedUser(null);
    myNavigate("/")
  }

  const isLoggedIn = loggedUser !== null ? true : false;
  const isAdmin = loggedUser?.role === "admin";

  return (
    <>
      <nav className='navbar navbar-expand-lg navbar-light d-flex justify-content-around bg-warning'>
        <h2>📚Read Ripple</h2>

        <ul className='navbar-nav'>
        <li className='nav-item'>
          <Link className='nav-link' to='/'>Home</Link>
        </li>
        <li className='nav-item'>
          <Link className='nav-link' to='/books'>Books</Link>
        </li>
        <li className='nav-item'>
          <Link className='nav-link' to='/blog'>Blog</Link>
        </li>
        <li className='nav-item'>
          <Link className='nav-link' to='/contact'>Contact</Link>
        </li>
        {isLoggedIn && !isAdmin && (
          <li className='nav-item'>
          <Link className='nav-link' to="/cart">Cart({cartCount})</Link>
        </li>
        )}

        {isLoggedIn && !isAdmin && (
          <li className='nav-item'>
          <Link className='nav-link' to="/wishlist">Wishlist({wishCount})</Link>
        </li>
        )}
       
      </ul>

      <div>
        {!isLoggedIn ? (
          <Link to="/login" className='btn btn-info'>Login</Link>
        ) : (
          <button onClick={handleLogout} className='btn btn-danger'>Logout</button>
        )}
      </div>

      {/* {
        (!loggedUser) ? <Link to='/login' className='btn btn-infor'> Login </Link> : 
        <Link className='btn btn-info'>Logout</Link>
      } */}

      </nav>
      
      <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/books' element={<ProtectedRoute><BookPage /></ProtectedRoute>} />
        <Route path='/blog' element={<ProtectedRoute><BlogPage/></ProtectedRoute>}></Route>
        <Route path='/contact' element={<ContactPage/>}></Route>

        <Route path='/login' element={<Login setLoggedUser={setLoggedUser}/>}/>
        {/* <Route path='/logout' element={<Logout/>} /> */}
        <Route path='/admin-dashboard' element={<AdminDashboard/>} />
        <Route path='/signup' element={<Signup/>} />

        <Route path='admin-books' element={<AdminBooks/>} />
        <Route path='/add-book' element={<AddBook/>} />
        <Route path='/add-book/:id' element={<AddBook/>}/>
        <Route path='/admin-users' element={<AdminUsers/>} />

        {/* <Route path='/books' element={<BookPage/>} /> */}
        <Route path='/cart' element={<ProtectedRoute>  {!isAdmin ? <CartPage setCartCount={setCartCount}/> : <HomePage/>} </ProtectedRoute>}/>
        <Route path='/wishlist' element={<ProtectedRoute>  {!isAdmin ? <WishlistPage setWishCount={setWishCount}/> : <HomePage/>}</ProtectedRoute>}/>
      </Routes>
    </>
  )
}

export default App
