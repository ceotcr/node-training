CREATE TABLE authors(
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE genres(
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE users(
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE books(
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    author_id INTEGER NOT NULL,
    genre_id INTEGER NULL,
    FOREIGN KEY(author_id) REFERENCES authors(id)
        ON DELETE CASCADE,
    FOREIGN KEY(genre_id) REFERENCES genres(id)
        ON DELETE SET NULL
);

INSERT INTO authors (name) VALUES ('J.K. Rowling'), ('J.R.R. Tolkien'), ('George R.R. Martin');
INSERT INTO genres (name) VALUES ('Fantasy'), ('Adventure'), ('Sci-Fi');
INSERT INTO users (name, email) VALUES 
('Alice', 'alice@example.com'), 
('Bob', 'bob@example.com'), 
('Charlie', 'charlie@example.com');

INSERT INTO books (title, author_id, genre_id) VALUES 
('Harry Potter and the Philosopher\'s Stone', 1, 1), 
('The Hobbit', 2, 2), 
('A Game of Thrones', 3, 1);