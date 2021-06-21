import { Component } from 'react';
import shortid from 'shortid';

import ContactForm from './components/ContactForm';
import Filter from './components/Filter';
import ContactList from './components/ContactList';

import styles from './App.module.css';

class App extends Component {
  state = {
    contacts: [],
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

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

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
