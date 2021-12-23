import { useState, useEffect } from 'react';
import './App.css';
import { nanoid } from 'nanoid';
import { Form } from './components/Form';
import { Filter } from './components/Filter';
import { ContactsList } from './components/ContactsList';

const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);

  const [filter, setFilter] = useState('');
  const [filteredContacts, setFilteredContacts] = useState([...contacts]);

  const onFormSubmit = data => {
    addContact(data);
  };
  const handleChange = event => {
    setFilter(event.target.value);
  };

  function addContact(data) {
    console.log(data);
    const contact = {
      id: nanoid(),
      ...data,
    };
    verifyContact(data)
      ? alert(`${data.name} is already in contacts`)
      : setContacts([contact, ...contacts]);
    /* this.setState(prevState => ({
          contacts: [contact, ...prevState.contacts],
        })); */
  }
  function verifyContact(data) {
    const sameName = contacts.some(contact => contact.name === data.name);
    return sameName;
  }

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

  const deletContact = id => {
    setContacts([...contacts.filter(contact => contact.id !== id)]);
    /* this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    })); */
  };

  return (
    <div className="App">
      <h1 className="main-title">Phonebook</h1>
      <Form onSubmit={onFormSubmit} />

      <h2 className="title">Contacts</h2>

      <Filter filter={handleChange} value={filter} />
      <ContactsList contacts={filteredContacts} deletFunc={deletContact} />
    </div>
  );
};

/* class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };
  onFormSubmit = data => {
    this.addContact(data);
  };
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  addContact = data => {
    console.log(data)
    const contact = {
      id: nanoid(),
      ...data,
    };
    this.verifyContact(data)
      ? alert(`${data.name} is already in contacts`)
      : this.setState(prevState => ({
          contacts: [contact, ...prevState.contacts],
        }));
  };
  verifyContact = data => {
    const sameName = this.state.contacts.some(
      contact => contact.name === data.name,
    );
    return sameName;
  };

  filterContacts = () => {
    const editFilter = this.state.filter.toLowerCase();
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(editFilter),
    );
  };
  deletContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const filteredContacts = this.filterContacts();

    return (
      <div className="App">
        <h1 className="main-title">Phonebook</h1>
        <Form onSubmit={this.onFormSubmit} />

        <h2 className="title">Contacts</h2>

        <Filter filter={this.handleChange} value={this.state.filter} />
        <ContactsList
          contacts={filteredContacts}
          deletFunc={this.deletContact}
        />
      </div>
    );
  }
} */

export default App;
