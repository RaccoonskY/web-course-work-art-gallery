import React from 'react';


const SocialContacts = () => {
    const locations = [
        {
            name: 'Национальная галерея',
            address: '123 Пушкина, Казань',
            country: 'Россия',
            phone: '+7 123 456 789',
            socialMedia: {
                facebook: 'https://facebook.com',
                twitter: 'https://twitter.com',
                instagram: 'https://instagram.com',
            },
            iconUrls: {
                facebook: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/2048px-2021_Facebook_icon.svg.png',
                twitter: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/512px-Logo_of_Twitter.svg.png?20220821125553',
                instagram: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png',
            },
        },
        // Add more locations here
    ];

    return (
        <section className="bg-gray-100 py-8">
            <div className="mt-10 container mx-auto">
                <h2 className="text-2xl font-bold mb-4">Свяжитесь с нами</h2>
                <div className="flex justify-around flex-wrap">
                    {locations.map((location, index) => (
                        <div
                            key={index}
                            className="h-52 w-72 bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center"
                        >
                            <h3 className="text-lg font-semibold mb-2">{location.name}</h3>
                            <p>{location.address}, {location.country}</p>
                            <p className="mt-4">Телефон: {location.phone}</p>
                            <div className="flex mt-4">
                                {Object.keys(location.socialMedia).map((platform) => (
                                    <a
                                        key={platform}
                                        href={location.socialMedia[platform]}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mr-2"
                                    >
                                        <img
                                            src={location.iconUrls[platform]}
                                            alt={`${platform} icon`}
                                            className="w-6 h-6"
                                        />
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
export default SocialContacts;