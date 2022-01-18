import React, { useState } from 'react'
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux'
import signIn from '../../Actions/AuthActions'
import {useDispatch} from 'react-redux';

function Login(props) {
    const [loginState,setLoginState]= useState({
        email:'',
        password:''
    })

    const handleChange=(e)=>{
        setLoginState({
            ...loginState,
            [e.target.id]:e.target.value
        })
    }

    const handleSubmit=(e)=>{
            e.preventDefault();
            dispatch(signIn(loginState))
    }

    const dispatch=useDispatch()

    if(props.auth.isLoaded && props.auth.uid) return <Redirect to='/'/>

    if(props.auth.isLoaded && !props.auth.uid){
    return (
        <div className='loginContainer'>
            <p className='loginMsg'>Log in</p>
            <form>
                <p><input onChange={(e)=>handleChange(e)} type="email" id='email' placeholder='E-mail' required/></p>
                <p><input onChange={(e)=>handleChange(e)} type="password" id='password' name="" placeholder='Password' required/></p>
                <input onClick={(e)=>handleSubmit(e)} className='loginButton' type="submit" value="Sign in"/>
            </form>
            <p className='registerMsg'>
                Don't have an account ? 
                <Link to='/Register'>
                    <span className='registerLab'> 
                        Register
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

export default connect(mapStateToProps)(Login);
