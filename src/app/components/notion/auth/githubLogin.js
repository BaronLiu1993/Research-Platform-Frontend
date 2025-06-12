"use client";
import { Button } from "@/shadcomponents/ui/button";
import { useRouter } from "next/navigation";

export default function GithubLoginButton({ link }) {
  const router = useRouter();
  return (
    <>
      <Button
        onClick={() =>
          router.push(link.link)
        }
      >
        Connect to Github
      </Button>
    </>
  );
}
