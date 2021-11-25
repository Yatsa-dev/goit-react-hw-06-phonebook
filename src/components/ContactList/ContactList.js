import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BsFillFileEarmarkExcelFill } from 'react-icons/bs';
import contactsActions from '../../redux/actions';
import s from './ContactList.module.css';

function ContactsList({ contacts, onDeleteContact }) {
  return (
    <ul className={s.list}>
      {contacts.map(({ name, id, number }) => (
        <li key={id} className={s.item}>
          <p className={s.text}>{name}:</p>
          <span>{number}</span>
          <button className={s.button} onClick={() => onDeleteContact(id)}>
            <BsFillFileEarmarkExcelFill className={s.button} />
          </button>
        </li>
      ))}
    </ul>
  );
}
const getVisibleContacts = (allContacts, filter) => {
  const normalizedFilter = filter.toLowerCase();
  return allContacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter),
  );
};

const mapStateToProps = ({ contacts: { items, filter } }) => ({
  contacts: getVisibleContacts(items, filter),
});

const mapDispatchToProps = dispatch => ({
  onDeleteContact: id => dispatch(contactsActions.deleteContact(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactsList);

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string.isRequired)),
  onDeleteContact: PropTypes.func.isRequired,
};
