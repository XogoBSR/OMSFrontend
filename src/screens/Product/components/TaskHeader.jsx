
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UserSelector } from 'selectors'


function TaskHeader() {
    const [task,setTask] = useState("")
    const [userSelect,setUserSelect] = useState("")
    const dispatch = useDispatch()
    const users = useSelector(UserSelector.getUsers())
    useEffect(() => {
        console.log("Task Creat Users ",users)
    },[])

  

    const handleChangeUser = (event) => {
        const selectedID = event.target.value;
        const user = users.find((element) => selectedID === element._id);
        setUserSelect(user.name);
      };
    
      const updateProductFunction = () => {

      }


  return (
    <div style={{display:"flex", justifyContent:"space-between",margin:"15px"}} >
        <TextField style={{width:"650px"}} placeholder="Enter Task" value={task} onChange={(e) => { setTask(e.target.value) }}></TextField>
               
    <FormControl style={{width:"300px"}}>
                <InputLabel id="user">Type</InputLabel>
                <Select
                    labelId="user"
                    id="user"
                    value={userSelect}
                    label="Users"
                    name="name"
                    onChange={handleChangeUser}
                    >
                   {users.map((element,index) => (
                    <MenuItem value={element} key={element.id}>{element.name}</MenuItem>
                   ))} 
                    
                </Select>
                
    </FormControl>
    <FormControl style={{width:"300px"}}>
                <InputLabel id="user">Type</InputLabel>
                <Select
                    labelId="user"
                    id="user"
                    value={userSelect}
                    label="Users"
                    name="name"
                    onChange={handleChangeUser}
                    >
                   {users.map((element,index) => (
                    <MenuItem value={element} key={element.id}>{element.name}</MenuItem>
                   ))} 
                    
                </Select>
                
    </FormControl>
    <Button style={{backgroundColor:"#7229d9" ,color:"white",width:"100px"}} onClick={updateProductFunction}>Add</Button>
   </div>
  )
}

export default TaskHeader