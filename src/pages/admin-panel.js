import React, { useState } from 'react';
import UserAdministratingPanel from "../components/admin panel/user-admin";
import ActionLogPanel from "../components/admin panel/action-log";



// Admin component
const Admin = () => {
    const initialLogs = [
        { id: 1, user_id: 1, action_type: 'Created User', date: 'May 1, 2023' },
        { id: 2, user_id: 2, action_type: 'Updated Profile', date: 'May 5, 2023' },
        // Add more log objects as needed
    ];

    const [logs, setLogs] = useState(initialLogs);

    const handleClearLog = () => {
        setLogs([]);
    };

    return (
        <div className="p-4">
            <UserAdministratingPanel />
            <ActionLogPanel logs={logs} clearLog={handleClearLog} />
        </div>
    );
};

export default Admin;
