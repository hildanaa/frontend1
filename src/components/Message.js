import React from 'react'

const Message = ({ variant, children }) => {
  return (
    <div className={'alert alert-' + variant} role='alert'>
      {children}
    </div>
  )
}

Message.defaultProps = {
  varient: 'info',
}

export default Message
