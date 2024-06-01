import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [user, setUser] = useState({
    userName: "",
    password: ""
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    let { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    let response = await axios.post('api/user/signin', user)

    if (response.data.success) {
      toast.success(response.data.message)

      setUser({
        userName: "",
        password: ""
      })

      localStorage.setItem("task_login", user.userName)

      navigate('/')

    } else {
      toast.error(response.data.message)
    }
  }
  return (
    <div className='flex mt-24 justify-center'>
      <form onSubmit={handleSubmit} className='border-2 p-5 h-full w-full md:w-[60vw] lg:w-[50vw] xl:w-[30vw] rounded-sm border-[#543310] shadow-md shadow-black'>
        <h1 className='text-center text-2xl'>Login</h1>

        <div>
          <label htmlFor="email" className='text-lg'>userName</label>
          <input type="text" name="userName" id="userName" placeholder='UserName' value={user.userName} onChange={handleChange} className='w-full p-2 border-2 border-[#543310] rounded-md bg-transparent my-2' />
        </div>
        <div>
          <label htmlFor="password" className='text-lg'>Password</label>
          <input type="password" name="password" id="password" placeholder='password' value={user.password} onChange={handleChange} className='w-full p-2 border-2 rounded-md border-[#543310] bg-transparent my-2' autoComplete='off' />
        </div>

        <button className='px-6 block py-2 border-2 rounded-md border-[#543310] my-5 text-lg'>Login</button>
        <Link className='text-blue-500' to='/signup'>Don't have account</Link>
      </form>
    </div>
  )
}

export default Login