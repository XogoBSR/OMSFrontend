import React, {useEffect, useState,useMemo} from "react";
import PropTypes from "prop-types";
import { Button} from "@mui/material";
import {ActivityActions} from "../../../slices/actions";
import {useDispatch, useSelector} from "react-redux";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';

BreakReasone.propTypes = {
    openVal: PropTypes.object,
    settingFun: PropTypes.func,
    _id: PropTypes.object
};

function BreakReasone({openVal,settingFun,_id}) {

    const dispatch = useDispatch()
    
    const [open,setOpen] = useState(true);
    useEffect(() => { 
        setOpen(openVal)
    },[])
    
    const[reasone,setReasone] = useState("")
    const handleClose = async(e) => {
        e.preventDefault()
        settingFun(false)
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
        handleClose(event);
          dispatch(ActivityActions.breakStartRed({
                    _id: _id,
                     breakStart : new Date().setMilliseconds(0),
                     description:reasone,
                     type: "other" 
            }))
      }
    }}
  >
    <DialogTitle>Other Break</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Write your reasone
      </DialogContentText>
      <TextField
        autoFocus
        required
        margin="dense"
        id="name"
        name="otherReaseone"
        label="other"
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

export default BreakReasone