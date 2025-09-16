"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

import DropdownYear from "../components/dropdowns/dropdownyear";
import DropdownMajor from "../components/dropdowns/dropdownmajor";
import DropdownInterests from "../components/dropdowns/dropdowninterests";

import { useSavedStore } from "../store/useSavedStore";
import { useAppliedStore } from "../store/useAppliedStore";

import {
  Info,
  ShieldCheck,
  AlertCircle,
  Loader2,
  GraduationCap,
} from "lucide-react";

export default function RegisterClientWrapper({ access }) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    student_major: "",
    student_year: "",
    student_interests: [],
    student_acceptedterms: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [attempted, setAttempted] = useState(false);

  const resetSavedStore = useSavedStore((s) => s.resetPoints);
  const resetAppliedStore = useAppliedStore((s) => s.resetPoints);

  // Simple client-side validation
  const errors = useMemo(() => {
    const e = {};
    if (!formData.student_year) e.student_year = "Select your year.";
    if (!formData.student_major) e.student_major = "Select your major.";
    if (!formData.student_interests?.length)
      e.student_interests = "Pick at least one interest.";
    if (!formData.student_acceptedterms)
      e.student_acceptedterms = "Please accept the terms to continue.";
    return e;
  }, [formData]);

  const isValid = useMemo(() => Object.keys(errors).length === 0, [errors]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAttempted(true);
    setSubmitError("");

    if (!isValid) return;

    const payload = {
      student_year: formData.student_year,
      student_major: formData.student_major,
      student_interests: formData.student_interests,
      student_acceptedterms: formData.student_acceptedterms,
    };

    try {
      setSubmitting(true);
      const base = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8080";
      const res = await fetch(`${base}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        let msg = "Registration failed.";
        try {
          const data = await res.json();
          if (data?.message) msg = data.message;
        } catch {}
        setSubmitError(msg);
        return;
      }

      resetAppliedStore();
      resetSavedStore();
      router.push("/repository");
    } catch {
      setSubmitError("Internal server error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl mx-auto font-sans"
      noValidate
    >
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="">
          <div className="px-6 py-5 flex items-center gap-3">
            <div className = "flex flex-col gap-2">
              <h1 className="font-playfair font-semibold text-3xl">
                Welcome!
              </h1>

              <p className="text-sm text-gray-600">
                We will tailor professor recommendations and outreach to your
                profile.
              </p>
            </div>
          </div>
        </div>

        <div className="px-6 py-2 space-y-5">
          

          <FieldGroup
            label="Year of study"
            error={attempted ? errors.student_year : undefined}
          >
            <DropdownYear
              name="student_year"
              value={formData.student_year}
              onChange={(val) =>
                setFormData((p) => ({ ...p, student_year: val }))
              }
            />
          </FieldGroup>

          <FieldGroup
            label="Major"
            error={attempted ? errors.student_major : undefined}
          >
            <DropdownMajor
              name="student_major"
              value={formData.student_major}
              onChange={(val) =>
                setFormData((p) => ({ ...p, student_major: val }))
              }
            />
          </FieldGroup>

          <FieldGroup
            label="Research interests"
            hint="Choose a few topics so we can find better matches."
            error={attempted ? errors.student_interests : undefined}
          >
            <DropdownInterests
              name="student_interests"
              value={formData.student_interests}
              onChange={(val) =>
                setFormData((p) => ({ ...p, student_interests: val }))
              }
            />
          </FieldGroup>

          <div className="flex items-start gap-3">
            <input
              id="terms"
              type="checkbox"
              name="student_acceptedterms"
              checked={formData.student_acceptedterms}
              onChange={(e) =>
                setFormData((p) => ({
                  ...p,
                  student_acceptedterms: e.target.checked,
                }))
              }
              className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#529CCA] focus:ring-[#529CCA]"
            />
            <label htmlFor="terms" className="text-sm text-gray-700">
              I agree to the{" "}
              <a
                className="underline hover:opacity-80"
                href="/terms"
                target="_blank"
                rel="noreferrer"
              >
                terms
              </a>{" "}
              and{" "}
              <a
                className="underline hover:opacity-80"
                href="/privacy"
                target="_blank"
                rel="noreferrer"
              >
                privacy policy
              </a>
              .
              {attempted && errors.student_acceptedterms && (
                <div className="flex items-center gap-1 text-red-500 text-xs mt-1">
                  <AlertCircle className="h-3.5 w-3.5" />
                  <span>{errors.student_acceptedterms}</span>
                </div>
              )}
            </label>
          </div>

          {/* Submit error */}
          {submitError && (
            <div
              role="alert"
              className="flex items-start gap-2 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-red-700 text-sm"
            >
              <AlertCircle className="h-4 w-4 mt-0.5" />
              <div>{submitError}</div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t bg-white flex items-center justify-between">
          <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500">
            <ShieldCheck className="h-4 w-4" />
            Your info helps us personalize matches and emails.
          </div>

          <button
            type="submit"
            disabled={!isValid || submitting}
            className="inline-flex items-center gap-2 bg-[#529CCA] hover:bg-[#4087b1] disabled:opacity-60 disabled:hover:bg-[#529CCA] active:bg-[#357396] text-white text-sm font-medium px-4 py-2 rounded-md transition-colors"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving…
              </>
            ) : (
              "Continue"
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

function FieldGroup({ label, hint, error, children }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-800">{label}</label>
        {hint ? <span className="text-xs text-gray-500">{hint}</span> : null}
      </div>
      <div className="rounded-md">{children}</div>
      {error ? (
        <div className="flex items-center gap-1 text-red-500 text-xs">
          <AlertCircle className="h-3.5 w-3.5" />
          <span>{error}</span>
        </div>
      ) : null}
    </div>
  );
}
