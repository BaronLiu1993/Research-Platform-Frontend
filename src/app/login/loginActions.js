"use server"

export default async function loginAction(prevState, formData) {
    const email = formData.get("email");
    const password = formData.get("password");
    if (!email || !password) {
        return { error: 'Please Input an Email and Password'}
    }

    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        return { success: true}
      }

      if (!response.ok) {
        return { error: 'Invalid Email or Password' }
      }
    } catch (err) {
        return { error: `Server Error. Please Try Again Later` }
    }
  }
