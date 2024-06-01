import Header from './components/Header'
import Cards from './components/Cards'

import { Routes, Route } from 'react-router-dom'
import AddTask from './pages/AddTask'
import Login from './pages/Login'
import Signup from './pages/Signup'
import UpdateTask from './pages/UpdateTask'
import ProtectedRoute from './components/protecttedRoute'

function App() {


  return (
    <div className='backdrop-blur-sm bg-[#F8F4E1] text-[#543310] min-h-screen h-full w-full px-5 lg:px-10'  >
      <Header />

      <Routes>
        <Route path='/login' element={<ProtectedRoute Component={Login} />} />
        <Route path='/signup' element={<ProtectedRoute Component={Signup} />} />

        <Route path='/' element={<ProtectedRoute Component={Cards} />} />
        <Route path='addTask' element={<ProtectedRoute Component={AddTask} />} />
        <Route path='update' element={<ProtectedRoute Component={UpdateTask} />} />
      </Routes>

    </div>
  )
}

export default App
