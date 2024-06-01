import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { Link, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { MdFileDownloadDone } from "react-icons/md";
import { FaHome } from "react-icons/fa";
function UpdateTask() {

    const location = useLocation()
    const { data } = location.state
    const navigate = useNavigate()

    const [task, setTask] = useState({
        title: data.title,
        description: data.description,
        date: data.completeTo
    })

    let id = data._id

    const handleChange = (e) => {
        let { name, value } = e.target
        setTask({ ...task, [name]: value })
    }

    const handUpdate = async () => {
        const response = await axios.post(`https://task-manager-api-brl4.onrender.com/api/task/u/${id}`, task)

        if (response.data.success) {
            toast.success(response.data.message)
            navigate('/')
        } else {
            toast.error(response.data.message)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }


    return (
        <div className='flex mt-24 justify-center'>
            <form onSubmit={handleSubmit} className='border-2 border-[#543310] p-5 h-full w-full md:w-[60vw] lg:w-[35vw] rounded-sm shadow-md shadow-black'>

                <h1 className='text-2xl text-center'>Update Task</h1>

                <div>
                    <label htmlFor="title" className='text-lg   '>Title</label>
                    <input type="text" name="title" id="title" placeholder='title' value={task.title} onChange={handleChange} className='w-full p-2 border-2 rounded-md bg-transparent my-2 border-[#543310] outline-none' />
                </div>

                <div>
                    <label htmlFor="description" className='text-lg'>Description</label>
                    <input type="text" name="description" id="description" placeholder='description' value={task.description} onChange={handleChange} className='w-full p-2 border-2 rounded-md border-[#543310] outline-none bg-transparent my-2' />
                </div>
                <div>
                    <label htmlFor="date">Complete up to</label>
                    <input type="date" name="date" id="date" value={task.date} onChange={handleChange} className=' border-[#543310] outline-none ml-5 p-2 border-2 rounded-md bg-transparent my-2' />
                </div>

                <div className='flex justify-between'>
                    <button className='py-2 px-6 rounded-sm border-2 border-[#543310] bg-transparent my-10 text-2xl' onClick={handUpdate}>{<MdFileDownloadDone />}</button>
                    <Link to="/" className='py-2 px-6 border-2 rounded-sm border-[#543310] bg-transparent my-10 text-2xl' >{<FaHome />}</Link>
                </div>
            </form>
        </div>
    )
}

export default UpdateTask