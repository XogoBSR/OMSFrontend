import React, {useEffect} from "react";
import {
    Box,
    Button,
    Card, Dialog, FormControl,
    Grid, InputBase,
    MenuItem,Typography,
    TextField
} from "@mui/material";
import PageTitle from "../../components/PageTitle";
import {useDispatch, useSelector} from "react-redux";
import * as yup from "yup";
import {useFormik} from "formik";
import {useParams} from "react-router-dom";
import moment from "moment";
import {GeneralSelector, LeaveSelector, UserSelector} from "../../selectors";
import {GeneralActions, LeaveActions, UserActions} from "../../slices/actions";
import Input from "../../components/Input";
import SelectField from "../../components/SelectField";
import {toast} from "react-toastify";
import {LeaveStatus, LeaveTypes, LeaveSpecificType,HalfDayType} from "../../constants/leaveConst";
import {Autocomplete} from "@mui/lab";
import FormSkeleton from "../../components/Skeleton/FormSkeleton";
import PropTypes from "prop-types";


export default function FormLeavePop({openFun}) {
    const { id } = useParams();
    const dispatch = useDispatch();
    const leave = useSelector(LeaveSelector.getLeaveById());
    const loading = useSelector(GeneralSelector.loader(LeaveActions.getLeaveById.type));
    const users = useSelector(UserSelector.getUsers());
    const profile = useSelector(UserSelector.profile());
    const actions = [
        LeaveActions.createLeave.type,
        LeaveActions.updateLeave.type
    ];
    const success = useSelector(GeneralSelector.success(actions));

    useEffect(() => {
        if (success.length > 0) {
            const action = success.find(item => actions.includes(item.action));

            toast.success(`${action?.message ?? "Success"}`, {
                    position: "top-right",
                    autoClose: 3000,
                    closeOnClick: true,
                    pauseOnHover: false
                });
            // if (action.action === LeaveActions.createLeave.type) {
            //
            //     dispatch(goBack());
            // }
            dispatch(GeneralActions.removeSuccess(actions));
            openFun()
        }
    }, [success]);

    // useEffect(() => {
    //     // dispatch(UserActions.getUsers());

    //     if (id) {
    //         dispatch(LeaveActions.getLeaveById(id));
    //     }
    // }, []);

    const validationSchema = yup.object({
        user: yup.object().required('Employee is required'),
        start: yup.string().required('Start date is required'),
        end: yup.string().required("End date from is required"),
        type: yup.string().required("Type is required"),
    });

    const formik = useFormik({
        initialValues: {
            // user: leave?.user ? users?.find(e => e._id === leave.user) : "",
            user: profile?.name ?? "",
            start: leave?.start ? moment(leave?.start).format("yyyy-MM-DD") : "",
            end: leave?.end ? moment(leave?.end).format("yyyy-MM-DD") : "",
            description: leave?.description ?? "",
            type: leave?.type ?? "",
            status: leave?.status ?? 0,
            specifictype: leave?.leavetype ?? "",
            halfdaytype: leave?.halfdaytype ?? ""
        },
        enableReinitialize: true,
        validateOnChange: true,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            handleSubmit(values);
            // openFun()
        }
    });

    const handleSubmit = (values) => {
        if (profile) {
            if (id) {
                values.id = id;
                dispatch(LeaveActions.updateLeave(values));
            } else {
                dispatch(LeaveActions.createLeave(values));
            }
        }
        // openFun()
    };

    useEffect(() => {
        console.log(" Leave FORM PROFILE ",profile)
    },[profile,dispatch])

    return (
        <Dialog open={true}>
            <div style={{padding:"10px"}}>
            <PageTitle isBack={false} title={`${id ? "Update" : "Create"} Leave`}/>
            </div>
            {loading ? (
                <FormSkeleton/>
            ) : (
                <Card style={{overflow:"scroll"}}>
                    <form onSubmit={formik.handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item lg={6}>
                                <FormControl fullWidth>
                                    <Typography variant='caption'>Employee</Typography>
                                    <Autocomplete
                                        disablePortal
                                        name='user'
                                        options={users}
                                        value={formik.values.user}
                                        onChange={(e, val) => {
                                            formik.setFieldValue('user', val);
                                        }}
                                        
                                        error={formik.touched.user && Boolean(formik.errors.user)}
                                        helperText={formik.touched.user && formik.errors.user}
                                        getOptionLabel={(option) => option.name ?? ''}
                                        renderOption={(props, option) => (
                                            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                            {option.name === profile.name ? option.name : ""}
                                            </Box>
                                        )}
                                        renderInput={(params) => <TextField {...params} />}
                                        />

                                </FormControl>
                            </Grid>
                            <Grid item lg={6}>
                                <SelectField
                                    label="Type"
                                    name="type"
                                    value={formik.values.type}
                                    onChange={formik.handleChange}
                                    error={formik.touched.type && Boolean(formik.errors.type)}
                                    helperText={formik.touched.type && formik.errors.type}>
                                    {Object.keys(LeaveTypes).map(key => (
                                        <MenuItem key={key} value={key}>{LeaveTypes[key].name}</MenuItem>
                                    ))}
                                </SelectField>
                            </Grid>
                            <Grid item lg={6}>
                                <Input
                                    fullWidth
                                    label="Start Date"
                                    type="date"
                                    name="start"
                                    defaultValue={formik.values.start}
                                    onChange={formik.handleChange}
                                    error={formik.touched.start && Boolean(formik.errors.start)}
                                    helperText={formik.touched.start && formik.errors.start}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}/>
                            </Grid>
                            <Grid item lg={6}>
                                <Input
                                    fullWidth
                                    label="End Date"
                                    type="date"
                                    name="end"
                                    defaultValue={formik.values.end}
                                    onChange={formik.handleChange}
                                    error={formik.touched.end && Boolean(formik.errors.end)}
                                    helperText={formik.touched.end && formik.errors.end}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}/>
                            </Grid>
                            <Grid item lg={12} sx={12}>
                                <Input
                                    multiline
                                    rows={5}
                                    label="Description"
                                    name="description"
                                    defaultValue={formik.values.description}
                                    onChange={formik.handleChange}
                                    error={formik.touched.description && Boolean(formik.errors.description)}
                                    helperText={formik.touched.description && formik.errors.description}
                                    />
                            </Grid>
                            <Grid item lg={6}>
                                <SelectField
                                    label="Status"
                                    name="status"
                                    value={formik.values.status}
                                    onChange={formik.handleChange}
                                    error={formik.touched.status && Boolean(formik.errors.status)}
                                    helperText={formik.touched.status && formik.errors.status}>
                                    {/* {Object.keys(LeaveStatus).map(key => (
                                        <MenuItem key={key} value={key}>{LeaveStatus[key]}</MenuItem>
                                    ))} */}
                                    <MenuItem key={0} value={0}>Pending Approve
                                    </MenuItem>
                                </SelectField>
                            </Grid>
                            <Grid item lg={6}>
                                <SelectField
                                    label="Leave Type"
                                    name="specifictype"
                                    value={formik.values.specifictype}
                                    onChange={formik.handleChange}
                                    error={formik.touched.specifictype && Boolean(formik.errors.specifictype)}
                                    helperText={formik.touched.specifictype && formik.errors.specifictype}>
                                    {Object.keys(LeaveSpecificType).map(key => (
                                        <MenuItem key={key} value={key}>{LeaveSpecificType[key].name}</MenuItem>
                                    ))}
                                </SelectField>
                            </Grid>
                            {formik.values.type === "halfday" ? (
                                <Grid item lg={6}>
                                <SelectField
                                    label="Half Leave Type"
                                    name="halfdaytype"
                                    value={formik.values.halfdaytype}
                                    onChange={formik.handleChange}
                                    error={formik.touched.halfdaytype && Boolean(formik.errors.halfdaytype)}
                                    helperText={formik.touched.halfdaytype && formik.errors.halfdaytype}>
                                    {Object.keys(HalfDayType).map(key => (
                                        <MenuItem key={key} value={key}>{HalfDayType[key].name}</MenuItem>
                                    ))}
                                </SelectField>
                            </Grid>
                            ):null}
                            
                            <Grid item lg={12} spacing={2} container justifyContent="flex-end">
                                <Grid item>
                                <Button
                                    type="submit"
                                    color="primary"
                                    variant="contained">
                                    Submit
                                </Button>
                                </Grid>
                                <Grid item>
                                <Button
                                    type="button"
                                    color="primary"
                                    variant="contained" 
                                    onClick={() => {
                                        openFun()
                                        
                                    }}>
                                    Cancel
                                </Button>
                                </Grid>
                            </Grid>
                            
                        </Grid>
                    </form>
                </Card>
            )}
        </Dialog>
    )
}

FormLeavePop.propTypes = {
    openFun: PropTypes.func
}