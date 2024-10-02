import ballerinax/mongodb;
import ballerina/log;
import ballerina/io;

public function main() returns error? {
    // Fetch credentials from environment variables for security
    string? dbUser = io:getEnv("MONGO_DB_USER");
    string? dbPassword = io:getEnv("MONGO_DB_PASSWORD");
    string authDatabase = "Cluster0"; // Or fetch from env if it varies

    // Validate that credentials are provided
    if dbUser is () || dbPassword is () {
        return error("MongoDB credentials are not set in environment variables.");
    }

    // Define authentication credentials
    mongodb:ScramSha256AuthCredential authCred = {
        username: <string> dbUser,
        password: <string> dbPassword,
        database: authDatabase
    };

    // Define connection configuration
    mongodb:ConnectionConfig connConfig = {
        serverAddress: {
            host: "localhost",
            port: 27017
        },
        auth: authCred
    };

    // Initialize MongoDB client with ConnectionConfig
    mongodb:Client mongoDb = check new (connConfig);

    // Ensure that the MongoDB client is closed when the function exits
    defer {
        var closeResult = mongoDb->close();
        if closeResult is error {
            log:printError("Error while closing MongoDB client.", closeResult);
        } else {
            log:printInfo("MongoDB client closed successfully.");
        }
    }

    log:printInfo("Connected to MongoDB successfully.");

    // Get the Database
    mongodb:Database db = check mongoDb->getDatabase("your_database_name");

    // Get the Collection
    mongodb:Collection collection = check db->getCollection("your_collection_name");

    // Perform a Find operation on the Collection
    var findResult = collection->find({});

    if (findResult is json) {
        log:printInfo("Find result: " + findResult.toString());
    } else {
        log:printError("Find operation failed.", findResult);
    }

    return;
}