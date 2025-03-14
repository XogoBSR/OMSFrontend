import React, { useEffect, useState } from 'react'

import {
    Box,
    Card,
    Grid,
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
import { PlayCircle, StopCircle } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { ProductSelector, UserSelector } from 'selectors';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import ProductHeader from './components/ProductHeader';


const FilterBox = styled(Box)(() => ({
    width: "100%",
    marginTop: 30,
    marginBottom: 20,
    display: "flex",
    justifyContent: "space-between",
  }));

function TaskHistoryAdmin() {

    const {data}  = useParams()
    const products = useSelector(ProductSelector.getProducts())
    const [product,setProduct] = useState([])
    const dispatch = useDispatch()
    const users = useSelector(UserSelector.getUsers())
    const [filter, setFilter] = useState({
        sort: DefaultSort.newest.value,
        page: 1,
    });

    useEffect(() => {
      console.log(" NAVIGATE PRODUCT ",data,products)
      setProduct(products.filter((element) => element._id === data))
    },[])

      useEffect(() => {
        console.log("Product Got ",product)
        setProduct(products.filter((element) => element._id === data))
      },[products])

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
              {product[0]?.productName}
            </Typography>
            
            <Box>
            {/* <span style={{display:"flex",width:"350px", justifyContent:"space-between" , flexWrap:"wrap"}}>
            <Button>Task</Button>
            <Button>Settings</Button>
            <Button>Overview</Button>
            <Button>Note</Button>
          </span> */}
          </Box>
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
                
    
                  {product[0]?.taskArr?.length > 0 ? (product[0].taskArr.map((data, index) => (
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
                            0/{product[0].totalHours}
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