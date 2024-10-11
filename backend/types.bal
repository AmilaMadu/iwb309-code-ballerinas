// Type for Appointment
public type MedicalAppointment record {| 
    readonly int appointment_id?;
    string appointment_date;
    string appointment_time;
|};

// Type for User (Patient)
public type User record {| 
    readonly int user_id?;
    string name;
    string password;
    string email;
|};

// Type for Doctor
public type MedicalDoctor record {| 
    readonly int doctor_id?;
    string doctor_name;
    string specialized_area;
    string availability;
    int? appointment_id;  // Optional, as a doctor may not have an appointment yet
|};