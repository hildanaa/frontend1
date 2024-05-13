import React from 'react'

const Loader = () => {
  return (
    <div
      className='spinner-border text-dark'
      role='status'
      style={{
        width: '100px',
        height: '100px',
        margin: 'auto',
        display: 'block',
      }}
    ></div>
  )
}

export default Loader
