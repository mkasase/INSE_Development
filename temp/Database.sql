CREATE TABLE User(
  U_ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  fName VARCHAR(20) NOT NULL,
  lName VARCHAR(20) NOT NULL,
  dob DATE NOT NULL,
  address VARCHAR(45),
  email VARCHAR(45),
  phoneNum VARCHAR(30),
  password VARCHAR(20),
  UNIQUE(email)
);

CREATE TABLE Event(
  E_ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  NAME VARCHAR(40) NOT NULL,
  Host_ID INT NOT NULL,
  EDate DATE NOT NULL,
  Location VARCHAR(40) NOT NULL,
  Capcaity INT NOT NULL,
  Descr TEXT(300) NOT NULL,
  Image VARCHAR(45) NOT NULL,
);

CREATE TABLE UserEvent(
  U_ID INT NOT NULL,
  E_ID INT NOT NULL,
  FOREIGN KEY (U_ID)
  REFERENCES User(U_ID),
  FOREIGN KEY (E_ID)
  REFERENCES Event(E_ID)
);
