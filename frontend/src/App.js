import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Goals from './pages/Goals';
import Login from './pages/Login';
import Register from './pages/Register';
import Projects from './pages/Projects';
import Task from './pages/Task';
import TaskView from './pages/TaskView';
import Calendar from './pages/Calendar';
import AddUser from './pages/AddUser';
import BulkEmail from './pages/BulkEmail';

import GanttPage from './pages/GanttChart';

//Index
function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route exact path='/' element={<Dashboard />} />
            <Route path='/projects' element={<Goals />} />
            <Route path='/calendar' element={<Calendar />} />
            <Route path='/login' element={<Login />} />
            <Route path='/newuser' element={<AddUser />} />
            <Route path='/register' element={<Register />} />
            <Route path='/projectForm' element={<Projects />} />
            <Route path='/tasks/:projectId' element={<TaskView />} />
            <Route path='/task/:projectId' element={<Task />} />
            <Route path='/gantt' element={<GanttPage />} />
            <Route path='/email' element={<BulkEmail />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
