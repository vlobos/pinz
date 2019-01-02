/* Create database and define tables */

CREATE DATABASE pinz;

USE pinz;

CREATE TABLE games(
  id INT(6) auto_increment,
  player VARCHAR(30),
  frame_one VARCHAR(30),
  frame_two VARCHAR(30),
  frame_three VARCHAR(30),
  frame_four VARCHAR(30),
  frame_five VARCHAR(30),
  frame_six VARCHAR(30),
  frame_seven VARCHAR(30),
  frame_eight VARCHAR(30),
  frame_nine VARCHAR(30),
  frame_ten VARCHAR(30),
  score VARCHAR(6),
  PRIMARY KEY (id)
  );