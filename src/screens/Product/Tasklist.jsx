import { Box, Card, Hidden, IconButton, Pagination, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import DialogConfirm from 'components/DialogConfirm';
import { DefaultSort } from 'constants/sort';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ProductSelector, UserSelector } from 'selectors';
import { ProductActions } from 'slices/actions';
import TaskHeader from './components/TaskHeader';
import {PlayCircle, StopCircle } from '@mui/icons-material';
import styled from '@emotion/styled';
import TaskFilterUser from './components/TaskFilterUser';
import '../../CommonStyle/ButtonStyle.css'

const FilterBox = styled(Box)(() => ({
  width: "100%",
  marginTop: 30,
  marginBottom: 20,
  display: "flex",
  justifyContent: "space-between"
}));

function Tasklist() {

    const products = useSelector(ProductSelector.getProducts())
    const profile = useSelector(UserSelector.profile())
    const dispatch = useDispatch()
    const [filteredData,setFilteredData] = useState([])
    
       const [filter, setFilter] = useState({
            sort: DefaultSort.newest.value,
            page: 1
        });

        useEffect(() => {
          console.log("Profile ",profile)
        },[])

    const handleChangePagination = (e, val) => {
            setFilter({
                ...filter,
                page: val
            });
    };

    useEffect(() => {
      console.log("Error Products ",filteredData)
    },[filteredData])

    useEffect(() => {
      if(profile) {
        dispatch(ProductActions.getProductsByUser({
            id:profile._id
        }))
      }
    },[profile])

    useEffect(() => {
        console.log("Products by  users ",products)
        if(filteredData.length === 0) {
          if(products.length > 0) {

            setFilteredData(products)
          }
        }
    },[products])

    function filteredFun(arr) {
      console.log(" Receiving Filter DATA ",arr)
        setFilteredData(arr)
    }

  return (
    <div style={{display:"flex", justifyContent:"center", flexDirection:"column",gap:"5px"}}>
    <Typography variant="h5" sx={{ fontWeight: 600 }}>
            My Tasks
          </Typography>
    <Card style={{padding: "10px"  }}>
          <TaskHeader/>
         {!profile.role.includes("admin") ? (<TaskFilterUser projects={products} filteredFun={filteredFun}/>) : null} 
      </Card>
      <div style={{display:"flex",gap:"4px"}}>
        <button  className='tab'>Today</button>
        <button className='tab'>Overdue</button>
        <button className='tab'>Upcoming</button>
        <button className='tab'>Completed</button>
      </div>
      <Card style={{padding: "10px"  }}> 
          <Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ display: { xs: "none", sm: "table-cell" } }}>Task Name</TableCell>
                <TableCell align="center">Project Name</TableCell>
                <TableCell align="center">Actions</TableCell>
                <TableCell align="center">Total Spent</TableCell>
                <TableCell align="center">Total Hours</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData && filteredData.length > 0 ? (
                filteredData.map((data, index) => (
                  
                  data.taskArr.map((element,index) => (
                    element.assignee.includes(profile._id) || data.visibility === true || element.reporter === profile._id ? (  // ✅ Correct conditional rendering
                      <TableRow
                        sx={{ "&:last-child td, &:last-child td": { border: 0 } }}
                        key={index}
                      >
                        <TableCell component="td" scope="row" align="center">
                          {element.taskTitle}
                        </TableCell>
                        <TableCell component="td" scope="row" align="center">
                          {data.productName}
                        </TableCell>
                        <TableCell component="td" scope="row" align="center">
                          <IconButton onClick={() => { console.log("Icon Button ") }}>
                            <PlayCircle/>
                          </IconButton>
                          <IconButton onClick={() => { console.log("Icon Button ") }}>
                            <StopCircle/>
                          </IconButton>
                        </TableCell>
                        <TableCell component="td" scope="row" align="center">
                          {element?.totalHours}
                        </TableCell>
                        <TableCell component="td" scope="row" align="center">
                          {element.totalSpent}
                        </TableCell>
                      </TableRow>
                    ):(null)
                   ))
                  
                ))
              ) : (
                <TableRow key={1}>
                  <TableCell colSpan={4} align="center" sx={{ display: { xs: "none", sm: "table-cell" } }}>No Data Found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

            <Pagination
              sx={{ mt: 1 }}
              page={filter.page}
              onChange={handleChangePagination}
            />
          </Box>
  
          <DialogConfirm
            title="Delete Data"
            content="Are you sure want to delete this data?"
          />
        </Card>
        </div>
  )
}

export default Tasklist