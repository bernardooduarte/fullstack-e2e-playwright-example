CREATE TABLE IF NOT EXISTS items (
  id SERIAL PRIMARY KEY,
  name TEXT
);

INSERT INTO items (name) VALUES ('Item 1'), ('Item 2');