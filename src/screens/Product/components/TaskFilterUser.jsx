import React, { useEffect, useState } from "react";
import { Grid, Select, MenuItem, FormControl, InputLabel, Button } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

import PropTypes, { element } from "prop-types";
import '../../../CommonStyle/ButtonStyle.css'


const TaskFilterUser = ({projects,filteredFun}) => {

  const [taskStatus, setTaskStatus] = useState("");
  const [project, setProject] = useState("");
  const [taskType, setTaskType] = useState("");
  const [taskPriority, setTaskPriority] = useState("");
  const [taskTags, setTaskTags] = useState("");
  const [filteredTasks,setFilteredTask] = useState([]) 

  useEffect(() => {
    console.log("Tasks Filter Projects ",projects)
  },[])

  useEffect(() => {

    let tempArr = projects.map((project) => {
    let filteredTasks = project.taskArr.filter((element) =>
      (taskStatus !== "" && element.taskStatus === taskStatus) &&
      (taskTags !== "" && element.taskTags === taskTags) &&
      (taskPriority !== "" && element.priority === taskPriority) &&
      (taskType !== ""  && element.taskType === taskType)
    );

    // ✅ Keep the project data + its filtered tasks
    return filteredTasks.length > 0 ? { ...project, taskArr: filteredTasks } : null;
  }).filter(project => project !== null);  // Remove projects with no matching tasks

    setFilteredTask(tempArr)
    
  },[taskStatus,project,taskType,taskPriority,taskTags])

  useEffect(() => {
        
        if(filteredTasks.length === 0 && taskStatus === "" && project === "" && taskType === "" && taskPriority === "" &&
         taskTags === "") {
            filteredFun(projects)
            console.log(" Filtered Data ",projects)
        } else if(filteredTasks.length > 0) {
                filteredFun(filteredTasks)
        }
        console.log("Temp Arr ",filteredTasks,taskStatus,taskTags,taskPriority,taskType)
  },[filteredTasks])

  return (
    <Grid container spacing={2} alignItems="center" sx={{ p: 2, mt: 2, mb: 2, background: "#fff", borderRadius: 2 }}>
      {/* Task Status */}
      <Grid item xs={12} sm={2}>
        <FormControl fullWidth>
          <InputLabel>Task Status</InputLabel>
          <Select value={taskStatus} onChange={(e) => setTaskStatus(e.target.value)} label="Task Status">
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Open">Pause</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      {/* Project */}
      <Grid item xs={12} sm={2}>
        <FormControl fullWidth>
          <InputLabel>Project</InputLabel>
          <Select value={project} onChange={(e) => setProject(e.target.value)} label="Project">
            <MenuItem value="">All</MenuItem>
            {projects.map((element) => 
            <MenuItem key={element.productName} value={element.productName}>{element.productName}</MenuItem>)
            }
          </Select>
        </FormControl>
      </Grid>

      {/* Task Type */}
      <Grid item xs={12} sm={2}>
        <FormControl fullWidth>
          <InputLabel>Task Type</InputLabel>
          <Select value={taskType} onChange={(e) => setTaskType(e.target.value)} label="Task Type">
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Bug">Bug</MenuItem>
            <MenuItem value="Normal">Normal</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      {/* Task Priority */}
      <Grid item xs={12} sm={2}>
        <FormControl fullWidth>
          <InputLabel>Task Priority</InputLabel>
          <Select value={taskPriority} onChange={(e) => setTaskPriority(e.target.value)} label="Task Priority">
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Critical">Critical</MenuItem>
            <MenuItem value="Intermediate">Intermediate</MenuItem>
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Trivial">Trivial</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      {/* Task Tags */}
      <Grid item xs={12} sm={2}>
        <FormControl fullWidth>
          <InputLabel>Task Tags</InputLabel>
          <Select value={taskTags} onChange={(e) => setTaskTags(e.target.value)} label="Task Tags">
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Development">Development</MenuItem>
            <MenuItem value="Meetings">Meetings</MenuItem>
            <MenuItem value="Personal">Personal</MenuItem>
            <MenuItem value="Priority">Priority</MenuItem>
            <MenuItem value="Work">Work</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      {/* Filter Button */}
      <Grid item xs={12} sm={2}>
        <Button variant="contained" color="primary" fullWidth startIcon={<FilterListIcon />}>
          Filter
        </Button>
      </Grid>
    </Grid>
  );
};

TaskFilterUser.propTypes = {
    projects: PropTypes.array,
    filteredFun: PropTypes.func
}

export default TaskFilterUser;
