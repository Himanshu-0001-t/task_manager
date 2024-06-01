import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-hot-toast'

function Signup() {
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: ""
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    let { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    let response = await axios.post('https://task-manager-api-brl4.onrender.com/api/user/signup', user)

    if (response.data.success) {
      toast.success(response.data.message)

      setUser({
        userName: "",
        email: "",
        password: ""
      })

      navigate('/login')

    } else {
      toast.error(response.data.message)
    }
  }



  return (
    <div className='flex mt-24 justify-center'>
      <form onSubmit={handleSubmit} className='border-2 p-5 h-full w-full md:w-[60vw] lg:w-[50vw] xl:w-[35vw] border-[#543310] rounded-sm shadow-md shadow-black'>
        <h1 className='text-center text-2xl'>Sign-up</h1>
        <div>
          <label htmlFor="userName" className='text-lg'>userName</label>
          <input type="text" name="userName" id="userName" value={user.userName} onChange={handleChange} placeholder='userName' className='w-full p-2 border-2 rounded-md border-[#543310] bg-transparent my-2' />
        </div>
        <div>
          <label htmlFor="email" className='text-lg'>Email</label>
          <input type="text" name="email" id="email" placeholder='email' value={user.email} onChange={handleChange} className='w-full p-2 border-2 rounded-md border-[#543310] bg-transparent my-2' />
        </div>
        <div>
          <label htmlFor="password" className='text-lg'>Password</label>
          <input type="password" name="password" id="password" placeholder='password' value={user.password} onChange={handleChange} className='w-full p-2 border-2 rounded-md border-[#543310] bg-transparent my-2' autoComplete='off' />
        </div>

        <button className='px-6 block py-2 border-2 rounded-md border-[#543310] bg-transparent my-10 text-lg'>Signup</button>
        <Link className='text-blue-500' to='/login'>Already have account</Link>

      </form>
    </div>
  )
}

export default Signup