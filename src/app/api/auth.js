import axios from 'axios'

export async function handleRegister(formData) {
    if (!formData) {
      throw new Error("Please fill in all required fields.");
    }
    try {
      const response = await fetch('http://localhost:8080/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || 'Registration failed.');
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error during registration:", error);
      throw error;
    }
  }

export async function verifyOtp (formData) {
    if (!formData?.code) {
        throw new Error("Code Required")
    }
    if (formData) {
        try {
            const response = await axios.post('http://localhost:8080/auth/verify-code', formData) 
            return response.data
        } catch {
            console.error("Please Send Valid Code")
        }
    }
}


export async function resendCode() {
    if (formData) {
        try {
            const response = await axios.post('https', formData) 
            return response
        } catch {
            console.error("Please Send Valid Form")
        }
    }
}
 
