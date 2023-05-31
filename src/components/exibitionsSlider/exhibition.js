import React from 'react';
import Slider from 'react-slick';
import "./exhibiton.css"
const Exhibition = ({ name, description, date, images }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
    };

    return (
        <div className="flex flex-col items-center">
            <div className="w-full md:w-1/2">
                <Slider {...settings}>

                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Exhibition ${name} Image ${index + 1}`}
                            className="max-h-96 max-w-xl w-auto mb-4 rounded-md"
                        />
                    ))}
                </Slider>
            </div>
            <div className="w-full md:w-1/2 pl-0 md:pl-8">
                <h3 className="text-xl font-bold mb-2 text-white ">{name}</h3>
                <p className="mb-4 text-gray-300">{description}</p>
                <p className="text-gray-400">{date}</p>
            </div>
        </div>
    );
};

export default Exhibition;
