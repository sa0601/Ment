import axios from "axios";
const URL = "https://mentbe.onrender.com";

//PATIENTS
export const createPatient = async (patientData) => {
    try {
        await axios.post(`${URL}/newpatients/register`, patientData);
        console.log("Patient created successfully");
        // Redirect or handle success (You might use client-side routing here)
    } catch (error) {
        console.error("Error creating patient:", error.response?.data || error.message);
        // Handle errors
    }
};

export const updatePatient = async (patientId, patientData) => {
    try {
        await axios.put(`${URL}/newpatients/${patientId}`, patientData);
        console.log("Patient updated successfully");
        // Redirect or handle success
    } catch (error) {
        console.error("Error updating patient:", error.response?.data || error.message);
        // Handle errors
    }
};

export const deletePatient = async (patientId) => {
    try {
        await axios.delete(`${URL}/newpatients/${patientId}`);
        console.log("Patient deleted successfully");
        // Redirect or handle success
    } catch (error) {
        console.error("Error deleting patient:", error.response?.data || error.message);
        // Handle errors
    }
};

// APPOINTMENTS
export const addAppointment = async (patientId, appointmentData) => {
    try {
        await axios.post(`${URL}/newpatients/${patientId}/appointments`, appointmentData);
        console.log("Appointment added successfully");
        // Redirect or handle success
    } catch (error) {
        console.error("Error adding appointment:", error.response?.data || error.message);
        // Handle errors
    }
};

export const updateAppointment = async (patientId, appointmentId, appointmentData) => {
    try {
        await axios.put(`${URL}/newpatients/${patientId}/appointments/${appointmentId}`, appointmentData);
        console.log("Appointment updated successfully");
        // Redirect or handle success
    } catch (error) {
        console.error("Error updating appointment:", error.response?.data || error.message);
        // Handle errors
    }
};

export const deleteAppointment = async (patientId, appointmentId) => {
    try {
        await axios.delete(`${URL}/newpatients/${patientId}/appointments/${appointmentId}`);
        console.log("Appointment deleted successfully");
        // Redirect or handle success
    } catch (error) {
        console.error("Error deleting appointment:", error.response?.data || error.message);
        // Handle errors
    }
};

//EMPLOYEES
export const createEmployee = async (employeeData) => {
    try {
        await axios.post(`${URL}/employees/signup`, employeeData);
        console.log("Employee created successfully");
        // Redirect or handle success (You might use client-side routing here)
    } catch (error) {
        console.error("Error creating employee:", error.response?.data || error.message);
        // Handle errors
    }
}

export const updateEmployee = async (employeeId, employeeData) => {
    try {
        await axios.put(`${URL}/employees/${employeeId}`, employeeData);
        console.log("Employee updated successfully");
        // Redirect or handle success
    } catch (error) {
        console.error("Error updating employee:", error.response?.data || error.message);
        // Handle errors
    }
}

export const deleteEmployee = async (employeeId) => {
    try {
        await axios.delete(`${URL}/employees/${employeeId}`);
        console.log("Employee deleted successfully");
        // Redirect or handle success
    } catch (error) {
        console.error("Error deleting employee:", error.response?.data || error.message);
        // Handle errors
    }
}