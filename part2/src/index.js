import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
/*XHR方式获取json服务器的数据*/
const xhttp = new XMLHttpRequest()
xhttp.onreadystatechange = () => {
    //【this问题】this在这里undefined，只能用xhttp引用readyState和status
    console.log(this)
    if (xhttp.readyState === 4 && xhttp.status === 200){
        const data = JSON.parse(xhttp.responseText)
        // andle the response that is saved in variable data
        root.render(
            <React.StrictMode>
                <App notes={data}/>
            </React.StrictMode>
        )
    }
}
xhttp.open('GET','http://localhost:3001/notes',true)
xhttp.send()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

reportWebVitals(console.log);
