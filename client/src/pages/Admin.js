import axios from 'axios';
import Home from './Home';
import React, { useEffect, useState } from 'react';
import CommunicationHandler from '../components/CommunicationHandler';

export default function Admin() {
    const [auth, setAuth] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        axios.get('/auth/current-session').then(({ data }) => {
            setAuth(data);
        })
        CommunicationHandler.isAdmin().then((result) => {
            if (result != null) {
                setIsAdmin(result);
            }
        });
    }, [])

    const packGetData = () => {
        return {};
    }

    const syncMissingData = () => {
        const data = packGetData();

        CommunicationHandler.syncMissingData();
        // let result = axios.get("/api/syncMissingData", { params: data }).then(res => {
        //     let data = res.data;
        //     console.log(data);
        //     if (data != null) {
        //         // setMessages(data);
        //     }
        // });
    }

    const exportData = () => {
        const data = packGetData();

        CommunicationHandler.exportData();

        // let result = axios.get("/api/exportData", { params: data }).then(res => {
        //     let data = res.data;
        //     console.log(data);
        //     if (data != null) {
        //         // setMessages(data);
        //     }
        // });
    }
    if (auth && isAdmin) {
        return (

            <div className="container-fluid mt-10">
                <button
                    className="mr-2 inline-block align-middle drop-shadow-xl text-3xl border rounded py-2.5 px-4 bg-sky-100 hover:bg-gradient-to-r hover:from-sky-300 hover:to-sky-400 hover:border-sky-300 border-sky-100 hover:text-white"
                    onClick={syncMissingData}
                >
                    Sync Missing Data (Two Way)
                </button>
                <button
                    className="ml-2 inline-block align-middle  drop-shadow-xl text-3xl border rounded py-2.5 px-4 bg-sky-100 hover:bg-gradient-to-r hover:from-sky-300 hover:to-sky-400 hover:border-sky-300 border-sky-100 hover:text-white"
                    onClick={exportData}
                >
                    Export Data (SQL to Sheets)
                </button>
            </div>
        )
    }
    else if (auth === null) {
        // loading
        return <div></div>
    }
    else if (!isAdmin) {
        return <Home />;
    }
    else {
        return <Home />;
    }
}