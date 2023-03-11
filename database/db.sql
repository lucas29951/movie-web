CREATE DATABASE IF NOT EXISTS mydisk_db;

USE mydisk_db;


CREATE TABLE media_file (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(100) NOT NULL,
  years VARCHAR(15) NOT NULL,
  released date NOT NULL,
  genre VARCHAR(50) NOT NULL,
  director VARCHAR(60) NOT NULL,
  actors VARCHAR(255) NOT NULL,
  plot VARCHAR(255) NOT NULL,
  poster VARCHAR(255) NOT NULL,
  data_type VARCHAR(25) NOT NULL,
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

ALTER TABLE media_file ADD years VARCHAR(15) NOT NULL AFTER title;

DESCRIBE media_file;


INSERT INTO media_file (id, title, years, released, genre, director, actors, plot, poster, data_type) 
  VALUES (1, 'Tenet', '2020', '2020-09-03', 'Action, Sci-Fi, Thriller', 'Christopher Nolan', 
          'John David Washington, Robert Pattinson, Elizabeth Debicki', 
          'Armed with only one word, Tenet, and fighting for the survival of the entire world, 
          a Protagonist journeys through a twilight world of international espionage on a mission 
          that will unfold in something beyond real time.', 
          'https://m.media-amazon.com/images/M/MV5BMzU3YWYwNTQtZTdiMC00NjY5LTlmMTMtZDFlYTEyODBjMTk5XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg',
          'movie');

SELECT * FROM media_file;


CREATE TABLE user (
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(20) NOT NULL,
  password VARCHAR(60) NOT NULL,
  fullname VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)
);

DESCRIBE user;

INSERT INTO user (id, username, password, fullname) VALUES (1,'lucas29951','********','Lucas Rodriguez');


SELECT * FROM user;