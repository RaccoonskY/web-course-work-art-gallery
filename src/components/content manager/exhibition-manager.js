import React, {useEffect, useState} from 'react';
import axios from "axios";

import {formatDate} from "../../utils/data_formate";
import {addAction} from "../../utils/action_requests";
import Cookie from "js-cookie";

const ExhibitionManager = () => {

    const [exhibitions, setExhibitions] = useState([]);
    const [editingExhibition, setEditingExhibition] = useState(null);
    const [newExhibition, setNewExhibition] = useState({
        _id: '',
        previewImage: '',
        name: '',
        dateOpening: '',
        dateClosing: '',
        description: '',
        exhibits: [],
    });

    useEffect(() => {
        fetchExhibitions();
    }, []);

    const fetchExhibitions = async () => {
        try {
            const res = await axios.get('http://localhost:3001' + '/exhibition/get_all');
            const exhibitPromises = res.data.map(async (exhibition) => {
                const exhibitResponse = await axios.get('http://localhost:3001'+ `/exhibit/get_ref?exhibitionId=${exhibition._id}`);
                exhibition.exhibits = exhibitResponse.data;
                return exhibition;
            });
            const updatedExhibitions = await Promise.all(exhibitPromises);
            setExhibitions(updatedExhibitions);
        } catch (error) {
            console.error('Error fetching exhibitions:', error);
        }
    };

    const handleEditExhibition = (exhibition) => {
        setEditingExhibition(exhibition);
    };

    const handleSaveExhibition = async (updatedExhibition) => {
        try {
            await axios.put('http://localhost:3001'+ `/exhibition/update/${updatedExhibition._id}`, updatedExhibition);
            setExhibitions((prevExhibitions) =>
                prevExhibitions.map((exhibition) => (exhibition._id === updatedExhibition._id ? updatedExhibition : exhibition))
            );
            setEditingExhibition(null);

            addAction(Cookie.get('user_id'), Cookie.get('username'),Cookie.get('type'),'EXHIBITION CHANGED');
        } catch (error) {
            console.error('Error saving exhibition:', error);
        }
    };

    const handleDeleteExhibition = async (exhibitionToDelete) => {
        try {
            await axios.delete('http://localhost:3001'+`/exhibition/delete/${exhibitionToDelete._id}`);
            setExhibitions((prevExhibitions) => prevExhibitions.filter((exhibition) => exhibition._id !== exhibitionToDelete._id));
            setEditingExhibition(null);
            addAction(Cookie.get('user_id'), Cookie.get('username'),Cookie.get('type'),'EXHIBITION DELETED');
        } catch (error) {
            console.error('Error deleting exhibition:', error);
        }
    };

    const handleAddExhibition = async (newExhibition) => {
        console.log(newExhibition);
        try {
            const response = await axios.post('http://localhost:3001'+ '/exhibition/create', newExhibition);
            setExhibitions((prevExhibitions) => [...prevExhibitions, response.data]);
            setNewExhibition({
                _id: '',
                previewImage: '',
                name: '',
                dateOpening: '',
                dateClosing: '',
                description: '',
                exhibits: [],
            });

            addAction(Cookie.get('user_id'), Cookie.get('username'),Cookie.get('type'),'EXHIBITION ADDED');
        } catch (error) {
            console.error('Error adding exhibition:', error);
        }
    };




    return(
        <div className="bg-gray-100 p-4">
        <h2 className="text-xl font-bold mb-4">Exhibition Manager</h2>
        {editingExhibition ? (
            // Edit exhibition form
            <form onSubmit={(e) => e.preventDefault()} className="mb-4">
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        className="bg-white focus:bg-gray-200 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        id="name"
                        value={editingExhibition.name}
                        onChange={(e) => handleEditExhibition({ ...editingExhibition, name: e.target.value })}
                    />
                </div>
                <div>
                    <label htmlFor="previewImage">Preview Image</label>
                    <input
                        className="bg-white focus:bg-gray-200 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        id="previewImage"
                        value={editingExhibition.previewImage}
                        onChange={(e) => handleEditExhibition({ ...editingExhibition, previewImage: e.target.value })}
                    />
                </div>
                <div>
                    <label htmlFor="dateOpening">Date Opening</label>
                    <input
                        className="bg-white focus:bg-gray-200 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="date"
                        id="dateOpening"
                        value={editingExhibition.dateOpening}
                        onChange={(e) => handleEditExhibition({ ...editingExhibition, dateOpening: e.target.value })}
                    />
                </div>
                <div>
                    <label htmlFor="dateClosing">Date Closing</label>
                    <input
                        className="bg-white focus:bg-gray-200 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="date"
                        id="dateClosing"
                        value={editingExhibition.dateClosing}
                        onChange={(e) => handleEditExhibition({ ...editingExhibition, dateClosing: e.target.value })}
                    />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                        className="bg-white focus:bg-gray-200 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="description"
                        value={editingExhibition.description}
                        onChange={(e) => handleEditExhibition({ ...editingExhibition, description: e.target.value })}
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={() => handleSaveExhibition(editingExhibition)}
                >
                    Save
                </button>
                <button
                    type="button"
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => setEditingExhibition(null)}
                >
                    Cancel
                </button>
            </form>
        ) : (
            // Display exhibitions table
            <table className="w-full border-collapse">
                <thead>
                <tr className="bg-gray-200">
                    <th className="border border-gray-400 py-2 px-4">ID</th>
                    <th className="border border-gray-400 py-2 px-4">Preview Image</th>
                    <th className="border border-gray-400 py-2 px-4">Name</th>
                    <th className="border border-gray-400 py-2 px-4">Date Opening</th>
                    <th className="border border-gray-400 py-2 px-4">Date Closing</th>
                    <th className="border border-gray-400 py-2 px-4" >Description</th>
                    <th className="border border-gray-400 py-2 px-4">Exhibits</th>
                    <th className="border border-gray-400 py-2 px-4">Actions</th>
                </tr>
                </thead>
                <tbody>
                {exhibitions.map((exhibition) => (
                    <tr key={exhibition._id}  className="hover:bg-blue-100">
                        <td className="border border-gray-400 py-2 px-4">{exhibition._id}</td>
                        <td className="border border-gray-400 py-2 px-4">{exhibition.previewImage}</td>
                        <td className="border border-gray-400 py-2 px-4">{exhibition.name}</td>
                        <td className="border border-gray-400 py-2 px-4">{formatDate(exhibition.dateOpening)}</td>
                        <td className="border border-gray-400 py-2 px-4">{formatDate(exhibition.dateClosing)}</td>
                        <td className="border border-gray-400 py-2 px-4">{exhibition.description}</td>
                        <td className="border border-gray-400 py-2 px-4">{exhibition.exhibits.length}</td>
                        <td className="border border-gray-400 py-2 px-4">
                            <button
                                onClick={() => handleEditExhibition(exhibition)}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDeleteExhibition(exhibition)}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
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
                            className="bg-white focus:bg-gray-200 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            value={newExhibition.previewImage}
                            onChange={(e) => setNewExhibition({...newExhibition, previewImage: e.target.value})}
                        />
                    </td>
                    <td className="border px-4 py-2">
                        <input
                            className="bg-white focus:bg-gray-200 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            value={newExhibition.name}
                            onChange={(e) => setNewExhibition({...newExhibition, name: e.target.value})}
                        />
                    </td>
                    <td className="border px-4 py-2">
                        <input
                            className="bg-white focus:bg-gray-200 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="date"
                            value={newExhibition.dateOpening}
                            onChange={(e) => setNewExhibition({...newExhibition, dateOpening: e.target.value})}
                        />
                    </td>
                    <td className="border px-4 py-2">
                        <input
                            className="bg-white focus:bg-gray-200 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="date"
                            value={newExhibition.dateClosing}
                            onChange={(e) => setNewExhibition({...newExhibition, dateClosing: e.target.value})}
                        />
                    </td>
                    <td className="border px-4 py-2">
                        <textarea
                            className="bg-white focus:bg-gray-200 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={newExhibition.description}
                            onChange={(e) => setNewExhibition({...newExhibition, description: e.target.value})}
                        />
                    </td>
                    <td className="border px-4 py-2">
                        Exhibits
                    </td>

                    <td className="border px-4 py-2">
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded"
                            onClick={() => handleAddExhibition(newExhibition)}
                        >
                            Add
                        </button>
                    </td>
                </tr>

                </tbody>
            </table>
        )}
    </div>
);
};

export default ExhibitionManager;

