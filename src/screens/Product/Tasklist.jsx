import { Box, Button, Card, Hidden, IconButton, Pagination, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import DialogConfirm from 'components/DialogConfirm';
import { DefaultSort } from 'constants/sort';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ProductSelector, UserSelector } from 'selectors';
import { ProductActions } from 'slices/actions';
import TaskHeader from './components/TaskHeader';
import { PauseCircle, PlayCircle, StopCircle } from '@mui/icons-material';
import styled from '@emotion/styled';


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
       const [filter, setFilter] = useState({
            sort: DefaultSort.newest.value,
            page: 1
        });

        const handleChangePagination = (e, val) => {
            setFilter({
                ...filter,
                page: val
            });
        };

    useEffect(() => {
      if(profile) {
        dispatch(ProductActions.getProductsByUser({
            id:profile._id
        }))

      }
    },[profile])

    useEffect(() => {
        console.log("Products by  users ",products)
    },[products])

  return (
    <Card style={{ overflow: "scroll" , padding: "20px"  }}>
        
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Tasks list
          </Typography>
          <TaskHeader/>
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
              {products && products.length > 0 ? (
                products.map((data, index) => (
                  
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
                    ):(<TableRow sx={{ "&:last-child td, &:last-child td": { border: 0 } }}
                    key={index}><TableCell component="td" scope="row" align="center" colSpan={4}>
                      No Data Found
                    </TableCell></TableRow>)
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
  )
}

export default Tasklist