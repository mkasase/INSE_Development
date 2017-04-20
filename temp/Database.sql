
create database if not exists bookit;

CREATE TABLE `event` (
 `E_ID` int(11) NOT NULL AUTO_INCREMENT,
 `event_Name` varchar(40) NOT NULL,
 `eDate` date NOT NULL,
 `location` varchar(40) NOT NULL,
 `capacity` int(11) NOT NULL,
 `descrp` varchar(300) NOT NULL,
 `image` varchar(45) DEFAULT NULL,
 PRIMARY KEY (`E_ID`)
);

CREATE TABLE `ticket` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `event_name` varchar(45) NOT NULL,
 `event_date` date NOT NULL,
 `user_name` varchar(45) NOT NULL,
 `user_id` int(11) NOT NULL,
 `event_img` varchar(100) DEFAULT NULL,
 PRIMARY KEY (`id`)
);

CREATE TABLE `user` (
 `U_ID` int(11) NOT NULL AUTO_INCREMENT,
 `fName` varchar(20) NOT NULL,
 `lName` varchar(20) NOT NULL,
 `dob` date NOT NULL,
 `address` varchar(45) DEFAULT NULL,
 `email` varchar(45) NOT NULL,
 `phoneNum` varchar(30) DEFAULT NULL,
 `password` varchar(20) DEFAULT NULL,
 `profile_ref` varchar(100) DEFAULT NULL,
 PRIMARY KEY (`U_ID`)
);

INSERT INTO `user` (`U_ID`, `fName`, `lName`, `dob`, `address`, `email`, `phoneNum`, `password`, `profile_ref`) VALUES ('1', 'James', 'Test', '1996/10/26', '1 Street', 'test@test.com', '123456789', 'test', NULL);

INSERT INTO `user` (`U_ID`, `fName`, `lName`, `dob`, `address`, `email`, `phoneNum`, `password`, `profile_ref`) VALUES ('2', 'Alfred', 'Peterson', '1965/02/02', '1 Street', 'alf@pet.com', '123456789', 'alf', NULL);

INSERT INTO `event` (`E_ID`, `event_Name`, `eDate`, `location`, `capacity`, `descrp`, `image`) VALUES ('1', 'Deadmau5 Live', '2017/11/22', 'Portsmouth Guildhall', '200', 'Deadmau5 takes the stage for a night of the SESH!', 'deadmau5.jpg');
INSERT INTO `event` (`E_ID`, `event_Name`, `eDate`, `location`, `capacity`, `descrp`, `image`) VALUES ('2', 'Shaun\'s Savage Sesh', '2017/04/29', 'Portsmouth University Libary', '1000', 'Shaun sets it off with a large mix of educational hits!', 'shaunevent.png');
INSERT INTO `event` (`E_ID`, `event_Name`, `eDate`, `location`, `capacity`, `descrp`, `image`) VALUES ('3', 'Harry\'s Wild Ride', '2017/12/12', 'BK1.01', '50', 'Light vibes before Christmas', 'harryevent.jpg');
