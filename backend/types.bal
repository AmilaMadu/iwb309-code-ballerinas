public type UserRecord record {
    int user_id?;
    string email;
    string name?;
    string password;
};

public type UserRecordEdit record {
    int user_id;
    string email;
    string name;
    string phone?;
    string gender?;
    string dob?;
    record { 
        string line1?; 
        string line2?; 
    } address;
};

public type Appointment record {
    string doctor_id;
    string appointment_date;
    string appointment_time;
    int user_id;
    string doctor_name;
};

public type LoginRequest record {
    string email;
    string password;
};

// Define the result type
public type CountRecord record {
    int count;
};