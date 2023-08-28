import React, {useEffect, useState} from "react";
import axios from "axios";

const ActionLogPanel = () => {
    const [logs,setLogs] = useState([]);

    useEffect(()=>{
        axios.get('http://localhost:3001' + '/action/all',{
        }).then(res =>{
            console.log('Got logs:',res.data);
            setLogs(res.data);
        }).catch(err=>console.error(err));

    },[])

    const clearLog = ()=>{
        axios.delete('http://localhost:3001' + '/action/all',{
        }).then(()=>{
            setLogs([]);
        }).catch(err=>console.error(err));
    }

    return (
        <div>
            <h2>Action Log</h2>
            <table className="w-full border-collapse">
                <thead>
                <tr className="bg-gray-200">
                    <th className="border border-gray-400 py-2 px-4">ID</th>
                    <th className="border border-gray-400 py-2 px-4">User ID</th>
                    <th className="border border-gray-400 py-2 px-4">Username</th>
                    <th className="border border-gray-400 py-2 px-4">Action Type</th>
                    <th className="border border-gray-400 py-2 px-4">Date</th>
                </tr>
                </thead>
                <tbody>
                {logs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-100">
                        <td className="border border-gray-400 py-2 px-4">{log._id}</td>
                        <td className="border border-gray-400 py-2 px-4">{log.user_id}</td>
                        <td className="border border-gray-400 py-2 px-4">{log.username}</td>
                        <td className="border border-gray-400 py-2 px-4">{log.action_type}</td>
                        <td className="border border-gray-400 py-2 px-4">{log.date}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded mt-4" onClick={clearLog}>Clear Log</button>
        </div>
    );
};

export default ActionLogPanel;