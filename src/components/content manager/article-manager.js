import React, {useState} from "react";

const ArticleManager = () => {
    const initialArticles = [
        {
            id: 1,
            previewImage: 'article1.jpg',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            date: '2023-05-30',
        },
        // Add more article objects as needed
    ];

    const [articles, setArticles] = useState(initialArticles);
    const [editingArticle, setEditingArticle] = useState(null);

    const handleEditArticle = (article) => {
        setEditingArticle(article);
    };

    const handleSaveArticle = (updatedArticle) => {
        setArticles((prevArticles) =>
            prevArticles.map((article) => (article.id === updatedArticle.id ? updatedArticle : article))
        );
        setEditingArticle(null);
    };

    const handleDeleteArticle = (articleToDelete) => {
        setArticles((prevArticles) => prevArticles.filter((article) => article.id !== articleToDelete.id));
        setEditingArticle(null);
    };

    return (
     <div className="bg-gray-100 p-4 mt-8">
        <h2 className="text-xl font-bold mb-4">Article Manager</h2>
        {editingArticle ? (
            // Edit article form
            <form onSubmit={(e) => e.preventDefault()} className="mb-4">
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
                    <th className="border border-gray-400 py-2 px-4">Preview Image</th>
                    <th className="border border-gray-400 py-2 px-4">Text</th>
                    <th className="border border-gray-400 py-2 px-4">Date</th>
                    <th className="border border-gray-400 py-2 px-4">Actions</th>
                </tr>
                </thead>
                <tbody>
                {articles.map((article) => (
                    <tr key={article.id} className="hover:bg-blue-100">
                        <td className="border border-gray-400 py-2 px-4">{article.id}</td>
                        <td className="border border-gray-400 py-2 px-4">{article.previewImage}</td>
                        <td className="border border-gray-400 py-2 px-4">{article.text}</td>
                        <td className="border border-gray-400 py-2 px-4">{article.date}</td>
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
                </tbody>
            </table>
        )}
    </div>
);
};

export default ArticleManager;