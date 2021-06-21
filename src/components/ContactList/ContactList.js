import PropTypes from 'prop-types';
import styles from './ContactList.module.css';

const ContactList = ({ filteredContacts, onDeleteContact }) => (
  <ul className={styles.ContactList}>
    {filteredContacts.map(({ id, name, number }) => (
      <li className={styles.ContactList_item} key={id}>
        <p className={styles.ContactList_text}>{name}</p>
        <p className={styles.ContactList_text}>{number}</p>
        <button
          className={styles.button}
          type="button"
          onClick={() => onDeleteContact(id)}
        >
          Delete
        </button>
      </li>
    ))}
  </ul>
);

ContactList.propTypes = {
  filteredContacts: PropTypes.array.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactList;
