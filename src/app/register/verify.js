"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { verifyOtp, resendCode } from "../api/auth";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/shadcomponents/ui/input-otp";

export default function VerifyOtp({ email }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const router = useRouter();
  async function handleVerify() {
    setIsVerifying(true);
    try {
      await verifyOtp({ email, code });
      setError("");
      router.push("/login"); 
    } catch (err) {
      setError("Invalid code. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  }

  return (
    <div className="flex flex-col items-center font-sans justify-center mt-20 space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-xl font-semibold">Check your inbox</h2>
        <p className="text-xs text-gray-500">
          We sent code to your UofT email.
        </p>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700 text-center">
          Enter the 6-digit code
        </label>

        <InputOTP maxLength={6} value={code} onChange={setCode}>
          <InputOTPGroup>
            {[...Array(6)].map((_, i) => (
              <InputOTPSlot key={i} index={i} />
            ))}
          </InputOTPGroup>
        </InputOTP>

        {error && <p className="text-sm text-red-500 text-center">{error}</p>}

        <button
          disabled={isVerifying || code.length < 6}
          onClick={handleVerify}
          className="w-full bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isVerifying ? "Verifying..." : "Continue"}
        </button>

        <button
          type="button"
          onClick={() => resendCode(email)}
          className="text-sm text-blue-500 hover:underline mt-2"
        >
          Resend Code
        </button>
      </div>
    </div>
  );
}
