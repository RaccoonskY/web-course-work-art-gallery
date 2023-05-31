import React, { useState } from "react";
import "./navbar.css";
import NavbarItem from "./navbar-item";

export default function Navbar() {
    const [isMenuOpen, setMenuOpen] = useState(false);

    const handleMenuToggle = () => {
        setMenuOpen(!isMenuOpen);
    };

    return (
        <nav className={`navigation ${isMenuOpen ? "open" : ""}`}>
            <div className="menu-toggle" onClick={handleMenuToggle}>
                <p className={"text-xs"}>Меню</p>
            </div>
            <div className={`menu-container ${isMenuOpen ? "open" : ""}`}>
                {window.location.pathname !== '/' && <NavbarItem text="Главная" href='/'></NavbarItem>}
                <NavbarItem text="Администрирование" href='/admin'></NavbarItem>
                <NavbarItem text="Контент менеджмент" href='/content-manager'></NavbarItem>
                <NavbarItem text="Управление" href='/ceo'></NavbarItem>
                <NavbarItem text={"Контакты"} href='/contacts' ></NavbarItem>
                <NavbarItem text={"Купить билет"} href='/booking' ></NavbarItem>
                <NavbarItem text={"Сотрудникам"} href={'/staff_auth'} ></NavbarItem>
{/*                <NavbarItem text={"Выставки"} ></NavbarItem>
                <NavbarItem text={"Коллекции"} ></NavbarItem>*/}
            </div>
        </nav>
    );
}