import React, { useState, useEffect, useCallback } from "react";
import "./App.css";

const users = [
  { name: { first: "Alice", last: "Johnson" }, email: "alice@example.com" },
  { name: { first: "Bob", last: "Smith" }, email: "bobsmith@example.com" },
  { name: { first: "Charlie", last: "Brown" }, email: "charlieb@example.com" },
  { name: { first: "David", last: "Lee" }, email: "davidl@example.com" },
];

// Utility: Get all values from nested object
const deepValues = (obj) =>
  Object.values(obj).flatMap((val) =>
    typeof val === "object" ? deepValues(val) : val.toString().toLowerCase()
  );

// Debounce Hook
const useDebounce = (value, delay = 300) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
};

// Throttle
const throttle = (fn, limit = 500) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Highlight matched keyword
const highlight = (text, keyword) => {
  const regex = new RegExp(`(${keyword})`, "gi");
  return text.replace(regex, "<span class='highlight'>$1</span>");
};

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const debouncedQuery = useDebounce(query, 300);

  // Search Logic
  useEffect(() => {
    const q = debouncedQuery.toLowerCase().trim();
    if (!q) return setResults([]);

    const filtered = users.filter((user) =>
      deepValues(user).some((val) => val.includes(q))
    );

    setResults(filtered);
  }, [debouncedQuery]);

  // Throttle scroll/resize log
  useEffect(() => {
    const logResize = throttle(() => {
      console.log("Resized:", new Date().toLocaleTimeString());
    }, 500);

    const logScroll = throttle(() => {
      console.log("Scrolled:", new Date().toLocaleTimeString());
    }, 500);

    window.addEventListener("resize", logResize);
    window.addEventListener("scroll", logScroll);
    return () => {
      window.removeEventListener("resize", logResize);
      window.removeEventListener("scroll", logScroll);
    };
  }, []);

  return (
    <div className="container">
      <input
        type="text"
        placeholder="Search users..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {query && (
        <div className="dropdown">
          {results.length ? (
            results.map((user, idx) => {
              const fullName = `${user.name.first} ${user.name.last}`;
              const email = user.email;
              return (
                <div className="dropdown-item" key={idx}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: highlight(fullName, debouncedQuery),
                    }}
                  />
                  <small
                    dangerouslySetInnerHTML={{
                      __html: highlight(email, debouncedQuery),
                    }}
                  />
                </div>
              );
            })
          ) : (
            <div className="dropdown-item">No results found</div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
