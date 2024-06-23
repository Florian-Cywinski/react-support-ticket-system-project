import { useState } from 'react'    // For the form (local state)
import { useSelector, useDispatch } from 'react-redux'  // useSelector to bring in the user from the global state


function NewTicket() {
  const { user } = useSelector((state) => state.auth)   // To get the user from the auth part of the state

  const [name] = useState(user.name)
  const [email] = useState(user.email)
  const [product, setProduct] = useState('iPhone')  // The array must contain one of the available products by default so that no error occurs  // ticketModel.js (enum: ['iPhone', 'Macbook Pro', 'iMac', 'iPad'])
  const [description, setDescription] = useState('')



  const onSubmit = (e) => {
    e.preventDefault()

  }






  return (
    <>
      <section className='heading'>
        <h1>Create New Ticket</h1>
        <p>Please fill out the form below</p>
      </section>

      <section className='form'>
        {/* The pseudo form (the input fields are disabled coz the values are given from the local state) */}
        <div className='form-group'>
          <label htmlFor='name'>Customer Name</label>
          <input type='text' className='form-control' value={name} disabled />   {/* The name is already inserted for the logged-in user and cannot be changed */}
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Customer Email</label>
          <input type='text' className='form-control' value={email} disabled />
        </div>
        {/* The actual form */}
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <label htmlFor='product'>Product</label>
            <select name='product' id='product' value={product} onChange={(e) => setProduct(e.target.value)}>   {/* To be able to select one of the optional products */}
              <option value='iPhone'>iPhone</option>
              <option value='Macbook Pro'>Macbook Pro</option>
              <option value='iMac'>iMac</option>
              <option value='iPad'>iPad</option>
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='description'>Description of the issue</label>
            <textarea name='description' id='description' className='form-control' 
              placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className='form-group'>
            <button className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default NewTicket
