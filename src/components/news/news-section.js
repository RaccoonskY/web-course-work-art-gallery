import React from 'react';


const News = ({ news }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item, index) => (
                <a key={index} href={item.link} className="block bg-white rounded-lg shadow-md p-4 hover:shadow-lg">
                    <img src={item.image} alt={`News ${index + 1}`} className="w-full h-48 object-cover mb-4 rounded" />
                    <h3 className="text-xl font-bold mb-2">{item.heading}</h3>
                    <p className="text-gray-600">{item.date}</p>
                </a>
            ))}
        </div>
    );
};


const NewsSection = ({news})=>{
    const newsData = [
        {
            image: 'https://static.1tv.ru/uploads/video/material/splash/2022/10/22/750806/big/750806_big_2079786d17.jpg',
            heading: 'New Exhibition Opening',
            date: 'May 15, 2023',
            link: '/news/1',
        },
        {
            image: 'https://static.1tv.ru/uploads/video/material/splash/2022/10/22/750806/big/750806_big_2079786d17.jpg',
            heading: 'Artist Spotlight: Jane Doe',
            date: 'June 1, 2023',
            link: '/news/2',
        },
        {
            image: 'https://static.1tv.ru/uploads/video/material/splash/2022/10/22/750806/big/750806_big_2079786d17.jpg',
            heading: 'Gallery Renovation Update',
            date: 'June 15, 2023',
            link: '/news/3',
        },
        {
            image: 'https://static.1tv.ru/uploads/video/material/splash/2022/10/22/750806/big/750806_big_2079786d17.jpg',
            heading: 'Gallery Renovation Update',
            date: 'June 15, 2023',
            link: '/news/3',
        },
    ];

    return(
        <div className="py-8 bg-gray-900">
            <div className=" mt-10 container mx-auto">
                <h2 className="text-2xl font-bold text-white mb-4 underline">Последние новости и объявления</h2>
                <News news={newsData} />
            </div>
        </div>
    );

}
export default NewsSection;
