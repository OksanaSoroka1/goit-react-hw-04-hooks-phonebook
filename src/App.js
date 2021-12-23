import { useState, useEffect } from 'react';
import './App.css';
import { nanoid } from 'nanoid';
import { Form } from './components/Form';
import { Filter } from './components/Filter';
import { ContactsList } from './components/ContactsList';
import { contactsArr } from './data/data';

const App = () => {
  const [contacts, setContacts] = useState(contactsArr);
  const [filter, setFilter] = useState('');
  const [filteredContacts, setFilteredContacts] = useState([...contacts]);

  useEffect(() => {
    const parsedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    setFilteredContacts(contacts);
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    const editFilter = filter.toLowerCase();
    setFilteredContacts([
      ...contacts.filter(contact =>
        contact.name.toLowerCase().includes(editFilter),
      ),
    ]);
  }, [filter]);

  function addContact(data) {
    const contact = {
      id: nanoid(),
      ...data,
    };
    contacts.some(contact => contact.name === data.name)
      ? alert(`${data.name} is already in contacts`)
      : setContacts([contact, ...contacts]);
  }

  function handleChange(event) {
    setFilter(event.target.value);
  }

  function deletContact(id) {
    setContacts([...contacts.filter(contact => contact.id !== id)]);
  }

  return (
    <div className="App">
      <h1 className="main-title">Phonebook</h1>
      <Form onSubmit={addContact} />

      <h2 className="title">Contacts</h2>

      <Filter filter={handleChange} value={filter} />
      <ContactsList contacts={filteredContacts} deletFunc={deletContact} />
    </div>
  );
};

export default App;
