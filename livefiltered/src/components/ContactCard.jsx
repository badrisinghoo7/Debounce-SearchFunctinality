import React from 'react';
import "../App.css"

const ContactCard = React.memo(({ contact, onDelete }) => {
  return (
    <div className="contact-card">
      <div>
        <h3>{contact.name} {contact.favorite && '⭐'}</h3>
        <p>{contact.email}</p>
        <p>Tags: {contact.tags.join(', ')}</p>
      </div>
      <button onClick={() => onDelete(contact.id)}>Delete</button>
    </div>
  );
});

export default ContactCard;
