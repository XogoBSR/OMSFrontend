import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  Pagination,
  TableRow,
  Hidden,
  IconButton
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { DefaultSort } from "constants/sort";
import DialogConfirm from "components/DialogConfirm";
import { ClientSelector, ProductSelector, UserSelector } from "selectors";
import { ClientActions, ProductActions, UserActions } from "slices/actions";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ProductHeaderFilterStaff from "../components/ProductHeaderFilterStaff";
import { Delete, Visibility } from "@mui/icons-material";


function ProductListStaff() {
  const [filter, setFilter] = useState({
    sort: DefaultSort.newest.value,
    page: 1,
  });
  const products = useSelector(ProductSelector.getProducts());

  const profile = useSelector(UserSelector.profile());
  const users = useSelector(UserSelector.getUsers());

  const [selectedUsers, setSelectedUsers] = useState([]);
  const clients = useSelector(ClientSelector.getClients())

  const [renderedUsers, setRenderedUsers] = useState([]); 
  const [filterdArr,setFilteredArr] = useState([])

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(UserActions.getUsers())
    dispatch(ClientActions.getClients())
  }, []);

  useEffect(() => {
    if(profile) {

      dispatch(ProductActions.getProductsByUser({
          id:profile._id
      }))
    }
  },[profile])

  const history = useHistory()

  useEffect(() => {
    
    if(filterdArr.length === 0) {
      setFilteredArr(products)
      console.log("filterdArr List Staff ", filterdArr);
    }
  },[products])

  useEffect(() => {
    setRenderedUsers([...selectedUsers]); // Sync with selected users after every change
    
}, [selectedUsers]);


 function filterdDataFunciton(arr) {
          setFilteredArr(arr)
          console.log(" received filterdArr List Staff ", filterdArr);
 }

 useEffect(() => {
  console.log(" received filterdArr List Staff ", filterdArr);
 },[filterdArr])

  const handleChangePagination = (e, val) => {
    setFilter({
      ...filter,
      page: val,
    });
  };

  return (
    <>     
          <Card style={{ overflow: "scroll" }}>
          
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Projects
          </Typography>
          <ProductHeaderFilterStaff projects={products} filteredFun={filterdDataFunciton}/>
          <Box>
            <Table>
            <TableHead>
                   <TableRow>
                          <Hidden smDown>
                            <TableCell align="center">Project Name</TableCell>
                            <TableCell align="center">Total Hr</TableCell>
                            <TableCell align="center">Members</TableCell>
                            <TableCell align="center">Client</TableCell>
                            <TableCell align="center">Access</TableCell>
                            <TableCell align="center">Action</TableCell>
                            </Hidden>
                   </TableRow>
              </TableHead>
              <TableBody>
              
  
                {filterdArr&&filterdArr.length > 0 ? (filterdArr.map((data, index) => (
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
                      <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                        {data?.members.map((assigneeId) => {
                          const user = users.find((element) => assigneeId === element._id);
                          return user ? user.name : '';
                        }).join(', ')}
                      </div>
                    </TableCell>
                    <TableCell component="td" scope="row" align="center">
                    {clients.find(element => data?.client === element._id)?.name}
                    </TableCell>
                    <TableCell component="td" scope="row" align="center">
                      {data.visibility ? "Public" : "Private"}
                    </TableCell>
                    <TableCell component="td" scope="row" align="center">
                        
                        <IconButton onClick={() => {
                            
                            history.push(`/app/user/tasklist/note/${data._id}`)
                       }}>
                                                    <Visibility></Visibility>
                                                  </IconButton>
                                                  <IconButton>
                                                    <Delete></Delete>
                                                  </IconButton>
                     
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

export default ProductListStaff;
