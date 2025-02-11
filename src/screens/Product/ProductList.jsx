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
import styled from "@emotion/styled";
import FloatingButton from "components/FloatingButton";
import { useDispatch, useSelector } from "react-redux";
import { DefaultSort } from "constants/sort";
import DialogConfirm from "components/DialogConfirm";
import { ClientSelector, ProductSelector, UserSelector } from "selectors";
import { ProductActions, UserActions } from "slices/actions";
import ProductAdd from "./ProductAdd";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { AddCircle } from "@mui/icons-material";
import AddMembers from "./components/AddMembers";
import TaskHistoryAdmin from "./components/TaskHistoryAdmin";


const FilterBox = styled(Box)(() => ({
  width: "100%",
  marginTop: 30,
  marginBottom: 20,
  display: "flex",
  justifyContent: "space-between",
}));

function ProductList() {
  const [filter, setFilter] = useState({
    sort: DefaultSort.newest.value,
    page: 1,
  });
  const products = useSelector(ProductSelector.getProducts());

  const profile = useSelector(UserSelector.profile());
  const users = useSelector(UserSelector.getUsers());
  const [productPop, setProductPop] = useState(false);

  const [selectedUsers, setSelectedUsers] = useState([]);
//   const [selectedIndices, setSelectedIndices] = useState([]);
  const clients = useSelector(ClientSelector.getClients())

  const [renderedUsers, setRenderedUsers] = useState([]); 
  const [productUpdate,setProductUpdate] = useState(false)
  const [product,setProduct] = useState(null)
  const [addMemeber,setAddMember] = useState(false)
  const [currentProduct,setCurrectProduct] = useState(null)


  const dispatch = useDispatch();

  useEffect(() => {
    
    dispatch(UserActions.getUsers())
    dispatch(ProductActions.getProducts())
  }, []);

  const history = useHistory()

  useEffect(() => {
    console.log("Products Product List ", products);
  },[products])

  useEffect(() => {
    setRenderedUsers([...selectedUsers]); // Sync with selected users after every change
    
}, [selectedUsers]);

function addMemberController(str) {
    setAddMember(str)
}

//   const handleChangeFilter = ({ target }) => {
//     const { name, value } = target;

//     setFilter({
//       ...filter,
//       [name]: value,
//     });
//   };

 function productAddControllerFun(str) {
  setProductPop(str)
 }

  const handleChangePagination = (e, val) => {
    setFilter({
      ...filter,
      page: val,
    });
  };

  const deleteProduct = (id) => {
    dispatch(ProductActions.deleteProduct({
      id
    }))
  }


  return (
    <>
      {addMemeber ? <AddMembers openVal={addMemeber} openValFun={addMemberController} productId={currentProduct}/>:null}
      {productUpdate ? (<TaskHistoryAdmin />) : (
          <Card style={{ overflow: "scroll" }}>
          {productPop ? (
            <ProductAdd openValFun={productAddControllerFun}/>
          ) : null}
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Projects
          </Typography>
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
                      <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                        {data?.members.map((assigneeId) => {
                          const user = users.find((element) => assigneeId === element._id);
                          return user ? user.name : '';
                        }).join(', ')}
                         <IconButton 
                              onClick={() => {
                                setCurrectProduct(data._id)
                                setAddMember(true) }} 
                              // style={{ position: "relative", zIndex: 9999 }}
                          >
                              <AddCircle />
                          </IconButton>

                      </div>
                    </TableCell>
                    <TableCell component="td" scope="row" align="center">
                    {clients.find(element => data?.client === element._id)?.name}
                    </TableCell>
                    <TableCell component="td" scope="row" align="center">
                      {data.visibility ? "Public" : "Private"}
                    </TableCell>
                    <TableCell component="td" scope="row" align="center">
             
                          <Button style={{ backgroundColor: "green", color: "white", marginRight: 1 }} onClick={() => {
                              // setProductUpdate(true)
                              // setProduct(data)
                              history.push(`/app/project/update/${data._id}`)
                          }}>
                            Update
                          </Button>
                          <Button style={{ backgroundColor: "red", color: "white", marginRight: 1 }} onClick={() => {
                            deleteProduct(data._id)
                          }} >Delete</Button>
                  
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
  
          {profile?.role.includes("admin") ? (
            <FloatingButton onClick={() => setProductPop(true)} />
          ) : null}
  
          <DialogConfirm
            title="Delete Data"
            content="Are you sure want to delete this data?"
          />
        </Card>
      )}
      
    </>
  );
}

export default ProductList;
