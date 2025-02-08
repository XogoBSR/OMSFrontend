import React, { useContext, useEffect, useState } from 'react';
import { Button, Select, MenuItem, Dialog,DialogActions,DialogContent,DialogTitle,DialogContentText } from '@mui/material';
import { backContext } from 'screens/Dashboard/components/Backgroundprovider';
import '../../CommonStyle/CalendarStyle/Calender.css'; // Import CSS for styling
import FormLeavePop from './FormLeavePop';
import { useDispatch, useSelector } from 'react-redux';
import { SettingSelector } from 'selectors/SettingSelector';
import { LeaveSelector, UserSelector } from 'selectors';
import moment from 'moment';
import { LeaveActions, SettingActions, UserActions } from 'slices/actions';


const LeaveCalender = () => {

  // const { profile } = useContext(backContext);
  const profile = useSelector(UserSelector.profile())
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [hoveredDay, setHoveredDay] = useState(null)
  const [leaveForm,setLeaveForm] = useState(false)
  // const [leaveDetails, setLeaveDetails] = useState(false)
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
  const setting = useSelector(SettingSelector.getSetting())
  const leavesByMonth = useSelector(LeaveSelector.getLeaves())
  const [leaveDetailsPop,setLeaveDetailsPop] = useState(false)
  const [leaveDetailsPopData,setLeaveDetailsPopData] = useState({})
  const dispatch = useDispatch()

  useEffect(() => {
        dispatch(UserActions.profileUser());
        dispatch(SettingActions.getSetting())
  },[])

  useEffect(() => {
    console.log("Leave By Month: ",profile)
  },[leavesByMonth])

  useEffect(() => {
    console.log(" dsfdsfsdfsdfsd ",leaveForm)
    // setTimeout(() => {
 
    // },6000)

    
  },[leaveForm])

  useEffect(() => {
    if(profile) {
      dispatch(LeaveActions.getLeaves({
            user: profile._id
        }))
      }
  },[profile])

  const onClickingDate = (i) => {
    console.log("Before Clicliking date ",leaveForm,dayCheck(i))
    if(dayCheck(i) === null) {
      setLeaveForm(true)
      console.log("After Clicliking date ",leaveForm)
    }
  }
  

  const displayLeaveData = (data) => {
    setLeaveDetailsPop(true)
    setLeaveDetailsPopData(data)
    console.log("Leave Data ",leaveDetailsPopData)
  }

  const onHoveredDayStatus = (i) => {
   
    let tempDate = new Date(currentYear,currentMonth,i)
    let dayOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    if(dayOfWeek[tempDate.getDay()] === setting.day) {
        return <div style={{color:"red"}}>Holiday</div>
    } else if(setting?.companyLeaveArr && setting?.companyLeaveArr.length > 0) {
      const isHoliday = setting.companyLeaveArr.find(element => { 
       return new Date(element.leaveDate).setHours(0,0,0,0) === tempDate.setHours(0,0,0,0)
      })
      if(isHoliday) {
        return "Holiday"
      } else {
       
        for (let i = 0; i < leavesByMonth.length; i++) {
          const tempDateZeroHours = tempDate.setHours(0, 0, 0, 0);
          const leaveStartZeroHours = new Date(leavesByMonth[i].start).setHours(0, 0, 0, 0);
          const leaveEndZeroHours = new Date(leavesByMonth[i].end).setHours(0, 0, 0, 0);
          
          if (tempDateZeroHours >= leaveStartZeroHours && tempDateZeroHours <= leaveEndZeroHours) {
            console.log(" ON HOVERED DAY STATUS : ",leavesByMonth[i])
            return leavesByMonth[i].updatedByAdmin ? (
              <div style={{ padding: "2px", backgroundColor: "skyblue", borderRadius: "4px" }} onClick={() => {
                displayLeaveData(leavesByMonth[i])
            }}>
                {leavesByMonth[i].specifictype}
              </div>
            ) : (
              <div style={{ padding: "2px", backgroundColor: "grey", borderRadius: "4px" }}>
                Pending
              </div>
            );
          }
        }
        return "+"
      }
      
   } else {
      for(let i=0; i<leavesByMonth.length; i++) {
        if(tempDate.setHours(0,0,0,0) >= new Date(leavesByMonth[i].start).setHours(0,0,0,0) && tempDate.setHours(0,0,0,0) <= new Date(leavesByMonth[i].end).setHours(0,0,0,0)) {
          return (
                <div style={{padding:"2px", backgroundColor:"skyblue", borderRadius:"4px"}} onClick={() => {
                    displayLeaveData(leavesByMonth[i])
                }}> 
                {leavesByMonth[i].specifictype}
              </div> 
          );
        }
      }
      return <div>
         + 
      </div>

    }
  }
  
  const dayCheck = (i) => {

    let tempDate = new Date(currentYear,currentMonth,i)
    let dayOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    if(dayOfWeek[tempDate.getDay()] === setting.day) {
      return "Holiday"
    } 
    else if(setting?.companyLeaveArr && setting?.companyLeaveArr.length > 0) {
      const isHoliday = setting.companyLeaveArr.find(element => { 
       return new Date(element.leaveDate).setHours(0,0,0,0) === tempDate.setHours(0,0,0,0)
      })
      if(isHoliday) {
        return "Holiday"
      } else {
        for (let i = 0; i < leavesByMonth.length; i++) {
          const tempDateZeroHours = tempDate.setHours(0, 0, 0, 0);
          const leaveStartZeroHours = new Date(leavesByMonth[i].start).setHours(0, 0, 0, 0);
          const leaveEndZeroHours = new Date(leavesByMonth[i].end).setHours(0, 0, 0, 0);
        
          if (tempDateZeroHours >= leaveStartZeroHours && tempDateZeroHours <= leaveEndZeroHours) {
            return leavesByMonth[i].updatedByAdmin ? (
              <div style={{ padding: "2px", backgroundColor: "skyblue", borderRadius: "4px" }}>
                {leavesByMonth[i].specifictype}
              </div>
            ) : (
              <div style={{ padding: "2px", backgroundColor: "grey", borderRadius: "4px" }}>
                Pending
              </div>
            );
          }
        }
        
      }
      
   } else {
    for(let i=0; i<leavesByMonth.length; i++) {
      if(tempDate.setHours(0,0,0,0) >= new Date(leavesByMonth[i].start).setHours(0,0,0,0) && tempDate.setHours(0,0,0,0) <= new Date(leavesByMonth[i].end).setHours(0,0,0,0)) {
        return (
              <div style={{padding:"2px", backgroundColor:"skyblue", borderRadius:"4px"}}> 
              {leavesByMonth[i].specifictype}
            </div> 
        );
      }
    }
   }

   return null
   
}

  function leaveFormFun() {
        setLeaveForm(false)
  } 

  const renderDays = () => {
    console.log("REnder days")
    const days = [];
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    for (let i = 1; i <= daysInMonth; i++) {

      days.push(
        <div key={i} className="calendar-day" onMouseEnter={() => setHoveredDay(i)} onMouseLeave={() => setHoveredDay(null)} onClick={() => { onClickingDate(i) }}>
           <div className="date" style={ {color: dayCheck(i) === "Holiday" ? "red" : "#7229D9" }}>{i}</div> 
           <div style={ {color: dayCheck(i) === "Holiday" ? "red" : "#7229D9",width:"100%" }} > 
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

  const handleMonthChange = (event) => { setCurrentMonth(event.target.value); }; 
  const handleYearChange = (event) => { setCurrentYear(event.target.value); };

  return (
    <>
    {leaveForm ? (<FormLeavePop openFun={leaveFormFun}/>) : (null)}
    {leaveDetailsPop ? (<Dialog
        open={open}
        onClose={leaveDetailsPop}
        maxWidth="md"
        PaperProps = {{
          sx: { width: '600px', height: '300px'}
        }
      }
      >
        <DialogTitle id="alert-dialog-title" >
          Leave Description
        </DialogTitle>
        <DialogContent style={{display:"flex",flexDirection:"column"}}>
          <div>
          <DialogContentText id="alert-dialog-description">
            Type : {leaveDetailsPopData.specifictype}
          </DialogContentText>
          </div>
          <div>
          <DialogContentText id="alert-dialog-description">
            Description : {leaveDetailsPopData.description}
          </DialogContentText>
          </div>
          <div>
          <DialogContentText id="alert-dialog-description">
            Duration : {leaveDetailsPopData.type}
          </DialogContentText>
          </div>
          <div>
          <DialogContentText id="alert-dialog-description">
            Duration :  {leaveDetailsPopData.type}
          </DialogContentText>
          </div>
          <div>
          <DialogContentText id="alert-dialog-description">
            Date :  { moment(leaveDetailsPopData.start).format("yyyy-MM-DD")}
          </DialogContentText>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setLeaveDetailsPop(false) }} color="primary">
            Cancel
          </Button>
          <Button onClick={() => { setLeaveDetailsPop(false) }} color="primary" autoFocus>
            Okay
          </Button>
        </DialogActions>
      </Dialog>) : (null)}
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
    </>
  );
};

export default LeaveCalender;
