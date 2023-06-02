import React, {useEffect, useState} from 'react';
import Exhibition from "./exhibition";
import axios from 'axios';

import {formatDate} from "../../utils/data_formate";

const ExhibitionSlider = () => {
    const [exhibitions, setExhibitions] = useState([]);

    const [currentExhibitionIndex, setCurrentExhibitionIndex] = useState(0);


    useEffect(() => {
        fetchExhibitions();
    }, []);

    const fetchExhibitions = async () => {
        try {
            const response = await axios.get('http://localhost:3001' + '/exhibition/get_all');
            const fetchedExhibitions = response.data;
            const exhibitPromises = fetchedExhibitions.map(async (exhibition) => {
                const exhibitResponse = await axios.get('http://localhost:3001'+ `/exhibit/get_ref?exhibitionId=${exhibition._id}`);
                exhibition.exhibits = exhibitResponse.data;
                return exhibition;
            });
            const updatedExhibitions = await Promise.all(exhibitPromises);
            console.log(updatedExhibitions);
            setExhibitions(updatedExhibitions);
        } catch (error) {
            console.error('Failed to fetch exhibitions:', error);
        }
    };

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
                    {currentExhibition && <Exhibition {...{
                        name:           currentExhibition.name,
                        description:    currentExhibition.description,
                        date:           formatDate(currentExhibition.dateOpening) +" - "+ formatDate(currentExhibition.dateClosing),
                        images:         currentExhibition.exhibits.map((exhibit) => exhibit.image)}} />}
                </div>
            </div>
        </div>
    );
};

export default ExhibitionSlider;