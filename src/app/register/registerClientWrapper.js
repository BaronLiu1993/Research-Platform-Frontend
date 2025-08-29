"use client";
import { useState } from "react";
import DropdownYear from "../components/dropdowns/dropdownyear";
import DropdownMajor from "../components/dropdowns/dropdownmajor";
import DropdownInterests from "../components/dropdowns/dropdowninterests";
import { redirect } from "next/navigation";

export default function RegisterClientWrapper({ access }) {
  const [formData, setFormData] = useState({
    student_major: "",
    student_year: "",
    student_interests: [],
    student_acceptedterms: false,
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const payload = {
      student_year: formData.student_year,
      student_major: formData.student_major,
      student_interests: formData.student_interests,
      student_acceptedterms: formData.student_acceptedterms,
    };

    try {
      const response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        setError("Registration failed.");
      } else {
        redirect("/repository");
      }
    } catch {
      setError("Internal Server Error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg flex flex-col gap-6"
    >
      <DropdownYear
        name="student_year"
        value={formData.student_year}
        onChange={(val) =>
          setFormData((prev) => ({ ...prev, student_year: val }))
        }
      />

      <DropdownMajor
        name="student_major"
        value={formData.student_major}
        onChange={(val) =>
          setFormData((prev) => ({ ...prev, student_major: val }))
        }
      />

      <DropdownInterests
        name="student_interests"
        value={formData.student_interests}
        onChange={(val) =>
          setFormData((prev) => ({ ...prev, student_interests: val }))
        }
      />

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="student_acceptedterms"
          checked={formData.student_acceptedterms}
          onChange={(e) =>
            setFormData({
              ...formData,
              student_acceptedterms: e.target.checked,
            })
          }
        />
        <label className="text-sm text-gray-700">
          I agree to the <span className="underline">terms</span> and{" "}
          <span className="underline">privacy policy</span>
        </label>
      </div>

      <button
        type="submit"
        className="bg-[#529CCA] hover:bg-[#4087b1] active:bg-[#357396] px-6 font-sans text-white rounded-xs w-fit py-2 transition-colors duration-200"
      >
        Continue
      </button>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  );
}
