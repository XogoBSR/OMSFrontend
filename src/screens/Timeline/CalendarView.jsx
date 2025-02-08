import React, { useContext, useState } from 'react';
import { Button, Select, MenuItem } from '@mui/material';
import { backContext } from 'screens/Dashboard/components/Backgroundprovider';
import '../../CommonStyle/CalendarStyle/Calender.css'; // Import CSS for styling

import { SettingSelector } from 'selectors/SettingSelector';
import { useSelector } from 'react-redux';

const CalendarView = () => {

  const { activities } = useContext(backContext);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [hoveredDay, setHoveredDay] = useState(null)

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
  const setting = useSelector(SettingSelector.getSetting())

  const dateFormat = (i) => {
      
    return i < 60 ? `${i}m` : `${String(Math.floor(i/60)).padStart(2,'0')}h ${String(i%60).padStart(2,'0')}m`
  }

  const onHoveredDayStatus = (i) => {
      return <div style={{display:"flex",justifyContent:"space-evenly"}}>
          <div style={{position:"relative",flexDirection:"column",display:"flex"}}>
             <span style={{fontSize:"10px",textAlign:"center",fontWeight:"600"}}>Check In</span>
             <span style={{fontSize:"10px",textAlign:"center",fontWeight:"600"}}>{getStartWorkTime(i)}</span>
          </div>
          <div style={{position:"relative",flexDirection:"column",display:"flex"}}>
              <span style={{fontSize:"10px",textAlign:"center",fontWeight:"600"}}>Check Out</span>
              <span style={{fontSize:"10px",textAlign:"center",fontWeight:"600"}}>{getEndWorkTime(i)}</span>
          </div>
      </div>
  }
  
  const dayCheck = (i) => {

    let tempDate = new Date(currentYear,currentMonth,i)
    let dayOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    console.log(" WORK IN ONJNAD",setting.day)
    if(dayOfWeek[tempDate.getDay()] === setting.day) {
      return "Holiday"
    } else {
      for(let i=0; i<activities.length; i++) {
        
        if(new Date(activities[i].checkInTime).setHours(0,0,0,0) === tempDate.setHours(0,0,0,0)) {
          return dateFormat(activities[i].totalWorkingTime)
        } 
      }
      return "--"
      }

  }

  const renderDays = () => {
    const days = [];
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    for (let i = 1; i <= daysInMonth; i++) {

      days.push(
        <div key={i} className="calendar-day" onMouseEnter={() => setHoveredDay(i)} onMouseLeave={() => setHoveredDay(null)} >
           <div className="date">{i}</div> 
           <div style={ {color: dayCheck(i) === "Holiday" ? "red" : "#7229D9",width:"100%" }}> 
            {hoveredDay === i ? onHoveredDayStatus(i) : dayCheck(i)} 
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

  const getStartWorkTime = (i) => {

    let tempDate = new Date(currentYear,currentMonth,i)
    
    for(let j=0; j<activities.length; j++) {
      
      if(new Date(activities[j].checkInTime).setHours(0,0,0,0) === tempDate.setHours(0,0,0,0)) {
  
          const val = new Date(activities[j].checkInTime)
          const hours = val.getHours()
          const minutes = val.getMinutes()
          if(hours === 12) {
            return `${hours}PM:${minutes}M`
          } else {

            return hours<12 ? `${hours}AM:${minutes}M` : `${hours-12}PM:${minutes}M` 
          } 

         
      }
    }
    return "--"

    
  }

  const getEndWorkTime = (i) => {

    let tempDate = new Date(currentYear,currentMonth,i)
    for(let j=0; j<activities.length; j++) {
    
      if(new Date(activities[j].checkOutTime).setHours(0,0,0) === tempDate.setHours(0,0,0)) {
        const val = new Date(activities[j].checkInTime)
        const hours = val.getHours()
        const minutes = val.getMinutes()
        return hours<12 ? `${hours}AM:${minutes}M` : `${hours}PM:${minutes}M` 
       
      }
    }
    return "--"

  }

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
};

export default CalendarView;
