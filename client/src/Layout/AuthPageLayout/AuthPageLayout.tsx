import React from 'react'
import { Outlet } from 'react-router-dom'
import './AuthPageLayout.css'

const AuthPageLayout = () => {
  return (
    <section className='authform-section'>
        <Outlet/>
    </section>
  )
}

export default AuthPageLayout