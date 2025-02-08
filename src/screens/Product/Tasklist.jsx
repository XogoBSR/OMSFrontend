import { Box, Button, Card, Hidden, Pagination, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import DialogConfirm from 'components/DialogConfirm';
import FloatingButton from 'components/FloatingButton';
import { DefaultSort } from 'constants/sort';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ProductSelector, UserSelector } from 'selectors';
import { ProductActions } from 'slices/actions';
import TaskHeader from './components/TaskHeader';


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
        dispatch(ProductActions.getProductsByUser({
            id:profile._id
        }))
    },[])

    useEffect(() => {
        console.log("Products by  users ",products)
    },[products])

  return (
    <Card style={{ overflow: "scroll" }}>
        
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Tasks list
          </Typography>
          <TaskHeader/>
          <Box>
            <Table>
            <TableHead>
                   <TableRow>
                          <Hidden smDown>
                            <TableCell align="center">Task Name</TableCell>
                            <TableCell align="center">Project Type</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="center">Total Hours</TableCell>
                            <TableCell align="center">Total Spent</TableCell>
                            </Hidden>
                   </TableRow>
              </TableHead>
              <TableBody>
              
  
                {products&&products.length > 0 ? (products.map((data, index) => (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child td": { border: 0 } }}
                    key={index}
                  >
                    <TableCell component="td" scope="row" align="center" >
                      {data.productName}
                    </TableCell>
                    <TableCell component="td" scope="row" align="center">
                      {data?.totalHours}
                    </TableCell>
                    <TableCell component="td" scope="row" align="center">
                      {data.visibility ? "Public" : "Private"}
                    </TableCell>
                  </TableRow>
                ))):(
                    <TableRow>
                              <TableCell colSpan={6} align="center">No Data Found</TableCell>
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
  
          {/* {profile?.role.includes("admin") ? (
            <FloatingButton onClick={() => setProductPop(true)} />
          ) : null} */}
  
          <DialogConfirm
            title="Delete Data"
            content="Are you sure want to delete this data?"
          />
        </Card>
  )
}

export default Tasklist