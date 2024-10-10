// import ballerina/http;
// import ballerina/sql;

// @http:ServiceConfig {
//     cors: {         
//         allowOrigins: ["http://localhost:3306"],
//         allowMethods: ["GET", "POST", "OPTIONS"]
//     }
//     // auth: [
//     //     {
//     //         jwtValidatorConfig: {
//     //             issuer: "wso2",
//     //             audience: "ballerina",
//     //             signatureConfig: {
//     //                 certFile: "resources/public.crt"
//     //             }
//     //         },
//     //         scopes: ["admin"]
//     //     }
//     // ]
// }
// service /appointments on new http:Listener(9090) {

//     // Get all appointments
//     isolated resource function get appointments() returns Appointment[]|error {
//         return getAllAppointments();
//     };

//     // Get appointment by ID
//     //    isolated resource function get cargos/[string cargoId]/orders() returns Order[]|error {
//     isolated resource function get appointments/[int appointmentId]/appointments() returns Appointment|http:NotFound|http:InternalServerError {
//         Appointment|sql:Error appointmentEntry = fetchAppointmentById(appointmentId);
//         if appointmentEntry is Appointment {
//             return appointmentEntry;
//         }
//         if (appointmentEntry is sql:NoRowsError) {
//             return <http:NotFound>{body: {message: "Appointment not found"}};
//         }
//         return <http:InternalServerError>{body: {message: "Error occurred while retrieving the appointment"}};
//     };

//     // Get all doctors
//     isolated resource function get doctors() returns Doctor[]|error {
//         return selectAllDoctors();
//     };

//     // Get doctor by ID
//     isolated resource function get doctors/[int doctorId]() returns Doctor|http:NotFound|http:InternalServerError {
//         Doctor|sql:Error doctorEntry = fetchDoctorById(doctorId);
//         if doctorEntry is Doctor {
//             return doctorEntry;
//         }
//         if (doctorEntry is sql:NoRowsError) {
//             return <http:NotFound>{body: {message: "Doctor not found"}};
//         }
//         return <http:InternalServerError>{body: {message: "Error occurred while retrieving the doctor"}};
//     };

//     // Add new appointment
//     isolated resource function post appointments(Appointment appointmentEntry) returns http:Ok|http:InternalServerError {
//         sql:ExecutionResult|error result = addAppointment(appointmentEntry);
//         if result is sql:ExecutionResult {
//             return http:OK;
//         }
//         return http:INTERNAL_SERVER_ERROR;
//     };

//     // Add new doctor
//     isolated resource function post doctors(Doctor doctorEntry) returns http:Ok|http:InternalServerError {
//         sql:ExecutionResult|error result = addDoctor(doctorEntry);
//         if result is sql:ExecutionResult {
//             return http:OK;
//         }
//         return http:INTERNAL_SERVER_ERROR;
//     };
// }

// // Database functions

// isolated function getAllAppointments() returns Appointment[]|sql:Error {
//     // Implement logic to fetch all appointments from the database
//     // Example SQL query: "SELECT * FROM appointments"
//     return [];
// }

// isolated function fetchAppointmentById(int appointmentId) returns Appointment|sql:Error {
//     // Implement logic to fetch appointment by ID from the database
//     // Example SQL query: "SELECT * FROM appointments WHERE appointment_id = ?"
//     return error("Function not implemented");
// }

// isolated function fetchAllDoctors() returns Doctor[]|sql:Error {
//     // Implement logic to fetch all doctors from the database
//     // Example SQL query: "SELECT * FROM doctors"
//     return [];
// }

// isolated function fetchDoctorById(int doctorId) returns Doctor|sql:Error {
//     // Implement logic to fetch doctor by ID from the database
//     // Example SQL query: "SELECT * FROM doctors WHERE doctor_id = ?"
//     return error("Function not implemented");
// }

// isolated function addAppointment(Appointment appointmentEntry) returns sql:ExecutionResult|sql:Error {
//     // Implement logic to insert new appointment into the database
//     // Example SQL query: "INSERT INTO appointments (appointment_date, appointment_time) VALUES (?, ?)"
//     return error("Function not implemented"); // Placeholder return statement
// }

// isolated function addDoctor(Doctor doctorEntry) returns sql:ExecutionResult|sql:Error {
//     // Implement logic to insert new doctor into the database
//     // Example SQL query: "INSERT INTO doctors (doctor_name, specialized_area, availability, appointment_id) VALUES (?, ?, ?, ?)"
//     return error("Function not implemented"); // Placeholder return statement
// }


import ballerina/http;
import ballerina/log;
import ballerina/sql;

// Define the UserRecord type
public type UserRecord record {
    string email;
    string name;
    string password;
};


// Define the result type
public type CountRecord record {
    int count;
};

@http:ServiceConfig {
    cors: {         
        allowOrigins: ["http://localhost:3306"],
        allowMethods: ["GET", "POST", "OPTIONS"]
    }
}
service /backend on new http:Listener(9090) {

    resource function post users(http:Caller caller, http:Request req) returns error? {
        
        // Get the new user object from the request
        json payload = check req.getJsonPayload();
        User newUser = check payload.fromJsonWithType(User);



        // Query the database to check if the user already exists using a parameterized query
        sql:ParameterizedQuery query = `SELECT COUNT(*) AS count FROM users WHERE email = ${newUser.email} OR name = ${newUser.name}`;
        stream<CountRecord, sql:Error?> resultStream = dbClient->query(query, CountRecord);

        // Initialize result variable
        CountRecord? result = ();
        sql:Error? queryError = ();

        // Iterate through the result stream
        var nextResult = resultStream.next();
        while nextResult is CountRecord? {
            result = nextResult;
            nextResult = resultStream.next();
        }
        if nextResult is sql:Error {
            queryError = nextResult;
        }

        if queryError is sql:Error {
            // Handle the error
            log:printError("Database query failed", queryError);
            json errorResponse = { "message": "Internal Server Error" };
            check caller->respond(errorResponse);
            return;
        } else if result?.count > 0 {
            // Respond with conflict if user exists
            json conflictResponse = { "message": "User already exists" };
            check caller->respond(conflictResponse);
            return;
        }

        // Insert the new user into the database
        sql:ParameterizedQuery insertQuery = `INSERT INTO users (email, name, password) VALUES (${newUser.email}, ${newUser.name}, ${newUser.password})`;
        sql:ExecutionResult execResult = check dbClient->execute(insertQuery);

        // Check if the insert was successful
        if execResult.affectedRowCount > 0 {
            // Respond with success
            json successResponse = { "message": "User created successfully" };
            check caller->respond(successResponse);
        } else {
            // Respond with internal server error if the insert failed
            json errorResponse = { "message": "Internal Server Error" };
            check caller->respond(errorResponse);
        }
    }
    resource function post login(http:Caller caller, http:Request req) returns error? {
        
        // Get the login details from the request
        json payload = check req.getJsonPayload();
        User loginUser = check payload.fromJsonWithType(User);

        // Query the database to retrieve the user details
        sql:ParameterizedQuery query = `SELECT email, name, password FROM users WHERE email = ${loginUser.email}`;
        stream<UserRecord, sql:Error?> resultStream = dbClient->query(query, UserRecord);

        // Initialize result variable
        UserRecord? result = ();
        sql:Error? queryError = ();

        var nextResult = resultStream.next();
        while nextResult is UserRecord? {
            result = nextResult;
            nextResult = resultStream.next();
        }
        if nextResult is sql:Error {
            queryError = nextResult;
        }

        if (queryError is sql:Error) {
            // Handle the error
            log:printError("Database query failed", queryError);
            json errorResponse = { "message": "Internal Server Error" };
            check caller->respond(errorResponse);
            return;
        } else if (result is UserRecord) {
            // Check if the password matches
            if (result.password == loginUser.password) {
                // Respond with success and user details
                json successResponse = { "message": "Login successful", "user": { "email": result.email, "name": result.name } };
                check caller->respond(successResponse);
            } else {
                // Respond with unauthorized if the password does not match
                json unauthorizedResponse = { "message": "Invalid email or password" };
                check caller->respond(unauthorizedResponse);
            }
        } else {
            // Respond with unauthorized if the user does not exist
            json unauthorizedResponse = { "message": "Invalid email or password" };
            check caller->respond(unauthorizedResponse);
        }
    }

}
