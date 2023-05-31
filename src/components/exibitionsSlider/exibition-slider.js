import React, {useState} from 'react';
import Exhibition from "./exhibition";
const ExhibitionSlider = () => {
    const exhibitions = [
        {
            name: 'Exhibition 1',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            date: 'August 15 - September 15, 2023',
            images: [
                'https://cameralabs.org/media/k2/items/cache/5e3bd17765e820213981ad5d80fbce34_L.jpg',
                'https://www.theartnewspaper.ru/media/original_images/3f92a81d-4e8b-46c6-9149-6344e1e930d6.jpg',
                'https://losko.ru/wp-content/uploads/2019/11/cover-1.jpg',
            ],
        },
        {
            name: 'Exhibition 2',
            description: 'Ut tincidunt eleifend mauris, et finibus est luctus vel.',
            date: 'September 1 - October 31, 2023',
            images: [
                'https://cameralabs.org/media/k2/items/cache/5e3bd17765e820213981ad5d80fbce34_L.jpg',
                'https://www.theartnewspaper.ru/media/original_images/3f92a81d-4e8b-46c6-9149-6344e1e930d6.jpg',
                'https://bigpicture.ru/wp-content/uploads/2021/03/bigpicture_ru_9-site-598-750x480-1.png',
            ],
        },
        // Add more exhibitions here
    ];

    const [currentExhibitionIndex, setCurrentExhibitionIndex] = useState(0);

    const handleNextExhibition = () => {
        setCurrentExhibitionIndex((prevIndex) =>
            prevIndex === exhibitions.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handlePrevExhibition = () => {
        setCurrentExhibitionIndex((prevIndex) =>
            prevIndex === 0 ? exhibitions.length - 1 : prevIndex - 1
        );
    };

    const currentExhibition = exhibitions[currentExhibitionIndex];

    return (
        <div className="bg-gray-900 py-8">
            <div className="mt-10 container mx-auto">
                <h2 className="text-2xl font-bold text-white mb-4 underline">Текущие выставки и экскурсии</h2>
                <div className="relative">
                    <button
                        onClick={handlePrevExhibition}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-full"
                    >
                        Предыдущая
                    </button>
                    <button
                        onClick={handleNextExhibition}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-full"
                    >
                        Следующая
                    </button>
                    <Exhibition {...currentExhibition} />
                </div>
            </div>
        </div>
    );
};

export default ExhibitionSlider;