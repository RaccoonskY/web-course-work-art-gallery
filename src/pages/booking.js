import React, {useEffect, useState} from 'react';
import axios from "axios";

const BookingForm = () => {
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [buyingDate, setBuyingDate] = useState('');
    const [selectedExhibition, setSelectedExhibition] = useState('');
    const [numOfPeople, setNumOfPeople] = useState('');
    const [selectedType, setSelectedType] = useState('');

    const [exhibitions, setExhibitions] = useState([]);

    useEffect(()=>{
        fetchExhibitions();
    },[])
    const fetchExhibitions = async () => {
        try {
            const res = await axios.get('http://localhost:3001' + '/exhibition/get_all');
            console.log(res.data)
            setExhibitions(res.data);
        } catch (error) {
            console.error('Error fetching exhibitions:', error);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        const consumer = {
            fullName: fullName,
            phoneNumber: phoneNumber,
            email: email,
            dateToBook: selectedDate,
            dateOfBuying: buyingDate,
            selectedExhibition: selectedExhibition,
            numberOfPeople: numOfPeople,
            type: selectedType
        };
        console.log('consumer',consumer);
        try {
            const response = await axios.post('http://localhost:3001' + "/consumer/create", consumer);
            console.log('Consumer submitted:', response.data);
            alert('Операция прошла успешно')
        } catch (error) {
            console.error('Failed to submit consumer:', error);
            // Handle the error, display an error message, etc.
        }
    };

    function changeSelectedType(event) {
        if (event.target.value === "0"){
            setBuyingDate(selectedDate);
        } else {
            setBuyingDate(undefined);
        }
        setSelectedType(event.target.value);
    }

    return (
        <div className="max-w-max mx-auto bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-2">Покупка и бронирование билетов</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="fullName" className="text-lg font-semibold">
                        Полное имя
                    </label>
                    <input
                        type="text"
                        id="fullName"
                        className="w-full border border-gray-300 px-3 py-2 rounded-md mt-1"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="phoneNumber" className="text-lg font-semibold">
                        Телефон
                    </label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        className="w-full border border-gray-300 px-3 py-2 rounded-md mt-1"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="text-lg font-semibold">
                        Почта
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="w-full border border-gray-300 px-3 py-2 rounded-md mt-1"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="selectedDate" className="text-lg font-semibold">
                        Дата
                    </label>
                    <input
                        type="date"
                        id="selectedDate"
                        className="w-full border border-gray-300 px-3 py-2 rounded-md mt-1"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="selectedExhibition" className="text-lg font-semibold">
                        Выставка
                    </label>
                    <select value={selectedExhibition}
                            id="selectedExhibition"
                            onChange={(e) =>{setSelectedExhibition(e.target.value);}}
                            className="w-full border border-gray-300 px-3 py-2 rounded-md mt-1"
                    >
                        <option>Выберите выставку</option>
                        {
                            exhibitions.map((exhibition)=>(
                                <option key={exhibition._id} value={exhibition.name}>{exhibition.name}</option>
                            ))
                        }
                    </select>
                  {/*  <select
                        id="selectedExhibition"
                        className="w-full border border-gray-300 px-3 py-2 rounded-md mt-1"
                        value={selectedExhibition}
                        onChange={(e) => setSelectedExhibition(e.target.value)}
                    >
                        <option value="">Select an Exhibition</option>
                        <option value="exhibition1">Exhibition 1</option>
                        <option value="exhibition2">Exhibition 2</option>
                         Add more exhibition options
                    </select>*/}
                </div>
                <div className="mb-4">
                    <label htmlFor="numOfPeople" className="text-lg font-semibold">
                        Количество людей
                    </label>
                    <input
                        type="number"
                        id="numOfPeople"
                        className="w-full border border-gray-300 px-3 py-2 rounded-md mt-1"
                        value={numOfPeople}
                        onChange={(e) => setNumOfPeople(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <input type='radio'
                           title='Покупка'
                           value='0'
                           name='buying'
                           checked={selectedType === '0'}
                           onChange={changeSelectedType} /> Покупка
                    <input className='ml-3' type='radio'
                           title='Бронирование'
                           value='1'
                           name='buying'
                           checked={selectedType === '1'}
                           onChange={changeSelectedType} /> Бронирование
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600"
                >
                    К оплате
                </button>
            </form>
        </div>
    );
};

export default BookingForm;