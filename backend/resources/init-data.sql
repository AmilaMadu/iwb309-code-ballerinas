-- Drop existing tables if they exist
DROP TABLE IF EXISTS `Appointments`;
DROP TABLE IF EXISTS `Doctors`;
DROP TABLE IF EXISTS `Users`;

-- Create Users table (patients)
CREATE TABLE `Users` (
    `user_id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL
);

-- Create Doctors table
CREATE TABLE `Doctors` (
    `doctor_id` INT AUTO_INCREMENT PRIMARY KEY,
    `doctor_name` VARCHAR(255) NOT NULL,
    `specialized_area` VARCHAR(255),
    `availability` VARCHAR(255)
);

-- Create Appointments table
CREATE TABLE `Appointments` (
    `appointment_id` INT AUTO_INCREMENT PRIMARY KEY,
    `appointment_date` DATE NOT NULL,
    `appointment_time` TIME NOT NULL,
    `user_id` INT NOT NULL,
    `doctor_id` INT NOT NULL,
    FOREIGN KEY (`user_id`) REFERENCES `Users`(`user_id`),
    FOREIGN KEY (`doctor_id`) REFERENCES `Doctors`(`doctor_id`)
);

-- Sample data for Users
INSERT INTO `Users` (name, password, email) VALUES
    ('John Doe', 'password123', 'john.doe@example.com'),
    ('Jane Smith', 'mypassword', 'jane.smith@example.com');

-- Sample data for Doctors
INSERT INTO `Doctors` (doctor_name, specialized_area, availability) VALUES
    ('Dr. Alice', 'Cardiology', 'Monday to Friday'),
    ('Dr. Bob', 'Dermatology', 'Monday, Wednesday, Friday');

-- Sample data for Appointments
INSERT INTO `Appointments` (appointment_date, appointment_time, user_id, doctor_id) VALUES
    ('2024-10-10', '10:00:00', 1, 1),
    ('2024-10-11', '14:30:00', 2, 2);
