import PropTypes, { element } from "prop-types";
import React, { createContext, useEffect, useState, useRef } from "react";
import { useDispatch,useSelector } from "react-redux";
import { ActivityActions, UserActions } from "../../../slices/actions";
import { ActivitySelector } from "selectors/ActivitySelector";
import { UserSelector } from "selectors";

export const backContext = createContext();

function Backgroundprovider({ children }) {
  const dispatch = useDispatch();
  const [todayActivity, setActivity] = useState([]);
  const inactivityTimeout = useRef(null);
  const [isInactive, setIsInactive] = useState(false);
  const activities = useSelector(ActivitySelector.getActivityHistory())
  const todayActivityRef = useRef(null);
  const isInactiveRef = useRef(null);
  const [slotController,setSlotController] = useState(true)
  const profile = useSelector(UserSelector.profile())
  const profileRef = useRef(null)
  const [idelStatus,setIdelStatus] = useState("IdelEnd")
  

useEffect(() => {
  
  // dispatch(UserActions.getUsers())
  // if(profileRef.current?.role.includes("employee")) { 
    const events = ["mousemove", "keydown", "mousedown", "scroll", "touchstart"];

    const handleEvent = () => {
      if (
        todayActivityRef.current !== null &&
        !todayActivityRef.current[0]?.breakStatus &&
        todayActivityRef.current.length > 0 &&
        !todayActivityRef.current[0].checkOutTime
      ) {
        if (inactivityTimeout.current) {
          clearTimeout(inactivityTimeout.current);
          inactivityTimeout.current = null;
        }
        // console.log("15 Min ", todayActivityRef);
        setIsInactive(false);
      }
  
      if (!inactivityTimeout.current) {
        inactivityTimeout.current = setTimeout(() => {
          if (
            todayActivityRef.current !== null &&
            !todayActivityRef.current[0]?.breakStatus &&
            todayActivityRef.current.length > 0 &&
            !todayActivityRef.current[0].checkOutTime
          ) {
            // console.log("35 Min ", todayActivityRef);
            setIsInactive(true);
          }
          inactivityTimeout.current = null; // Reset the timeout reference after it runs
        }, 300000); // 300000ms = 5 minutes
      }
    };
  
    // Attach event listeners
    events.forEach((event) => {
      window.addEventListener(event, handleEvent);
    });
  
    // Initialize the timeout
    if (!inactivityTimeout.current) {
      inactivityTimeout.current = setTimeout(() => {
        if (
          todayActivityRef.current !== null &&
          !todayActivityRef.current[0]?.breakStatus &&
          todayActivityRef.current.length > 0 &&
          !todayActivityRef.current[0].checkOutTime
        ) {
          // console.log("35 Min ", todayActivityRef);
          setIsInactive(true);
        }
        inactivityTimeout.current = null; // Reset the timeout reference after it runs
      }, 300000); // 300000ms = 5 minutes
    }
    dispatch(UserActions.profileUser())
  
    return () => {
      // Remove event listeners
      events.forEach((event) => {
        window.removeEventListener(event, handleEvent);
      });
      clearTimeout(inactivityTimeout.current); // Clear the timeout when component unmounts
    };
  // }
}, []);

useEffect(() => {
  console.log("Profile:", profile); // Debugging line
  if (profile?.role.includes("employee")) {
    const productivityIn = setInterval(() => {
      console.log("Ensure profile:", profile);
      dispatch(ActivityActions.getUserActivity({
        id: profile._id,
      }));
      console.log("Profile TODAY:", todayActivityRef.current);
      if (todayActivityRef.current && todayActivityRef.current.length > 0) {
        if (!todayActivityRef.current[0].checkOutTime) {
          console.log("Today Activity interval ID:", todayActivityRef.current[0]?.breakStatus);
          if(!todayActivityRef.current[0]?.breakStatus) {
            dispatch(
              ActivityActions.productivityStatusRed({
                _id: todayActivityRef.current[0]._id,
                totalSlot: 1,
                filledSlot: isInactive ? 0 : 1,
                user:profile._id
              })
            );
          } else {
            dispatch(
              ActivityActions.productivityStatusRed({
                _id: todayActivityRef.current[0]._id,
                totalSlot: 0,
                filledSlot: 0,
                user:profile._id
              })
            );
          }
         
        }
      }
    }, 60000);

    return () => clearInterval(productivityIn);
  }
}, [profile, dispatch, todayActivityRef, isInactive]);

useEffect(() => {
  profileRef.current = profile;
  console.log("Updated Profile Ref Current:", profileRef.current); // Debugging line
  
  if (!profile) {
    // Reset local state when profile is null (logged out)
    setActivity([]);
    setIsInactive(false);
    todayActivityRef.current = null;
    isInactiveRef.current = null;
    clearTimeout(inactivityTimeout.current);
    inactivityTimeout.current = null;
  }

}, [profile]);


useEffect(() => {
  console.log("Current Profile:", profile); // Debugging log
  console.log("isInactive:", isInactive); // Debugging log

  // Check if profile is defined and has role "employee"
  if (profile?.role.includes("employee")) {
    console.log("Employee Role Detected"); // Debugging log

    // Check if todayActivity is available and has valid data
    if (todayActivity.length > 0 && todayActivity[0]._id) {
      console.log("Today's Activity Detected:", todayActivity[0]._id); // Debugging log

      switch (isInactive) {
        case true:
          if (!todayActivityRef.current[0]?.checkOutTime && !todayActivityRef.current[0]?.breakStatus) {
            console.warn("Inactive:", todayActivity[0]._id);
            setIdelStatus("IdelStart",todayActivityRef.current[0]?.breakStatus)
            dispatch(ActivityActions.idelStartRed({
              _id: todayActivity[0]._id,
              idelStart: new Date(new Date().setMilliseconds(0)),
              user: profile._id
            }));
          }
          break;

        case false:
        
        console.log(" False Today Activity Red ",todayActivityRef.current[0],todayActivity[0])

            // setTimeout(() => {
              if (!todayActivity[0]?.checkOutTime && !todayActivity[0]?.breakStatus && idelStatus !== "IdelEnd") {
              console.log("Active:", todayActivityRef.current.length, todayActivity[0]?.idelHistory.length, todayActivity[0]?.idelHistory[todayActivity[0].idelHistory.length - 1]);
              if (
                todayActivity?.length > 0 &&
                todayActivity[0].idelHistory.length > 0 &&
                !('idleEndedTime' in todayActivity[0].idelHistory[todayActivity[0].idelHistory.length - 1])
              ) {
                setIdelStatus("IdelEnd")
                console.log("Idel End Reducer Called :", todayActivity[0]._id);
                dispatch(ActivityActions.idelEndRed({
                  _id: todayActivity[0]._id,
                  idleEnd: new Date(new Date().setMilliseconds(0)),
                  user: profile._id
                }));
              }
            }
            // },1000)
          break;

        default:
          break;
      }
    }
    isInactiveRef.current = isInactive;
  }

  console.warn("First isInactive:", isInactive, "Final isInactiveRef:", isInactiveRef.current);
}, [profile, dispatch, todayActivity.length > 0 ? todayActivity[0]._id : null, isInactive]);

  useEffect(() => {

    if(profileRef.current?.role.includes("employee")) {

      if (activities && activities.length > 0) {
        if (new Date(activities[activities.length - 1].checkInTime).getDate() === new Date().getDate()) {
          setActivity([activities[activities.length - 1]]);
          console.warn("Should be Today actitivity : ", todayActivity);
        }
     
        setSlotController(true);
        todayActivityRef.current = todayActivity;
        console.log("Ref ",todayActivityRef.current) 
     
      }
    }

  }, [activities]);

  return <backContext.Provider value={{activities, todayActivity,profile}}>{children}</backContext.Provider>;
}

Backgroundprovider.propTypes = {
  children: PropTypes.object,
};

export default Backgroundprovider;
