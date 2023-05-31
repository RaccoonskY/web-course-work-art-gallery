import React from "react";
import ExhibitionSlider from "../components/exibitionsSlider/exibition-slider";
import NewsSection from "../components/news/news-section";
const General = () =>{
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
    ];
    return(
        <div className="main-page">
            <ExhibitionSlider></ExhibitionSlider>
            <NewsSection></NewsSection>
        </div>
    )
}

export default General;