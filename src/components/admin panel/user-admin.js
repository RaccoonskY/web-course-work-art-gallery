import React, {useEffect, useState} from "react";
import axios from "axios";
const UserAdministratingPanel = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [newUser, setNewUser] = useState({
        name: '',
        login: '',
        password: '',
        type: '',
    });

    useEffect(()=>{
        axios.get('http://localhost:3001' + '/user/all',{
        }).then(res =>{
            console.log('Got users:',res.data);
            setUsers(res.data);
        }).catch(err=>console.error(err));
    },[]);


    const handleUpdateUser = (updatedUser) => {
        setUsers((prevUsers) => prevUsers.map((user) => (user._id === updatedUser._id ? updatedUser : user)));
    };

    const handleDeleteUser = (userToDelete) => {
        axios.delete('http://localhost:3001' + `/user/delete/${userToDelete._id}`,{
            headers: {
                "Content-Type": "application/json",
            }
        }).catch(err=>console.error(err));
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userToDelete._id));
    };

    const handleAddUser = (userToAdd) =>{
        console.log('userToAdd', userToAdd);
        axios.post('http://localhost:3001' + '/user/create', userToAdd,{
            headers: {
                "Content-Type": "application/json",
            }
        }).
        then(res=>{
            setUsers((prevUsers) => [...prevUsers, res.data]);
        }).
        catch(err=>console.error(err));

        setEditingUser(null);
        setNewUser({
            name: '',
            login: '',
            password: '',
            type: '',
        });

    }

    const handleEditUser = (user) => {
        setEditingUser(user);
    };

    const handleSaveUser = () => {
        console.log(editingUser);
        axios.put('http://localhost:3001' + '/user/update', editingUser,{
            headers: {
                "Content-Type": "application/json",
            }
        }).
            then().
            catch(err=>console.error(err));
        handleUpdateUser(editingUser);
        setEditingUser(null);
    };



    const handleChange = (user, field, value) => {
        const updatedUser = { ...user, [field]: value };
        handleUpdateUser(updatedUser);
        setEditingUser(updatedUser);
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
                    <tr key={user._id} className="hover:bg-gray-100">
                        <td className="border border-gray-400 py-2 px-4">{user._id}</td>
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
                                <select value={user.type} onChange={(e)=>handleChange(user,'type', e.target.value)}>
                                    <option value='admin' >Admin</option>
                                    <option value='manager'>Manager</option>
                                    <option value='content manager'>Content manager</option>
                                </select>
                            ) : (
                                user.type
                            )}
                        </td>
                        <td >
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
                <tr>
                    <td className="border px-4 py-2">
                        ID
                    </td>
                    <td className="border px-4 py-2">
                        <input
                            type="text"
                            value={newUser.name}
                            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                            className="border border-gray-400 px-2 py-1 rounded"
                        />
                    </td>
                    <td className="border px-4 py-2">
                        <input
                            type="text"
                            value={newUser.login}
                            onChange={(e) => setNewUser({ ...newUser, login: e.target.value })}
                            className="border border-gray-400 px-2 py-1 rounded"
                        />
                    </td>
                    <td className="border px-4 py-2">
                        <input
                            type="text"
                            value={newUser.password}
                            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                            className="border border-gray-400 px-2 py-1 rounded"
                        />
                    </td>
                    <td className="border px-4 py-2">
                        <select value={newUser.type} defaultValue='admin'  onChange={(e) =>{console.log(e.target.value);setNewUser({ ...newUser, type: e.target.value })}}>
                            <option value='admin' >Admin</option>
                            <option value='manager'>Manager</option>
                            <option value='content manager'>Content manager</option>
                        </select>
                    </td>
                    <td className="border px-4 py-2">
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded"
                            onClick={()=>handleAddUser(newUser)}
                        >
                            Add
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};
export default UserAdministratingPanel;