import './App.css';
import React, { useState, useEffect } from "react";

import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import api from "../api/contacts";

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);

  //Retrieve Contacts
  const retrieveContacts = async () => {
    const response = api.get("/contacts");
    return (await response).data;

  }

  const addContactHandler = async (contact) => {
    let x = Math.floor((Math.random() * 100) + 1);
    console.log(contact);

    const request = {
      id: x,
      ...contact
    };
    const response = await api.post("/contacts", request)
    console.log(response);
    setContacts([...contacts, response.data]);
  };


  const removeContactHandler = async  (id) => {
    await api.delete(`/contacts/${id}`);
    
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);
  }

  useEffect(() => {
    // const retrieveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // if (retrieveContacts) setContacts(retrieveContacts);

    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if (allContacts) setContacts(allContacts);
    };

    getAllContacts();

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
            element={<ContactList contacts={contacts} getContactId={removeContactHandler} />}
          />
          <Route path="/add"
            element={<AddContact addContactHandler={addContactHandler} />} />
        </Routes>

        {/* <AddContact addContactHandler={addContactHandler} />
        <ContactList contacts={contacts} getContactId={removeContactHandler} /> */}
      </Router>

    </div>
  );
}
export default App;
