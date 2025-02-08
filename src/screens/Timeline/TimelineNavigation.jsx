import React from 'react'
import "../../CommonStyle/CalendarStyle/Calender.css"
import { Button } from '@mui/material'
import PropTypes from 'prop-types'

function TimelineNavigation({setUIOption}) {

    function selectingUI(e) {
        let arr = document.getElementsByClassName("tab")
        for(let i =0; i<arr.length; i++) {  
            arr[i].classList.remove("selected")
        }
        e.target.classList.add("selected")
        console.log("INNER HTML ",e.target.innerText)
        setUIOption(e.target.innerText)

    }

  return (
     <span style={{ width: "210px" ,height:"40px",display:"flex", justifyContent:"space-between" }}>
          <Button className='tab selected' onClick={selectingUI}>Day</Button>
          <Button className='tab' onClick={selectingUI}>Week</Button>
          <Button className='tab' onClick={selectingUI}>Month</Button>
          
        </span>
  )
}

TimelineNavigation.propTypes = {
    setUIOption : PropTypes.func
}

export default TimelineNavigation