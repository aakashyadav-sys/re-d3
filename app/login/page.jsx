import React from 'react'
import Layout from '../customerPortal/layout'
import { Footer ,LoginSection } from '@/app/components'
import NavBar from '@/app/components/navbar/navbar'


 const Index = () => {
  return (
      <>
      <NavBar />
      <LoginSection />
      <Footer />
    </>
  )
}


export default Index;