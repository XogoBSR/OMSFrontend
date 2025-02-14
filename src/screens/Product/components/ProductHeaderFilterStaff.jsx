import { MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react'



function ProductHeaderFilterStaff({projects,filteredFun}) {

    const [projectName,setProjectName] = useState("")
    const [accessFilter, setAccessFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("");
    const [filteredProjects,setFilteredProjects] = useState([])
    useEffect(() => {
        console.log(" HEader filter projects : ",projects)
    },[projects])

 
  useEffect(() => {
    let tempArr = projects.filter((project) => 

        (projectName && project.productName === projectName) &&
        (accessFilter && (project.access === true ? "Public" : "Private") === accessFilter) &&
        (statusFilter && project.status === statusFilter) &&
        (priorityFilter && project.priority === priorityFilter)
      );
      setFilteredProjects(tempArr)
      console.log(" projectName , accesseFilter, statusFilter, priorityFilter  ",projectName,accessFilter,statusFilter,priorityFilter)
  },[accessFilter,statusFilter,priorityFilter,projectName])

  useEffect(() => {
    console.log(" SET FILTERED Projects Filtered Projects: ", filteredProjects);
    if(filteredProjects.length > 0) {
        filteredFun(filteredProjects)
        console.log("FIletr Function called ",filteredProjects)

    } else if(filteredProjects.length === 0 && projectName === "" && accessFilter === "" && priorityFilter === "") {
        console.log(" projectName , accesseFilter, statusFilter, priorityFilter  ",projectName,accessFilter,statusFilter,priorityFilter)
        filteredFun(projects)
    } else {
        filteredFun(filteredProjects)
    }
}, [filteredProjects]);

  return (
    <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 2,margin:"5px",marginTop:"5px",marginBottom:"5px" }}>
      <Table>
      
        <TableHead>
          <TableRow>
            <TableCell>
              <TextField
                value={projectName}
                variant="outlined"
                size="small"
                placeholder="Project Name"
                fullWidth
                onChange={(e) => setProjectName(e.target.value)}
              />
            </TableCell>
            <TableCell>
              <Select
                value={accessFilter}
                onChange={(e) => setAccessFilter(e.target.value)}
                displayEmpty
                fullWidth
                size="small"
              >
                <MenuItem value="">Access</MenuItem>
                <MenuItem value="Public">Public</MenuItem>
                <MenuItem value="Private">Private</MenuItem>
              </Select>
            </TableCell>
            <TableCell>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                displayEmpty
                fullWidth
                size="small"
              >
                <MenuItem value="">Status</MenuItem>
                <MenuItem value="Ongoing">Ongoing</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="On Hold">On Hold</MenuItem>
              </Select>
            </TableCell>
            <TableCell>
              <Select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                displayEmpty
                fullWidth
                size="small"
              >
                <MenuItem value="">Priority</MenuItem>
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Critical">Critical</MenuItem>
              </Select>
            </TableCell>
          </TableRow>
        </TableHead>

        
      </Table>
    </TableContainer>
  );
}

ProductHeaderFilterStaff.propTypes = {
    projects: PropTypes.array,
    filteredFun: PropTypes.func,
};


export default ProductHeaderFilterStaff