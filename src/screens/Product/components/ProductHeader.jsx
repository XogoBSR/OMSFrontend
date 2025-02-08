import React, { useEffect, useState } from 'react'
import { PlayCircle } from "@mui/icons-material";
import {
    FormControl,
    TextField, InputLabel,Button,
    Select,
    MenuItem
} from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { ProductActions, UserActions } from 'slices/actions';
import { UserSelector } from 'selectors';
import PropTypes, { element } from 'prop-types';



function ProductHeader({product}) {

    const [task,setTask] = useState("")
    const dispatch = useDispatch()
    const users = useSelector(UserSelector.getUsers())
    const [selectedUserIds, setSelectedUserIds] = useState([]);

    const filteredData = users.filter((element) => product.members?.includes(element._id))

    const profile = useSelector(UserSelector.profile())

    useEffect(() => {
        console.log("Task Creat Users ",product)
        dispatch(UserActions.getUsers())
    },[])

    useEffect(() => {
     console.log(" USer Selected ",selectedUserIds)   
    },[selectedUserIds])

    const handleChange = (event) => {
        const selectedID = event.target.value;
        setSelectedUserIds(selectedID);
        console.log("SelectedID",selectedID)
      };

    const updateProductFunction = () => {
        dispatch(ProductActions.createProductsTask({
            id: product._id,
            taskTitle: task,
            assignee: selectedUserIds,
            reporter: profile._id
        }))
    }
    
  return (
    <div style={{display:"flex", justifyContent:"space-between"}} >
        <TextField style={{width:"650px"}} placeholder="Enter Task" value={task} onChange={(e) => { setTask(e.target.value) }}></TextField>
               
    <FormControl style={{width:"300px"}}>
                <InputLabel id="demo-simple-select-label">User</InputLabel>
                <Select
                    labelId="user-label"
                    id="user"
                    multiple
                    value={selectedUserIds}
                    onChange={handleChange}
                    label="Users"
                    renderValue={(selected) => selected.map((id) => users.find((element) => element._id === id).name).join(', ')}
                >
                    {filteredData.map((element) => (
                    <MenuItem key={element._id} value={element._id}>
                        {element.name}
                    </MenuItem>
                    ))}
                </Select>
    </FormControl>
    <Button style={{backgroundColor:"#7229d9" ,color:"white",width:"100px"}} onClick={updateProductFunction}>Add</Button>
   </div>
  )
}

ProductHeader.propTypes = {
    product: PropTypes.object
};

export default ProductHeader