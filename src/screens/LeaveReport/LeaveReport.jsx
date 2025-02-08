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
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  MenuItem,
  Select
} from "@mui/material";

import {
  NewReleases
} from "@mui/icons-material";
import styled from "@emotion/styled";
import { DefaultSort } from "constants/sort";
import { useDispatch, useSelector } from "react-redux";
import { AttendanceSelector, LeaveSelector, UserSelector } from "selectors";
import { AttendanceActions, UserActions } from "slices/actions";
import { Button } from "react-bootstrap";
import moment from "moment";
import { SettingSelector } from "selectors/SettingSelector";


// import { Button } from "react-bootstrap";

function LeaveReport() {
  const [filter, setFilter] = useState({
    sort: DefaultSort.newest.value,
    page: 1,
  });
  
    const [currentMonthSelectRange, setCurrentMonthSelectRange] = useState(new Date().getMonth());
    
    const handleChangePagination = (e, val) => {
      setFilter({
        ...filter,
        page: val,
      });
    };
    
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const pagination = useSelector(UserSelector.getPagination());
    const handleYearChange = (event) => { setCurrentYear(event.target.value); };
    let users = useSelector(UserSelector.getUsers());
    // const [users,setUsers] = useState([])
    const dispatch = useDispatch()
    const [detailsController,setDetailsController] = useState(false)
    const leaves = useSelector(LeaveSelector.getLeaves())
    const [userSelect,setUserSelected] = useState("")
    const [currentMonth,setCurrectMonth] = useState(new Date().getMonth()+1)
    const handleMonthChange = (event) => { setCurrentMonthSelectRange(event.target.value);
        setCurrectMonth(event.target.value)
     }; 
  const attendaces = useSelector(AttendanceSelector.getAttendances())
  let [daysOfMonth,setDaysOfMonth] = useState(0)
  const [workingDays,setWorkingDays] = useState(0)
  const setting = useSelector(SettingSelector.getSetting())
  useEffect(() => {
      dispatch(UserActions.getUsers()); 
      const now = new Date(currentYear,currentMonthSelectRange+1,0);
      console.log("NOW ",now)
      dispatch(AttendanceActions.getAttendancesByMonth({
        startDate: new Date(now.getFullYear(), now.getMonth(), 1),
        endDate : new Date(now.getFullYear(), now.getMonth() + 1, 0) 
      }))
      numberOfWorkingDays()
     
  },[])

  useEffect(() => {
    const now = new Date(currentYear,currentMonthSelectRange+1,0);
    console.log(" Range Changed NOW ",now)
    dispatch(AttendanceActions.getAttendancesByMonth({
      startDate: new Date(now.getFullYear(), now.getMonth(), 1),
      endDate : new Date(now.getFullYear(), now.getMonth() + 1, 0) 
    }))
    numberOfWorkingDays()
  },[currentMonthSelectRange,currentYear])
 
  const FilterBox = styled(Box)(() => ({
    width: "100%",
    marginTop: 30,
    marginBottom: 20,
    display: "flex",
    justifyContent: "space-between",
  }));

  function numberOfWorkingDays() {
    const daysOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    setDaysOfMonth(daysOfMonth);

    let workingDaysCount = 0;

    for (let i = 1; i <= daysOfMonth; i++) {
        let tempDate = new Date(currentYear, currentMonth, i);
        let dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        // Skip the specified day of the week
        if (dayOfWeek[tempDate.getDay()] !== setting.day) {
            // Check company holidays
            if (setting?.companyLeaveArr && setting?.companyLeaveArr.length > 0) {
                const isHoliday = setting.companyLeaveArr.some(element => {
                    return new Date(element.leaveDate).setHours(0, 0, 0, 0) === tempDate.setHours(0, 0, 0, 0);
                });

                // Increment the count of working days if not a holiday
                if (!isHoliday) {
                    workingDaysCount += 1;
                }
            } else {
                // Increment the count of working days if there are no company holidays
                workingDaysCount += 1;
            }
        }
    }

    setWorkingDays(workingDaysCount);
    console.log("Total Working Days:", workingDaysCount);
}

  function handleClose() {
    setDetailsController(false)
  }

  const getStatusText = (status, updatedByAdmin) => {
    if (status === 0 && updatedByAdmin) {
      return "Rejected";
    } else if (status === 1 && updatedByAdmin) {
      return "Approved";
    } else if (status === 0 && !updatedByAdmin) {
      return "Pending";
    } else {
      return null;
    }
  };

  function detailPopUp(data) {
    console.log("Detasil Pop up ",data)
    return <Dialog 
      open={detailsController}
      maxWidth="md"
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        sx: { width: '1000px', height: '400px' },
        onSubmit: (event) => {
            setDetailsController(false)
        }
      }}
    >
      <DialogTitle>Leave Details</DialogTitle>
      <DialogContent>
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                <div style={{ width: "200px", height: "100px", border: '1px solid grey', display: "flex", justifyContent: "space-evenly", alignItems: "center", flexDirection: "column" }}>
                    <div style={{ justifySelf: "center" }}>Name</div>
                    <div style={{ justifySelf: "center", fontWeight: "bold" }}>{data.name}</div>
                </div>
                <div style={{ width: "200px", height: "100px", border: '1px solid grey', display: "flex", justifyContent: "space-evenly", alignItems: "center", flexDirection: "column" }}>
                    <div style={{ justifySelf: "center" }}>Leave Taken</div>
                    <div style={{ display: "flex",  justifyContent:"space-evenly",alignItems: "center", gap:"20px" }}>
                        <div style={{display:"flex",alignItems:"center",flexDirection:"column"}}>
                        <div style={{ fontWeight: "bold", alignItems:"center" }}>0</div>
                        <div style={{ fontWeight: "bold",alignItems:"center" }}>Paid</div>
                        </div>
                        <div style={{display:"flex",alignItems:"center",flexDirection:"column"}}>
                        <div style={{ fontWeight: "bold" }}>0</div>
                        <div style={{ fontWeight: "bold" }}>Unpaid</div>
                        </div>
                    </div>
                </div>
                <div style={{ width: "200px", height: "100px", border: '1px solid grey', display: "flex", justifyContent: "space-evenly", alignItems: "center", flexDirection: "column" }}>
                    <div style={{ justifySelf: "center" }}>Leaves Pending</div>
                    <div style={{ justifySelf: "center", fontWeight: "bold" }}>0</div>
                </div>
               
            </div>
            <div style={{display:"flex",justifyContent:"space-evenly", paddingTop:"10px"}}>
              <div style={{border:"1px solid black"}}>Casual: 0</div>
              <div style={{border:"1px solid black"}}>Medical: 0</div>
              <div style={{border:"1px solid black"}}>Unpaid: 0</div>
            </div>
            <div style={{paddingTop:"20px"}}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>#</TableCell>
                      <TableCell align="center">Date</TableCell>
                      <TableCell align="center">Description</TableCell>
                      <TableCell align="center">Requested Type</TableCell>
                      <TableCell align="center">Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                            {leaves.map((row,index) => {
                              console.log("row.user:", row.user);
                              console.log("data._id:", data._id);
                              console.log("Condition:", row.user === data._id);

                              return row.user._id === data._id ? (
                                <TableRow
                                  key={row?.name}
                                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                >
                                  <TableCell component="th" scope="row">
                                    {index+1}
                                  </TableCell>
                                  <TableCell align="center">{moment(row?.start).format("DD-MM-yyyy")}</TableCell>
                                  <TableCell align="center">{row?.description}</TableCell>
                                  <TableCell align="center">{row?.type}</TableCell>
                                  <TableCell align="center">{getStatusText(row.status,row.updatedByAdmin)}</TableCell>
                                </TableRow>
                              ) : null;
                            })}
                  </TableBody>
                </Table>
            </TableContainer>
            </div>
        </DialogContent>
      <DialogActions>
        {/* <Button onClick={handleClose}>Cancel</Button> */}
        <Button type="submit">Submit</Button>
      </DialogActions>
    </Dialog>
  }

  function checkUserAttendDays(data) {
    let count = 0;
    if(attendaces) {
      //  console.log("2 Check user attendances ",data)

      attendaces.forEach(element => {
        // console.log("2 Check user attendances ",data._id,element.user)
          if(element.user === data._id) {
              count++;
          }
      });
    }
    // console.log("Count",count)
    return count;
    
  }
  

  return (
    <> 
    {detailsController ? (
      detailPopUp(userSelect)) : null}
    <Card>
    
      <Typography variant="h5" sx={{ fontWeight: 600 }}>
        Report
      </Typography>
      <Select
        value={currentMonthSelectRange}
        onChange={handleMonthChange}
      >
    {Array.from({ length: 12 }, (_, index) => (
          <MenuItem key={index} value={index}>
            {new Date(currentYear, index).toLocaleString('default', { month: 'long' })}
          </MenuItem>
        ))}
        </Select>
          <Select
                value={currentYear}
                onChange={handleYearChange}
              >
                {Array.from({ length: 101 }, (_, index) => {
                  const year = new Date().getFullYear() - 50 + index;
                  return (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  );
                })}
              </Select>
      <FilterBox>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="center">Total Working Days</TableCell>
                <TableCell align="center">Attended Days</TableCell>
                <TableCell align="center">Total Leaves</TableCell>
                <TableCell align="center">Paid</TableCell>
                <TableCell align="center">Unpaid</TableCell>
                <TableCell align="center">Other Leaves</TableCell>
                <TableCell align="center">Leaves Details</TableCell>
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
                  <TableCell align="center">{workingDays}</TableCell>
                  <TableCell align="center">{checkUserAttendDays(row)}</TableCell>
                  <TableCell align="center">{row?.availableLeaves}</TableCell>
                  <TableCell align="center">{row?.paidLeaves}</TableCell>
                  <TableCell align="center">{row?.unpaidLeaves}</TableCell>
                  <TableCell align="center">{row?.otherLeaves}</TableCell>
                  <TableCell align="center"><Button variant="contained" style={{ padding: 0 }} onClick={() => {
                     setDetailsController(true)
                    setUserSelected(row)
                  }}><NewReleases style={{ width: 24, height: 24 }} /> </Button></TableCell>
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
    </>
  );
}

export default LeaveReport;
