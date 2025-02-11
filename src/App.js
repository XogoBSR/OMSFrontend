import React from "react";
import './App.css';
import Routes from "./routes";
import {ThemeProvider} from "@mui/material";
import theme from "./theme";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {ConnectedRouter} from "connected-react-router";
import {history} from "./store";
import Backgroundprovider from 'screens/Dashboard/components/Backgroundprovider';

export default function App() {
  return (
             <Backgroundprovider>
             <ThemeProvider theme={theme}>
               <ToastContainer aautoClose={3000} 
         position="top-right" 
         hideProgressBar 
         theme="light"/>
               <ConnectedRouter history={history}>
                 <Routes/>
               </ConnectedRouter>
             </ThemeProvider>
             </Backgroundprovider>
 
  );
}
