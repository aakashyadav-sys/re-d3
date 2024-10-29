'use client';

import { useState } from 'react';
import {  
  Radio , 
  RadioGroup , 
  FormControl , 
  FormControlLabel , 
  TextField, 
  Button, 
  Box, 
  TableContainer, 
  Table, 
  TableHead, 
  TableRow, 
  TableCell, 
  TableBody,  
  Paper,
  tableCellClasses} from '@mui/material';
import axios from 'axios';
import styled from '@emotion/styled';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#ffc400",
    color: "white",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  [`& td, & th`]: {
    padding: "6px 16px",
    fontSize: 10,
    minWidth: "150px",
  },
}));



export default function Track() {
  const [value, setValue] = useState({
    savedValue : 'C',
    searchValue: '',
  });
  const [loading , setLoading] = useState(false);


  const [data , setData] = useState([])





  const handleChange = (event) => {
    const { name , value } = event.target;
    setValue( (prev) => {return { ...prev , [name]: value, } }  );
  };


  const handleSubmit = async() => {
    setLoading( true );
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_URL}api/v1/trackData/`;
      const senData =  {...value }
      const res = await axios.post(apiUrl, senData );
      
      if(res.status === 200) {
      setData(res.data?.BLDetails?.Activity);
      setLoading(false);  
      }
      
    } catch (error) {
      return { error:  error?.message };
    } finally{
      setLoading(false);
    }
  };

  return (
    <Box className="sm:p-3 p-3 bg-white">
    <FormControl>
      <Box>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value.savedValue}
        onChange={handleChange}
        className='flex flex-row gap-4 mt-2 flex-wrap'
      >
        <FormControlLabel className='text-xs'  value="C" control={<Radio />} label="Container No" name="savedValue"  />
        <FormControlLabel className='text-xs' value="B" control={<Radio />} label="BL No"  name='savedValue' />
        <FormControlLabel className='text-xs' value="J" control={<Radio />} label="Booking Number" name='savedValue'  />

      </RadioGroup>
      </Box>
     <Box  className='flex flex-row gap-4 mt-4 mb-8 items-center'>
     <TextField sx={{width : '100%'  }} id="outlined-basic" label="Search" variant="outlined" name="searchValue" onChange={handleChange}   />
      <Button 
      type='button' 
      sx={{ backgroundColor: "#ffc400" , height : '56.8px' }}
      className="capitalize hover:bg-[#ffc400] "
      
      onClick={handleSubmit}><span className='text-white'>Go</span></Button>

     </Box>


    </FormControl>
       {data && data.length > 0  ?
       
       <TableContainer sx={{ maxHeight: 440 }} component={Paper}>
       <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
         <TableHead>
           <TableRow>
             <StyledTableCell>Container No.</StyledTableCell>
             <StyledTableCell>Activity Name</StyledTableCell>
             <StyledTableCell>Activity Date</StyledTableCell>
             <StyledTableCell>Location From</StyledTableCell>
             <StyledTableCell>Location To</StyledTableCell>
           </TableRow>
         </TableHead>
         <TableBody>
           { loading ?  
             <StyledTableRow>
             <TableCell>Loading...</TableCell>
           </StyledTableRow> : 
             
                  <>
                 {   data?.map((item, index) => (
                 <StyledTableRow key={index} hover className="relative group ">
                   <TableCell>
                     {item?.ContainerNo}
                   </TableCell>
                   <TableCell>{item?.ActivityName}</TableCell>
                   <TableCell>{item?.ActivityDate}</TableCell>
                   <TableCell>{item?.FromLocation}</TableCell>
                   <TableCell>{item?.ToLocation}</TableCell>
                 </StyledTableRow>
               ))}
                  </>
                
              
           }
         </TableBody>
       </Table>
  
     </TableContainer> 
       
       : <div>No Data </div>}
        
    </Box>

  );
}
