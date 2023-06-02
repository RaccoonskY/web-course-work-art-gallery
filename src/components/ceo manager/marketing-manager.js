import React, { useState, useEffect } from "react";
import {formatDate} from "../../utils/data_formate";
import axios from "axios";

const MarketingManager = () => {
    // State for storing and editing consumers
    const [consumers, setConsumers] = useState([]);
    const [editingId, setEditingId] = useState(null);

    // Fetch consumers data from the server
    useEffect(() => {
        fetchConsumers();
    }, []);

    const fetchConsumers = async () => {
        try {
            const response = await axios.get("http://localhost:3001" +'/consumer/get_all');
            console.log(response.data);
            setConsumers(response.data);
        } catch (error) {
            console.error("Failed to fetch consumers:", error);
        }
    };

    const handleEditConsumer = (id) => {
        setEditingId(id);
    };

    const handleSaveConsumer = async (id) => {
        try {
            const consumerToUpdate = consumers.find((consumer) => consumer._id === id);
            await axios.put("http://localhost:3001"+`/consumer/update/${id}`, consumerToUpdate);
            setEditingId(null);
        } catch (error) {
            console.error(`Failed to save changes for consumer with ID: ${id}`, error);
        }
    };

    const handleConsumerChange = (id, column, value) => {
        setConsumers((prevConsumers) =>
            prevConsumers.map((consumer) =>
                consumer._id === id ? { ...consumer, [column]: value } : consumer
            )
        );
    };

    const handleDeleteConsumer = async (id) => {
        try {
            await axios.delete("http://localhost:3001"+`/consumer/delete/${id}`);
            setConsumers((prevConsumers) =>
                prevConsumers.filter((consumer) => consumer._id !== id)
            );
        } catch (error) {
            console.error(`Failed to delete consumer with ID: ${id}`, error);
        }
    };

/*
    const handleSubmitConsumer = async (consumer) => {
        try {
            const response = await axios.post("/api/consumers", consumer);
            const savedConsumer = response.data;
            setConsumers((prevConsumers) => [...prevConsumers, savedConsumer]);
        } catch (error) {
            console.error("Failed to submit consumer changes:", error);
        }
    };
*/

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
                    <tr key={consumer._id}>
                        <td className="border px-4 py-2">{consumer._id}</td>
                        <td className="border px-4 py-2">
                            {editingId === consumer._id ? (
                                <input
                                    type="text"
                                    value={consumer.fullName}
                                    onChange={(e) => handleConsumerChange(consumer._id, 'fullName', e.target.value)}
                                    className="border border-gray-400 px-2 py-1 rounded"
                                />
                            ) : (
                                consumer.fullName
                            )}
                        </td>
                        <td className="border px-4 py-2">
                            {editingId === consumer._id ? (
                                <input
                                    type="text"
                                    value={consumer.phoneNumber}
                                    onChange={(e) => handleConsumerChange(consumer._id, 'phoneNumber', e.target.value)}
                                    className="border border-gray-400 px-2 py-1 rounded"
                                />
                            ) : (
                                consumer.phoneNumber
                            )}
                        </td>
                        <td className="border px-4 py-2">
                            {editingId === consumer._id ? (
                                <input
                                    type="text"
                                    value={consumer.email}
                                    onChange={(e) => handleConsumerChange(consumer._id, 'email', e.target.value)}
                                    className="border border-gray-400 px-2 py-1 rounded"
                                />
                            ) : (
                                consumer.email
                            )}
                        </td>
                        <td className="border px-4 py-2">{formatDate(consumer.dateToBook)}</td>
                        <td className="border px-4 py-2">{formatDate(consumer.dateOfBuying)}</td>
                        <td className="border px-4 py-2">{consumer.selectedExhibition}</td>
                        <td className="border px-4 py-2">{consumer.numberOfPeople}</td>
                        <td className="border px-4 py-2">{consumer.type}</td>
                        <td className="border px-4 py-2">
                            {editingId === consumer._id ? (
                                <>
                                    <button
                                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded mr-2"
                                        onClick={() => handleSaveConsumer(consumer._id)}
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
                                    onClick={() => handleEditConsumer(consumer._id)}
                                >
                                    Edit
                                </button>
                            )}
                            <button
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded ml-2"
                                onClick={() => handleDeleteConsumer(consumer._id)}
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