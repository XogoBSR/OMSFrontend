import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TableContainer,
  Paper,
  Pagination,
  Grid,
} from "@mui/material";
import styled from "@emotion/styled";
import { DefaultSort } from "constants/sort";
import { useDispatch, useSelector } from "react-redux";
import { LeaveSelector, UserSelector } from "selectors";
import { Button } from "react-bootstrap";

import { TimelineActions } from "slices/actions";
import moment from "moment";
import { TimelineSelector } from "selectors/TimelineSelector";

function TimeRequest() {
  const dispatch = useDispatch();
  const requests = useSelector(TimelineSelector.getTimelineRequests());
  const [filter, setFilter] = useState({
    sort: DefaultSort.newest.value,
    page: 1,
  });
  const handleChangePagination = (e, val) => {
    setFilter({
      ...filter,
      page: val,
    });
  };

  const pagination = useSelector(UserSelector.getPagination());

  useEffect(() => {
    dispatch(TimelineActions.getTimelineRequests())
    console.log("Request  ", requests);
  }, []);

  function getDateFormat(str) {
    let tmp = new Date(str);
    return `${tmp.getDate()}-${tmp.getMonth() + 1}-${tmp.getFullYear()}`;
  }

  function statusUpdateFun(val) {
 
    dispatch(TimelineActions.updateTimelineRequest(val));
    setTimeout(() => {
      dispatch(TimelineActions.getTimelineRequests());
    },1000)
  }

  const FilterBox = styled(Box)(() => ({
    width: "100%",
    marginTop: 30,
    marginBottom: 20,
    display: "flex",
    justifyContent: "space-between",
  }));

  const renderButton = (row) => {
    if (row?.updatedByAdmin) {
      return row.status === 1 ? (
        <Button style={{ borderRadius: "10px",backgroundColor: "green" }}>Approved</Button>
      ) : (
        <Button style={{ borderRadius: "10px",backgroundColor: "red" }}>Rejected</Button>
      );
    } else {
      return (
        <>
          <Button
            style={{ borderRadius: "10px" }}
            onClick={() => {
              statusUpdateFun({
                id: row._id,
                status: 0,
                updatedByAdmin: true
                
              });
            }}
          >
            Cancel
          </Button>
          <Button
            style={{ borderRadius: "10px", backgroundColor: "green" }}
            onClick={() => {
              statusUpdateFun({
                id: row._id,
                status: 1,
                updatedByAdmin: true,
                fromTime:row.fromTime,
                toTime:row.toTime,
                requestFrom: row.requestFrom
              });
            }}
          >
            Approve
          </Button>
        </>
      );
    }
  };
  

  return (
    <Card>
      <Typography variant="h5" sx={{ fontWeight: 600 }}>
        Time Request
      </Typography>
      <FilterBox>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="center">Requested From</TableCell>
                <TableCell align="center">Requested Date</TableCell>
                <TableCell align="center">Time Range</TableCell>
                <TableCell align="center">Description</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requests.map((row) => (
                <TableRow
                  key={row?.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row?.userName}
                  </TableCell>
                  <TableCell align="center">
                    {row.requestFrom}
                  </TableCell>
                  <TableCell align="center">
                    {getDateFormat(row.fromTime)}
                  </TableCell>
                  <TableCell align="center">
                    {row?.task}
                  </TableCell>
                  <TableCell align="center">{row?.description}</TableCell>
                  <TableCell align="center">
                    <div
                      style={{
                        display: "flex",
                        justifySelf: "center",
                        gap: "10px",
                      }}
                    >
                      {renderButton(row)}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </FilterBox>
      <Pagination
        sx={{ mt: 1 }}
        page={filter.page}
        count={pagination.pages}
        onChange={handleChangePagination}
      />
    </Card>
  );
}

export default TimeRequest;
