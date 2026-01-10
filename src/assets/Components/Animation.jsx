import React, {useEffect} from 'react'
import Spline from '@splinetool/react-spline';

export default function Animation () {
useEffect(() => {
    console.log("Animation lazy component mounted at:", performance.now());
  }, []);

  return (
    <>
        <div className='absolute top-0 z-10 w-full max-w-[1080px] h-[400px] md:h-[500px] lg:h-[600px]'>
            <Spline scene="https://prod.spline.design/1dvOIedESZf9Al1z/scene.splinecode" />
        </div>
    </>
  )
}
