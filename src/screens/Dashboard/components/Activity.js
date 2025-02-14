import React, {useEffect, useState,useRef, createContext, useContext} from "react";
import Can from "../../../utils/can";
import {actions, features} from "../../../constants/permission";
import {Box, Button, Card, Grid, Typography} from "@mui/material";
import {Timer} from "@mui/icons-material";
import moment from "moment";
import {ActivityActions, AttendanceActions, GeneralActions} from "../../../slices/actions";
import {useDispatch, useSelector} from "react-redux";
import {AttendanceSelector, UserSelector} from "../../../selectors";
import { ActivitySelector } from "selectors/ActivitySelector";
import {styled} from "@mui/material/styles";
import TodayGoal from "./TodayGoal";
import OtherBreak from "./BreakReasone";
import EarlyLate from "./EarlyLate";
import OverLimitBreak from "./OverLimitBreak";
import ProductivityChart from "./ProductivityChart";
import AttendanceBarChart from "./AttendanceBarChart";


export const activityContext = createContext()

const InfoLog = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'space-between'
}));

export default function Activity() {

    const dispatch = useDispatch();
    const profile = useSelector(UserSelector.profile());
    const attendances = useSelector(AttendanceSelector.getAttendances());
    const [controller,setController] = useState(false)
    const [lunchController,setLunch] = useState(false)
    const activities = useSelector(ActivitySelector.getActivityHistory())
    const [lunchType,setLunchType] = useState("")
    const [showBreakPop,setShowBreakPop] = useState(false)
    const [lateCheckIn,setLateCheckIn] = useState(false)
    const [earlyCheckOut,setEarlyCheckOut] = useState(false)
    const [todayStatus,setTodayStatus] = useState(false)
    const [overLimitBreak,setOverLimitBreak] = useState(false)
    const [slotController,setSlotController] = useState(true)
    const [isLoading,setIsLoading] = useState(false)
    const [todayActivity, setActivity] = useState([]);
    
    // To perform action based on lunch type 
    useEffect(() => {
        if(todayActivity.length > 0 && todayActivity[0]._id) {

            switch(lunchType) {
                case "lunchBreak": 
                                   
                                    setLunch(!lunchController)
                                    dispatch(AttendanceActions.createLunchBreak({
                                        id: attendance._id,
                                        lunchIn: new Date()
                                    }));
                                     console.log("TOday Activity ",todayActivity)
                                    dispatch(ActivityActions.breakStartRed({
                                        _id: todayActivity[0]._id,
                                        type: lunchType,
                                        breakStart : new Date().setMilliseconds(0),
                                        description : "Lunch Break",
                                        user: profile._id
                                    }))
                                    setSlotController(false)
                                     break
                case "teaBreak":     
                                   
                                    setLunch(!lunchController)
                                    dispatch(AttendanceActions.createLunchBreak({
                                        id: attendance._id,
                                        lunchIn: new Date()
                                    }));
                                 
                                    dispatch(ActivityActions.breakStartRed({
                                        _id: todayActivity[0]._id,
                                        breakStart : new Date().setMilliseconds(0),
                                        type: lunchType,
                                        description : "Tea Break",
                                        user: profile._id
                                    }))
                                    setSlotController(false)
                                     break
                case "other":      
                                   
                                   setLunch(!lunchController)
                                    dispatch(AttendanceActions.createLunchBreak({
                                        id: attendance._id,
                                        lunchIn: new Date().setMilliseconds(0),
                                        user: profile._id
                                    }));
                 
                                    setShowBreakPop(true)
                                    setSlotController(false)
                                     break
        
                case "breakOut":   
                                    setLunch(!lunchController)
                                    dispatch(AttendanceActions.updateLunchBreak({
                                        id: attendance._id,
                                        lunchOut: new Date()
                                    }));
                                    dispatch(ActivityActions.breakEndRed({
                                        _id: todayActivity[0]._id,
                                        breakEnd : new Date().setMilliseconds(0),
                                        type: lunchType,
                                        user: profile._id 
                                    }))
                                    setSlotController(true)
                                    break;
                default:
                                    break
            }
        }

    },[lunchType])

    useEffect(() => {
      setTimeout(() => {
        setIsLoading(true)
      
    },1000)
    },[])

      useEffect(() => {
        console.warn("Should be Today actitivity : ", activities);
        if (activities && activities.length > 0) {
          if (new Date(activities[activities.length - 1].checkInTime).getDate() === new Date().getDate()) {
            setActivity([activities[activities.length - 1]]);
            console.warn("Should be Today actitivity : ", todayActivity);
          }
        } 
      }, [activities]);

    // Adding useeffect to appear early check out or late check in pop up 
    useEffect(() => {
        if (todayActivity.length > 0) {
            // console.log("Need to run")
            if (todayActivity[0].lateCheckInStatus && !todayActivity.some(obj => Object.prototype.hasOwnProperty.call(obj, 'lateCheckInDiscription'))) {
                setLateCheckIn(true);
            }
            if (todayActivity[0].earlyCheckOutStatus && !todayActivity.some(obj => Object.prototype.hasOwnProperty.call(obj, 'earlyCheckOutDiscription'))) {
                setEarlyCheckOut(true);
            }
            if (todayActivity.some(obj => Object.prototype.hasOwnProperty.call(obj, 'checkOutTime')) && !todayActivity.some(obj => Object.prototype.hasOwnProperty.call(obj, 'workStatus'))) {
                setTodayStatus(true);
            }
            if(todayActivity[0].breaksHistory && todayActivity[0].overLimitBreakStatus === true)
            {
                setOverLimitBreak(true)
            }
        }
       
    }, [todayActivity]);

    // const success = useSelector(GeneralSelector.success(actionAttendance));
    const [attendance, setAttendance] = useState({});


    useEffect(() => {
        if (Can(actions.read, features.attendance)) {
            dispatch(AttendanceActions.getAttendances({
                user: profile._id,
                date: new Date()
            }));
        
                dispatch(ActivityActions.getUserActivity(
                    {
                        id:profile._id,
                    }
                  ))
            
        }
    }, [profile]);

    useEffect(() => {
        if (attendances.length > 0) {
            console.log("Attendeces ",attendances)
            setAttendance(attendances[0]);
            
        } else if(attendances.length === 0){
            setAttendance({});
        }
    }, [attendances]);

    useEffect(() => {
            if(!controller && attendance.checkIn) {
                setTimeout(() => {
                    if (Can(actions.read, features.attendance)) {
                        dispatch(AttendanceActions.getAttendances({
                            user: profile._id,
                            date: new Date()
                        }));
                    }
                    dispatch(GeneralActions.removeSuccess(AttendanceActions.createAttendance.type))
                },500)
                

            }
        console.log("Controller ",controller)
        
    }, [controller,lunchController]);

    const handleCheckIn = () => {
        setController(!controller)
        dispatch(AttendanceActions.createAttendance({
            user: profile._id,
            checkIn: new Date()
        }));
    };

    const handleCheckOut = () => {
        setController(!controller)
        dispatch(AttendanceActions.updateAttendance({
            id: attendance._id,
            checkOut: new Date()
        }));

        dispatch(ActivityActions.checkOutStatusUpdate({
            _id: todayActivity[0]._id,
            user:profile._id
            
        }))

    };

    function breakPopUpController(val){
        setShowBreakPop(val)
    }

    if (!Can(actions.readSelf, features.attendance)) {
        return <div> </div>; 
    } 

    return (
        <>
        <Grid item lg={6} sm={12} xs={12}>
            <Card sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <Timer color='primary' sx={{ fontSize: 100 }}/>
                <Box>
                    <Typography variant='h5' sx={{ mb: 3 }}>Your Activity Today</Typography>
                    <InfoLog>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography>Check In</Typography>
                            <Typography variant='subtitle2'>
                                {attendance.checkIn ? moment(attendance.checkIn).format('HH:mm') : '-'}
                            </Typography>
                        </Box>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography>Check Out</Typography>
                            <Typography variant='subtitle2'>
                                {attendance.checkOut ? moment(attendance.checkOut).format('HH:mm') : '-'}
                            </Typography>
                        </Box>
                    </InfoLog>
                </Box>
                {!attendance.checkOut && (
                    <Box sx={{ mt: 3 }}>
                        {!attendance.checkIn ? (
                            <Button
                                fullWidth
                                variant='contained'
                                color='success'
                                onClick={handleCheckIn}>Check In</Button>
                        ) : (
                            <>
                             {todayActivity.length > 0  && todayActivity[0].breakStatus ?(

                                <select style={{
                                    backgroundColor: 'green', // Change this to your desired color
                                    color: 'white', // Change text color if needed
                                    padding: '10px', // Add some padding
                                    borderRadius: '10px', 
                                }} value={lunchType} onChange={(e) => { 
                                    setLunchType(e.target.value) 
                                    }}>
                                        <option value="">---</option>
                                    <option value="breakOut">Break Out</option>
                                </select>
                          
                               ):(
                                
                                <select style={{
                                    backgroundColor: 'green', // Change this to your desired color
                                    color: 'white', // Change text color if needed
                                    padding: '10px', // Add some padding
                                    borderRadius: '10px', 
                                }} value={lunchType} onChange={(e) => { 
                                    setLunchType(e.target.value) 
                                    }}>
                                    <option value="">Break In</option>
                                    <option value="lunchBreak">Lunch Break</option>
                                    <option value="teaBreak">Tea Break</option>
                                    <option value="other">Other</option>
                                </select>
                                )} 
                     
                             {isLoading &&todayActivity.length === 0 ? (
                                    <TodayGoal title= "Today's Goal" task="goal"/>
                                ) : null }
                              {showBreakPop === true ? (
                                <OtherBreak openVal={true} 
                                settingFun={breakPopUpController} _id={todayActivity[0]._id}/>
                                
                                    ): null }
                                {lateCheckIn ? (
                                    <EarlyLate openVal={true} task="late" dialogTitle="Late Check In" id={todayActivity[0]._id}/>
                                ) : null}
                        
                            <Button
                                variant='contained'
                                color='error'
                                onClick={handleCheckOut}>Check Out</Button>
                            </>
                        )}
                    </Box>
                )}
                {todayStatus ? <EarlyLate openVal={true} task="status" dialogTitle="Work Status" id={todayActivity[0]._id}/> : null}
                {earlyCheckOut ? (<EarlyLate openVal={true} task="early" dialogTitle="Early Check Out" id={todayActivity[0]._id}/>) : null}
                {overLimitBreak ?(<OverLimitBreak openVal={true} id={todayActivity[0]._id}/>) : null}
            </Card>
        </Grid>

     <div className="container" style={ {textAlign:"center", backgroundColor:"white", border:"1px" }}>
                    <ProductivityChart todayActivities={todayActivity} />
       </div>

       <div className="container" style={ {textAlign:"center", backgroundColor:"white", border:"1px", width:"50%"}}>
                    <AttendanceBarChart activities = {activities}  />
       </div>

      
            </>
    )

}
