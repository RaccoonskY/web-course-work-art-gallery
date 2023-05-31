import React, {useState} from "react";

const ExhibitManager = () => {
    // State for storing and editing exhibits
    const [exhibits, setExhibits] = useState([
        // Example exhibit data
        {
            id: 1,
            name: 'Exhibit 1',
            image: 'image-url-1',
            dateOfAcception: '2023-06-01',
            description: 'Exhibit 1 description',
            exhibitionId: 1,
        },
        {
            id: 2,
            name: 'Exhibit 2',
            image: 'image-url-2',
            dateOfAcception: '2023-06-02',
            description: 'Exhibit 2 description',
            exhibitionId: 2,
        },
        // ... add more exhibits as needed
    ]);

    // Function to handle exhibit changes
    const [editingId, setEditingId] = useState(null);

    // Function to handle exhibit changes
    const handleExhibitChange = (id, column, value) => {
        setExhibits((prevExhibits) =>
            prevExhibits.map((exhibit) =>
                exhibit.id === id ? { ...exhibit, [column]: value } : exhibit
            )
        );
    };

    // Function to enable editing for an exhibit
    const handleEditExhibit = (id) => {
        setEditingId(id);
    };

    // Function to save changes for an exhibit
    const handleSaveExhibit = (id) => {
        // Perform necessary actions to save changes for the exhibit
        console.log(`Saved changes for exhibit with ID: ${id}`);
        setEditingId(null);
    };

    // Function to delete an exhibit
    const handleDeleteExhibit = (id) => {
        setExhibits((prevExhibits) => prevExhibits.filter((exhibit) => exhibit.id !== id));
    };

    return (
        <div className="bg-gray-100 p-4">
            <h2 className="text-xl font-bold mb-4">Exhibit Manager</h2>
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
                    <tr key={exhibit.id}>
                        <td className="border px-4 py-2">{exhibit.id}</td>
                        <td className="border px-4 py-2">
                            {editingId === exhibit.id ? (
                                <input
                                    type="text"
                                    value={exhibit.name}
                                    onChange={(e) => handleExhibitChange(exhibit.id, 'name', e.target.value)}
                                    className="border border-gray-400 px-2 py-1 rounded"
                                />
                            ) : (
                                exhibit.name
                            )}
                        </td>
                        <td className="border px-4 py-2">
                            {editingId === exhibit.id ? (
                                <input
                                    type="text"
                                    value={exhibit.image}
                                    onChange={(e) => handleExhibitChange(exhibit.id, 'image', e.target.value)}
                                    className="border border-gray-400 px-2 py-1 rounded"
                                />
                            ) : (
                                exhibit.image
                            )}
                        </td>
                        <td className="border px-4 py-2">
                            {editingId === exhibit.id ? (
                                <input
                                    type="text"
                                    value={exhibit.dateOfAcception}
                                    onChange={(e) =>
                                        handleExhibitChange(exhibit.id, 'dateOfAcceptance', e.target.value)
                                    }
                                    className="border border-gray-400 px-2 py-1 rounded"
                                />
                            ) : (
                                exhibit.dateOfAcception
                            )}
                        </td>
                        <td className="border px-4 py-2">
                            {editingId === exhibit.id ? (
                                <textarea
                                    value={exhibit.description}
                                    onChange={(e) => handleExhibitChange(exhibit.id, 'description', e.target.value)}
                                    className="border border-gray-400 px-2 py-1 rounded"
                                />
                            ) : (
                                exhibit.description
                            )}
                        </td>
                        <td className="border px-4 py-2">{editingId === exhibit.id ? (
                            <textarea
                                value={exhibit.exhibitionId}
                                onChange={(e) => handleExhibitChange(exhibit.id, 'exhibitionId', e.target.value)}
                                className="border border-gray-400 px-2 py-1 rounded"
                            />
                        ) : (
                            exhibit.exhibitionId
                        )}</td>
                        <td className="border px-4 py-2">
                            {editingId === exhibit.id ? (
                                <>
                                    <button
                                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded mr-2"
                                        onClick={() => handleSaveExhibit(exhibit.id)}
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
                                    onClick={() => handleEditExhibit(exhibit.id)}
                                >
                                    Edit
                                </button>
                            )}
                            <button
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded ml-2"
                                onClick={() => handleDeleteExhibit(exhibit.id)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ExhibitManager;