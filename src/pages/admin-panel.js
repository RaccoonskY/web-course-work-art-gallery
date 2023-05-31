import React, { useState } from 'react';
import UserAdministratingPanel from "../components/admin panel/user-admin";
import ActionLogPanel from "../components/admin panel/action-log";



// Admin component
const Admin = () => {
    const initialUsers = [
        { id: 1, name: 'John Doe', login: 'johndoe', password: '123456', type: 'admin' },
        { id: 2, name: 'Jane Smith', login: 'janesmith', password: 'abcdef', type: 'user' },
        // Add more user objects as needed
    ];

    const initialLogs = [
        { id: 1, user_id: 1, action_type: 'Created User', date: 'May 1, 2023' },
        { id: 2, user_id: 2, action_type: 'Updated Profile', date: 'May 5, 2023' },
        // Add more log objects as needed
    ];

    const [users, setUsers] = useState(initialUsers);
    const [logs, setLogs] = useState(initialLogs);

    const handleUpdateUser = (updatedUser) => {
        setUsers((prevUsers) => prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
    };

    const handleDeleteUser = (userToDelete) => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userToDelete.id));
    };

    const handleClearLog = () => {
        setLogs([]);
    };

    return (
        <div className="p-4">
            <UserAdministratingPanel users={users} onUpdateUser={handleUpdateUser} onDeleteUser={handleDeleteUser} />
            <ActionLogPanel logs={logs} clearLog={handleClearLog} />
        </div>
    );
};

export default Admin;
