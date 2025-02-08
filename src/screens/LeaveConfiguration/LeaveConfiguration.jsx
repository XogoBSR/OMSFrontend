import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TableContainer,
  Paper,
  Pagination,
  Grid,
  Button,
  DialogContentText,
  DialogContent,
  Dialog,
  DialogActions,
  DialogTitle,
  TextField,
} from "@mui/material";
import styled from "@emotion/styled";
import { DefaultSort } from "constants/sort";
import { useDispatch, useSelector } from "react-redux";
import { UserSelector } from "selectors";

// import { Button } from '@mui/material'
import "../../CommonStyle/CalendarStyle/Calender.css"; // Import CSS for styling

import { SettingActions, UserActions } from "slices/actions";
import { SettingSelector } from "selectors/SettingSelector";


function LeaveConfiguration() {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({
    sort: DefaultSort.newest.value,
    page: 1,
  });

  const handleChangePagination = (e, val) => {
    setFilter({
      ...filter,
      page: val,
    });
  };

  const pagination = useSelector(UserSelector.getPagination());
  const users = useSelector(UserSelector.getUsers());

  const [userLeavePage, setUserLeave] = useState(true);
  const [companyPage, setCompanyLeave] = useState(false);
  const [addCompanyLeave, setAddCompanyLeave] = useState(false);
  const setting = useSelector(SettingSelector.getSetting())
  const [leaveDescription, setDescription] = useState("")
  const [companyLeaveDate, setCompamnyLeaveDate] = useState("")
  const [availableLeave, setAvailableLeave] = useState("")
  const [companyLeaveData,setCompamnyLeaveData] = useState([])
  const [selectedUserForLeave,setSelectedUserForLeave]  = useState("")
  const [userLeaveController,setUserLeaveController] = useState(false)
  const [userDefaultController,setUserDefaultController] = useState(false)
 
  useEffect(() => { 

    console.log("Reload")
    dispatch(UserActions.getUsers()); 
    dispatch(SettingActions.getSetting())
  }, 
    []);
    
    

    useEffect(() => {
        if(setting.companyLeaveArr) {
          setCompamnyLeaveData(setting.companyLeaveArr.map((element) => element))
        }
    },[setting])

  const FilterBox = styled(Box)(() => ({
    width: "100%",
    marginTop: 30,
    marginBottom: 20,
    display: "flex",
    justifyContent: "space-between",
  }));

  const handleSubmit = (event) => {
   
    event.preventDefault();
    let obj = {
        leaveAvailable: availableLeave,
    };
    console.log("Available Leaves selected Id", selectedUserForLeave);
    dispatch(
        UserActions.updateUserLeaves({
            id: selectedUserForLeave,
            body: JSON.stringify(obj),
        })
    );

    setTimeout(() => {
      dispatch(UserActions.getUsers()); 
    },1000)
    
    // setUserLeaveController(false);
};

  return (
    <>
   
    {userLeaveController ? (
            <Dialog
            open={userLeaveController}
            onClose={() => {
              
              setUserLeaveController(false)
            }}
            maxWidth="md"
            PaperProps={{
                component: 'form',
                sx: { width: '380px', height: '250px' },
                onSubmit: handleSubmit,
            }}
        >
            <DialogTitle>{"Update Leave"}</DialogTitle>
            <DialogContent>
                <Typography>Overwrite total available leaves of the user</Typography>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    name="availableLeaves"
                    label="Available Leaves"
                    type="text"
                    variant="standard"
                    value={availableLeave} // Bind the value to the state
                    onChange={(e) => setAvailableLeave(e.target.value)} // Update the state on change
                />
            </DialogContent>
            <DialogActions>
                <Button
                    type="button" // Explicitly mark this as a non-submit button
                    onClick={() => {
                      dispatch(UserActions.getUsers())
                      setUserLeaveController(false)
                    }
                    }
                    color="primary"
                    autoFocus
                >
                    Cancel
                </Button>
                <Button
                    type="submit" // Explicitly mark this as the submit button
                    color="primary"
                    autoFocus
                >
                    Submit
                </Button>
            </DialogActions>
        </Dialog>) : null}
        {userDefaultController ? (
            <Dialog
            open={userDefaultController}
            onClose={() => {
              
              setUserDefaultController(false)
            }}
            maxWidth="md"
            PaperProps={{
                component: 'form',
                sx: { width: '380px', height: '250px' },
                onSubmit: handleSubmit,
            }}
        >
            <DialogTitle>{"Update Leave"}</DialogTitle>
            <DialogContent>
                <Typography>It will be allow default leaves to user which provided by the company</Typography>
            </DialogContent>
            <DialogActions>
                <Button
                    type="button" // Explicitly mark this as a non-submit button
                    onClick={() => {
                      
                      setUserDefaultController(false)
                    }
                    }
                    color="primary"
                    autoFocus
                >
                    Cancel
                </Button>
                <Button
                    type="submit" // Explicitly mark this as the submit button
                    color="primary"
                    autoFocus
                >
                    Ok
                </Button>
            </DialogActions>
        </Dialog>) : null}
      {userLeavePage && !companyPage ? (
        <Card>
          
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Configuration
          </Typography>
          <span
            style={{
              width: "250px",
              height: "40px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              className="tab selected"
              onClick={() => {
                setUserLeave(true);
                setCompanyLeave(false);
              }}
            >
              User Leaves
            </Button>
            <Button
              className="tab"
              onClick={() => {
                setUserLeave(false);
                setCompanyLeave(true);
              }}
            >
              Company Leaves
            </Button>
          </span>
          <FilterBox>
           
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="center">Total Leaves</TableCell>
                    <TableCell align="center">Leaves Taken</TableCell>
                    <TableCell align="center">Available Leaves</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((row) => (
                    <TableRow
                      key={row?.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row?.name}
                      </TableCell>
                      <TableCell align="center">{row?.totalLeaves}</TableCell>
                      <TableCell align="center">{row?.leaveTaken}</TableCell>
                      <TableCell align="center">
                        {row?.availableLeaves}
                      </TableCell>
                      <TableCell align="center">
                        <div
                          style={{
                            display: "flex",
                            justifySelf: "center",
                            gap: "10px",
                          }}
                        >
                          <Button style={{ borderRadius: "10px", backgroundColor:"blue",color:"white" }} onClick={() => {
                            setSelectedUserForLeave(row._id)
                            setUserLeaveController(true)
                          }}>Edit</Button>
                          <Button
                            style={{
                              borderRadius: "10px",
                              backgroundColor: "green",
                              color:"white"
                            }}
                            onClick={() => {
                              // dispatch(UserActions.updateUserLeaves({
                                console.log("Available Leaves selected Id", row._id);
                                setSelectedUserForLeave(row._id)
                                setAvailableLeave("14")
                                setUserDefaultController(true);
                              // }))
                            }}
                          >
                            Default
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </FilterBox>
          <Pagination
            sx={{ mt: 1 }}
            page={filter.page}
            count={pagination.pages}
            onChange={handleChangePagination}
          />
        </Card>
      ) : (
        <Card>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Configuration
          </Typography>
          <span
            style={{
              width: "250px",
              height: "40px",
              display: "flex",
              justifyContent: "space-between",
              position: "absolute",
              right: "50px",
            }}
          >
            <Button
              style={{ backgroundColor: "#7229D9", color: "white" }}
              onClick={() => {
                dispatch(SettingActions.deleteAllCompanyLeave({
                  id : setting._id,
                }))
              }}
            >
              Delete all
            </Button>
            <Button
              style={{ backgroundColor: "#7229D9", color: "white" }}
              onClick={() => {
                setAddCompanyLeave(true);
              }}
            >
              Add company leaves
            </Button>
          </span>
          <span
            style={{
              width: "250px",
              height: "40px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              className="tab"
              onClick={() => {
                setUserLeave(true);
                setCompanyLeave(false);
              }}
            >
              User Leaves
            </Button>
            <Button
              className="tab selected"
              onClick={() => {
                setUserLeave(false);
                setCompanyLeave(true);
              }}
            >
              Company Leaves
            </Button>
          </span>
          <FilterBox>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Sr No</TableCell>
                    <TableCell align="center">Date</TableCell>
                    <TableCell align="center">Description</TableCell>
                    <TableCell align="center">Users</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {companyLeaveData.map((row,index) => (
                    <TableRow
                      key={row?.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {index+1}
                      </TableCell>
                      <TableCell align="center">{`${new Date(row?.leaveDate).getDate()}-${new Date(row?.leaveDate).getMonth()+1}-${new Date(row?.leaveDate).getFullYear()}`}</TableCell>
                      <TableCell align="center">{row?.description}</TableCell>
                      <TableCell align="center">
                        --
                      </TableCell>
                      <TableCell align="center">
                        <div
                          style={{
                            display: "flex",
                            justifySelf: "center",
                            gap: "10px",
                          }}
                        >
                          <Button style={{ borderRadius: "10px",color:"white",backgroundColor:"blue" }}>Edit</Button>
                          <Button
                            style={{
                              borderRadius: "10px",
                              backgroundColor: "green",
                              color:"white"
                            }}
                          >
                            Default
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </FilterBox>
          <Dialog
            open={addCompanyLeave}
            onClose={() => {
              setAddCompanyLeave(false);
            }}
            maxWidth="md" 
            PaperProps={{
              component: 'form',
              sx: { width: '600px', height: '250px' },
              onSubmit : (event) => {
                console.log(" Submit ")
                event.preventDefault()
                let obj = {
                  leaveDate:companyLeaveDate,
                  description: leaveDescription
                }
                dispatch(SettingActions.addCompanyLeave({
                  id : setting._id,
                  body: JSON.stringify(obj)
                }))
                setAddCompanyLeave(false)
              }
            }}
            >
            <DialogTitle>{"Add company leave"}</DialogTitle>
            <DialogContent style={{display:"flex", flexDirection:'column', gap:"15px"}}>
              <TextField
               autoFocus
               required
               margin="dense"
               name="companyDescription"
               label="Leave Description"
               type="text"
               fullWidth
               multiline
               rows={1}
               variant="standard"
               placeholder="Leave Description"
               onChange={(e) => {
                setDescription(e.target.value)
              }}
              ></TextField>
             
              <TextField
               autoFocus
               required
               margin="normal"
               name="leaveDate"
               type="date"
               fullWidth
               variant="standard"
               onChange={(e) => {
                setCompamnyLeaveDate(e.target.value)
              }}
              ></TextField>
            
            </DialogContent>

            <DialogActions>
              <Button
                onClick={() => {
                  setAddCompanyLeave(false);
                }}
                color="primary"
                autoFocus
              >
                Cancel
              </Button>
              <Button
                type="submit"
                color="primary"
                autoFocus
              >
                Submit
              </Button>
            </DialogActions>
          </Dialog>
          <Pagination
            sx={{ mt: 1 }}
            page={filter.page}
            count={pagination.pages}
            onChange={handleChangePagination}
          />
        </Card>
      )}
    </>
  );
}
export default LeaveConfiguration;
