import React, {useEffect, useState } from 'react';
import { Button, Select, MenuItem } from '@mui/material';

import '../../CommonStyle/CalendarStyle/Calender.css'; // Import CSS for styling
import { LeaveSelector } from 'selectors';
import { useDispatch, useSelector } from 'react-redux';
import { LeaveActions, SettingActions } from 'slices/actions';
import { SettingSelector } from 'selectors/SettingSelector';
import { element } from 'prop-types';


function LeaveCalendar() {

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [hoveredDay, setHoveredDay] = useState(null)
  const dispatch = useDispatch()
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
  const leaves = useSelector(LeaveSelector.getLeaves())
  const setting = useSelector(SettingSelector.getSetting())

  useEffect(() => {
    dispatch(LeaveActions.getAllLeaves())
    dispatch(SettingActions.getSetting())
    console.log("Leaves ",leaves)
  },[])

  const leaveStatus = (i) => {
    const items = [];
    let userLeaveHistory = []
    const tempDate = new Date(currentYear,currentMonth,i)
    tempDate.setHours(0,0,0,0)
    for(let i=0; i<leaves.length; i++) {
      const startDate = new Date(leaves[i].start).setHours(0, 0, 0, 0);
      const endDate = new Date(leaves[i].end).setHours(0, 0, 0, 0);
      if(startDate <= tempDate && endDate >= tempDate) {  
          userLeaveHistory.push(leaves[i])
      }
    }
  
    for (let i = 0; i < userLeaveHistory.length; i++) {
      items.push(
          <p style={{backgroundColor: "#7229D9", width: userLeaveHistory[i].type === "fullday" ? "100%" : "50%",borderRadius:'20px'}}>{userLeaveHistory[i].userName}</p>
      );
    }
    return <> `<div style={{display:"flex",flexDirection:"column",gap:"0px",overflow:items.length > 3 ? "scroll" : "hidden"}}>{items}</div>`</>;
  }



  const onHoveredDayStatus = (i) => {
    let tempDate = new Date(currentYear,currentMonth,i)
    let dayOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    if(dayOfWeek[tempDate.getDay()] === setting.day) {
        return <div style={{color:"red"}}>Holiday</div>
    } 
        if(setting?.companyLeaveArr.length > 0) {
          const isHoliday = setting.companyLeaveArr.find(element => { 
          return new Date(element.leaveDate).setHours(0,0,0,0) === tempDate.setHours(0,0,0,0)
      })
      if(isHoliday) {
        return "Holiday"
      }
      }
  }
  
  const dayCheck = (i) => {

    let tempDate = new Date(currentYear,currentMonth,i)
    let dayOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    if(dayOfWeek[tempDate.getDay()] === setting.day) {
      return "Holiday"
    } 

    if(setting?.companyLeaveArr && setting?.companyLeaveArr.length > 0) {
       const isHoliday = setting.companyLeaveArr.find(element => { 
        return new Date(element.leaveDate).setHours(0,0,0,0) === tempDate.setHours(0,0,0,0)
    })
    if(isHoliday) {
      return "Holiday"
    }
  }

  }

  const renderDays = () => {
    const days = [];
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(
        <div key={i} className="calendar-day" onMouseEnter={() => setHoveredDay(i)} onMouseLeave={() => setHoveredDay(null)}>
           <div className="date" style={ {color: dayCheck(i) === "Holiday" ? "red" : "#7229D9",position:"absolute", top:"6px", right:"6px" }}>{i}</div> 
           <div style={ {color: dayCheck(i) === "Holiday" ? "red" : "white",width:"100%" }} > 
            {hoveredDay === i ? onHoveredDayStatus(i) : dayCheck(i)} 
            {dayCheck(i) !== "Holiday"? (
              <>
                {leaveStatus(i)}
              </>
            ):null}
            </div> 
            </div>
      );
    }
    return days;
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleMonthChange = (event) => { setCurrentMonth(event.target.value); }; 
  const handleYearChange = (event) => { setCurrentYear(event.target.value); };

  return (
    <div className="calendar">
    
      <div className="calendar-navigation">
        <Button onClick={handlePrevMonth}>Previous</Button>
        <Select
        value={currentMonth}
        onChange={handleMonthChange}
      >
        {Array.from({ length: 12 }, (_, index) => (
          <MenuItem key={index} value={index}>
            {new Date(currentYear, index).toLocaleString('default', { month: 'long' })}
          </MenuItem>
        ))}
      </Select>
      <Select
        value={currentYear}
        onChange={handleYearChange}
      >
        {Array.from({ length: 101 }, (_, index) => {
          const year = new Date().getFullYear() - 50 + index;
          return (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          );
        })}
      </Select>
        <Button onClick={handleNextMonth}>Next</Button>
      </div>
      <div className="calendar-header">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>
      <div className="calendar-grid" >{renderDays()}</div>
    </div>
  );
}

export default LeaveCalendar