import { Delete, PlayCircle, StopCircle, Visibility } from '@mui/icons-material'
import { Box, Button, Card, IconButton, Pagination, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import DialogConfirm from 'components/DialogConfirm'
import { DefaultSort } from 'constants/sort'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ProductSelector, UserSelector } from 'selectors'
import { ProductActions } from 'slices/actions'
import TaskHeader from '../components/TaskHeader'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import "../../../CommonStyle/CalendarStyle/Calender.css"
import Note from '../components/Note'
import TaskInfoComponent from '../components/TaskInfoComponent'



function TaskListWithNote() {
  const products = useSelector(ProductSelector.getProducts())
  const users = useSelector(UserSelector.getUsers())
  const [taskInfo,setTaskInfo] = useState(false)
  const [pageController,setPageController] = useState("Task")
  const [currentTask,setCurrentTask] = useState(null)

  let {data} = useParams()

  function selectingUI(e) {
    let arr = document.getElementsByClassName("tab")
    for(let i =0; i<arr.length; i++) {  
        arr[i].classList.remove("selected")

    }
    e.target.classList.add("selected")
    console.log("INNER HTML ",e.target.innerText)
    switch(e.target.innerText) {
      case "Task": setPageController("Task")
                    break;
      case "Note": setPageController("Note")
                    break
      default: 
              break;
    }
    
}

function taskInfoController() {
    setTaskInfo(false)
}
    const profile = useSelector(UserSelector.profile())
    const [productData,setProductData] = useState({})
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
      if(profile) {
        dispatch(ProductActions.getProductsByUser({
            id:profile._id
        }))

      }
    },[profile])

    useEffect(() => {
      console.log("Products by  users ",products)
      const product = products.find((element) => element._id === data)
      setProductData(product)
      console.log("Data Got ",productData)
    },[products])

  
    return (
      <>
      {taskInfo ? <TaskInfoComponent taskInfoController={taskInfoController} data={currentTask}/> : null}
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100vh"}}>
        <Typography variant="h5" sx={{ fontWeight: 600, marginBottom: "20px" }}>
          {productData?.productName}
        </Typography>
     
        <Card style={{ overflow: "auto", flex: "1", padding: "20px" }}>
        <Card style={{ marginBottom: "20px" }}>
          <span style={{ display: "flex", width: "132px" }}>
            <Button className='tab selected' onClick={selectingUI}>Task</Button>
            <Button className='tab' onClick={selectingUI}>Note</Button>
          </span>
        </Card>
        {pageController === "Task" ? (
          <>
              <TaskHeader />
              <Box sx={{mt:"40px"}}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" sx={{ display: { xs: "none", sm: "table-cell" } }}>Task Name</TableCell>
                      <TableCell align="center">Assignee</TableCell>
                      <TableCell align="center">Status</TableCell>
                      <TableCell align="center">Spent/Assigned</TableCell>
                      <TableCell align="center">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {products && products.length > 0 ? (
                      products.map((data, index) => (
                        data.taskArr.map((element, index) => (
                          element.assignee.includes(profile._id) || data.visibility === true || element.reporter === profile._id ? (
                            <TableRow key={index} sx={{ "&:last-child td, &:last-child td": { border: 0 } }}>
                              <TableCell component="td" scope="row" align="center">
                                {element.taskTitle}
                              </TableCell>
                              <TableCell component="td" scope="row" align="center">
                                {element.assignee.map(assigneeId => {
                                  const user = users.find(user => user._id === assigneeId);
                                  return user ? ` ${user.name}` : null;
                                }).filter(name => name !== null)}
                              </TableCell>
                              <TableCell component="td" scope="row" align="center">
                                <IconButton onClick={() => { console.log("Icon Button ") }}>
                                  <PlayCircle />
                                </IconButton>
                                
                              </TableCell>
                              <TableCell component="td" scope="row" align="center">
                                {element?.totalHours}
                              </TableCell>
                              <TableCell component="td" scope="row" align="center">
                              <IconButton onClick={() => { 
                                setCurrentTask(element)
                                setTaskInfo(true) }}>
                                  <Visibility />
                                </IconButton>
                                <IconButton onClick={() => { console.log("Icon Button ") }}>
                                  <Delete />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ) : (
                            null
                          )
                        ))
                      ))
                    ) : (
                      <TableRow key={1}>
                        <TableCell colSpan={4} align="center" sx={{ display: { xs: "none", sm: "table-cell" } }}>No Data Found</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
                <Pagination sx={{ mt: 1 }} page={filter.page} onChange={handleChangePagination} />
              </Box>
              <DialogConfirm title="Delete Data" content="Are you sure you want to delete this data?" />
              </>
        ):(<>
              <Note/>
        </>)}
          
        </Card>
      </div>
      </>
    );
  
  
}

export default TaskListWithNote     