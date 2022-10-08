import React from 'react';
import { ContactsItem } from './Contacts.styled';
import { InputFilter } from '../Input/InputFilter/inputFilter';
import { LabelFilter } from '../Label/LabelFilter/LabelFilter';
import { ButtonDelete } from '../Button/ButtonDelete/ButtonDelete';
import PropTypes from 'prop-types';
import { useGetContactsQuery } from 'redux/contactsApi';
import { useSelector } from 'react-redux';

export const Contacts = ({ name }) => {
  const { data } = useGetContactsQuery();
  const filter = useSelector(state => state.filter);
  const normolizeFilter = filter.toLowerCase();
  const visibleContacts = data.filter(contact =>
    contact.name.toLowerCase().includes(normolizeFilter)
  );
  return (
    <ContactsItem>
      <p>{name}</p>
      <LabelFilter title="Find contacts by name">
        <InputFilter />
      </LabelFilter>
      <ul>
        {visibleContacts.map(data => (
          <li key={data.id}>
            <span>
              {data.name} {data.number}
            </span>
            <ButtonDelete id={data.id} />
          </li>
        ))}
      </ul>
    </ContactsItem>
  );
};

Contacts.propTypes = {
  name: PropTypes.string.isRequired,
};
