import ballerina/http;
import ballerina/log;
import ballerina/sql;

@http:ServiceConfig {
    cors: {         
        allowOrigins: ["http://localhost:5173"],
        allowMethods: ["GET", "POST", "OPTIONS", "DELETE"]
    }
}
service /backend on new http:Listener(9090) {

    resource function post users(http:Caller caller, http:Request req) returns error? {
        
        // Get the new user object from the request
        json payload = check req.getJsonPayload();
        UserRecord newUser = check payload.fromJsonWithType(UserRecord);

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
            //log:printError("Database query failed", queryError);
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
        // Parse the login payload
        json payload = check req.getJsonPayload();
        LoginRequest loginUser = check payload.fromJsonWithType(LoginRequest);

        // Define the parameterized query to fetch the user by email
        sql:ParameterizedQuery query = `SELECT user_id, email, name, password FROM users WHERE email = ${loginUser.email}`;

        // Execute the query and retrieve a stream of UserRecord
        stream<UserRecord, sql:Error?> resultStream = dbClient->query(query, UserRecord);

        // Initialize a variable to store the user record
        UserRecord? userRecord = ();

        // Get the next result from the stream
        var nextResult = resultStream.next();
        if nextResult is record {| UserRecord value; |} {
            // If a record is found, assign it to userRecord
            userRecord = nextResult.value;

            // Check if the password matches
            if userRecord is UserRecord && (userRecord.password == loginUser.password) {
                // Respond with success and user details
                json successResponse = {
                    "message": "Login successful",
                    "user": {
                        "email": userRecord.email,
                        "name": userRecord.name,
                        "user_id": userRecord.user_id
                    }
                };
                check caller->respond(successResponse);
            } else {
                // Respond with unauthorized if the password does not match
                json unauthorizedResponse = { "message": "Invalid email or password" };
                check caller->respond(unauthorizedResponse);
            }
        } else if nextResult is sql:Error {
            // Log the error if the query failed
            log:printError("Error executing query: " + nextResult.toString());
            json errorResponse = { "message": "Internal Server Error" };
            check caller->respond(errorResponse);
        } else {
            // Handle case where no user was found
            json unauthorizedResponse = { "message": "Invalid email or password" };
            check caller->respond(unauthorizedResponse);
            }
    }

    // Add new appointment 
    isolated resource function post appointments(http:Caller caller, http:Request req) returns error? {
        // Parse the appointment details from the request body
        json payload = check req.getJsonPayload();
        Appointment appointmentEntry = check payload.fromJsonWithType(Appointment);

        // Insert the new appointment into the database
        sql:ParameterizedQuery insertQuery = `INSERT INTO appointments (doctor_id, appointment_date, appointment_time, user_id, doctor_name) 
                                            VALUES (${appointmentEntry.doctor_id}, 
                                                    ${appointmentEntry.appointment_date}, 
                                                    ${appointmentEntry.appointment_time}, 
                                                    ${appointmentEntry.user_id},
                                                    ${appointmentEntry.doctor_name})`;

        sql:ExecutionResult execResult = check dbClient->execute(insertQuery);

        // Check if the insert was successful
        if execResult.affectedRowCount > 0 {
            // Respond with success
            json successResponse = { "message": "Appointment booked successfully" };
            check caller->respond(successResponse);
        } else {
            // Respond with an error if insert failed
            json errorResponse = { "message": "Internal Server Error" };
            check caller->respond(errorResponse);
        }
    }

    resource function post update_user(http:Caller caller, http:Request req) returns error? {
        // Get the updated user data from the request
        json payload = check req.getJsonPayload();
        log:printInfo("Incoming payload: " + payload.toString());
        UserRecordEdit updatedUser = check payload.fromJsonWithType(UserRecordEdit);
        
        // Query to update the user record in the database
        sql:ParameterizedQuery updateQuery = `UPDATE users SET name = ${updatedUser.name}, 
                                                email = ${updatedUser.email}, 
                                                phone = ${updatedUser.phone}, 
                                                gender = ${updatedUser.gender}, 
                                                dob = ${updatedUser.dob}, 
                                                address_line1 = ${updatedUser.address.line1}, 
                                                address_line2 = ${updatedUser.address.line2} 
                                            WHERE user_id = ${updatedUser.user_id}`;

        sql:ExecutionResult result = check dbClient->execute(updateQuery);

        if result.affectedRowCount > 0 {
            // Respond with success if the update was successful
            json successResponse = { "message": "Profile updated successfully" };
            check caller->respond(successResponse);
        } else {
            // Respond with an error if no rows were updated
            json errorResponse = { "message": "Failed to update profile" };
            check caller->respond(errorResponse);
        }
    }

    resource function get appointments/[string user_id](http:Caller caller, http:Request req) returns error? {
        // Correcting the query parameter
        sql:ParameterizedQuery query = `SELECT * FROM appointments WHERE user_id = ${user_id}`;

        // Create a result object to store fetched appointments
        stream<Appointment, sql:Error?> result = dbClient->query(query, Appointment);
        json[] appointments = [];

        // Iterate through the results and build the JSON array
        check from var row in result
            do {
                log:printInfo("Recieved requests for appointments");
                json appointment = {
                    "doctor_id": row["doctor_id"], // Assuming you store doctor name in the appointment table or JOIN doctors table
                    "appointment_date": row["appointment_date"],
                    "appointment_time": row["appointment_time"],
                    "doctor_name": row["doctor_name"] // Assuming you store doctor name in the appointment table or JOIN doctors table
                };
                appointments.push(appointment);
            };

        // If no appointments found, respond with a message
        if appointments.length() == 0 {
            json notFoundResponse = { "message": "No appointments found for this user." };
            check caller->respond(notFoundResponse);
            return;
        }

        // Send the appointments array as a JSON response
        check caller->respond(appointments);
    }

    resource function get booked_slots/[string doctor_id]/[string appointment_date](http:Caller caller, http:Request req) returns error? {
        //log:printInfo("Received request for booked slots");
        sql:ParameterizedQuery query = `SELECT appointment_time FROM appointments WHERE doctor_id = ${doctor_id} AND appointment_date = ${appointment_date}`;
        
        // Create a result object to store booked slots
        stream<record {| string appointment_time; |}, sql:Error?> result = dbClient->query(query);
        json[] bookedSlots = [];

        // Iterate through the results and build the JSON array
        check from var row in result
            do {
                bookedSlots.push(row["appointment_time"].toString());
            };
        log:printInfo("Date backend:" +bookedSlots.toString());
        // Send the booked slots array as a JSON response
        check caller->respond(bookedSlots);
    }   

    resource function delete appointments/[int user_id]/[string doctor_id]/[string appointment_date]/[string appointment_time](http:Caller caller, http:Request req) returns error? {
        // Define the query to delete the appointment
        sql:ParameterizedQuery deleteQuery = `DELETE FROM appointments 
                                            WHERE user_id = ${user_id} 
                                            AND doctor_id = ${doctor_id}
                                            AND appointment_date = ${appointment_date}
                                            AND appointment_time = ${appointment_time}`;

        // Execute the query
        sql:ExecutionResult result = check dbClient->execute(deleteQuery);

        // Check if any rows were affected (appointment was deleted)
        if result.affectedRowCount > 0 {
            // Respond with success
            json successResponse = { "message": "Appointment canceled successfully" };
            check caller->respond(successResponse);
        } else {
            // Respond with a message if no rows were affected (no appointment found)
            json notFoundResponse = { "message": "Appointment not found or already canceled" };
            check caller->respond(notFoundResponse);
        }
    }

    resource function get doctors(http:Caller caller, http:Request req) returns error? {
    sql:ParameterizedQuery query = `SELECT doctor_id, name, specialization, fees FROM doctors`;

    // Create a result object to store fetched appointments
    stream<Doctor, sql:Error?> result = dbClient->query(query, Doctor);
    json[] doctors = [];
    
    // Iterate through the results and build the JSON array
    check from var row in result
        do {
            json doctor = {
                "doctor_id": row["doctor_id"],
                "name": <json>row["name"],
                "speciality": <json>row["specialization"],
                "fees" : <json>row["fees"]
            };
            doctors.push(doctor);
        };

    // Send the doctors array as a JSON response
    check caller->respond(doctors);
    return;
}

}