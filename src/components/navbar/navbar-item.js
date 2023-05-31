import React from 'react';

const NavbarItem = ({ href, text }) => {

    return (
        <a href={href} className={`block py-2 px-4 rounded hover:bg-blue-700 hover:text-white hover:underline`}>
            {text}
        </a>
    );
};

export default NavbarItem;