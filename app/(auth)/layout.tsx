import React from 'react'

const AuthLayout = ({ children }: {
    children: React.ReactNode
}) => {
  return (
    <div className='flex items-center justify-center h-screen pt-3'>
      {children}
    </div>
  )
}

export default AuthLayout