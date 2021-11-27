/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import contactsActions from '../../redux/actions';
import { getContacts } from '../../redux/selectors';
import { IoIosPersonAdd } from 'react-icons/io';
import s from './ContactForm.module.css';

export default function ContactForm() {
  const [name, useName] = useState('');
  const [number, useNumber] = useState('');
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const contactCheck = () => {
    const nameInclude = contacts.reduce(
      (acc, contact) => [...acc, contact.name],
      [],
    );
    const numbersInclude = contacts.reduce(
      (acc, contact) => [...acc, contact.number],
      [],
    );
    if (nameInclude.includes(name) || numbersInclude.includes(number)) {
      alert(`${name}${number} is already in contacts`);
    }
  };

  function handleChange(event) {
    const { name, value } = event.target;

    switch (name) {
      case 'name':
        useName(value);
        break;
      case 'number':
        useNumber(value);
        break;
      default:
        return;
    }
  }
  const handleSubmit = event => {
    if (contactCheck()) {
      return;
    }
    event.preventDefault();
    reset();
    dispatch(contactsActions.addContact({ name, number }));
  };
  const reset = () => {
    useName('');
    useNumber('');
  };

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <label>
        <span>Name</span>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
        />
      </label>
      <label>
        <span>Number</span>
        <input
          type="tel"
          name="number"
          value={number}
          onChange={handleChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
          required
        />
      </label>
      <button className={s.button} type="submit">
        <IoIosPersonAdd size={50} />
      </button>
    </form>
  );
}
