import React from 'react'
import { useNavigate } from 'react-router'

export default function Error() {
    const navigate = useNavigate()
    const onReturn=()=>{
        navigate('/')
    }

    return (
        <div className='error'>
            <h1>404 Error</h1>
            <p onClick ={onReturn} className='returnError'>Click there to return to the main Page</p>
        </div>
    )
}
