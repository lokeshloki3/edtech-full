import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const UpdatePassword = () => {

  const { loading } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  })

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.value]: e.target.value,
    }))
  }
  return (
    <div>
      {loading ? (
        <div className='spinner'></div>
      ) : (
        <div>
          <h1>
            Choose new Password
          </h1>
          <p>
            Almost done. Enter your new password and your are all set.
          </p>
          <form>
            <label>
              <p>
                New Password <sup>*</sup>
              </p>
              <input
                required
                type={showPassword ? "text" : "password"}
                name='password'
                value={password}
                onChange={handleOnChange}
                placeholder='Enter Password'
                className='form-style w-full !pr-10'
              />
            </label>
          </form>
        </div>
      )}
    </div>
  )
}

export default UpdatePassword