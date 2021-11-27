import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { BsFillFileEarmarkExcelFill } from 'react-icons/bs';
import contactsActions from '../../redux/actions';
import { getVisibleContacts } from '../../redux/selectors';
import s from './ContactList.module.css';

export default function ContactsList() {
  const contacts = useSelector(getVisibleContacts);
  const dispatch = useDispatch();

  return (
    <ul className={s.list}>
      {contacts.map(({ name, id, number }) => (
        <li key={id} className={s.item}>
          <p className={s.text}>{name}:</p>
          <span>{number}</span>
          <button
            className={s.button}
            onClick={() => dispatch(contactsActions.deleteContact(id))}
          >
            <BsFillFileEarmarkExcelFill className={s.button} />
          </button>
        </li>
      ))}
    </ul>
  );
}

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
  onDeleteContact: PropTypes.func,
};
