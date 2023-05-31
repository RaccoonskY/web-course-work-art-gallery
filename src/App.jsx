import React from "react";
import { BrowserRouter as Router, Routes, Route}
  from "react-router-dom";

import Navbar from "./components/navbar/navbar";

import General from "./pages/general";
import StaffAuth from "./pages/staff-auth";
import SocialContacts from "./pages/contacts";
import BookingForm from "./pages/booking";
import AdminPanel from "./pages/admin-panel";
import ContentManager from "./components/content manager/content-manager";
import CEOManager from "./components/ceo manager/ceo-manager";






const App = () => {
  return (
      <div className={'main-content h-full bg-white'}>
          <header>

          </header>
          <Navbar></Navbar>
          <Router>
              <Routes>
                  <Route exact path='/contacts'  element={<SocialContacts />} />
                  <Route exact path='/'  element={<General />} />
                  <Route exact path='/staff_auth'  element={<StaffAuth />} />
                  <Route exact path='/booking'  element={<BookingForm/>} />
                  <Route exact path='/admin'  element={<AdminPanel/>} />
                  <Route exact path='/content-manager'  element={<ContentManager/>} />
                  <Route exact path='/ceo'  element={<CEOManager/>} />
              </Routes>
          </Router>
          <footer>

          </footer>
      </div>
  );
}

export default App;
