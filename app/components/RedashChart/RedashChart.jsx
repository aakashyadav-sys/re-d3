'use client';

import React  from 'react'
import {  Container } from '@mui/material'
import { RedashInput } from './RedashInput';

export const RedashChart = ({  width = '100%', height = '600px' }) => {


//   const [link , setLink] = useState('');


//   const getData =  async ()  => {
//     const res =  await axios.get('http://localhost:4017/api/v1/dashboard/' , { mode: 'no-cors' })
//     return res.data  
// }


//   const executeQuery = async () => {
//     const res = await axios.post('http://localhost:4017/api/v1/create/', { mode: 'no-cors' })
//     setLink(res.data?.link);
//   }


  return (
    <>
    <Container>
    <RedashInput />
    </Container>
    </>
  )
}
