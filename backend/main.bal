// import ballerina/io;
// import ballerina/sql;

// // Define the SQL Client
// sql:Client dbClient = check sql:Client("jdbc:mysql://localhost:3306/doctor_appointment_system", 
//     "root", "amilaMa@123MYSQL");

// public function main() returns error? {
//     // Define the SQL Client
//     sql:Client dbClient = check sql:Client("jdbc:mysql://localhost:3306/doctor_appointment_system", 
//         "root", "amilaMa@123MYSQL");

//     // Example: Query the database (make sure to replace with your actual SQL query)
//     sql:Result result = check dbClient->select("doctor_appointment_systeme");

//     // Process the result
//     check result.forEach(function(sql:Row row) {
//         io:println(row);
//     });
// }
