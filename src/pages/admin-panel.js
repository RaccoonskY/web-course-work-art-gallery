import React, { useState } from 'react';
import UserAdministratingPanel from "../components/admin panel/user-admin";
import ActionLogPanel from "../components/admin panel/action-log";



// Admin component
const Admin = () => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4 mt-14">Admin panel</h1>
            <UserAdministratingPanel />
            <ActionLogPanel/>
        </div>
    );
};

export default Admin;
