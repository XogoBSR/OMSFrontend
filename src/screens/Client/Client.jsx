import React, { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Card, CardContent, Typography, Dialog, DialogTitle,
  DialogContent, DialogActions, Button, TextField,
  Box
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { ClientSelector } from "selectors";
import { ClientActions } from "slices/actions";
import FloatingButton from "components/FloatingButton";
import styled from "styled-components";


const FilterBox = styled(Box)(() => ({
    width: "100%",
    marginTop: 30,
    marginBottom: 20,
    display: "flex",
    justifyContent: "space-between",
  }));

function Client() {
  const [clientAddPop, setClientAddPop] = useState(false);
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const dispatch = useDispatch();
  const clients = useSelector(ClientSelector.getClients())
  const [updateClientPop,setUpdateClientPop] = useState(false)
  const [clientID,setClientID] = useState("")
  const [updateClientName,setUpdatedClientName] = useState("") 
  const [updateClientOrganization,setUpdateClientOrganization] = useState("") 
  const handleClose = () => {
    setClientAddPop(false);
    setName("");
    setOrganization("");
  };
  useEffect(() => {
    dispatch(ClientActions.getClients())
  },[])

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    console.log("Submitted Values:", name, organization);

    dispatch(ClientActions.createClient({ name, organization }));
    handleClose();
  };

  const updateClient = (data) => {
    setClientID(data._id)
    setUpdatedClientName(data.name)
    setUpdateClientOrganization(data.organization)
    setUpdateClientPop(true)
    console.log("UPDATE CLIENT POP" , updateClientPop)
  }

  const updateClientSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    const id = clientID
    const payload = {
        name: updateClientName,
        organization: updateClientOrganization
    }
    dispatch(ClientActions.updateClient({id,payload}))
  }

  return (
    <>
      {clientAddPop && (
        <Dialog
          open={clientAddPop}
          maxWidth="md"
          onClose={handleClose}
          PaperProps={{
            component: "form",
            sx: { width: "600px", height: "300px" },
            onSubmit: handleSubmit, // Direct function call for cleaner code
          }}
        >
          <DialogTitle>Client Add</DialogTitle>
          <DialogContent>
            <Typography>Client Name</Typography>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              type="text"
              fullWidth
              variant="standard"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Typography>Client Organization</Typography>
            <TextField
              required
              margin="dense"
              id="organization"
              name="organization"
              type="text"
              fullWidth
              variant="standard"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button type="submit">Submit</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      )}

      {updateClientPop && (
        <Dialog
        open={updateClientPop}
        maxWidth="md"
        onClose={handleClose}
        PaperProps={{
          component: "form",
          sx: { width: "600px", height: "300px" },
          onSubmit: updateClientSubmit, // Direct function call for cleaner code
        }}
      >
        <DialogTitle>Update Client</DialogTitle>
        <DialogContent>
          <Typography>Client Name</Typography>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="updateClientName"
            type="text"
            fullWidth
            variant="standard"
            value={updateClientName}
            onChange={(e) => setUpdatedClientName(e.target.value)}
          />
          <Typography>Client Organization</Typography>
          <TextField
            required
            margin="dense"
            id="organization"
            name="updateClientOrganization"
            type="text"
            fullWidth
            variant="standard"
            value={updateClientOrganization}
            onChange={(e) => setUpdateClientOrganization(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button type="submit">Submit</Button>
          <Button onClick={() => setUpdateClientPop(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
      )}

      <Card>
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Clients
          </Typography>
          <FilterBox>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableCell align="center"><strong>Sr No</strong></TableCell>
                  <TableCell align="center"><strong>Name</strong></TableCell>
                  <TableCell align="center"><strong>Organization</strong></TableCell>
                  <TableCell align="center"><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clients.length > 0 ? (
                  clients.map((row, index) => (
                      <TableRow
                           key={row?.name}
                           sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">{row.name}</TableCell>
                      <TableCell align="center">{row.organization}</TableCell>
                      <TableCell align="center">
                        <Button style={{ backgroundColor: "green", color: "white", marginRight: 1 }} onClick={() => {
                            // setUpdateClientPop(true)
                            updateClient(row)
                        }}>
                          Update
                        </Button>
                        <Button style={{ backgroundColor: "red", color: "white", marginRight: 1 }} 
                        onClick={() => { dispatch(ClientActions.deleteClient(row._id)) }}>Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center">No Data Found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </FilterBox>
        </CardContent>
        <FloatingButton onClick={() => setClientAddPop(true)} />
      </Card>
    </>
  );
}

export default Client;
