import React, { useEffect, useState } from 'react';
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


OverLimitBreak.propTypes = {
   
    id: PropTypes.string,
    openVal: PropTypes.object
};

function OverLimitBreak({id,openVal}) {

    const [todayActivity,setActivity] = useState([])
    const todayHistoryArr = useSelector(ActivitySelector.getActivityHistory())
    const activities = useSelector(ActivitySelector.getActivityHistory())
    const dispatch = useDispatch()
    const [reasone ,setReasone] = useState("")
    const [open,setOpen] = useState(true);
    useEffect(() => { 
        setOpen(openVal)
    },[])
    useEffect(() => {
      if(activities.length > 0) {
          setActivity([activities[activities.length-1]])          

      }
  },[activities])

    const handleClose = async(e) => {
        e.preventDefault()
        setOpen(false);
    };

    const isToday = (createdAt) => {
      const today = new Date();
      const createdDate = new Date(createdAt);
      return today.getFullYear()===createdDate.getFullYear() && today.getMonth()===createdDate.getMonth() && today.getDate()=== createdDate.getDate();
           
    };

  return (
    <>
    {todayHistoryArr.length === 0 ? <Dialog onClick={() => {
      console.warn("Clicked")
    }}
          open={open}
          maxWidth="md"
          onClose={handleClose}
          PaperProps={{
            component: 'form',
            sx: { width: '600px', height: '300px' },
            onSubmit: (event) => {
              console.log("Over Limit Submission ")
                    event.preventDefault();
                    handleClose(event);
                      dispatch(ActivityActions.overLimitBreakRed({
                               _id:id,
                               description:reasone,
                        }))
                  }
          }}
        >
          <DialogTitle>Over Time Break</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Write your reasone
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="todaysGoal"
              label="Reasone"
              type="text"
              fullWidth
              multiline
              rows={5}
              variant="standard"
              onChange={(e) => setReasone(e.target.value)} 
            />
          </DialogContent>
          <DialogActions>
            {/* <Button onClick={handleClose}>Cancel</Button> */}
            <Button type="submit">Submit</Button>
          </DialogActions>
        </Dialog> : todayHistoryArr.map((value) => (
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
              console.log("Over Limit Submission ")
                    event.preventDefault();
                    handleClose(event);
                      dispatch(ActivityActions.overLimitBreakRed({
                               _id:id,
                               description:reasone,
                        }))
                  }
          }}
        >
          <DialogTitle>Over Time Break</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Write your reasone
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="todaysGoal"
              label="Reasone"
              type="text"
              fullWidth
              multiline
              rows={5}
              variant="standard"
              onChange={(e) => setReasone(e.target.value)} 
            />
          </DialogContent>
          <DialogActions>
            <Button type="submit">Submit</Button>
          </DialogActions>
        </Dialog>
      )
    ))}
  </>
  )
}

export default OverLimitBreak