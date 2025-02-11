import React, { useEffect, useState } from 'react'

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    MenuItem,
    Select,
    FormControl,
    Grid,
    Box,
    Typography
  } from '@mui/material';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { TimelineActions } from 'slices/actions';
import { UserSelector } from 'selectors';
import moment from 'moment';

function TimelineRequest({startTime,endTime,addRequest,setAddRequest,fromRequest}) {
    
       const profile = useSelector(UserSelector.profile());
      const [open,setOpen] = useState(false)
      const [fromHour, setFromHour] = useState(12);
      const [fromMinute, setFromMinute] = useState(0);
      const [fromPeriod, setFromPeriod] = useState('PM');
      const [fromSeconds,setFromSeconds] = useState(0)
      const [toSeconds,setToSeconds] = useState(0)
      const [toHour, setToHour] = useState(12);
      const [toMinute, setToMinute] = useState(0);
      const [toPeriod, setToPeriod] = useState('PM');
      const [description, setDescription] = useState('');
      const [requestType, setRequestType] = useState('Productive');
      const [task, setTask] = useState('');
      const dispatch = useDispatch()

      // This is for initializing the values 
    useEffect(() => {
      
            setOpen(addRequest)
            setFromHour(startTime.getHours() === 12 ? 12 : (startTime.getHours()%12))
            // setFromHour(startTime.getHours())
            setFromMinute(startTime.getMinutes())
            setToHour(endTime.getHours() === 12 ? 12 : (endTime.getHours()%12))
            // setToHour(endTime.getHours())
            setToMinute(endTime.getMinutes())
            setFromSeconds(startTime.getSeconds())
            setToSeconds(endTime.getSeconds())
            setFromPeriod(startTime.getHours() >= 12 ? 'PM' : "AM")
            setToPeriod(endTime.getHours() >= 12 ? 'PM' : "AM")
    },[])

    useEffect(() => {
      console.log("From Time ",moment(startTime))
            console.log("End Time ",moment(endTime))
    },[])

    const PmAmSetting = (str,period) => {
        if(period === "AM") {
          return str
        } else if(period  === "PM") {
          if(str === 12) {
            return 12
          } else {
            return str + 12
          }
        }
    }


      const handleClose = () => { setAddRequest(false); };

      const makeRequestFunction = () => {

            
        if (
          (startTime.getHours() === 12 ? 12 : startTime.getHours() % 12) === fromHour &&
          startTime.getMinutes() === fromMinute &&
          (endTime.getHours() === 12 ? 12 : endTime.getHours() % 12) === toHour &&
          endTime.getMinutes() === toMinute 
        )  {
            console.log("Condirion 1 ")
            dispatch(TimelineActions.createTimelineRequest({
                fromTime: startTime ,
                toTime: endTime,
                description: description,
                task: task,
                userName: profile.name,
                requestFrom: fromRequest,
                user:profile._id
  
            }))
          } else {
            console.log("Condirion 2 ")
            dispatch(TimelineActions.createTimelineRequest({
              fromTime: new Date(new Date().setHours(PmAmSetting(fromHour,fromPeriod), fromMinute, fromSeconds, 0)),
              toTime: new Date(new Date().setHours(PmAmSetting(toHour,toPeriod), toMinute, toSeconds, 0)),
              description: description,
              task: task,
              userName: profile.name,
              requestFrom: fromRequest,
              user:profile._id

          }))
          }

            setAddRequest(false);
      }

  return (
    <>
     <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add Time Request</DialogTitle>
      <DialogContent>
        <Box mb={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Typography>From</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Select value={fromHour} onChange={(e) => setFromHour(e.target.value)}>
                      {[...Array(12).keys()].map((i) => (
                        <MenuItem key={i + 1} value={i + 1}>
                          {i + 1}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Grid item xs={4}>
                    <Select value={fromMinute} onChange={(e) => setFromMinute(e.target.value)}>
                      {[...Array(60).keys()].map((i) => (
                        <MenuItem key={i} value={i}>
                          {i < 10 ? `0${i}` : i}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Grid item xs={4}>
                    <Select value={fromPeriod} onChange={(e) => setFromPeriod(e.target.value)}>
                      <MenuItem value="AM">AM</MenuItem>
                      <MenuItem value="PM">PM</MenuItem>
                    </Select>
                  </Grid>
                </Grid>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
              <Typography>To</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Select value={toHour} onChange={(e) => setToHour(e.target.value)}>
                      {[...Array(12).keys()].map((i) => (
                        <MenuItem key={i + 1} value={i + 1}>
                          {i + 1}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Grid item xs={4}>
                    <Select value={toMinute} onChange={(e) => setToMinute(e.target.value)}>
                      {[...Array(60).keys()].map((i) => (
                        <MenuItem key={i} value={i}>
                          {i < 10 ? `0${i}` : i}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Grid item xs={4}>
                    <Select value={toPeriod} onChange={(e) => setToPeriod(e.target.value)}>
                      <MenuItem value="AM">AM</MenuItem>
                      <MenuItem value="PM">PM</MenuItem>
                    </Select>
                  </Grid>
                </Grid>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
        <Box mb={2}>
        <Typography>Description</Typography>
          <TextField
            fullWidth
            margin="normal"
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Box>
        <Box mb={2}>
          <FormControl fullWidth margin="normal">
            <Typography>Request Type</Typography>
            <Select value={requestType} onChange={(e) => setRequestType(e.target.value)}>
              <MenuItem value="Productive">Productive</MenuItem>
              <MenuItem value="Non-Productive">Non-Productive</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box mb={2}>
          <FormControl fullWidth margin="normal">
            <Typography>Task</Typography>
            <Select value={task} onChange={(e) => setTask(e.target.value)}>
              <MenuItem value="Task 1">Task 1</MenuItem>
              <MenuItem value="Task 2">Task 2</MenuItem>
              <MenuItem value="Task 3">Task 3</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" style={{ marginRight: '8px' }}>
          Close
        </Button>
        <Button onClick={makeRequestFunction} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
    </>
  )
}

TimelineRequest.propTypes = {
    startTime: PropTypes.object,
    endTime: PropTypes.object,
    addRequest: PropTypes.object,
    fromRequest: PropTypes.object,
    setAddRequest: PropTypes.func
  }


export default TimelineRequest