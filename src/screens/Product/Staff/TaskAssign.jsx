import React from 'react'
import {
    Box,
    Card,
    Grid,
    MenuItem,
    FormControl,
    Select,
    Button,
    Dialog,
    Chip,
    Typography
  } from "@mui/material";

function TaskAssign() {
  return (
    <div><Dialog open={true}>
    <div style={{ padding: "10px" }}>
      <PageTitle isBack={false} title={`Projects`} />
    </div>

    <Card style={{ overflow: "scroll" }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item lg={6}>
            <FormControl fullWidth>
              <Typography variant="caption">Project Name</Typography>
              <Input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
              ></Input>
            </FormControl>
          </Grid>
          <Grid item lg={6}>
            <FormControl fullWidth>
              <Typography variant="caption">Project Title</Typography>
              <Input
                type="text"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
              ></Input>
            </FormControl>
          </Grid>
          <Grid item lg={6}>
            <FormControl fullWidth>
              <Typography variant="caption">Users</Typography>
              <Select
                    style={{overflow:"hidden"}}
                    multiple
                    value={selectedUsers} // This must be an array
                    onChange={handleUserChange}
                    renderValue={(selected) => (
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                            {selected.map((name, i) => (
                                <Chip key={i} label={name} />
                            ))}
                        </Box>
                    )}
                >
                    {users.map((user, index) => (
                        <MenuItem key={index} value={user.name}>
                            {user.name}
                        </MenuItem>
                    ))}
                </Select>

              
            </FormControl>
          </Grid>
          <Grid item lg={6}>
            <Input
              fullWidth
              label="Start Date"
              type="date"
              name="start"
              defaultValue={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item lg={6}>
            <Input
              fullWidth
              label="End Date"
              type="date"
              name="end"
              defaultValue={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item lg={12} sx={6}>
            <Input
              multiline
              rows={5}
              label="Description"
              name="description"
              defaultValue={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </Grid>
          <Grid item lg={6}>
            <SelectField
              label="Status"
              name="status"
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
              }}
            >
              {productStatus.map((e) => (
                <MenuItem key={e} value={e}>
                  {e}
                </MenuItem>
              ))}
            </SelectField>
          </Grid>
          <Grid item lg={6}>
            <Input
              type="file"
              label="Attachement"
              name="attachement"
              onChange={(e) => {
                selectedFile(e.target.files[0]);
              }}
            />
          </Grid>
          <Grid item lg={6}>
            <FormControl fullWidth>
              <Typography variant="caption">Task Tags</Typography>
              <Select
                labelId="tag-label"
                multiple
                value={taskTags}
                onChange={(e) => setTaskTags(e.target.value)}
                renderValue={(selected) => selected.join(", ")}
              >
                {taskTagsArr.map((e) => (
                  <MenuItem value={e} key={e}>
                    {e}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid
            item
            lg={12}
            spacing={2}
            container
            justifyContent="flex-end"
          >
            <Grid item>
              <Button type="submit" color="primary" variant="contained">
                Submit
              </Button>
            </Grid>
            <Grid item>
              <Button
                type="button"
                color="primary"
                variant="contained"
                onClick={() => {
                  openFun();
                }}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Card>
  </Dialog></div>
  )
}

export default TaskAssign