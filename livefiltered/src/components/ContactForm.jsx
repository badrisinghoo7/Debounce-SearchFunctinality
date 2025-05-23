import React, { useState } from 'react';

function ContactForm({ addContact }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [tags, setTags] = useState('');
  const [favorite, setFavorite] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newContact = {
      id: Date.now(),
      name,
      email,
      tags: tags.split(',').map(tag => tag.trim()),
      favorite,
    };
    addContact(newContact);
    setName('');
    setEmail('');
    setTags('');
    setFavorite(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
      <input placeholder="Tags (comma separated)" value={tags} onChange={e => setTags(e.target.value)} />
      <label>
        <input type="checkbox" checked={favorite} onChange={() => setFavorite(!favorite)} /> Favorite
      </label>
      <button type="submit">Add Contact</button>
    </form>
  );
}

export default ContactForm;
