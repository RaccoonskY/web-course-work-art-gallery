import React, {useEffect, useState} from "react";
import axios from "axios";

import {formatDate} from "../../utils/data_formate";
import {addAction} from "../../utils/action_requests";
import Cookie from "js-cookie";

const ArticleManager = () => {
    const [articles, setArticles] = useState([]);
    const [editingArticle, setEditingArticle] = useState(null);
    const [newArticle, setNewArticle] = useState({
        previewImage: "",
        text: "",
        date: "",
    });

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            const response = await axios.get('http://localhost:3001' + '/article/get_all');
            setArticles(response.data);
        } catch (error) {
            console.error("Error fetching articles:", error);
        }
    };

    const handleEditArticle = (article) => {
        setEditingArticle(article);
    };

    const handleSaveArticle = async (updatedArticle) => {
        try {
            await axios.put('http://localhost:3001'+`/article/update/${updatedArticle._id}`, updatedArticle);
            setArticles((prevArticles) =>
                prevArticles.map((article) =>
                    article._id === updatedArticle._id ? updatedArticle : article
                )
            );
            setEditingArticle(null);
            addAction(Cookie.get('user_id'), Cookie.get('username'),Cookie.get('type'),'ARTICLE CHANGED');
        } catch (error) {
            console.error("Error saving article:", error);
        }
    };

    const handleDeleteArticle = async (articleToDelete) => {
        try {
            await axios.delete('http://localhost:3001'+`/article/delete/${articleToDelete._id}`);
            setArticles((prevArticles) =>
                prevArticles.filter((article) => article._id !== articleToDelete._id)
            );
            setEditingArticle(null);

            addAction(Cookie.get('user_id'), Cookie.get('username'),Cookie.get('type'),'ARTICLE DELETED');
        } catch (error) {
            console.error("Error deleting article:", error);
        }
    };

    const handleAddArticle = async () => {
        try {
            const response = await axios.post('http://localhost:3001'+"/article/create", newArticle);
            setArticles((prevArticles) => [...prevArticles, response.data]);
            setNewArticle({
                previewImage: "",
                text: "",
                date: "",
            });
            addAction(Cookie.get('user_id'), Cookie.get('username'),Cookie.get('type'),'ARTICLE ADDED');
        } catch (error) {
            console.error("Error adding article:", error);
        }
    };

    return (
     <div className="bg-gray-100 p-4 mt-8">
        <h2 className="text-xl font-bold mb-4">Article Manager</h2>
        {editingArticle ? (
            // Edit article form
            <form onSubmit={(e) => e.preventDefault()} className="mb-4 ">
                <div>
                    <label htmlFor="previewImage">Preview Image</label>
                    <input
                        className="bg-white focus:bg-gray-200 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        id="previewImage"
                        value={editingArticle.previewImage}
                        onChange={(e) => handleEditArticle({ ...editingArticle, previewImage: e.target.value })}
                    />
                </div>
                <div>
                    <label htmlFor="text">Text</label>
                    <textarea
                        className="bg-white focus:bg-gray-200 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="text"
                        value={editingArticle.text}
                        onChange={(e) => handleEditArticle({ ...editingArticle, text: e.target.value })}
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="date">Date</label>
                    <input
                        className="bg-white focus:bg-gray-200 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="date"
                        id="date"
                        value={editingArticle.date}
                        onChange={(e) => handleEditArticle({ ...editingArticle, date: e.target.value })}
                    />
                </div>
                <button

                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={() => handleSaveArticle(editingArticle)}
                >
                    Save
                </button>
                <button
                    type="button"
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => setEditingArticle(null)}
                >
                    Cancel
                </button>
            </form>
        ) : (
            // Display articles table
            <table className="table-auto w-full">
                <thead>
                <tr className="bg-gray-200">
                    <th className="border border-gray-400 py-2 px-4">ID</th>
                    <th className="border border-gray-400 py-2 px-4 ">Preview Image</th>
                    <th className="border border-gray-400 py-2 px-4">Text</th>
                    <th className="border border-gray-400 py-2 px-4">Date</th>
                    <th className="border border-gray-400 py-2 px-4">Actions</th>
                </tr>
                </thead>
                <tbody>
                {articles.map((article) => (
                    <tr key={article._id} className="hover:bg-blue-100">
                        <td className="border border-gray-400 py-2 px-4">{article._id}</td>
                        <td className="border border-gray-400 py-2 px-4 w-2.5"><img src={article.previewImage}/></td>
                        <td className="border border-gray-400 py-2 px-4">{article.text}</td>
                        <td className="border border-gray-400 py-2 px-4">{formatDate(article.date)}</td>
                        <td className="border border-gray-400 py-2 px-4">
                            <button
                                onClick={() => handleEditArticle(article)}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDeleteArticle(article)}
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
                            type="text"
                            value={newArticle.previewImage}
                            onChange={(e) =>
                                setNewArticle({ ...newArticle, previewImage: e.target.value })
                            }
                            className="border border-gray-400 px-2 py-1 rounded"
                        />
                    </td>
                    <td className="border px-4 py-2">
              <textarea
                  value={newArticle.text}
                  onChange={(e) => setNewArticle({ ...newArticle, text: e.target.value })}
                  className="border border-gray-400 px-2 py-1 rounded"
              />
                    </td>
                    <td className="border px-4 py-2">
                        <input
                            type="date"
                            value={newArticle.date}
                            onChange={(e) => setNewArticle({ ...newArticle, date: e.target.value })}
                            className="border border-gray-400 px-2 py-1 rounded"
                        />
                    </td>
                    <td className="border px-4 py-2">
                        <button
                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded"
                            onClick={handleAddArticle}
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

export default ArticleManager;