import { useState } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
// import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'  // useSelector to select from the global state (e.g. user, message) - useDispatch to dispatch actions (e.g. register in authSlice.js)
import { login } from '../features/auth/authSlice' // To bring in the login function / action

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData   // To destructure the keys from the object

  const dispatch = useDispatch()  // To be able to dispatch a function / action brought in (to be able to update a state, e.g. from the auth slice)

  const { isLoading } = useSelector((state) => state.auth)  // To get the state isLoading from auth

  const onChange = (e) => {
    setFormData((prevState) => ({ // prevState is the old state of the formData object
      ...prevState,   // To include the prev state (all the other fields)
      [e.target.name]: e.target.value,  // The value comes from the form input field - the name can be name, email, pw, pw2
    }))

  }

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,      // email: email   // Comes from the form
      password,   // ...
    }

    dispatch(login(userData)) // To update the userData

  }

  return (
    <>
      <section className='heading'>
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Please log in to get support</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              onChange={onChange}
              placeholder='Enter your email'
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              onChange={onChange}
              placeholder='Enter password'
              required
            />
          </div>
          <div className='form-group'>
            <button className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login
