import React, {useState} from "react";

const UserAdministratingPanel = ({ users, onUpdateUser, onDeleteUser }) => {
    const [editingUser, setEditingUser] = useState(null);

    const handleEditUser = (user) => {
        setEditingUser(user);
    };

    const handleSaveUser = (updatedUser) => {
        // Call the onUpdateUser function with the updated user object
        onUpdateUser(updatedUser);
        setEditingUser(null);
    };

    const handleDeleteUser = (user) => {
        // Call the onDeleteUser function with the user object to delete
        onDeleteUser(user);
        setEditingUser(null);
    };

    const handleChange = (user, field, value) => {
        const updatedUser = { ...user, [field]: value };
        handleSaveUser(updatedUser);
    };

    return (
        <div className='mt-14'>
            <h2>User Administration</h2>
            <table className="w-full border-collapse">
                <thead>
                <tr className="bg-gray-200">
                    <th className="border border-gray-400 py-2 px-4">ID</th>
                    <th className="border border-gray-400 py-2 px-4">Name</th>
                    <th className="border border-gray-400 py-2 px-4">Login</th>
                    <th className="border border-gray-400 py-2 px-4">Password</th>
                    <th className="border border-gray-400 py-2 px-4">Type</th>
                    <th className="border border-gray-400 py-2 px-4">Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-100">
                        <td className="border border-gray-400 py-2 px-4">{user.id}</td>
                        <td className="border border-gray-400 py-2 px-4">
                            {editingUser === user ? (
                                <input
                                    type="text"
                                    value={user.name}
                                    onChange={(e) => handleChange(user, 'name', e.target.value)}
                                />
                            ) : (
                                user.name
                            )}
                        </td>
                        <td className="border border-gray-400 py-2 px-4">
                            {editingUser === user ? (
                                <input
                                    type="text"
                                    value={user.login}
                                    onChange={(e) => handleChange(user, 'login', e.target.value)}
                                />
                            ) : (
                                user.login
                            )}
                        </td>
                        <td className="border border-gray-400 py-2 px-4">
                            {editingUser === user ? (
                                <input
                                    type="text"
                                    value={user.password}
                                    onChange={(e) => handleChange(user, 'password', e.target.value)}
                                />
                            ) : (
                                user.password
                            )}
                        </td>
                        <td className="border border-gray-400 py-2 px-4">
                            {editingUser === user ? (
                                <input
                                    type="text"
                                    value={user.type}
                                    onChange={(e) => handleChange(user, 'type', e.target.value)}
                                />
                            ) : (
                                user.type
                            )}
                        </td>
                        <td className="border border-gray-400 py-2 px-4">
                            {editingUser === user ? (
                                <div>
                                    <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded mr-2" onClick={handleSaveUser}>Save</button>
                                    <button className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded" onClick={() => setEditingUser(null)}>Cancel</button>
                                </div>
                            ) : (
                                <div>
                                    <button className="bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded mr-2" onClick={() => handleEditUser(user)}>Edit</button>
                                    <button className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded" onClick={() => handleDeleteUser(user)}>Delete</button>
                                </div>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};
export default UserAdministratingPanel;