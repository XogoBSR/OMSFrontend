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

import { LeaveActions } from "slices/actions";
import moment from "moment";

function Approval() {
  const dispatch = useDispatch();
  const leaves = useSelector(LeaveSelector.getLeaves());
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
  const users = useSelector(UserSelector.getUsers());

  useEffect(() => {
    dispatch(LeaveActions.getAllLeaves());
    console.log("Leaves ", leaves);
  }, []);

  function getDateFormat(str) {
    let tmp = new Date(str);
    return `${tmp.getDate()}-${tmp.getMonth() + 1}-${tmp.getFullYear()}`;
  }

  function approveFun(val) {
    console.log(" Appove value ",val)
    dispatch(LeaveActions.updateLeave(val));
    setTimeout(() => {
      dispatch(LeaveActions.getAllLeaves());
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
        <Button style={{ borderRadius: "10px",backgroundColor: "blue" }}>Rejected</Button>
      );
    } else {
      return (
        <>
          <Button
            style={{ borderRadius: "10px" }}
            onClick={() => {
              approveFun({
                id: row._id,
                user: row.user,
                start: moment(row?.start).format("YYYY-MM-DD"),
                end: moment(row?.end).format("YYYY-MM-DD"),
                description: row.description,
                type: row.type,
                status: 0,
                updatedByAdmin: true,
                specifictype: row.specifictype
              });
            }}
          >
            Cancel
          </Button>
          <Button
            style={{ borderRadius: "10px", backgroundColor: "green" }}
            onClick={() => {
              approveFun({
                id: row._id,
                user: row.user,
                start: moment(row?.start).format("YYYY-MM-DD"),
                end: moment(row?.end).format("YYYY-MM-DD"),
                description: row.description,
                type: row.type,
                status: 1,
                updatedByAdmin: true,
                specifictype : row.specifictype
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
        Approval
      </Typography>
      <FilterBox>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="center">Leave Date</TableCell>
                <TableCell align="center">Requested Type</TableCell>
                <TableCell align="center">Discription</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leaves.map((row) => (
                <TableRow
                  key={row?.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row?.userName}
                  </TableCell>
                  <TableCell align="center">
                    {getDateFormat(row?.start)}
                  </TableCell>
                  <TableCell align="center">
                    {row?.type === "halfday" ? "Half Day" : "Full Day"}
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

export default Approval;
