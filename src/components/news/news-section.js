import React, {useEffect, useState} from 'react';
import axios from "axios";
import {formatDate} from "../../utils/data_formate";


const News = ({ news }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item, index) => (
                <a key={index} href={item.link} className="block bg-white rounded-lg shadow-md p-4 hover:shadow-lg">
                    <img src={item.previewImage} alt={`News ${index + 1}`} className="w-full h-48 object-cover mb-4 rounded" />
                    <h3 className="text-xl font-bold mb-2">{item.text}</h3>
                    <p className="text-gray-600">{formatDate(item.date)}</p>
                </a>
            ))}
        </div>
    );
};


const NewsSection = ()=>{
    const [news, setNews] = useState([]);

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const response = await axios.get('http://localhost:3001/'+'article/get_all');
            const fetchedNews = response.data;
            setNews(fetchedNews);
        } catch (error) {
            console.error('Failed to fetch news:', error);
        }
    };

    return(
        <div className="py-8 bg-gray-900">
            <div className=" mt-10 container mx-auto">
                <h2 className="text-2xl font-bold text-white mb-4 underline">Последние новости и объявления</h2>
                <News news={news} />
            </div>
        </div>
    );

}
export default NewsSection;
