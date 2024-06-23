import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

// NOTE: no need for useAuthStatus as it's a duplicate of Redux state and only
// used here in the PrivateRoute
// No need for an outlet as we are not using nested routing

// NOTE: We can remove use of the Spinner here as it will never show. We either
// have a user in local storage that we trust is genuine or we dont'.
// No request is made to the back end to authenticate the user so we don't
// need the Spinner

const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth)   // if there is an authorized user it returns the user / truthy

  if (user) return children   // If the user is authorized show the private route


  return <Navigate to='/login' /> // If the user isn't authorized redirect to the login page
}

export default PrivateRoute
