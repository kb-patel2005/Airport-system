import React, { useState } from 'react'

export default function Popup() {

  return (
    <div>
        <p className='text-2xl'>add flights</p>
        <b> flight added successfully.....</b>
        <div>
            <Button>ok</Button>
            <Button>cancel</Button>
        </div>
        
    </div>
  )
}
