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
import {ActivityActions} from "../../../slices/actions";
import { backContext } from './Backgroundprovider';


EarlyLate.propTypes = {
    openVal: PropTypes.object,
    dialogTitle: PropTypes.string,
    task: PropTypes.string,
    id: PropTypes.string
};

function EarlyLate({openVal,dialogTitle,task,id}) {

    const dispatch = useDispatch()
    const [open,setOpen] = useState(true);
    const {profile} = useContext(backContext)
    useEffect(() => { 
        setOpen(openVal)
    },[])
    const[reasone,setReasone] = useState("")
    const handleClose = async(e) => {
        e.preventDefault()
        const body = {
          reasone
        }
        setOpen(false);
    };

  return (
    <> 
    <Dialog onClick={() => { 
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
       if(reasone === ""){
        console.log("Log")
            return 
       }
       switch(task) {
            case "late":  
                          dispatch(ActivityActions.lateCheckIn({
                            _id: id,
                            user: profile._id,
                            breakStart : new Date(),
                            description:reasone,
                          
                          }))
                          break
            case "early": 
                     dispatch(ActivityActions.earlyCheckOut({
                                _id: id,
                                breakStart : new Date(),
                                description:reasone,
                                user:profile._id
                        
                        }))
                          break
          
                case "status": 
                          console.warn("Status defs fdsfsdfrdsfsdfsdfdsf")
                           {
                            const status = {
                              _id: id,
                              reasone,
                              user:profile._id
                          }
                          dispatch(ActivityActions.createTodayStatus(status))
                          break
                        }
              
            default:
                      break
       }

        handleClose(event);
      }
    }}
  >
    <DialogTitle>{dialogTitle}</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Write your reasone
      </DialogContentText>
      <TextField
        autoFocus
        required
        margin="dense"
        id="name"
        name="reasone"
        label="reasone"
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
  </Dialog>
  </>
  )
}

export default EarlyLate