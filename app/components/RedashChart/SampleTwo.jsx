'use client';

import React , { useEffect , useRef } from 'react'
import { Sample } from './Sample';
export const SampleTwo = () => {

    const ref = useRef(null);

    useEffect(() => {
        const chart =  Sample();
        ref.current?.append(chart)

        return () => chart.remove();
    }, [])

  return (
    <>
        <div className="w-[700px]" >
            <div className={'chart'} ref={ref}></div>
        </div>
    </>
  )
}
