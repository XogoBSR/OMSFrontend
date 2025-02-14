import React, { useContext, useEffect, useState, useRef } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, Tooltip,TableRow, Paper, Typography } from '@mui/material';
import { backContext } from 'screens/Dashboard/components/Backgroundprovider';
import DateRangeCalendarValue from './DateRangeCalendarValue';
import "../../App.css"
import CalendarView from './CalendarView';

import TimelineNavigation from './TimelineNavigation';
import WeeklyDateCalenderValue from './WeeklyDateCalenderValue';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { useSelector } from 'react-redux';
import { UserSelector } from 'selectors';


const Timeline = () => {
  const { activities } = useContext(backContext);
  const [data, setData] = useState([]);
  const [startDate,setStartDate] = useState(null)
  const [endDate,setEndDate] = useState(null)
  const [uiOption, setUIOption] = useState("Day")
  const tableRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState("40%");
  const [toolTipTitle, setTooltipTitle] = useState("");
  const [toolTipController,setToolTipController] = useState(false)

   const profile = useSelector(UserSelector.profile());

  const navigate = useHistory()

  

  useEffect(() => {
    const newData = []; // Initialize an empty array to store the data.
    for (let i = new Date(startDate); i <= new Date(endDate); i.setDate(i.getDate() + 1)) {
        if (activities && activities.length > 0) {
            // const dateString = i.toISOString().split('T')[0];
            // console.log("Start Date:", dateString);
            let found = false; // Flag to check if a match is found in activities.
            activities.forEach(activity => {
                if (dateExistOrNot(activity.checkInTime, i)) {
                    const obj = {
                        date: dateFormat(activity.checkInTime),
                        atwork: atWorkFormat(activity.totalWorkingTime),
                        productivitytime: productivityCalculate(activity.productivityHistory),
                        idletime: idleCalculate(activity.idelHistory),
                        privatetime: privateCalculate(activity.breaksHistory),
                        clockin: dateFormatTime(activity.checkInTime),
                        clockout: activity.checkOutTime ? dateFormatTime(activity.checkOutTime) : "--"
                    };
                    newData.push(obj);
                    found = true; // Mark as found.
                }
            });

            // If no match is found, add a default entry for the date.
            if (!found) {
                const obj = {
                    date: dateFormat(i),
                    atwork: "--",
                    productivitytime: "--",
                    idletime: "--",
                    privatetime: "--",
                    clockin: "--",
                    clockout: "--"
                };
                newData.push(obj);
            }
        } else {
            // Add default entry if activities are empty or not provided.
            const obj = {
                date: dateFormat(i),
                atwork: "--",
                productivitytime: "--",
                idletime: "--",
                privatetime: "--",
                clockin: "--",
                clockout: "--"
            };
            newData.push(obj);
        }
    }
     console.log("Main Activity ",activities)
    // Update the state once after the loop completes.
    setData(newData);
  },[activities])

  useEffect(() => {
    console.log("UI OPTION ",uiOption)
  },[uiOption])

  useEffect(() => {
        const  newData = []; // Initialize an empty array to store the data.
        for (let i = new Date(startDate); i <= new Date(endDate); i.setDate(i.getDate() + 1)) {
            if (activities && activities.length > 0) {
               
                let found = false; // Flag to check if a match is found in activities.
                activities.forEach(activity => {
                    if (dateExistOrNot(activity.checkInTime, i)) {
                        const obj = {
                            date: dateFormat(activity.checkInTime),
                            atwork: atWorkFormat(activity.totalWorkingTime),
                            productivitytime: productivityCalculate(activity.productivityHistory),
                            idletime: idleCalculate(activity.idelHistory),
                            privatetime: privateCalculate(activity.breaksHistory),
                            clockin: dateFormatTime(activity.checkInTime),
                            clockout: activity.checkOutTime ? dateFormatTime(activity.checkOutTime) : "--"
                        };
                        newData.push(obj);
                        found = true; // Mark as found.
                    }
                });

                // If no match is found, add a default entry for the date.
                if (!found) {
                    const obj = {
                        date: dateFormat(i),
                        atwork: "--",
                        productivitytime: "--",
                        idletime: "--",
                        privatetime: "--",
                        clockin: "--",
                        clockout: "--"
                    };
                    newData.push(obj);
                }
            } else {
                // Add default entry if activities are empty or not provided.
                const obj = {
                    date: dateFormat(i),
                    atwork: "--",
                    productivitytime: "--",
                    idletime: "--",
                    privatetime: "--",
                    clockin: "--",
                    clockout: "--"
                };
                newData.push(obj);
            }
        }

        // Update the state once after the loop completes.
        setData(newData);
      
      // console.log(" NEW DATA LENGTH ",data.length);
    }, [startDate, endDate]);

   const normalizeRGB = (rgb) => {
      const result = rgb.match(/\d+/g);
      return result ? `rgb(${result[0]},${result[1]},${result[2]})` : rgb;
  };

  const atWorkFormat = (data) => {
      
      const min = data % 60
      const hou = Math.floor(data/60)
      const format = data < 60 ? `${min}m`:`${hou}h ${min}m` 
      return format
      
  }

  const dateFormatTime = (data) => {
    const date = new Date(data)
    const ampm = date.getHours() < 12 ? "AM" : "PM"
    const hour12 = date.getHours() % 12 || 12 
    const timeVal = `${hour12}:${date.getMinutes()} ${ampm}`
    return timeVal
  }

  const dateFormat = (isoDate) => {
    if (!isoDate) {
      return 'Invalid Date';
    }
    const date = new Date(isoDate);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayOfWeek = daysOfWeek[date.getDay()];
    return `${day}-${month}-${year} ${dayOfWeek}`;
  };

  const productivityCalculate = (arr) => {
    if (!arr || arr.length === 0) { 
        return 0;
    }
    let sum = 0;
    arr.forEach(item => {
        sum += item.productivityFilled
    });
    console.log("Productivity Sum ",sum)
    return sum < 60 ? `${sum}m` : `${Math.floor(sum/60)}h ${Math.floor(sum%60)}m`;
  };

  const idleCalculate = (arr) => {
    if (!arr || arr.length === 0) { 
        return 0;
    }
    let sum = 0;
    let diff = 0
    arr.forEach((val) => {
      if(val.idelEndedTime) { 

         diff = new Date(val.idelEndedTime) - new Date(val.idelStartedTime)
      }
      else {
        diff = (Date.now()) - new Date(val.idelStartedTime)
      }
      sum+= Math.floor(diff / (1000 * 60))
    })
    return sum < 60 ? `${sum}m` : `${Math.floor(sum/60)}h ${Math.floor(sum%60)}m`;
  };

  // this for private time calculation 
  const privateCalculate = (arr) => {
    if (!arr || arr.length === 0) { 
      return 0;
  }
  let sum = 0;
  let diff = 0
  arr.forEach((val) => {
    if(val.breakEndedTime) { 

       diff = new Date(val.breakEndedTime) - new Date(val.breakStartedTime)
    }
    else {
      diff = Date.now() - new Date(val.breakStartedTime)
    }
    sum+= Math.floor(diff / (1000 * 60))
  })
  return sum < 60 ? `${sum}m` : `${Math.floor(sum/60)}h ${Math.floor(sum%60)}m`;
  };

  const settingTheRange = (startDate,endDate) => {
      setStartDate(startDate)
      setEndDate(endDate)
  }

  const headers = ['Date', 'Timeline', 'At Work', 'Productivity Time', 'Idle Time', 'Private Time', 'Clock In', 'Clock Out'];
  const hours = Array.from({ length: 24 }, (_, i) => `${i} AM`);
  hours[12] = "12 PM";
  for (let i = 13; i < 24; i++) {
    hours[i] = `${i - 12} PM`;
  }
  let minArr = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59];

  const getSlotColor = (hour, minute,rowIndex,dateTemp) => {
    
    if(activities && activities.length > 0) {
      for(let j=0; j<activities.length; j++) {
        // console.log("Date Temop ",dateTemp)
        if(dateExistOrNotForTable(activities[j].checkInTime, dateTemp)) {
       
            let startTime = new Date(activities[j]?.checkInTime)
            let currentTime = new Date()
            let endTime = null
            if(activities[j].checkOutTime) {
              endTime = new Date(activities[j].checkOutTime);
            }
            let slotTime = null
            if(endTime === null) {
              slotTime = new Date(new Date().setHours(hour, minute, 0));
            } else {
              slotTime = new Date(endTime.getFullYear(),endTime.getMonth(),endTime.getDate(),hour, minute, 0,0); 
            }
            
            if(activities[j]?.breaksHistory.length > 0) {
              for (let i = 0; i < activities[j].breaksHistory.length; i++) {
                if(!('breakEndedTime' in activities[j].breaksHistory[i]))
                {
                  // if(activities[j]?.idelHistory.length > 0) {
                  //   for (let i = 0; i < activities[j].idelHistory.length; i++) {
                  //     if(!('idelEndedTime' in activities[j].idelHistory[i]))
                  //       {
                  //         if (slotTime >= new Date(activities[j].idelHistory[i].idelStartedTime) && slotTime<= currentTime) {
                  //           return 'yellow';
                  //         }
                  //         else {
                  //           if (slotTime >= startTime && startTime!== null && slotTime<= currentTime) {
                  //             return '#32CD32';
                  //           }
                  //           else {
                  //             return 'lightgrey';
                  //           }
                  //         }
                  //       } else {
                  //         if (slotTime >= new Date(activities[j].idelHistory[i].idelStartedTime) && slotTime <= new Date(activities[j].idelHistory[i].idelSlotEndedTime)){
                        
                  //           return 'yellow';
                  //         }
                  //       }
                  //   }
                  // }
                  if (slotTime >= new Date(activities[j].breaksHistory[i].breakStartedTime) && slotTime<= currentTime) {
                   
                     return 'red';
                   }
                   else {
                       if (slotTime >= startTime && startTime!== null && slotTime<= currentTime) {
                         
                          return '#32CD32';
                        }
                        else {
                            return 'lightgrey';
                        }
                   }
                  } else {
                    if (slotTime >= new Date(activities[j].breaksHistory[i].breakStartedTime) && slotTime <= new Date(activities[j].breaksHistory[i].breakEndedTime)) {
                      console.log(" Red ")
                      return 'red';
                    }
                  }
              }
            }
            if(activities[j]?.idelHistory.length > 0) {
              for (let i = 0; i < activities[j].idelHistory.length; i++) {
                if(!('idelEndedTime' in activities[j].idelHistory[i]))
                  {
                    if (slotTime >= new Date(activities[j].idelHistory[i].idelStartedTime) && slotTime<= currentTime) {
                      return 'yellow';
                    }
                    else {
                      if (slotTime >= startTime && startTime!== null && slotTime<= currentTime) {
                        return '#32CD32';
                      }
                      else {
                        return 'lightgrey';
                      }
                    }
                  } else {
                    if (slotTime >= new Date(activities[j].idelHistory[i].idelStartedTime) && slotTime <= new Date(activities[j].idelHistory[i].idelSlotEndedTime)){
                      // console.log("()()")
                      return 'yellow';
                    }
                  }
              }
            }

            if(activities[j]?.timelineRequestHistory.length > 0) {
              for (let i = 0; i < activities[j].timelineRequestHistory.length; i++) {
                if(!('endTimeline' in activities[j].timelineRequestHistory[i]))
                  {
                    if (slotTime >= new Date(activities[j].timelineRequestHistory[i].startTimeline) && slotTime<= currentTime) {
                      return 'blue';
                    }
                    else {
                      if (slotTime >= startTime && startTime!== null && slotTime<= currentTime) {
                        return '#32CD32';
                      }
                      else {
                        return 'lightgrey';
                      }
                    }
                  } else {
                    if (slotTime >= new Date(activities[j].timelineRequestHistory[i].startTimeline) && slotTime <= new Date(activities[j].timelineRequestHistory[i].endTimeline)){
                      // console.log("()()")
                      return 'blue';
                    }
                  }
              }
            }


            /// Work activity condition 
            if (slotTime >= startTime && slotTime<= currentTime && endTime === null) {
              return '#32CD32';
            } else if(slotTime >= startTime && slotTime<= endTime) {
              return '#32CD32';
            }
            else {
               return 'lightgrey';
            }

        }
        else {
          // console.log("YES ")
          if(j === activities.length -1) {

            return 'lightgrey'
          }
        }
      }

    } else {
     
      return 'lightgrey'
    }

  };

  const dateExistOrNot = (nonActivityDate,activityDate) => {
    let nonActivityDate1 = new Date(nonActivityDate).setHours(0,0,0,0)
    let activityDate1 = new Date(activityDate).setHours(0,0,0,0)
    // console.log(" Non Activity Date  ",nonActivityDate1," Activity Date ",activityDate1)
    return nonActivityDate1 === activityDate1
  }

  const dateExistOrNotForTable = (nonActivityDate,activityDate) => {
    const date1 =  dateFormat(nonActivityDate)
    const date2 = activityDate
    //  console.log("Date 1 slot: ",date1,date2)
    return date1 === date2 
  }

  const handleMouseEnter = (event, hour, minute) => {
    const divColor = getComputedStyle(event.currentTarget).backgroundColor;
    console.log("Hour ",hour,minute)
    switch (normalizeRGB(divColor)) {
      case "rgb(255,255,0)": {
        setToolTipController(true)

        const activityDate = new Date(new Date().setHours(hour, minute-1, 0, 0));
        let idleFound = false;
        for(let j=0; j<activities.length; j++) {

          for (let i= 0; i<activities[j].idelHistory.length; i++) {
      
            const start = new Date(activities[j].idelHistory[i].idelStartedTime);
            let end = null;
            if (activities[j].idelHistory[i].idelSlotEndedTime) {
              end = new Date(activities[j].idelHistory[i].idelSlotEndedTime);
            } else {
              end = new Date();
            }
            console.log("IDEL _+++",start,end,activityDate)
            if (start <= activityDate && end >= activityDate) {
              end -= 180000
              end = new Date(end)
              const str = dateFormatTimeline(start, end);
              setTooltipTitle(`Idle ${str} ${start.getHours()}:${start.getMinutes()}:${start.getSeconds()} - ${end.getHours()}:${end.getMinutes()}:${end.getSeconds()}`);
              idleFound = true;
              break;
            }
          }
          if (!idleFound) {
            console.log("Not Idel FOund")
            setTooltipTitle("Idle");
          }
         
        }
        break
      }
      case "rgb(50,205,50)": {
        setToolTipController(true)
        const activityDate = new Date(new Date().setHours(hour, minute-1, 0, 0));
        let workFound = false;
        for(let j=0; j<activities.length; j++) { 
            for (let i=0; i<activities[j].productivityHoverHistory.length; i++) {
              const start = new Date(activities[j].productivityHoverHistory[i].startWorkTime);
              let end = null;
              if (activities[j].productivityHoverHistory[i].endWorkTime) {
                end = new Date(activities[j].productivityHoverHistory[i].endWorkTime);
              } else {
                end = new Date();
              }
              console.log("Work _+++",start,end,activityDate)

              if (start <= activityDate && end >= activityDate) {
                // console.log(`The color of this div is work ${activityDate} ${start} ${end}`);
                const str = dateFormatTimeline(start, end);
                setTooltipTitle(`Work ${str} ${start.getHours()}:${start.getMinutes()}:${start.getSeconds()} - ${end.getHours()}:${end.getMinutes()}:${end.getSeconds()}`);
                workFound = true;
                break;
              }
            }
            if (!workFound) {
              setTooltipTitle("Work");
            }
          }
          break;
      }
      case "rgb(255,0,0)": {
        setToolTipController(true)
        const activityDate = new Date(new Date().setHours(hour, minute-1, 0, 0));
        let breakFound = false;
        for(let j=0; j<activities.length; j++) { 
        for (let i = 0; i <activities[j].breaksHistory.length; i++) {
          const start = new Date(activities[j].breaksHistory[i].breakStartedTime);
          let end = null;
          if (activities[j].breaksHistory[i].breakEndedTime) {
            end = new Date(activities[j].breaksHistory[i].breakEndedTime);
          } else {
            end = new Date();
          }
          console.log("Break Activityr ",start,end,activityDate)
          if (start <= activityDate && end >= activityDate) {
            
            const str = dateFormatTimeline(start, end);
            setTooltipTitle(`Break ${str} ${start.getHours()}:${start.getMinutes()}:${start.getSeconds()} - ${end.getHours()}:${end.getMinutes()}:${end.getSeconds()}`);
            breakFound = true;
            break;
          }
        }
        if (!breakFound) {
          console.log("Break not found")
          setTooltipTitle("Break");
        }
      }
        break;
      }

      default: {
        setToolTipController(false)
      
        break;
      }
    }
  };
  

  const dateFormatTimeline = (startTime,endTime) => {
    console.log(" Proper timer ",startTime,endTime)
    const startTimeStr = new Date(startTime);
    const endTimeStr = new Date(endTime);
    let result = (endTimeStr - startTimeStr) / 60000;
    return result < 60 ? `${Math.floor(result)}m` : `${Math.floor(result / 60)}h ${Math.floor(result % 60)}m `;
  }


  useEffect(() => {
    console.log("Updating width ",containerWidth)
    const updateWidth = () => {
      if (tableRef.current) {
        const tableWidth = tableRef.current.scrollWidth;
        const containerWidth = Math.min(tableWidth, window.innerWidth - 50); // Adjust as needed
          setContainerWidth(`${containerWidth}px`);
      }
        window.addEventListener('resize', updateWidth);
        return () => {
            window.removeEventListener('resize', updateWidth);
        };
  };
  updateWidth();
  },[data])

  const renderProgressBars = (hours, minArr, rowIndex,toolTipController, toolTipTitle,row) => {
    // console.log("ROW ",row.date)
    const progressBars = [];
    let currentActivity = null;
    let currentActivityStart = 0;
    let currentActivityWidth = 0;
  
    hours.forEach((hour, hourIndex) => {
      minArr.forEach((minute) => {
        const activity = getSlotColor(hourIndex, minute, rowIndex,row.date);
        // console.log("timeline Activity ",row.index)
        if (activity !== currentActivity) {
          if (currentActivity !== null) {
            progressBars.push(
              <div
                key={`${hourIndex}-${minute}`}
                className="progress-bar"
                role="progressbar"
                style={{
                  width: `${currentActivityWidth}%`,
                  backgroundColor: currentActivity,
                }}
                onMouseEnter={(event) => handleMouseEnter(event, hourIndex, minute)}
              >
                {toolTipController ? (
                  <Tooltip title={toolTipTitle} arrow>
                    <div style={{ padding: "15px", display: "inline-block" }}></div>
                  </Tooltip>
                ) : null}
              </div>
            );
          }
          currentActivity = activity;
          currentActivityStart = minute;
          currentActivityWidth = 1.04;
        } else {
          currentActivityWidth += 1.04;
        }
      });
    });
  
    if (currentActivity !== null) {
      progressBars.push(
        <div
          key={`last-${currentActivityStart}`}
          className="progress-bar"
          role="progressbar"
          style={{
            width: `${currentActivityWidth}%`,
            backgroundColor: currentActivity,
          }}
          onMouseEnter={(event) => handleMouseEnter(event, hours.length - 1, minArr.length - 1)}
        >
          {toolTipController ? (
            <Tooltip title={toolTipTitle} arrow>
              <div style={{ padding: "15px", display: "inline-block" }}></div>
            </Tooltip>
          ) : null}
        </div>
      );
    }
  
    return progressBars;
  };

  function renderingPageContent() {
    if (uiOption === "Day") {
      return (
          <>
              <div style={{width:"400px"}}>
                  <DateRangeCalendarValue settingTheRange={settingTheRange} />
              </div>
             
              <div style={{width: "100%",  height:"500px",clear: "both", marginTop: "20px", display:'flex',justifyContent:"center",maxWidth:"1611px"}}>
                  <TableContainer component={Paper} style={{  width: containerWidth, maxHeight: "440px"}}>
                      <div ref={tableRef}  style={{ width: '100%',overflowX: "auto" ,overflowY:"hidden"}}>
                          <Table style={{ minWidth: "600px" }}>
                              <TableBody>
                                  {headers.map((header, headerIndex) => (
                                      <TableRow key={headerIndex}>
                                          <TableCell className='timelineHeader' component="th" scope="row" style={{ fontWeight: 1000, border: "1px solid", textAlign: "center" ,minWidth:"161.97px" }}>
                                              {header}
                                          </TableCell>
                                          {data.map((row, rowIndex) => (
                                              headerIndex === 1 ? (
                                                  <TableCell key={rowIndex} className='timelineData' style={{ fontWeight: 500, border: "1px solid", textAlign: "center",maxWidth:"108px" }}>
                                                      <div>
                                                          <div className="progress" style={{ height: '10px' }}>
                                                              {renderProgressBars(hours, minArr, rowIndex, toolTipController, toolTipTitle, row)}
                                                          </div>
                                                      </div>
                                                  </TableCell>
                                              ) : (
                                                  <TableCell key={rowIndex} className='timelineData' style={{ fontWeight: 500, border: "1px solid", textAlign: "center",minWidth:"240.7px" }}>
                                                      {row[header.toLowerCase().replace(' ', '')]}
                                                  </TableCell>
                                              )
                                          ))}
                                      </TableRow>
                                  ))}
                              </TableBody>
                          </Table>
                      </div>
                  </TableContainer>
              </div>
          </>
      );
  } else if (uiOption === "Week") {
      return (
          <>
           <div style={{ position: "absolute", width: "400px", zIndex: 1,backgroundColor:"white" }}>
                  <WeeklyDateCalenderValue  settingTheRange={settingTheRange}/>
              </div>
             
              <div style={{width: "100%",  height:"500px",clear: "both", marginTop: "20px", display:'flex',justifyContent:"center",maxWidth:"1611px"}}>
                  <TableContainer component={Paper} style={{  width: containerWidth, maxHeight: "440px"}}>
                      <div ref={tableRef}  style={{ width: '100%',overflowX: "auto" ,overflowY:"hidden"}}>
                          <Table style={{ minWidth: "600px" }}>
                              <TableBody>
                                  {headers.map((header, headerIndex) => (
                                      <TableRow key={headerIndex}>
                                          <TableCell className='timelineHeader' component="th" scope="row" style={{ fontWeight: 1000, border: "1px solid", textAlign: "center" ,minWidth:"161.97px" }}>
                                              {header}
                                          </TableCell>
                                          {data.map((row, rowIndex) => (
                                              headerIndex === 1 ? (
                                                  <TableCell key={rowIndex} className='timelineData' style={{ fontWeight: 500, border: "1px solid", textAlign: "center",maxWidth:"108px" }}>
                                                      <div>
                                                          <div className="progress" style={{ height: '10px' }}>
                                                              {renderProgressBars(hours, minArr, rowIndex, toolTipController, toolTipTitle, row)}
                                                          </div>
                                                      </div>
                                                  </TableCell>
                                              ) : (
                                                  <TableCell key={rowIndex} className='timelineData' style={{ fontWeight: 500, border: "1px solid", textAlign: "center",minWidth:"240.7px" }}>
                                                      {row[header.toLowerCase().replace(' ', '')]}
                                                  </TableCell>
                                              )
                                          ))}
                                      </TableRow>
                                  ))}
                              </TableBody>
                          </Table>
                      </div>
                  </TableContainer>
              </div>
          </>
      );
  } else {
      return <CalendarView />;
  }
  
  }

  return (
<>
    
       <div style={{overflow:"hidden",display:"block"}}>
    
       <Typography variant="h5" sx={{ fontWeight: 600 }}>Timeline</Typography>
       <TimelineNavigation setUIOption = {setUIOption}/>
       <br />
       
       <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
       {renderingPageContent()}
       </div>
   </div>
    
</>
  );
}

export default Timeline;
