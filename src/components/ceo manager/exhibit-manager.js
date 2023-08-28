import React, {useEffect, useState} from "react";
import axios from "axios";
import {formatDate} from "../../utils/data_formate";
import {addAction} from "../../utils/action_requests";
import Cookie from "js-cookie";

const ExhibitManager = () => {
    // State for storing and editing exhibits
    const [exhibits, setExhibits] = useState([]);
    const [exhibitions, setExhibitions] = useState([]);

    // Function to handle exhibit changes
    const [editingId, setEditingId] = useState(null);
    const [newExhibit, setNewExhibit] = useState({
        name: '',
        image: '',
        dateOfAcception: '',
        description: '',
        exhibitionId: '',
    });

    useEffect(()=>{
        fetchExhibitions();
        fetchExhibits();
    },[])

    const fetchExhibitions = async () => {
        try {
            const res = await axios.get('http://localhost:3001' + '/exhibition/get_all');
            setExhibitions(res.data);
        } catch (error) {
            console.error('Error fetching exhibitions:', error);
        }
    };
    const fetchExhibits = async () => {
        try {
            const res = await axios.get("http://localhost:3001"+ "/exhibit/get_all");
            setExhibits(res.data);
        } catch (err) {
            console.error("Error fetching exhibits:", err);
        }
    };

    // Function to handle exhibit changes
    const handleExhibitChange = (id, column, value) => {
        setExhibits((prevExhibits) =>
            prevExhibits.map((exhibit) =>
                exhibit._id === id ? { ...exhibit, [column]: value } : exhibit
            )
        );
    };

    // Function to enable editing for an exhibit
    const handleEditExhibit = (id) => {
        setEditingId(id);
    };

    // Function to save changes for an exhibit
    const handleSaveExhibit = async (id) => {
        try {
            const updatedExhibit = exhibits.find((exhibit) => exhibit._id === id);
            await axios.put(
                `http://localhost:3001/exhibit/update/${id}`,
                updatedExhibit
            );
            console.log(`Saved changes for exhibit with ID: ${id}`);
            setEditingId(null);
            addAction(Cookie.get('user_id'), Cookie.get('username'),Cookie.get('type'),'EXHIBIT CHANGED');
        } catch (err) {
            console.error("Error saving exhibit changes:", err);
        }
    };

    // Function to delete an exhibit
    const handleDeleteExhibit = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/exhibit/delete/${id}`);
            setExhibits((prevExhibits) =>
                prevExhibits.filter((exhibit) => exhibit._id !== id)
            );
            addAction(Cookie.get('user_id'), Cookie.get('username'),Cookie.get('type'),'EXHIBIT DELETED');
        } catch (err) {
            console.error("Error deleting exhibit:", err);
        }
    };

    const handleAddExhibit = async () => {
        try {
            console.log(newExhibit);
            const res = await axios.post("http://localhost:3001/exhibit/create", newExhibit);
            setExhibits((prevExhibits) => [...prevExhibits, res.data]);
            setNewExhibit({
                name: "",
                image: "",
                dateOfAcceptance: "",
                description: "",
                exhibitionId: "",
            });
            addAction(Cookie.get('user_id'), Cookie.get('username'),Cookie.get('type'),'EXHIBIT ADDED');
        } catch (err) {
            console.error("Error adding exhibit:", err);
        }
    };
    return (
        <div className="bg-gray-100 p-4">
            <h2 className="text-xl font-bold mt-12 mb-4">Exhibit Manager</h2>
            <table className="w-full border-collapse">
                <thead>
                <tr className="bg-gray-200">
                    <th className="px-4 py-2">ID</th>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Image</th>
                    <th className="px-4 py-2">Date of Acception</th>
                    <th className="px-4 py-2">Description</th>
                    <th className="px-4 py-2">Exhibition ID</th>
                    <th className="px-4 py-2">Actions</th>
                </tr>
                </thead>
                <tbody>
                {exhibits.map((exhibit) => (
                    <tr key={exhibit._id}>
                        <td className="border px-4 py-2">{exhibit._id}</td>
                        <td className="border px-4 py-2">
                            {editingId === exhibit._id ? (
                                <input
                                    type="text"
                                    value={exhibit.name}
                                    onChange={(e) => handleExhibitChange(exhibit._id, 'name', e.target.value)}
                                    className="border border-gray-400 px-2 py-1 rounded"
                                />
                            ) : (
                                exhibit.name
                            )}
                        </td>
                        <td className="border px-4 py-2">
                            {editingId === exhibit._id ? (
                                <input
                                    type="text"
                                    value={exhibit.image}
                                    onChange={(e) => handleExhibitChange(exhibit._id, 'image', e.target.value)}
                                    className="border border-gray-400 px-2 py-1 rounded"
                                />
                            ) : (
                                <img className="w-96" src={exhibit.image}/>
                            )}
                        </td>
                        <td className="border px-4 py-2">
                            {editingId === exhibit._id ? (
                                <input
                                    type="date"
                                    value={exhibit.dateOfAcception}
                                    onChange={(e) =>
                                        handleExhibitChange(exhibit._id, 'dateOfAcception', e.target.value)
                                    }
                                    className="border border-gray-400 px-2 py-1 rounded"
                                />
                            ) : (
                                formatDate(exhibit.dateOfAcception)
                            )}
                        </td>
                        <td className="border px-4 py-2">
                            {editingId === exhibit._id ? (
                                <textarea
                                    value={exhibit.description}
                                    onChange={(e) => handleExhibitChange(exhibit._id, 'description', e.target.value)}
                                    className="border border-gray-400 px-2 py-1 rounded"
                                />
                            ) : (
                                exhibit.description
                            )}
                        </td>
                        <td className="border px-4 py-2">{editingId === exhibit._id ? (
                            <select value={exhibit.exhibitionId}  onChange={(e) =>{handleExhibitChange(exhibit._id, 'exhibitionId', e.target.value)}}>
                                {<option>Выберите выставку</option>}
                                {
                                 exhibitions.map((exhibition)=>(
                                    <option key={exhibition._id} value={exhibition._id}>{exhibition.name}</option>
                                 ))
                                }
                            </select>
                           /* <textarea
                                value={exhibit.exhibitionId}
                                onChange={(e) => handleExhibitChange(exhibit._id, 'exhibitionId', e.target.value)}
                                className="border border-gray-400 px-2 py-1 rounded"
                            />*/
                        ) : (
                            exhibit.exhibitionId
                        )}</td>
                        <td className="border px-4 py-2">
                            {editingId === exhibit._id ? (
                                <>
                                    <button
                                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded mr-2"
                                        onClick={() => handleSaveExhibit(exhibit._id)}
                                    >
                                        Save
                                    </button>
                                    <button
                                        className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-1 px-2 rounded"
                                        onClick={() => setEditingId(null)}
                                    >
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <button
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded"
                                    onClick={() => handleEditExhibit(exhibit._id)}
                                >
                                    Edit
                                </button>
                            )}
                            <button
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded ml-2"
                                onClick={() => handleDeleteExhibit(exhibit._id)}
                            >
                                Delete
                            </button>
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
                            value={newExhibit.name}
                            onChange={(e) => setNewExhibit({ ...newExhibit, name: e.target.value })}
                            className="border border-gray-400 px-2 py-1 rounded"
                        />
                    </td>
                    <td className="border px-4 py-2">
                        <input
                            type="text"
                            value={newExhibit.image}
                            onChange={(e) => setNewExhibit({ ...newExhibit, image: e.target.value })}
                            className="border border-gray-400 px-2 py-1 rounded"
                        />
                    </td>
                    <td className="border px-4 py-2">
                        <input
                            type="date"
                            value={newExhibit.dateOfAcception}
                            onChange={(e) => setNewExhibit({ ...newExhibit, dateOfAcception: e.target.value})}
                            className="border border-gray-400 px-2 py-1 rounded"
                        />
                    </td>
                    <td className="border px-4 py-2">
                          <textarea
                              value={newExhibit.description}
                              onChange={(e) => setNewExhibit({ ...newExhibit, description: e.target.value })}
                              className="border border-gray-400 px-2 py-1 rounded"
                          />
                    </td>
                    <td className="border px-4 py-2">
                        <select value={newExhibit.exhibitionId}  onChange={(e) =>{console.log('new id', e.target.value);setNewExhibit({...newExhibit, exhibitionId: e.target.value})}}>
                            {<option>Выберите выставку</option>}
                            {
                                exhibitions.map((exhibition)=>(
                                    <option key={exhibition._id} value={exhibition._id} >{exhibition.name}</option>
                                ))
                            }
                        </select>
                    </td>
                    <td className="border px-4 py-2">
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded"
                            onClick={handleAddExhibit}
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

export default ExhibitManager;