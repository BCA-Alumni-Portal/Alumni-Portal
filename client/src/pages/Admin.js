import { useState } from 'react';
import axios from 'axios';

export default function Admin() {
    const [j, setJ] = useState(true);

    const packGetData = () => {
        return {};
    }

    const syncMissingData = () => {
        const data = packGetData();
        
        let result = axios.get("http://localhost:5000/syncMissingData", { params: data }).then(res => {
          let data = res.data;
          console.log(data);
          if (data != null) {
            // setMessages(data);
          }
        });
    }

    const exportData = () => {
        const data = packGetData();
        
        let result = axios.get("http://localhost:5000/exportData", { params: data }).then(res => {
          let data = res.data;
          console.log(data);
          if (data != null) {
            // setMessages(data);
          }
        });
    }

    return (

        <div className="container-fluid">

            <button
                id="align-center"
                className="drop-shadow-xl text-xs border rounded py-2 px-2 bg-sky-100 hover:bg-gradient-to-r hover:from-sky-300 hover:to-sky-400 hover:border-sky-300 border-sky-100 hover:text-white"
                onClick={syncMissingData}
            >
                Sync Missing Data (Two Way)
            </button>
            <button
                id="align-center"
                className="drop-shadow-xl text-xs border rounded py-2 px-2 bg-sky-100 hover:bg-gradient-to-r hover:from-sky-300 hover:to-sky-400 hover:border-sky-300 border-sky-100 hover:text-white"
                onClick={exportData}
            >
                Export Data (SQL to Sheets)
            </button>
        </div>
    );
}