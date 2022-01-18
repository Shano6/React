import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom'
import {signUp} from '../../Actions/AuthActions'
import {connect} from 'react-redux'
import {useDispatch} from 'react-redux';

function Register(props) {
    const [loginState,setLoginState]= useState({
        email:'',
        password:'',
        displayName:''
    })

    const handleChange=(e)=>{
        setLoginState({
            ...loginState,
            [e.target.id]:e.target.value
        })
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(signUp(loginState))
}

const dispatch=useDispatch()

if(props.auth.uid) return <Redirect to='/'/>
if(props.auth.isLoaded && !props.auth.uid){
    return (
        <div className='loginContainer'>
            <p className='loginMsg'>Register</p>
            <form action="">
                <label>E-Mail &emsp;&ensp;</label>
                <p><input onChange={(e)=>handleChange(e)} type="email" id='email' required/></p>
                <label>Username</label>
                <p><input onChange={(e)=>handleChange(e)} type="text" id='username' required/></p>
                <label>Password</label>
                <p><input onChange={(e)=>handleChange(e)} type="password" id='password' name="" required/></p>
                <input onClick={(e)=>handleSubmit(e)} className='loginButton' type="submit" value="Register"/>
            </form>
            <p className='registerMsg'>
                Already have an account ?
                <Link to='/Login'>
                    <span className='registerLab'>
                        Sign in 
                    </span>
                </Link>
            </p>
        </div>
    )}else{return null}
}

const mapStateToProps=(state)=>({
    login: state.login,
    auth: state.firebase.auth
  })

export default connect(mapStateToProps)(Register)
