import React, {useState} from "react";

const MarketingManager = () => {
    // State for storing and editing consumers
    const [consumers, setConsumers] = useState([
        // Example consumer data
        {
            id: 1,
            fullName: 'John Doe',
            phoneNumber: '1234567890',
            email: 'johndoe@example.com',
            dateToBook: '2023-06-01',
            dateOfBuying: '2023-06-05',
            selectedExhibition: 'Exhibition 1',
            numberOfPeople: 2,
            type: 'Regular',
        },
        {
            id: 2,
            fullName: 'Jane Smith',
            phoneNumber: '9876543210',
            email: 'janesmith@example.com',
            dateToBook: '2023-06-02',
            dateOfBuying: '2023-06-06',
            selectedExhibition: 'Exhibition 2',
            numberOfPeople: 3,
            type: 'VIP',
        },
        // ... add more consumers as needed
    ]);

    const [editingId, setEditingId] = useState(null);
    const handleEditConsumer = (id) => {
        setEditingId(id);
    };

    const handleSaveConsumer = (id) => {
        // Perform necessary actions to save changes for the consumer
        console.log(`Saved changes for consumer with ID: ${id}`);
        setEditingId(null);
    };
    // Function to handle consumer changes
    const handleConsumerChange = (id, column, value) => {
        setConsumers((prevConsumers) =>
            prevConsumers.map((consumer) =>
                consumer.id === id ? { ...consumer, [column]: value } : consumer
            )
        );
    };

    // Function to delete a consumer
    const handleDeleteConsumer = (id) => {
        setConsumers((prevConsumers) => prevConsumers.filter((consumer) => consumer.id !== id));
    };

    const handleSubmitConsumer = (consumer) => {
        // Perform necessary actions to submit changes for the consumer
        console.log(`Submitted changes for consumer with ID: ${consumer}`);
    };

    return (
        <div className="bg-gray-100 p-4 mt-8">
            <h2 className="text-xl font-bold mb-4">Marketing Manager</h2>
            <table className="w-full border-collapse">
                <thead>
                <tr className="bg-gray-200">
                    <th className="px-4 py-2">ID</th>
                    <th className="px-4 py-2">Full Name</th>
                    <th className="px-4 py-2">Phone Number</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2">Date to Book</th>
                    <th className="px-4 py-2">Date of Buying</th>
                    <th className="px-4 py-2">Selected Exhibition</th>
                    <th className="px-4 py-2">Number of People</th>
                    <th className="px-4 py-2">Type</th>
                    <th className="px-4 py-2">Actions</th>
                </tr>
                </thead>
                <tbody>
                {consumers.map((consumer) => (
                    <tr key={consumer.id}>
                        <td className="border px-4 py-2">{consumer.id}</td>
                        <td className="border px-4 py-2">
                            {editingId === consumer.id ? (
                                <input
                                    type="text"
                                    value={consumer.fullName}
                                    onChange={(e) => handleConsumerChange(consumer.id, 'fullName', e.target.value)}
                                    className="border border-gray-400 px-2 py-1 rounded"
                                />
                            ) : (
                                consumer.fullName
                            )}
                        </td>
                        <td className="border px-4 py-2">
                            {editingId === consumer.id ? (
                                <input
                                    type="text"
                                    value={consumer.phoneNumber}
                                    onChange={(e) => handleConsumerChange(consumer.id, 'phoneNumber', e.target.value)}
                                    className="border border-gray-400 px-2 py-1 rounded"
                                />
                            ) : (
                                consumer.phoneNumber
                            )}
                        </td>
                        <td className="border px-4 py-2">
                            {editingId === consumer.id ? (
                                <input
                                    type="text"
                                    value={consumer.email}
                                    onChange={(e) => handleConsumerChange(consumer.id, 'email', e.target.value)}
                                    className="border border-gray-400 px-2 py-1 rounded"
                                />
                            ) : (
                                consumer.email
                            )}
                        </td>
                        <td className="border px-4 py-2">{consumer.dateToBook}</td>
                        <td className="border px-4 py-2">{consumer.dateOfBuying}</td>
                        <td className="border px-4 py-2">{consumer.selectedExhibition}</td>
                        <td className="border px-4 py-2">{consumer.numberOfPeople}</td>
                        <td className="border px-4 py-2">{consumer.type}</td>
                        <td className="border px-4 py-2">
                            {editingId === consumer.id ? (
                                <>
                                    <button
                                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded mr-2"
                                        onClick={() => handleSaveConsumer(consumer.id)}
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
                                    onClick={() => handleEditConsumer(consumer.id)}
                                >
                                    Edit
                                </button>
                            )}
                            <button
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded ml-2"
                                onClick={() => handleDeleteConsumer(consumer.id)}
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

export default MarketingManager;