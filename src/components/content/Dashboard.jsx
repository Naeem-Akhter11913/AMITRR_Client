import React, { useEffect } from 'react'
import Questions from '../Questions'
import Records from '../Records'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const token = localStorage.getItem('token')
  const navigate = useNavigate();


  useEffect(() =>{
    if(!token){
      navigate('/')
    }
  }, [token]);

  return (
    <div className='row p-5'>

      <div className="col-7">
        <Questions />
      </div>
      <div className='col-5'>
        <Records />
      </div>
    </div>
  )
}

export default Dashboard