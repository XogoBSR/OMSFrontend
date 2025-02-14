import React, { useEffect, useState } from 'react';
import { TextField, Button, MenuItem, Typography, Box, Grid, Paper, IconButton, Dialog } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { Close } from '@mui/icons-material';
import PropTypes, { element } from 'prop-types';
import { useSelector } from 'react-redux';
import { UserSelector } from 'selectors';
import { ProductActions } from 'slices/actions';


const priorities = [
    { value: 'Low', label: 'Low' },
    { value: 'Intermediate', label: 'Intermediate' },
    { value: 'High', label: 'High' },
  ];
function TaskInfoComponent({taskInfoController,data}) {


  const users = useSelector(UserSelector.getUsers())  
  const [priority, setPriority] = React.useState('Intermediate');
  const [advanceOption,setAdvanceOption] = useState(false)
  const [assigneeName,setAssigneeName] = useState("")

    useEffect(() => {
            console.log(" TASK DATA ",data)
            getUserName(data)
    },[])

    useEffect(() => {
      console.log("Assigneed Names ",assigneeName)
    },[assigneeName])

  function getUserName(arr) {
    
    let str = ""
    let result = arr.assignee.reduce((acc, data) => {
      users.filter(element => data === element._id).forEach(user => {
        str += `${user.name},`;
      });
     
      return str;
    },[])
    setAssigneeName(str)
    console.log("Got Name",result)
  }

  function getUserEmail(id) {
    let result = users.filter((element) => element._id === id)
    return result[0]?.email
  }

  async function updateTask() {

  }

  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };
    return (
 
            <Dialog open={true} sx={{display:"flex",justifyContent:"flex-end"}}>
                <div style={{display:"flex",justifyContent:"flex-end"}} onClick={taskInfoController}>
                    <Close />
                </div>
              <Paper elevation={3} style={{ padding: '20px', maxWidth: '600px' }}>
               
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Task info
                </Typography>
                </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Task Title"
                      value={data.taskTitle}
                     
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Reporter"
                      defaultValue={getUserEmail(data.reporter)}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Assignee"
                      value={assigneeName}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      select
                      fullWidth
                      label="Priority"
                      value={priority}
                      onChange={handlePriorityChange}
                    >
                      {priorities.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Assigned Time (HH)"
                      defaultValue="00"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Assigned Time (MM)"
                      defaultValue="00"
                    />
                  </Grid>
                  
                  
                  {advanceOption ? ( 
                    <>
                    <Grid item xs={3}>
                    <TextField
                      fullWidth
                      label="Start Time (MM)"
                      defaultValue="00"
                    />
                  </Grid>
                  <Grid item xs={3}>
                  <TextField
                      fullWidth
                      label="End Time (MM)"
                      defaultValue="00"
                    />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                      fullWidth
                      label="Billing Status"
                      defaultValue="00"
                    />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                      fullWidth
                      label="Task Type"
                      defaultValue="00"
                    />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                      fullWidth
                      label="Task Type"
                      defaultValue="00"
                    />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                  type='file'
                      fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" fullWidth onClick={() => { setAdvanceOption(!advanceOption) }}>
                      Hide Options -
                    </Button>
                  </Grid>
                </>

                  ) : <>
                  <Grid item xs={12}>
                    <Button variant="contained" color="primary" fullWidth onClick={() => { setAdvanceOption(!advanceOption) }}>
                      Advanced Options +
                    </Button>
                  </Grid>
                  </>}
                  <Grid item xs={6}>
                    <Button variant="outlined" fullWidth onClick={taskInfoController}>
                      Close
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button variant="contained" color="primary" fullWidth onClick={() => {
                      console.log("Update Task Called ")
                    }}>
                      Update
                    </Button>
                  </Grid>
                </Grid>
                <Box mt={2}>
                  <Typography variant="h6" gutterBottom>
                    Comments
                  </Typography>
                  <TextField
                    fullWidth
                    label="Add a comment"
                    InputProps={{
                      endAdornment: (
                        <IconButton>
                          <SendIcon />
                        </IconButton>
                      ),
                    }}
                  />
                </Box>
              </Paper>
            </Dialog>
          
      );
}

TaskInfoComponent.propTypes = {
    taskInfoController: PropTypes.func,
    data: PropTypes.object
}

export default TaskInfoComponent