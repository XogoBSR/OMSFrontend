import React, { useEffect, useState } from 'react';
import PropTypes, { element } from "prop-types";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    Card,
    Grid,
    FormControl,
    Dialog,
    FormLabel,
    TextField,
    Select,
    MenuItem,
    RadioGroup,
    FormControlLabel,
    Radio
} from "@mui/material";
import PageTitle from 'components/PageTitle';
import { Button } from 'react-bootstrap';
import { productStatus } from './constant/ProductConts';
import { useDispatch, useSelector } from 'react-redux';
import { ClientActions, ProductActions } from 'slices/actions';
import { ClientSelector, UserSelector } from 'selectors';


const validationSchema = Yup.object({
    productName: Yup.string().required('Required'),
    client: Yup.string().required('Required')
});

function ProductAdd({ openValFun }) {
    const [advancedOptions, setAdvancedOptions] = useState(false);
    const dispatch = useDispatch()
    const clients = useSelector(ClientSelector.getClients())
    const[clientIndex,setClientIndex] = useState(0);
    const profile = useSelector(UserSelector.profile());
    const formik = useFormik({
        initialValues: {
            productName: "",
            startDate: "",
            endDate: "",
            priority: "",
            visibility: "private",
            reporter: profile._id,
            estimatedHours: "",
            estimatedAmount: "",
            client: ""
        },
        validationSchema,
        onSubmit: (values) => {
            console.log("Form Submitted with values:", values,clientIndex);
            handleSubmit(values);
        },
    });

    const handleSubmit = (values) => {
        console.log("Final Submission: ", values);


        let data = {
            productName : values.productName,
            startDate: values.startDate,
            endDate: values.endDate,
            priority: values.priority,
            reporter: values.reporter,
            members: values.reporter,
            estimatedAmount: values.estimatedAmount,
            estimatedHours: values.estimatedHours,
            client: clients[clientIndex]._id,
            visibility:values.visibility === "public"
        }
        dispatch(ProductActions.createProduct(data))
        openValFun(false)
    };

    useEffect(() => {
        console.log("Client Hello : ",clients)
        dispatch(ClientActions.getClients())
    },[])

    // const client

    return (
        <Dialog open={true}>
            <div style={{ padding: "10px" }}>
                <PageTitle isBack={false} title="Create New Project" />
            </div>

            <Card style={{ overflow: "scroll", padding: "20px" }}>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item lg={12}>
                            <FormControl fullWidth>
                                <FormLabel>Product</FormLabel>
                                <TextField
                                    fullWidth
                                    id="productName"
                                    name="productName"
                                    value={formik.values.productName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.productName && Boolean(formik.errors.productName)}
                                    helperText={formik.touched.productName && formik.errors.productName}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item lg={12}>
                            <FormControl fullWidth>
                                <FormLabel>Client</FormLabel>
                                <Select
                                    id="client"
                                    name="client"
                                    value={formik.values.client}
                                    onChange={(event) => {
                                        const selectedValue = event.target.value;
                                        const selectedIndex = clients.findIndex(client => client._id === selectedValue);
                                        console.log("Selected Index:", selectedIndex);
                                        setClientIndex(selectedIndex)
                                        formik.setFieldValue("client", selectedValue);
                                    }}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.client && Boolean(formik.errors.client)}
                                >
                                    {/* <MenuItem value="">None</MenuItem> */}
                                    {clients.map((element,index) => (
                                        <MenuItem key={element._id} value={element._id}>{element.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item lg={12}>
                            <FormControl fullWidth>
                                <FormLabel>Visibility</FormLabel>
                                <RadioGroup
                                    name="visibility"
                                    value={formik.values.visibility}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    <FormControlLabel value="private" control={<Radio />} label="Private" />
                                    <FormControlLabel value="public" control={<Radio />} label="Public" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>

                        <Grid item lg={12}>
                            <Button onClick={() => setAdvancedOptions(!advancedOptions)}>
                                {advancedOptions ? "Hide Advanced Options -" : "Show Advanced Options +"}
                            </Button>
                        </Grid>

                        {advancedOptions && (
                            <>
                                <Grid item lg={6}>
                                    <FormControl fullWidth>
                                        <FormLabel>Priority</FormLabel>
                                        <Select
                                            id="priority"
                                            name="priority"
                                            value={formik.values.priority}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        >
                                            {productStatus.map((status, index) => (
                                                <MenuItem key={index} value={status}>
                                                    {status}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item lg={6}>
                                    <FormControl fullWidth>
                                        <FormLabel>End Date</FormLabel>
                                        <TextField
                                            fullWidth
                                            type="date"
                                            name="endDate"
                                            value={formik.values.endDate}
                                            onChange={formik.handleChange}
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid item lg={6}>
                                    <FormControl fullWidth>
                                        <FormLabel>Estimated Hours</FormLabel>
                                        <TextField
                                            id="estimatedHours"
                                            name="estimatedHours"
                                            value={formik.values.estimatedHours}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid item lg={6}>
                                    <FormControl fullWidth>
                                        <FormLabel>Estimated Amount</FormLabel>
                                        <TextField
                                            id="estimatedAmount"
                                            name="estimatedAmount"
                                            value={formik.values.estimatedAmount}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                    </FormControl>
                                </Grid>
                            </>
                        )}

                        <Grid item lg={12} container justifyContent="flex-end">
                            <Button type="submit" variant="contained">
                                Submit
                            </Button>
                            <Button
                                type="button"
                                variant="contained"
                                onClick={() => openValFun(false)}
                                style={{ marginLeft: "10px" }}
                            >
                                Cancel
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Card>
        </Dialog>
    );
}

ProductAdd.propTypes = {
    openValFun: PropTypes.func.isRequired,
};

export default ProductAdd;
