import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';

const root = ReactDOM.createRoot(document.getElementById('root'))
/*Axios和Promise 方式获取json服务器的数据*/
const promise = axios.get('http://localhost:3001/notes')
// console.log(promise) //fulfilled( resolved)
promise.then(response => {
    console.log(response)
    root.render(
        <React.StrictMode>
            <App notes={response.data}/>
        </React.StrictMode>
    )
})
// const promise2 = axios.get('http://localhost:3001/foobar')
// console.log(promise2) //rejected

reportWebVitals(console.log);
