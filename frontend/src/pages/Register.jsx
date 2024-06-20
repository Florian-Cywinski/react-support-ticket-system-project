import { useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'  // useSelector to select from the global state (e.g. user, message) - useDispatch to dispatch actions (e.g. register in authSlice.js)
import { register } from '../features/auth/authSlice' // To bring in the register function / action

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',  // Confirm password
  })

  const { name, email, password, password2 } = formData   // To destructure the keys from the object

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

    if (password !== password2) {
      toast.error('Passwords do not match')
    } else {
      const userData = {
        name,       // name: name   // Comes from the form
        email,      // ...
        password,
      }

      dispatch(register(userData))  // To update the userData

    }
  }


  return (
    <>
      <section className='heading'>
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='name'
              name='name'
              value={name}
              onChange={onChange}
              placeholder='Enter your name'
              required
            />
          </div>
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
            <input
              type='password'
              className='form-control'
              id='password2'
              name='password2'
              value={password2}
              onChange={onChange}
              placeholder='Confirm password'
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

export default Register
