import React, { useEffect, useState } from 'react'

import {
    Box,
    Card,
    Grid,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableHead,
    Pagination,
    TableRow,
    Hidden,
    Typography,
    Button,
    IconButton
  } from "@mui/material";

import styled from "@emotion/styled";
import DialogConfirm from 'components/DialogConfirm';
import { DefaultSort } from 'constants/sort';
import PropTypes, { element } from 'prop-types';
import ProductHeader from './ProductHeader';
import { useLocation } from "react-router-dom";
import { PlayCircle, StopCircle } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { ProductSelector, UserSelector } from 'selectors';
import { ProductActions } from 'slices/actions';


const FilterBox = styled(Box)(() => ({
    width: "100%",
    marginTop: 30,
    marginBottom: 20,
    display: "flex",
    justifyContent: "space-between",
  }));

function TaskHistoryAdmin() {

    const location = useLocation()

    const { data } = location.state || {};

    const product = useSelector(ProductSelector.getProductById())

    const dispatch = useDispatch()

    const users = useSelector(UserSelector.getUsers())

    const [filter, setFilter] = useState({
        sort: DefaultSort.newest.value,
        page: 1,
    });

    useEffect(() => {
      console.log(" NAVIGATE PRODUCT ",data)
      dispatch(ProductActions.getProductById({
            id:data._id
          }))
    },[])

      useEffect(() => {
        console.log("Product Got ",product)
      },[product])

    const handleChangePagination = (e, val) => {
        setFilter({
          ...filter,
          page: val,
        });
      };

      const handleChangeFilter = ({ target }) => {
        const {name, value} = target;

        setFilter({
            ...filter,
            [name]: value
        });
    }


    return (
        <>
          <Card style={{ overflow: "scroll" }}>
          
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              {data.productName}
            </Typography>
          <FilterBox>
                      <Grid container spacing={10} justifyContent="space-between">
                          <Grid item lg={11} sm={12} xs={12}>
                            <ProductHeader product={product} />
                          </Grid>
                      </Grid>
                  </FilterBox>
         
            <Box>
              <Table>
              <TableHead>
                     <TableRow>
                            <Hidden smDown>
                              <TableCell align="center">Task Name</TableCell>
                              <TableCell align="center">Assignee</TableCell>
                              <TableCell align="center">Status</TableCell>
                              <TableCell align="center">Spent/Assigned</TableCell>
                              <TableCell align="center">Action</TableCell>
                              </Hidden>
                     </TableRow>
                </TableHead>
                <TableBody>
                
    
                  {product?.taskArr?.length > 0 ? (product.taskArr.map((data, index) => (
                    <TableRow
                      sx={{ "&:last-child td, &:last-child td": { border: 0 } }}
                      key={index}
                    >
                      <TableCell component="td" scope="row" align="center" >
                        {data.taskTitle}
                      </TableCell>
                      <TableCell component="td" scope="row" align="center">
                      {data?.assignee.map((assigneeId) => {
                        const user = users.find((element) => assigneeId === element._id);
                        return user ? user.name : '';
                      }).join(', ')}

                      </TableCell>
                      <TableCell component="td" scope="row" align="center">
                        <IconButton>
                          <PlayCircle/>
                        </IconButton>
                        <IconButton>
                          <StopCircle/>
                        </IconButton>
                      </TableCell>
                      <TableCell component="td" scope="row" align="center">
                            0/{product.totalHours}
                      </TableCell>
                      <TableCell component="td" scope="row" align="center">

                      <Button style={{ backgroundColor: "green", color: "white", marginRight: 1 }} onClick={() => {
                       
                            }}>
                              Update
                            </Button>
                            <Button style={{ backgroundColor: "red", color: "white", marginRight: 1 }} >Delete</Button>
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
            <DialogConfirm
              title="Delete Data"
              content="Are you sure want to delete this data?"
            />
          </Card>
        </>
      );
}


export default TaskHistoryAdmin