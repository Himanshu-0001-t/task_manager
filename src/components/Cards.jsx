import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { IoAdd } from "react-icons/io5";
import Card from './Card'
import axios from 'axios'

function Cards() {
    const [loding, setLoding] = useState(false)
    const [tasks, setTasks] = useState([])

    const GetTask = async () => {
        const response = await axios.get('api/task')

        if (response.data.success) {
            setTasks(response.data.allTask)
        } else {
            setTasks([])
        }
    }

    const DeleteTask = async (id) => {
        setLoding(true)
        const response = await axios.get(`api/task/d/${id}`)

        if (!response.data.success) {
            toast.error(response.data.message)
        }

        setLoding(false)
    }

    useEffect(() => {
        GetTask()
    }, [loding])

    return (
        <div className='gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6'>

            {tasks?.map((task) => {
                return <Card key={task._id} task={task} DeleteTask={DeleteTask} />
            })}
            <Link to='/addTask' className=' bg-[#774c22] rounded-lg p-2 min-h-44 flex items-center justify-center text-4xl text-white'>{<IoAdd />}</Link>

        </div>
    )
}

export default Cards