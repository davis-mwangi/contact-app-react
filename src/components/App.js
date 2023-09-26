import './App.css';
import React, { useState, useEffect } from "react";

import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const LOCAL_STORAGE_KEY = "contacts";

  const [contacts, setContacts] = useState([]);

  const addContactHandler = (contact) => {
    let x = Math.floor((Math.random() * 100) + 1);
    setContacts([...contacts, { id: x, ...contact }]);
    console.log(contact);
  };


  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);
  }

  useEffect(() => {
    const retrieveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (retrieveContacts) setContacts(retrieveContacts);
  }, []);


  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className="ui container">
      <Router>
        {/* <Header /> */}
        <Routes>
          <Route path="/"
            element={ <ContactList contacts={contacts} getContactId={removeContactHandler} /> } 
          />
          <Route path="/add" 
            element={ <AddContact addContactHandler={addContactHandler} /> } />
        </Routes>

        {/* <AddContact addContactHandler={addContactHandler} />
        <ContactList contacts={contacts} getContactId={removeContactHandler} /> */}
      </Router>

    </div>
  );
}
export default App;
