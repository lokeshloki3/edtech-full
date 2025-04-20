import React from 'react'
import { useSelector } from 'react-redux'

const Template = ({ title, description1, description2, image, formType }) => {
  const { loading } = useSelector((state) => state.auth);

  return (
    <div className='grid min-h-[calc(100vh-3.5rem)] place-items-center'>
      {loading ? (
        <div className='spinner'></div>
      ) : (
        <div>

        </div>
      )}
    </div>
  )
}

export default Template