import React, { useContext, useEffect, useState } from 'react';
import PropTypes from "prop-types";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityActions } from 'slices/actions';
import { ActivitySelector } from 'selectors/ActivitySelector';
import { backContext } from './Backgroundprovider';


TodayGoal.propTypes = {

  title: PropTypes.object,
  task: PropTypes.object,
};


function TodayGoal({task,title}) {

    const [todayActivity,setActivity] = useState([])
    let todayHistoryArr = useSelector(ActivitySelector.getActivityHistory()) || []
    let {profile} = useContext(backContext)
    const activities = useSelector(ActivitySelector.getActivityHistory())
    const dispatch = useDispatch()
    const [todaysGoal ,setGoal] = useState("")
    const [open,setOpen] = useState(true);

    useEffect(() => {
      if(activities.length > 0) {
          setActivity([activities[activities.length-1]])          

      }
      console.log("ACTIVITY ",profile)
  },[activities])

    const handleClose = async(e) => {
        e.preventDefault()
        
        switch(task) {
          case "goal":
                       {
                        const body = {
                          id:profile._id,
                          todaysGoal
                        }
                        dispatch(ActivityActions.createTodayGoal(body))
                        break
                      }
       
            default:
                        break
        }
        
       setOpen(false);
    };

    const isToday = (createdAt) => {
      const today = new Date();
      const createdDate = new Date(createdAt);
      return today.getFullYear()===createdDate.getFullYear() && today.getMonth()===createdDate.getMonth() && today.getDate()=== createdDate.getDate();
           
    };

  return (
    <>
    { activities.length === 0 ? <Dialog onClick={() => {
      console.warn("Clicked")
    }}
          open={open}
          maxWidth="md"
          onClose={handleClose}
          PaperProps={{
            component: 'form',
            sx: { width: '600px', height: '300px' },
            onSubmit: (event) => {
              event.preventDefault();
              handleClose(event);
            }
          }}
        >
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Write your goals
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="todaysGoal"
              label="Goals"
              type="text"
              fullWidth
              multiline
              rows={5}
              variant="standard"
              onChange={(e) => setGoal(e.target.value)} 
            />
          </DialogContent>
          <DialogActions>
            {/* <Button onClick={handleClose}>Cancel</Button> */}
            <Button type="submit">Submit</Button>
          </DialogActions>
        </Dialog> : activities.length > 0 && activities.map((value) => (
      !isToday(value.createdAt) && (
        <Dialog
          key={value.createdAt}  
          open={open}
          maxWidth="md"
          onClose={handleClose}
          PaperProps={{
            component: 'form',
            sx: { width: '600px', height: '300px' },
            onSubmit: (event) => {
              event.preventDefault();
              handleClose(event);
            }
          }}
        >
          <DialogTitle>Today Goals</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Write your goals
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="todaysGoal"
              label="Goals"
              type="text"
              fullWidth
              multiline
              rows={5}
              variant="standard"
              onChange={(e) => setGoal(e.target.value)} 
            />
          </DialogContent>
          <DialogActions>
            {/* <Button onClick={handleClose}>Cancel</Button> */}
            <Button type="submit">Submit</Button>
          </DialogActions>
        </Dialog>
      )
    ))}
  </>
  )
}

export default TodayGoal