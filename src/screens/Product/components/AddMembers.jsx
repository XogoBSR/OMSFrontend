import React, { useState, useEffect } from 'react';
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, InputAdornment, List, ListItem, ListItemIcon, ListItemText, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { ProductSelector, UserSelector } from 'selectors';
import { ProductActions, UserActions } from 'slices/actions';
import { Clear, Search } from '@mui/icons-material';



function AddMembers({ openVal, openValFun, productId }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const users = useSelector(UserSelector.getUsers());
  const dispatch = useDispatch();
  const product = useSelector(ProductSelector.getProductById())

  useEffect(() => {
    console.log("PRoduct Members ",product)
    if(product) {

      setSelectedUserIds(product.members)
    }
  },[product])

  useEffect(() => {
    // Fetch users or other necessary data if needed
    console.log(" PRODUCT ID ",productId)
    dispatch(UserActions.getUsers());
    dispatch(ProductActions.getProductById({id:productId}))
  }, [dispatch]);

  const handleToggle = (value) => () => {
    const currentIndex = selectedUserIds.indexOf(value);
    const newChecked = [...selectedUserIds];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setSelectedUserIds(newChecked);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const handleClose = () => {
    openValFun(false);
    console.log(" SELECTED USERS ",selectedUserIds)
    dispatch(ProductActions.updateProduct({
      id: productId,
      members: selectedUserIds
    }));
  };

  const filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <Dialog
      open={openVal}
      maxWidth="md"
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        sx: { width: '600px', height: '300px' },
        onSubmit: (event) => {
          event.preventDefault();
          handleClose(event);
        }
      }}
    >
      <DialogTitle>Members</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Add members
        </DialogContentText>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClearSearch}>
                  <Clear />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <List>
          {filteredUsers.map((user) => (
            <ListItem key={user._id} button onClick={handleToggle(user._id)}>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={selectedUserIds?.includes(user._id)}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
              <ListItemText primary={user.name} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button type="submit">Submit</Button>
        <Button onClick={() => openValFun(false)}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}

AddMembers.propTypes = {
  openVal: PropTypes.bool.isRequired,
  openValFun: PropTypes.func.isRequired,
  productId: PropTypes.string.isRequired,
};

export default AddMembers;
