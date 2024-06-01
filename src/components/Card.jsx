import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { MdDelete } from "react-icons/md";
import { TfiWrite } from "react-icons/tfi";
import { Link } from 'react-router-dom';
import axios from 'axios'

function Card({ task, DeleteTask }) {
    const [taskComplete, setTaskComplete] = useState(false)

    const ToogleChange = async (id) => {
        const response = await axios.get(`https://task-manager-api-brl4.onrender.com/api/task/t/${id}`)

        if (response.data.success) {
            setTaskComplete((prev) => !prev)

        } else {
            toast.error(response.data.message)
            setTaskComplete(false)
        }
    }

    useEffect(() => {
        if (task.isComplete) {
            setTaskComplete(task.isComplete)
        }
    }, [])

    return (
        <div className='bg-[#774c22] text-white rounded-lg p-3 overflow-hidden min-h-48 flex flex-col justify-between '>
            <div className='flex flex-col gap-3'>
                <h2 className='text-2xl'>{task.title}</h2>
                <h3> {task.description}</h3>
                <h3>{task.completeTo}</h3>
            </div>

            <div className='flex justify-between items-center'>
                <button className={`${!taskComplete ? 'bg-yellow-400 text-black' : "bg-green-700"} p-2 rounded-lg`}
                    onClick={() => ToogleChange(task._id)}>{taskComplete ? "Completed" : "Not Comlete"}</button>

                <Link to='/update' state={{ data: task }} className='rounded-lg text-xl ml-14'><TfiWrite /></Link>

                <button className='rounded-lg text-3xl' onClick={() => DeleteTask(task._id)}><MdDelete /></button>
            </div>
        </div>
    )
}

export default Card