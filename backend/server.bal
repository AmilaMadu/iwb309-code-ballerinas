import ballerinax/mongodb;

mongodb:Client mongoDb = new ({
    connection: {
        serverAddress: {
            host: "localhost",
            port: 27017
        },
        auth: <mongodb:ScramSha256AuthCredential>{
            username: <username>,
            password: <password>,
            database: <admin-database>
        }
    }
});