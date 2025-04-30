"use server";

export default async function registerActions(prevState, formData) {
  const data = Object.fromEntries(formData.entries());

  const {
    student_email,
    student_password,
    student_firstname,
    student_lastname,
    student_year,
    student_major,
    student_interests,
    student_acceptedterms,
  } = data;

  // Basic validation
  if (
    !student_email ||
    !student_password ||
    !student_firstname ||
    !student_lastname ||
    !student_year ||
    !student_major ||
    !student_interests ||
    !student_acceptedterms
  ) {
    return { error: "Please fill out the form completely." };
  }

  const payload = {
    student_email,
    student_password,
    student_firstname,
    student_lastname,
    student_year,
    student_major,
    student_interests: student_interests
      .split(",")
      .map((item) => item.trim()), 
    student_acceptedterms: student_acceptedterms === true,
  };

  try {
    const response = await fetch("http://localhost:8080/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      return { success: true };
    } else {
      return { error: "Registration failed. Please try again." };
    }
  } catch (err) {
    return { error: "Server error. Please try again later." };
  }
}
