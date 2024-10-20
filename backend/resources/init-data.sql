USE doctor_appointment_system;

-- Drop existing tables if they exist
DROP TABLE IF EXISTS `appointments`;
DROP TABLE IF EXISTS `doctors`;
DROP TABLE IF EXISTS `users`;

-- Create Users table
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address_line1` varchar(255) DEFAULT NULL,
  `address_line2` varchar(255) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  PRIMARY KEY (`user_id`)
);

-- Create Appointments table
CREATE TABLE `appointments` (
  `appointment_id` int NOT NULL AUTO_INCREMENT,
  `appointment_date` date NOT NULL,
  `appointment_time` time NOT NULL,
  `user_id` int DEFAULT NULL,
  `doctor_id` int DEFAULT NULL,
  `doctor_name` longtext,
  PRIMARY KEY (`appointment_id`)
);

-- Create Doctors table
CREATE TABLE `doctors` (
  `doctor_id` int DEFAULT NULL,
  `name` text,
  `specialization` text,
  `phone_number` int DEFAULT NULL,
  `email` text,
  `available_timeslot` text,
  `fees` int DEFAULT NULL
);

LOCK TABLES `doctors` WRITE;
INSERT INTO `doctors` VALUES (1,'Dr. Dilanka Fernando','General physician',725485758,'dila21@gmail.com',NULL,2000),(2,'Dr. Lakshman Amarasinghe','Dermatologist',775896785,'lakshmanA@gmail.com',NULL,3000),(3,'Dr. Nalinda Athukorala','Neurologist',745874125,'naliarc@gmail.com',NULL,2500),(4,'Dr. Nuwan Perera','Cardiologist',777454574,'nuwan95@gmail.com',NULL,3500),(5,'Dr. Tharindu Jayasekara','General physician',704152632,'tharindu123@gmail.com',NULL,4000),(6,'Dr. Prasanna Samarasinghe','Dermatologist',714587896,'prasannasamara123@gmail.com',NULL,2400),(7,'Dr. Mohan Siriwardana','Neurologist',758465254,'mohasiri@gmail.com',NULL,3200),(8,'Dr. Malini Rathnayaka','Neurologist',785698325,'malrathnayaka@gmail.com',NULL,2600),(9,'Dr. Tharanga Karunathilaka','General physician',741258963,'tharangax@gmail.com',NULL,2550),(10,'Dr. Nalin Wijesinghe','Dermatologist',752147896,'nalinwije@gmail.com',NULL,3200);
UNLOCK TABLES;