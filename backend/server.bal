import ballerinax/mongodb;

mongodb:Client mongoDb = new ({
    connection: {
        serverAddress: {
            host: "localhost",
            port: 27017
        },
        auth: <mongodb:ScramSha256AuthCredential>{
            username: "yaseemarusiru",
            password: "6?aY7@eR",
            database: "Cluster0"
        }
    }
});

mongodb:Client mongoDb = new ({
    connectionString: "mongodb+srv://yaseemarusiru:6?aY7@eR@cluster0.ldove.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
});