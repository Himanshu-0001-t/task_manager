import React, { useEffect } from 'react'
import { Route, Navigate, useNavigate } from 'react-router-dom'

const ProtectedRoute = ({ Component }) => {

    const navigate = useNavigate()

    useEffect(() => {
        let isAuthenticated = localStorage.getItem("task_login")

        if (!isAuthenticated) {
            navigate('/login')
        } else {
            navigate('/')
        }
    }, [])

    return (
        <div>
            <Component />
        </div>
    )
}

export default ProtectedRoute