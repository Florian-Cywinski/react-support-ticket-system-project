import { useState } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'  // useSelector to select from the global state (e.g. user, message) - useDispatch to dispatch actions (e.g. register in authSlice.js)
import { login } from '../features/auth/authSlice' // To bring in the login function / action
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData   // To destructure the keys from the object

  const dispatch = useDispatch()  // To be able to dispatch a function / action brought in (to be able to update a state, e.g. from the auth slice)
  const navigate = useNavigate()

  const { isLoading } = useSelector((state) => state.auth)  // To get the state isLoading from auth

  const onChange = (e) => {
    setFormData((prevState) => ({ // prevState is the old state of the formData object
      ...prevState,   // To include the prev state (all the other fields)
      [e.target.name]: e.target.value,  // The value comes from the form input field - the name can be name, email, pw, pw2
    }))

  }

  // NOTE: no need for useEffect here as we can catch the
  // AsyncThunkAction rejection in our onSubmit or redirect them on the
  // resolution
  // Side effects shoulld go in event handlers where possible
  // source: - https://beta.reactjs.org/learn/keeping-components-pure#where-you-can-cause-side-effects

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,      // email: email   // Comes from the form
      password,   // ...
    }

    dispatch(login(userData)) // To update the userData
      .unwrap()
      .then((user) => {
        // NOTE: by unwrapping the AsyncThunkAction we can navigate the user after
        // getting a good response from our API or catch the AsyncThunkAction
        // rejection to show an error message
        toast.success(`Logged in as ${user.name}`)
        navigate('/')
      })
      .catch(toast.error)
  }

  if (isLoading) {
    return <Spinner />
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
