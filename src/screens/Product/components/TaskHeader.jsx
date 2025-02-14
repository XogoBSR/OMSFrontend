import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
  } from "@mui/material";
  import React, { useEffect, useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { ProductSelector, UserSelector } from "selectors";
  import { ProductActions, UserActions } from "slices/actions";
  


  function TaskHeader() {
    const [task, setTask] = useState("");
    const [userSelected, setUserSelected] = useState("");
    const [projectSelected, setProjectSelected] = useState("");
    const [projectMembers, setProjectMembers] = useState([]);
    const dispatch = useDispatch();
    const users = useSelector(UserSelector.getUsers());
    const projects = useSelector(ProductSelector.getProducts());
    const profile = useSelector(UserSelector.profile());
    useEffect(() => {
      dispatch(UserActions.getUsers()); // Fetch users on mount
    }, [dispatch]);
  
    useEffect(() => {
      if (projects.length > 0) {
        // Set default project if not selected
        if (!projectSelected) {
          setProjectSelected(projects[0]._id);
        }
      }
    }, [projects]);
  
    useEffect(() => {
      if (projectSelected) {
        const selectedProject = projects.find((p) => p._id === projectSelected);
        if (selectedProject) {
          // Filter users who are part of the selected project
          const filteredUsers = users.filter((user) =>
            selectedProject.members.includes(user._id)
          );
          setProjectMembers(filteredUsers);
        } else {
          setProjectMembers([]); // Reset if no project found
        }
      }
    }, [projectSelected, projects, users]);
  
    const handleChangeProject = (event) => {
      setProjectSelected(event.target.value);
    };
  
    const handleChangeUser = (event) => {
      setUserSelected(event.target.value);
    };
  
    const updateProjectFunction = () => {
      console.log("Updating Task:", {
        projectID: projectSelected,
        task,
        assignee: userSelected,
        reporter: profile._id,
      });

      dispatch(ProductActions.createProductsTaskByUser({
        id: projectSelected,
        taskTitle: task,
        assignee: userSelected,
        reporter: profile._id,
      }))
    };
  
    return (
     
        <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 2,margin:"5px",marginTop:"5px",marginBottom:"5px" }}>
          <Table>
      <TableHead>
        <TableRow>
          <TableCell>
        <TextField
          style={{ width: "400px" }}
          placeholder="Enter Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        </TableCell>
  
        {/* User Select */}
        <TableCell>
        <FormControl style={{ width: "200px" }}>
          <InputLabel id="user">User</InputLabel>
          <Select
          label="User"
            labelId="user"
            id="user"
            value={userSelected || ""}
            onChange={handleChangeUser}
            renderValue={(selectedId) => {
              const selectedUser = projectMembers.find((u) => u._id === selectedId);
              return selectedUser ? selectedUser.name : "Select User";
            }}
          >
            {projectMembers.length > 0 ? (
              projectMembers.map((element) => (
                <MenuItem value={element._id} key={element._id}>
                  {element.name}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>No Members Available</MenuItem>
            )}
          </Select>
        </FormControl>
        </TableCell>
  
        {/* Project Select */}
        <TableCell>
        <FormControl style={{ width: "200px" }}>
          <InputLabel id="project">Project</InputLabel>
          <Select
            label="Project"
            labelId="project"
            id="project"
            value={projectSelected || ""}
            onChange={handleChangeProject}
            renderValue={(selectedId) => {
              const selectedProject = projects.find((p) => p._id === selectedId);
              return selectedProject ? selectedProject.productName : "Select Project";
            }}
          >
            {projects.map((element) => (
              <MenuItem value={element._id} key={element._id}>
                {element.productName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        </TableCell>
  
        {/* Add Button */}
        <TableCell>
        <Button
          style={{ backgroundColor: "#7229d9", color: "white", width: "100px" }}
          onClick={updateProjectFunction}
        >
          Add
        </Button>
        </TableCell>
        </TableRow>
        </TableHead>
        </Table>
      </TableContainer>
    );
  }
  
  export default TaskHeader;
  