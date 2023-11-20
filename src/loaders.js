const URL = "https://mentbe.onrender.com";

export const PatientLoader = async () => { 
    const response = await fetch(URL + "/patients");
    const data = await response.json();
    return data;
}

export const EmployeeLoader = async () => {
    const response = await fetch(URL + "/employees");
    const data = await response.json();
    return data;
}

export const NewPatientLoader = async () => {
    const response = await fetch(URL + "/newpatients");
    const data = await response.json();
    return data;
}
