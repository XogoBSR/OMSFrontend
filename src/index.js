import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import store from "./store";
import { BrowserRouter } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';

const root = createRoot(document.getElementById('root'));
// const {profile} = useContext(backContext)

// console.log("Profile hh ",profile)

root.render(
<BrowserRouter>
    {/* <React.StrictMode> */}
        <Provider store={store}>
            <App />
        </Provider>
    {/* </React.StrictMode> */}
    </BrowserRouter>
    
);
    

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
