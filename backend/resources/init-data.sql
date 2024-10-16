-- Drop existing tables if they exist
DROP TABLE IF EXISTS `appointments`;
DROP TABLE IF EXISTS `users`;

-- Create Users table (patients)
CREATE TABLE `users` (
    `user_id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
 `phone` VARCHAR(20) NOT NULL,
 `address_line1` VARCHAR(255) NOT NULL,
 `address_line2` VARCHAR(255) NOT NULL,
 `gender` VARCHAR(10) NOT NULL,
 `dob` DATE NOT NULL
);

-- Create Appointments table
CREATE TABLE `appointments` (
    `appointment_id` INT AUTO_INCREMENT PRIMARY KEY,
    `appointment_date` DATE NOT NULL,
    `appointment_time` TIME NOT NULL,
    `user_id` INT NOT NULL,
    `doctor_id` INT NOT NULL,
     `doctor_name` VARCHAR(255) NOT NULL
);

