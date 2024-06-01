import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { MdFileDownloadDone } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { toast } from "react-hot-toast"

function AddTask() {
    const [task, setTask] = useState({
        title: "",
        description: "",
        date: ""
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        let { name, value } = e.target
        setTask({ ...task, [name]: value })
    }

    const createTask = async (e) => {
        e.preventDefault()

        const respponse = await axios.post('https://task-manager-api-brl4.onrender.com/api/task', task)

        if (respponse.data.success) {
            setTask({
                title: "",
                description: "",
                date: ""
            })

            navigate('/')
        } else {
            toast.error(respponse.data.message)
        }
    }

    return (
        <div className='flex mt-24 justify-center'>
            <form onSubmit={createTask} className='border-2 p-5 h-full w-full md:w-[60vw] lg:w-[35vw] rounded-sm border-[#543310] shadow-md shadow-black'>

                <h1 className='text-2xl text-center'>Add task</h1>

                <div>
                    <label htmlFor="title" className='text-lg'>Title</label>
                    <input type="text" name="title" id="title" placeholder='title' value={task.title} onChange={handleChange} className='w-full p-2 border-2 rounded-md border-[#543310] outline-none bg-transparent my-2' />
                </div>

                <div>
                    <label htmlFor="description" className='text-lg'>Description</label>
                    <input type="text" name="description" id="description" placeholder='description' value={task.description} onChange={handleChange} className='w-full p-2 border-2 rounded-md border-[#543310] outline-none bg-transparent my-2' />
                </div>
                <div>
                    <label htmlFor="date" className='text-lg'>Complete up to</label>
                    <input type="date" name="date" id="date" value={task.value} onChange={handleChange} placeholder='Date' className='ml-5 p-2 border-2 rounded-md border-[#543310] outline-none bg-transparent my-2' />
                </div>

                <div className='flex justify-between'>
                    <button className='py-2 px-6 border-2 rounded-md  border-[#543310]  bg-transparent text-2xl'>{<MdFileDownloadDone />}</button>
                    <Link to="/" className='py-2 px-6 border-2 rounded-md  border-[#543310]  bg-transparent text-2xl'>{<FaHome />}</Link>
                </div>
            </form>
        </div>
    )
}

export default AddTask