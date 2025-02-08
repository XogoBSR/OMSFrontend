import React, { useEffect } from "react";
import {
    Box,
    Button,
    Card,
    Grid,
    MenuItem,
    TextField,
    FormControl,
    InputLabel,
    Select,
    Typography,
} from "@mui/material";
import PageTitle from "components/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import moment from "moment";
import { ExpensesSelector, GeneralSelector, UserSelector } from "selectors";
import { ExpensesActions, GeneralActions } from "slices/actions";
import { toast } from "react-toastify";
import FormSkeleton from "../../components/Skeleton/FormSkeleton";

const STATUS = {
    pending: "Pending",
    paid: "Paid",
};

export default function FormExpenses() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const expense = useSelector(ExpensesSelector.getExpensesById());
    const loading = useSelector(GeneralSelector.loader(ExpensesActions.getExpenseById.type));
    const profile = useSelector(UserSelector.profile());
    const actions = [ExpensesActions.createExpense.type, ExpensesActions.updateExpense.type];
    const success = useSelector(GeneralSelector.success(actions));

    useEffect(() => {
        if (success.length > 0) {
            const action = success.find((item) => actions.includes(item.action));
            toast.success(action?.message || "Success", {
                position: "top-right",
                autoClose: 3000,
                closeOnClick: true,
                pauseOnHover: false,
                pauseOnFocusLoss: false,
            });
            dispatch(GeneralActions.removeSuccess(actions));
        }
    }, [success, actions, dispatch]);

    useEffect(() => {
        if (id) {
            dispatch(ExpensesActions.getExpenseById(id));
        }
    }, [id, dispatch]);

    const validationSchema = yup.object({
        name: yup.string().required("Name is required"),
        amount: yup.number().typeError("Amount must be a number").required("Amount is required"),
        from: yup.string().required("Purchase from is required"),
        status: yup.string().required("Status is required"),
    });

    const formik = useFormik({
        initialValues: {
            name: expense?.name ?? "",
            amount: expense?.amount ?? "",
            date: expense?.date ? moment(expense?.date).format("yyyy-MM-DD") : "",
            from: expense?.from ?? "",
            status: expense?.status ?? "",
        },
        enableReinitialize: true,
        validateOnChange: true,
        validationSchema,
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    const handleSubmit = (values) => {
        if (profile) {
            values.date = new Date(values.date);
            values.createdBy = profile._id;
            if (id) {
                values.id = id;
                dispatch(ExpensesActions.updateExpense(values));
            } else {
                dispatch(ExpensesActions.createExpense(values));
            }
        }
    };

    return (
        <Box>
            <PageTitle isBack={true} title={`${id ? "Update" : "Create"} Expense`} />

            {loading ? (
                <FormSkeleton />
            ) : (
                <Card sx={{ padding: 3 }}>
                    <form onSubmit={formik.handleSubmit}>
                        <Grid container spacing={3}>
                            {/* Name Input */}
                            <Grid item lg={6} sm={12} xs={12}>
                                <TextField
                                    label="Name"
                                    name="name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
                                    fullWidth
                                />
                            </Grid>

                            {/* Amount Input */}
                            <Grid item lg={6} sm={12} xs={12}>
                                <TextField
                                    label="Amount"
                                    name="amount"
                                    type="number"
                                    value={formik.values.amount}
                                    onChange={formik.handleChange}
                                    error={formik.touched.amount && Boolean(formik.errors.amount)}
                                    helperText={formik.touched.amount && formik.errors.amount}
                                    fullWidth
                                />
                            </Grid>

                            {/* Date Input */}
                            <Grid item lg={6} sm={12} xs={12}>
                                <TextField
                                    label="Purchase At"
                                    type="date"
                                    name="date"
                                    value={formik.values.date}
                                    onChange={formik.handleChange}
                                    error={formik.touched.date && Boolean(formik.errors.date)}
                                    helperText={formik.touched.date && formik.errors.date}
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>

                            {/* Purchase From Input */}
                            <Grid item lg={6} sm={12} xs={12}>
                                <TextField
                                    label="Purchase From"
                                    name="from"
                                    value={formik.values.from}
                                    onChange={formik.handleChange}
                                    error={formik.touched.from && Boolean(formik.errors.from)}
                                    helperText={formik.touched.from && formik.errors.from}
                                    fullWidth
                                />
                            </Grid>

                            {/* Status Select */}
                            <Grid item lg={6} sm={12} xs={12}>
                                <FormControl fullWidth error={formik.touched.status && Boolean(formik.errors.status)}>
                                    <InputLabel>Status</InputLabel>
                                    <Select
                                        name="status"
                                        value={formik.values.status}
                                        onChange={formik.handleChange}
                                    >
                                        {Object.keys(STATUS).map((key) => (
                                            <MenuItem key={key} value={key}>
                                                {STATUS[key]}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {formik.touched.status && formik.errors.status && (
                                        <Typography variant="body2" color="error">
                                            {formik.errors.status}
                                        </Typography>
                                    )}
                                </FormControl>
                            </Grid>

                            {/* Submit Button */}
                            <Grid item lg={12} container justifyContent="flex-end">
                                <Button type="submit" color="primary" variant="contained">
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Card>
            )}
        </Box>
    );
}
