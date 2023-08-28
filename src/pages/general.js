import React from "react";
import ExhibitionSlider from "../components/exibitionsSlider/exibition-slider";
import NewsSection from "../components/news/news-section";
const General = () =>{

    return(
        <div className="main-page">
            <ExhibitionSlider></ExhibitionSlider>
            <NewsSection></NewsSection>
        </div>
    )
}

export default General;