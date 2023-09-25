import './App.css';
import React from "react";

import Header from "./Header";
import AddContact  from  "./AddContact";
import ContactList from  "./ContactList";

function App() {
  const contacts = [
 {
  id:"1",
  name : "David",
  email: "xyx@yopmail.com"
 }
  ];
  return (
    <div className="App">
     <Header />
     <AddContact/>
     {/* <ContactList /> */}
    </div>
  );
}

export default App;
