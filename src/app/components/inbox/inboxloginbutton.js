"use client";
import { Button } from "@/shadcomponents/ui/button";
import { useRouter } from "next/navigation";

export default function InboxLoginButton({ userId }) {
  const router = useRouter();
  return (
    <>
      <Button
        onClick={() =>
          router.push(`http://localhost:8080/auth/gmail-data/${userId}`)
        }
      >
        Connect to Google
      </Button>
    </>
  );
}
