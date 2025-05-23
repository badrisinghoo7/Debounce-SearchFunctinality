import React, { useState, useMemo, useCallback } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useDebounce } from './hooks/useDebouce';
import SearchBar from './components/SearchBar';
import ContactForm from './components/ContactForm';
import ContactCard from './components/ContactCard';
import  "./App.css"


function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 300);

  const addContact = (contact) => {
    setContacts([...contacts, contact]);
  };

  const deleteContact = useCallback((id) => {
    setContacts(contacts.filter((c) => c.id !== id));
  }, [contacts, setContacts]);

  const filteredContacts = useMemo(() => {
    const term = debouncedSearch.toLowerCase();
    return contacts.filter(
      (c) =>
        c.name.toLowerCase().includes(term) ||
        c.tags.some((tag) => tag.toLowerCase().includes(term))
    );
  }, [contacts, debouncedSearch]);

  return (
    <div className="container">
      <h1>Contacts App</h1>
      <SearchBar search={searchTerm} setSearch={setSearchTerm} />
      <ContactForm addContact={addContact} />
      <div className='card-Div'>

      {filteredContacts.map((contact) => (
        <ContactCard key={contact.id} contact={contact} onDelete={deleteContact} />
      ))}
      </div>
    </div>
  );
}

export default App;
