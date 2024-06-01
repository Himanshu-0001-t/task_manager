import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
function Header() {

  const navigate = useNavigate()

  const [isLogin, setIsLogin] = useState(false)
  const [username, setUsername] = useState(null)

  const handleLogout = async () => {
    const response = await axios.post('api/user/logout')

    if (response.data.success) {
      localStorage.clear("task_login")
      setIsLogin(false)
      setUsername(null)
      navigate('/login')
    } else {
      toast.error(response.data.message)
    }
  }

  useEffect(() => {
    let isAuthenticated = localStorage.getItem("task_login")

    if (isAuthenticated) {
      setUsername(isAuthenticated)
      setIsLogin(true)
    }

  },)

  return (

    <header className="flex items-center justify-between h-20 px-2">
      <div className='text-2xl'>{username}</div>
      <nav className='flex items-center justify-center gap-5'>


        {isLogin ? <>
          <Link to="/">Home</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
          : <>
            <Link to="/login">Login</Link>
            <Link to="signup">Register</Link>
          </>}

      </nav>
    </header>
  )
}

export default Header