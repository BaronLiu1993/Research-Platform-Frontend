//Client Side API EndPoints

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
    throw error;
  }
}

export async function verifyOtp(formData) {
  if (!formData?.code) {
    throw new Error("Code Required");
  }

  try {
    const response = await fetch('http://localhost:8080/auth/verify-code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.message || 'Invalid code.');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function resendCode(formData) {
  if (!formData) {
    throw new Error("Form data required");
  }

  try {
    const response = await fetch('http://localhost:8080/auth/resend-code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.message || 'Failed to resend code.');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}
