import PropTypes from "prop-types";
import React, { useState, useEffect, useContext } from "react";
import "../../../App.css";
import { useDispatch, useSelector } from "react-redux";
import { ActivityActions, TimelineActions } from "../../../slices/actions";
import { backContext } from "./Backgroundprovider";
import { TimelineSelector, UserSelector } from "selectors";
import {
  Tooltip
} from '@mui/material';
import TimelineRequest from "./TimelineRequest";


const ProductivityChart = ({ todayActivities }) => {

  const profile = useSelector(UserSelector.profile());
  let minArr = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
    40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58,
    59,
  ];
  let minArrRev = [...minArr].reverse();
  const { activities } = useContext(backContext);
  const hours = Array.from({ length: 24 }, (_, i) => `${i} AM`);
  hours[12] = "12 PM";
  for (let i = 13; i < 24; i++) {
    hours[i] = `${i - 12} PM`;
  }
  const dispatch = useDispatch();
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [startTimeline,setStartTimeline] = useState(null)
  const [endTimeline,setEndTimeline] = useState(null)
  const [currentTime, setCurrentTime] = useState(new Date());
  const [chartController, setChartUpdate] = useState(true);
  const [toolTipTitle, setTooltipTitle] = useState("");
  const [toolTipController,setToolTipController] = useState(false)
  const [addRequest,setAddRequest] = useState(false)
  const [fromRequest,setFromRequest] = useState("Idel")

  const timeline = useSelector(TimelineSelector.getTimelineRequests())
  const handleClose = () => { setAddRequest(false); };
  useEffect(() => {
    console.log("Product Today Activities Main", todayActivities);
    if (todayActivities.length > 0) {
      setStartTime(new Date(todayActivities[0].checkInTime));
      if (Object.keys(todayActivities[0]).includes("checkOutTime")) {
        setChartUpdate(false);
        setEndTime(new Date(todayActivities[0].checkOutTime));
      }
    }

    dispatch(TimelineActions.getTimelineRequestByDate({
      id:profile._id,
      date: new Date()
    }))

    const interval = setInterval(() => {
      if (chartController) {
        // it is necessary to get user latest activity
        console.log("Ensure Profile ",profile)
        dispatch(ActivityActions.getUserActivity({
          id:profile._id,
      }));
        if (todayActivities.length > 0) {
          if (Object.keys(todayActivities[0]).includes("checkOutTime")) {
            setChartUpdate(false);
            setEndTime(new Date(todayActivities[0].checkOutTime));
          } else {
            setCurrentTime(new Date());
          }
          
        }
      }
    }, 30000); // Update every half of minute

    return () => clearInterval(interval);
  }, [todayActivities]);

  const getSlotColor = (hour, minute) => {
    const slotTime = new Date(new Date().setHours(hour, minute, 0));

    if (todayActivities[0]?.breaksHistory.length > 0) {
      for (let i = 0; i < todayActivities[0].breaksHistory.length; i++) {
        if (!("breakEndedTime" in todayActivities[0].breaksHistory[i])) {

          // this is for idel activity checking
          if (todayActivities[0]?.idelHistory.length > 0) {
            for (let i = 0; i < todayActivities[0].idelHistory.length; i++) {
              if (!("idelEndedTime" in todayActivities[0].idelHistory[i])) {
                if (
                  slotTime >=
                    new Date(
                      todayActivities[0].idelHistory[i].idelStartedTime
                    ) &&
                  slotTime <= currentTime
                ) {
                  return "yellow";
                } else {
                  if (
                    slotTime >= startTime &&
                    startTime !== null &&
                    slotTime <= currentTime
                  ) {
                    return "#32CD32";
                  } else {
                    return "lightgrey";
                  }
                }
              } 
              
              if(timeline.length > 0) {

                for(let i=0; i< timeline.length; i++) {

                  if(slotTime >= new Date(timeline[i].fromTime) && slotTime <= new Date(timeline[i].toTime)){
                      console.log("Meet you todasy")
                  }
                }

              } 
              else {

                if(timeline.length > 0) {

                  for(let i=0; i< timeline.length; i++) {
  
                    if(slotTime >= new Date(timeline[i].fromTime) && slotTime <= new Date(timeline[i].toTime)){
                        console.log("Meet you todasy")
                    }
                  }
  
                } 
                
                if (
                  slotTime >=
                    new Date(
                      todayActivities[0].idelHistory[i].idelStartedTime
                    ) &&
                  slotTime <=
                    new Date(todayActivities[0].idelHistory[i].idelEndedTime)
                ) {
                  return "yellow";
                }
              }
            }
          }

          // this is for timeline request checking
          if (todayActivities[0]?.timelineRequestHistory.length > 0) {
            for (let i = 0; i < todayActivities[0].timelineRequestHistory.length; i++) {
              if (!("endTimeline" in todayActivities[0].timelineRequestHistory[i])) {
                if (
                  slotTime >=
                    new Date(
                      todayActivities[0].timelineRequestHistory[i].startTimeline
                    ) &&
                  slotTime <= currentTime
                ) {
                  return "blue";
                } else {
                  if (
                    slotTime >= startTime &&
                    startTime !== null &&
                    slotTime <= currentTime
                  ) {
                    return "#32CD32";
                  } else {
                    return "lightgrey";
                  }
                }
              } else {
                if (
                  slotTime >=
                    new Date(
                      todayActivities[0].timelineRequestHistory[i].startTimeline
                    ) &&
                  slotTime <=
                    new Date(todayActivities[0].timelineRequestHistory[i].endTimeline)
                ) {
                  return "blue";
                }
              }
            }
          }
         
          // this is for break activity checking 
          if (
            slotTime >=
              new Date(todayActivities[0].breaksHistory[i].breakStartedTime) &&
            slotTime <= currentTime
          ) {
            return "red";
          } else {
            if (
              slotTime >= startTime &&
              startTime !== null &&
              slotTime <= currentTime
            ) {
              return "#32CD32";
            } else {
              return "lightgrey";
            }
          }
        } else {

          if(timeline.length > 0) {
            for(let i=0; i< timeline.length; i++) {
        
              if(slotTime >= new Date(timeline[i].fromTime) && slotTime <= new Date(timeline[i].toTime) && timeline[i].updatedByAdmin === false){
                  return "#87CEEB"
              } 
              
            }
          }

          if (
            slotTime >=
              new Date(todayActivities[0].breaksHistory[i].breakStartedTime) &&
            slotTime <=
              new Date(todayActivities[0].breaksHistory[i].breakEndedTime)
          ) {
            return "red";
          }
        }
      }
    }

    if (todayActivities[0]?.idelHistory.length > 0) {
      for (let i = 0; i < todayActivities[0].idelHistory.length; i++) {
        if (!("idelEndedTime" in todayActivities[0].idelHistory[i])) {

          if (todayActivities[0]?.timelineRequestHistory.length > 0) {
            for (let i = 0; i < todayActivities[0].timelineRequestHistory.length; i++) {
              
                if (
                  slotTime >=
                    new Date(
                      todayActivities[0].timelineRequestHistory[i].startTimeline
                    ) &&
                  slotTime <=
                    new Date(todayActivities[0].timelineRequestHistory[i].endTimeline)
                ) {
                  return "blue";
                }
              }
            }
          

          if (
            slotTime >=
              new Date(todayActivities[0].idelHistory[i].idelStartedTime) &&
            slotTime <= currentTime
          ) {
            return "yellow";
          } else {
            if (
              slotTime >= startTime &&
              startTime !== null &&
              slotTime <= currentTime
            ) {
              return "#32CD32";
            } else {
              return "lightgrey";
            }
          }
        } else {
         
            if(timeline.length > 0) {
              for(let i=0; i< timeline.length; i++) {
          
                if(slotTime >= new Date(timeline[i].fromTime) && slotTime <= new Date(timeline[i].toTime) && timeline[i].updatedByAdmin === false){
                    return "#87CEEB"
                } 
                
              }
            }
          if (
            slotTime >=
              new Date(todayActivities[0].idelHistory[i].idelStartedTime) &&
            slotTime <=
              new Date(todayActivities[0].idelHistory[i].idelEndedTime)
          ) {
            return "yellow";
          }
        }
      
    }

     // this is for timeline request checking
     if (todayActivities[0]?.timelineRequestHistory.length > 0) {
      for (let i = 0; i < todayActivities[0].timelineRequestHistory.length; i++) {
        if (!("endTimeline" in todayActivities[0].timelineRequestHistory[i])) {
          if (
            slotTime >=
              new Date(
                todayActivities[0].timelineRequestHistory[i].startTimeline
              ) &&
            slotTime <= currentTime
          ) {
            return "blue";
          } else {
            if (
              slotTime >= startTime &&
              startTime !== null &&
              slotTime <= currentTime
            ) {
              return "#32CD32";
            } else {
              return "lightgrey";
            }
          }
        } else {
          console.log("MUST MUST")
          if (
            slotTime >=
              new Date(
                todayActivities[0].timelineRequestHistory[i].startTimeline
              ) &&
            slotTime <=
              new Date(todayActivities[0].timelineRequestHistory[i].endTimeline)
          ) {
            return "blue";
          }
        }
      }
    }
    }

    if (todayActivities[0]?.timelineRequestHistory.length > 0) {
      for (let i = 0; i < todayActivities[0].timelineRequestHistory.length; i++) {
        if (!("endTimeline" in todayActivities[0].timelineRequestHistory[i])) {
          if (
            slotTime >=
              new Date(
                todayActivities[0].timelineRequestHistory[i].startTimeline
              ) &&
            slotTime <= currentTime
          ) {
            return "blue";
          } else {
            if (
              slotTime >= startTime &&
              startTime !== null &&
              slotTime <= currentTime
            ) {
              return "#32CD32";
            } else {
              return "lightgrey";
            }
          }
        } else {
         
          if (
            slotTime >=
              new Date(
                todayActivities[0].timelineRequestHistory[i].startTimeline
              ) &&
            slotTime <=
              new Date(todayActivities[0].timelineRequestHistory[i].endTimeline)
          ) {
            return "blue";
          }
        }
      }
    }

    if (
      slotTime >= startTime &&
      startTime !== null &&
      slotTime <= currentTime &&
      endTime === null
    ) {
      console.log("Cherry1")
      return "#32CD32";
    } else if (slotTime >= startTime && slotTime <= endTime) {
      console.log("Cherry2")
      return "#32CD32";
    } else {
      return "lightgrey";
    }
  };

  const getVerticalSlotColour = (hour, minute) => {
    if (startTime !== null) {
      if (hour >= startTime.getHours() && hour <= currentTime.getHours()) {
        // console.log(" TIBVBN ",todayActivities)
        if (todayActivities && todayActivities[0]?.productivityHistory.length > 0) {
          for (
            let i = 0;
            i < todayActivities[0].productivityHistory.length;
            i++
          ) {
            let hourStart =
              todayActivities[0].productivityHistory[i].slotHours.split("-");

            if (Number(hourStart[0]) === hour) {
              if (
                minute <=
                todayActivities[0].productivityHistory[i]?.productivityFilled
              ) {
                return "#32CD32";
              } else if (
                minute <=
                todayActivities[0].productivityHistory[i]?.totalSlotFilled
              ) {
                return "#90EE90";
              } else {
                return "lightgrey";
              }
            }
          }

          return "ligtgrey";
        } else {
          return "lightgrey";
        }
      } else {
        return "lightgrey";
      }
    } else {
      return "lightgrey";
    }
  };

  const normalizeRGB = (rgb) => {
    const result = rgb.match(/\d+/g);
    return result ? `rgb(${result[0]},${result[1]},${result[2]})` : rgb;
  };

  const dateFormat = (startTime, endTime) => {
    const startTimeStr = new Date(startTime);
    const endTimeStr = new Date(endTime);
    let result = (endTimeStr - startTimeStr) / 60000;
    return result < 60 ? `${Math.floor(result)}m` : `${Math.floor(result / 60)}h ${Math.floor(result % 60)}m `;
  };

  const handleMouseEnter = (event, hour, minute) => {
    const divColor = getComputedStyle(event.currentTarget).backgroundColor;
    console.log("Handle Mouse Eneter ",divColor)

    switch (normalizeRGB(divColor)) {
      case "rgb(255,255,0)": {
        setToolTipController(true)
        const activityDate = new Date(new Date().setHours(hour, minute-1, 0, 0));
        let idleFound = false;
        for (let i = 0; i < todayActivities[0].idelHistory.length; i++) {
          const start = new Date(todayActivities[0].idelHistory[i].idelStartedTime);
          const end = new Date(todayActivities[0].idelHistory[i].idelEndedTime);
          if (start <= activityDate && end >= activityDate) {
            const str = dateFormat(start, end);
            setTooltipTitle(`Idle ${str} ${start.getHours()}:${start.getMinutes()}:${start.getSeconds()} - ${end.getHours()}:${end.getMinutes()}:${end.getSeconds()}`);
            console.log(" ADD request result ",addRequest)

            idleFound = true;
            break;
          }
        }
        if (!idleFound) {
          console.log("Not Idel FOund")
          setTooltipTitle("Idle");
        }
        break;
      }
      case "rgb(50,205,50)": {
        setToolTipController(true)
        const activityDate = new Date(
          new Date().setHours(hour, minute-1, 0, 0)
        );
        let workFound = false;
        for (let i=0; i<todayActivities[0].productivityHoverHistory.length; i++) {
          const start = new Date(
            todayActivities[0].productivityHoverHistory[i].startWorkTime
          );
          let end = null;
          if (todayActivities[0].productivityHoverHistory[i].endWorkTime) {
            end = new Date(todayActivities[0].productivityHoverHistory[i].endWorkTime);
          } else {
            end = new Date();
          }

          if (start <= activityDate && end >= activityDate) {
            // console.log(`The color of this div is work ${activityDate} ${start} ${end}`);
            const str = dateFormat(start, end);
            setTooltipTitle(`Work ${str} ${start.getHours()}:${start.getMinutes()}:${start.getSeconds()} - ${end.getHours()}:${end.getMinutes()}:${end.getSeconds()}`);
            workFound = true;
            break;
          }
        }
        if (!workFound) {
          setTooltipTitle("Work");
        }
        break;
      }
      case "rgb(255,0,0)": {
        setToolTipController(true)
        const activityDate = new Date(new Date().setHours(hour, minute-1, 0, 0));
        let breakFound = false;
        for (let i = 0; i < todayActivities[0].breaksHistory.length; i++) {
          const start = new Date(todayActivities[0].breaksHistory[i].breakStartedTime);
          let end = null;
          if (todayActivities[0].breaksHistory[i].breakEndedTime) {
            end = new Date(todayActivities[0].breaksHistory[i].breakEndedTime);
          } else {
            end = new Date();
          }

          if (start <= activityDate && end >= activityDate) {
         
            const str = dateFormat(start, end);
            setTooltipTitle(`Break ${str} ${start.getHours()}:${start.getMinutes()}:${start.getSeconds()} - ${end.getHours()}:${end.getMinutes()}:${end.getSeconds()}`);
            // setAddRequest(true)
            console.log(" ADD request result ",addRequest)
            // setRequestStartTime(start)
            // setRequestEndTime(end)
            breakFound = true;
            break;
          }
        }
        if (!breakFound) {
          console.log("Breka N")
          setTooltipTitle("Break");
        }
        break;
      }

      case "rgb(0,0,255)": {
        console.log("Blue")
        setToolTipController(true)
        const activityDate = new Date(new Date().setHours(hour, minute-1, 0, 0));
        let timelineFound = false;
        let status = "Approved"
        for (let i = 0; i < todayActivities[0].timelineRequestHistory.length; i++) {
          const start = new Date(todayActivities[0].timelineRequestHistory[i].startTimeline);
          let end = null;
          if (todayActivities[0].timelineRequestHistory[i].endTimeline) {
            end = new Date(todayActivities[0].timelineRequestHistory[i].endTimeline);
          } else {
            end = new Date();
          }

          if (start <= activityDate && end >= activityDate) {
         
            const str = dateFormat(start, end);
            setTooltipTitle(`Request: ${str} ${start.getHours()}:${start.getMinutes()}:${start.getSeconds()} - ${end.getHours()}:${end.getMinutes()}:${end.getSeconds()}\nStatus:${status}`);

            console.log(" ADD request result ",addRequest)
            timelineFound = true;
            break;
          }
        }
        if (!timelineFound) {
          console.log("Timeline N")
          setTooltipTitle("Request");
        }
        break;
      }
                                
      default: {
        // console.log("Blue")
        setToolTipController(false)
      
        break;
      }
    }
  };

  const handleMouseClick = (event, hour, minute) => {
    const divColor = getComputedStyle(event.currentTarget).backgroundColor;
  
    switch (normalizeRGB(divColor)) {
      case "rgb(255,255,0)": {
        const activityDate = new Date(new Date().setHours(hour, minute - 1, 0, 0));
          for (let i = 0; i < todayActivities[0]?.idelHistory.length; i++) {
            // console.log("Add request set to true ",todayActivities[0].idelHistory[i]);
            const start = new Date(todayActivities[0]?.idelHistory[i].idelStartedTime);
            const end = new Date(todayActivities[0]?.idelHistory[i].idelEndedTime);
    
            if (start <= activityDate && end >= activityDate) {
              console.log("HOUR HOUR ",start.getHours())
              setFromRequest("Idel")
              setStartTimeline(start)
              setEndTimeline(end)
              setAddRequest(true);
              break;
            }
          }
     
        break;
      }
  
      case "rgb(255,0,0)": {
        const activityDate = new Date(new Date().setHours(hour, minute - 1, 0, 0));
        for (let i = 0; i < todayActivities[0].breaksHistory.length; i++) {
          const start = new Date(todayActivities[0].breaksHistory[i].breakStartedTime);
          let end = null;
  
          if (todayActivities[0].breaksHistory[i].breakEndedTime) {
            end = new Date(todayActivities[0].breaksHistory[i].breakEndedTime);
          } else {
            end = new Date();
          }
  
          if (start <= activityDate && end >= activityDate) {
            setFromRequest("Private")
            console.log(" Start Break ",todayActivities[0].breaksHistory[i].breakStartedTime)
            console.log(" End Break ",todayActivities[0].breaksHistory[i].breakEndedTime)
            setStartTimeline(start)
            setEndTimeline(end)
            setAddRequest(true);
            break;
          }
        }
        break;
      }
      
      default:  setAddRequest(false);
        break;
    }
   
  }
  

  const renderProgressBars = () => {
    const progressBars = [];
    let currentActivity = null;
    let currentActivityStart = 0;
    let currentActivityWidth = 0;

    hours.forEach((hour, hourIndex) => {
      minArr.forEach((minute) => {
        const activity = getSlotColor(hourIndex, minute);
        if (activity !== currentActivity) {
          if (currentActivity !== null) {
            // Push the current accumulated div
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
                onClick={(event) => handleMouseClick(event, hourIndex, minute)}
              >
               {toolTipController ? <Tooltip title={toolTipTitle} arrow>
                  <div
                    style={{ padding: "20px", display: "inline-block" }}
                  ></div>
                </Tooltip> : null }
              </div>
            );
          }
          // Start a new activity block
          currentActivity = activity;
          currentActivityStart = minute;
          currentActivityWidth = 1.04;
        } else {
          // Accumulate width for the same activity
          currentActivityWidth += 1.04;
        }
      });
    });

    // Push the last accumulated div

    if (currentActivity !== null) {
      // console.log("Accumulated Cell")
      progressBars.push(
        <div
          key={`last-${currentActivityStart}`}
          className="progress-bar"
          role="progressbar"
          style={{
            width: `${currentActivityWidth}%`,
            backgroundColor: currentActivity,
          }}
          onMouseEnter={(event) => handleMouseEnter(event, hours.length - 1, minArr.length - 1) }
          // onMouseLeave={handleMouseLeave}
        >
           {toolTipController ? <Tooltip title={toolTipTitle} arrow >
                  <div 
                    style={{ padding: "20px", display: "inline-block" }}
                    ></div>
                </Tooltip> : null }
        </div>
      );
    }

    return progressBars;
  };

  return (
    <>
    {addRequest ? (
    <>
        <TimelineRequest startTime={startTimeline} endTime={endTimeline} addRequest={addRequest} setAddRequest={handleClose} fromRequest={fromRequest} ></TimelineRequest>
    </>
  ) : null}
      <h2 className="text-center">User Activity Progress</h2>
      <div className="d-flex justify-content-between">
        {hours.map((hour, index) => (
          <div
            key={index}
            className="bar"
            style={{ width: "3.9%", textAlign: "center", height: "60px" }}
          >
            <div
              className="slot"
              style={{ display: "flex", flexDirection: "column" }}
            >
              {minArrRev.map((minute, minIndex) => (
                <div
                  key={minute}
                  style={{
                    width: "100%",
                    height: "1px",
                    backgroundColor: getVerticalSlotColour(index, minute),
                  }}
                ></div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginBottom: "10px" }}>
        <div className="progress" style={{ height: "10px" }}>
          {renderProgressBars()}
        </div>
      </div>
      <div className="d-flex justify-content-between mt-1">
        <li className="timeSlotLi">12AM</li>
        <li className="timeSlotLi">1AM</li>
        <li className="timeSlotLi">2AM</li>
        <li className="timeSlotLi">3AM</li>
        <li className="timeSlotLi">4AM</li>
        <li className="timeSlotLi">5AM</li>
        <li className="timeSlotLi">6AM</li>
        <li className="timeSlotLi">7AM</li>
        <li className="timeSlotLi">8AM</li>
        <li className="timeSlotLi">9AM</li>
        <li className="timeSlotLi">10AM</li>
        <li className="timeSlotLi">11AM</li>
        <li className="timeSlotLi">12PM</li>
        <li className="timeSlotLi">1PM</li>
        <li className="timeSlotLi">2PM</li>
        <li className="timeSlotLi">3PM</li>
        <li className="timeSlotLi">4PM</li>
        <li className="timeSlotLi">5PM</li>
        <li className="timeSlotLi">6PM</li>
        <li className="timeSlotLi">7PM</li>
        <li className="timeSlotLi">8PM</li>
        <li className="timeSlotLi">9PM</li>
        <li className="timeSlotLi">10PM</li>
        <li className="timeSlotLi">11PM</li>
      </div>
    </>
  );
};

ProductivityChart.propTypes = {
  todayActivities: PropTypes.array,
};

export default ProductivityChart;
