'use client';

import React, { useState } from 'react'
import { Autocomplete, Button, TextField } from '@mui/material';
import axios from 'axios'
import { SampleTwo } from './SampleTwo';
import { SunBurst } from './SunBurst';



const chartTypes = [
    {
        id: 1,
        label: 'Chart',
        value: 'CHART'
    },
    {
        id: 2,
        label: 'Table',
        value: 'TABLE',
    },
    {
        id: 3,
        label: 'Sunburst Sequence',
        value: 'SUNBURST_SEQUENCE',
    },
    {
        id: 4,
        label: 'Map',
        value: 'MAP'
    },
    {
        id: 5,
        label: 'Sankey',
        value: 'SANKEY',
    },
    {
        id: 6,
        label: 'Cohort',
        value: 'COHORT',
    }

]


const basicChartTypes = [
    {
        label: 'Bar',
        value: 'column',
    },
    {
        label: 'Pie',
        value: 'pie',
    },
]


export const RedashInput = ({  width = '100%', height = '600px' }) => {

    const [showChartTypex, setShowChartType] = useState(false);
    const [chartType, setChartType] = useState({
        type: "",
        name: "",
        
    });
    const [link , setLink] = useState('');

    const getChartType = (chartTypes) => {
        setChartType(prev => {
            return {
                ...prev,
                name: chartTypes?.label,
                type: chartTypes?.value,
            }
        });
        if (chartTypes?.value === 'CHART') {
            setShowChartType(true);
        } else {
            setShowChartType(false);
        }
    }


    const executeQuery = async () => {
        const data = {  name :  chartType?.name, type : chartType?.type };
        const url = `http://localhost:4017/api/v1/create/`;
        const res = await axios.post(url ,  data , { mode: 'no-cors' })
        setLink(res.data?.link);
      }



    return (
        <>
            <SampleTwo />
            {/* <SunBurst /> */}
            {/* <Autocomplete
                disablePortal
                options={chartTypes}
                sx={{ width: 300, marginTop: 10 }}
                renderInput={(params) => <TextField {...params} label="Charts" />}
                onChange={(e, value) => getChartType(value)}
            />
            {showChartTypex ?
                <Autocomplete
                    disablePortal
                    options={basicChartTypes}
                    sx={{ width: 300, marginTop: 10 }}
                    renderInput={(params) => <TextField {...params} label="Charts Types" />}
                />
                : <></>}


            {
                chartType.type && chartType?.type?.length  > 0 ? 
                <Button 
                    variant='contained' 
                    sx={{ padding: '10px' , margin: '10px 20px ' }} 
                    type='button' 
                    onClick={executeQuery} 
                >Generate Chart</Button> 
                    : <></>
            }

            {
                link && link.length > 0 ?
                    <>
                        <div style={{ width, height, overflow: 'hidden' }}>
                            <iframe
                                src={link}
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                style={{ border: 'none' }}
                                title="Redash Chart"
                            ></iframe>
                        </div>
                    </>
                : <></>
            } */}
        </>
    )
}
