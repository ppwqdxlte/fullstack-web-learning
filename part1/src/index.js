import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

let counter = 1;
const refresh = ()=>{
    ReactDOM.createRoot(document.getElementById('root')).render(
        <React.StrictMode>
            <App counter = {counter} />
        </React.StrictMode>
    )
}
setInterval(()=>{
    refresh()
    counter += 1
    if (counter > 10) counter = 1
},1000);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
