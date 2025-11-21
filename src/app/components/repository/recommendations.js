"use server";

import { cookies } from "next/headers";
import { Carousel } from "@/shadcomponents/ui/carousel";
import RecommendationsClient from "./recommendationClient";

export default async function Recommendations() {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8080";
  const cookieStore = await cookies();
  const userId = cookieStore.get("user_id")?.value;
  const access = cookieStore.get("access_token")?.value;

  let responses = { matches: [] };
  try {
    const res = await fetch(
      `${API_BASE}/repository/match-professors?userId=${encodeURIComponent(
        userId ?? ""
      )}`,
      {
        method: "GET",
        headers: access ? { Authorization: `Bearer ${access}` } : {},
        next: { revalidate: 3600 },
        cache: "force-cache",
      }
    );
    if (res.ok) {
      responses = await res.json();
    } 
  } catch (e) {
    
  }

  const matches = Array.isArray(responses?.matches) ? responses.matches : [];

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 md:px-6">
      <div className="pb-6">
        <Carousel
          opts={{ align: "start", loop: matches.length > 5, slidesToScroll: 1 }}
          className="font-main relative"
        >
          <RecommendationsClient
            matches={matches}
            userId={userId}
            access={access}
          />
        </Carousel>
      </div>
    </div>
  );
}
