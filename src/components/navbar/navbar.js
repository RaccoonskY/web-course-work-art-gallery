import React, { useState } from "react";
import {useNavigate} from "react-router-dom";


import "./navbar.css";
import NavbarItem from "./navbar-item";

import Cookie from "js-cookie";

export default function Navbar() {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleMenuToggle = () => {
        setMenuOpen(!isMenuOpen);
    };

    return (
        <nav className={`navigation ${isMenuOpen ? "open" : ""}`}>
            <div className="menu-toggle" onClick={handleMenuToggle}>
                <p className={"text-xs"}>Меню</p>
            </div>
            <div className={`menu-container ${isMenuOpen ? "open" : ""}`}>
                {window.location.pathname !== '/'
                    && <NavbarItem text="Главная" href='/'></NavbarItem>}
                {Cookie.get('type') === 'admin'
                    && <NavbarItem text="Администрирование" href='/admin'></NavbarItem>}
                {['admin','content manager', 'manager'].includes(Cookie.get('type'))
                    &&  <NavbarItem text="Контент менеджмент" href='/content-manager'></NavbarItem>}
                {['admin', 'manager'].includes(Cookie.get('type'))
                    && <NavbarItem text="Управление" href='/ceo'></NavbarItem>}
                <NavbarItem text={"Контакты"} href='/contacts' ></NavbarItem>
                <NavbarItem text={"Купить билет"} href='/booking' ></NavbarItem>
                <NavbarItem text={"Сотрудникам"} href={'/staff_auth'} ></NavbarItem>
                {Cookie.get('type') &&
                    <button
                        onClick={()=>{
                            if (window.confirm('Вы точно хотите выйти?')){
                                Cookie.remove('type');
                                Cookie.remove('username');
                                navigate('/');
                            }
                        }}
                        className={`block py-2 px-4 rounded hover:bg-blue-700 hover:text-white hover:underline`}>
                        Log Out
                    </button>}
                {Cookie.get('type')&&
                    <h1>{Cookie.get('type')}</h1>}
            </div>
        </nav>
    );
}