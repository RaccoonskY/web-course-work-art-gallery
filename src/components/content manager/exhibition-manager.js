import React, { useState } from 'react';

// ExhibitionManager component
const ExhibitionManager = () => {
    const initialExhibitions = [
        {
            id: 1,
            previewImage: 'exhibition1.jpg',
            name: 'Exhibition 1',
            dateOpening: '2023-06-01',
            dateClosing: '2023-07-01',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            exhibits: [
                {
                    id: 1,
                    name: 'Exhibit 1',
                    image: 'exhibit1.jpg',
                    dateOfAcception: '2023-05-15',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                },
                // Add more exhibit objects as needed
            ],
        },
        {
            id: 2,
            previewImage: 'exhibition1.jpg',
            name: 'Exhibition 2',
            dateOpening: '2023-06-01',
            dateClosing: '2023-07-01',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            exhibits: [
                {
                    id: 1,
                    name: 'Exhibit 1',
                    image: 'exhibit1.jpg',
                    dateOfAcception: '2023-05-15',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                },
                // Add more exhibit objects as needed
            ],
        },
        // Add more exhibition objects as needed
    ];

    const [exhibitions, setExhibitions] = useState(initialExhibitions);
    const [editingExhibition, setEditingExhibition] = useState(null);

    const handleEditExhibition = (exhibition) => {
        setEditingExhibition(exhibition);
    };

    const handleSaveExhibition = (updatedExhibition) => {
        setExhibitions((prevExhibitions) =>
            prevExhibitions.map((exhibition) => (exhibition.id === updatedExhibition.id ? updatedExhibition : exhibition))
        );
        setEditingExhibition(null);
    };

    const handleDeleteExhibition = (exhibitionToDelete) => {
        setExhibitions((prevExhibitions) => prevExhibitions.filter((exhibition) => exhibition.id !== exhibitionToDelete.id));
        setEditingExhibition(null);
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
                    <tr key={exhibition.id}  className="hover:bg-blue-100">
                        <td className="border border-gray-400 py-2 px-4">{exhibition.id}</td>
                        <td className="border border-gray-400 py-2 px-4">{exhibition.previewImage}</td>
                        <td className="border border-gray-400 py-2 px-4">{exhibition.name}</td>
                        <td className="border border-gray-400 py-2 px-4">{exhibition.dateOpening}</td>
                        <td className="border border-gray-400 py-2 px-4">{exhibition.dateClosing}</td>
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
                </tbody>
            </table>
        )}
    </div>
);
};

export default ExhibitionManager;

