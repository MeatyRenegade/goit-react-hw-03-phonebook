import { Component } from 'react';
import shortid from 'shortid';

import ContactForm from './components/ContactForm';
import Filter from './components/Filter';
import ContactList from './components/ContactList';

import styles from './App.module.css';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  duplicateContactCheck = subContact => {
    const value = subContact.name.toLowerCase();
    const nameCheck = this.state.contacts.find(contact =>
      contact.name.toLowerCase().includes(value),
    );

    nameCheck
      ? alert(`${nameCheck.name} is already in contacts`)
      : this.addContact(subContact);
  };

  addContact = subContact => {
    const contact = {
      id: shortid.generate(),
      ...subContact,
    };

    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
  };

  handleChange = e => {
    const { value } = e.currentTarget;
    this.setState({ filter: value });
  };

  handleFilteredContacts = () => {
    const { filter, contacts } = this.state;

    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { filter } = this.state;
    const filteredContacts = this.handleFilteredContacts();

    return (
      <>
        <div className={styles.App}>
          <h1 className={styles.header}>Phonebook</h1>
          <ContactForm onSubmit={this.duplicateContactCheck} />

          <h2 className={styles.header}>Contacts</h2>
          <Filter value={filter} onChange={this.handleChange} />
          <ContactList
            filteredContacts={filteredContacts}
            onDeleteContact={this.deleteContact}
          />
        </div>
      </>
    );
  }
}

export default App;
