"use server";

import connectDB from "@/lib/db";
import PageVisit from "@/models/PageVisit";
import { headers } from "next/headers";

export async function recordPageVisitAction(path: string) {
  try {
    if (!path || path.startsWith("/admin") || path.startsWith("/api") || path.includes("_next")) {
      return { success: false };
    }

    await connectDB();
    const headersList = await headers();
    const forwardedFor = headersList.get("x-forwarded-for");
    const realIp = headersList.get("x-real-ip");
    const userAgent = headersList.get("user-agent") || "";
    const rawIp = (forwardedFor ? forwardedFor.split(",")[0] : realIp || "127.0.0.1").trim();

    // Check Cloudflare / Vercel geolocation headers first
    let city = headersList.get("x-vercel-ip-city") || headersList.get("cf-ipcity") || "";
    let country = headersList.get("x-vercel-ip-country") || headersList.get("cf-ipcountry") || "";
    let countryCode = headersList.get("x-vercel-ip-country-code") || headersList.get("cf-ipcountry") || "ID";

    // If local development IP, default to Jakarta, Indonesia
    if (!rawIp || rawIp === "127.0.0.1" || rawIp === "::1" || rawIp.startsWith("192.168") || rawIp.startsWith("10.")) {
      city = city || "Jakarta";
      country = country || "Indonesia";
      countryCode = countryCode || "ID";
    } else if (!city || !country) {
      // Free IP Geolocation API lookup for public IPs with quick timeout
      try {
        const geoRes = await fetch(`http://ip-api.com/json/${rawIp}?fields=city,country,countryCode,status`, {
          next: { revalidate: 3600 },
          signal: AbortSignal.timeout(1500),
        });
        if (geoRes.ok) {
          const geoData = await geoRes.json();
          if (geoData.status === "success") {
            city = geoData.city || "Jakarta";
            country = geoData.country || "Indonesia";
            countryCode = geoData.countryCode || "ID";
          }
        }
      } catch {
        city = "Jakarta";
        country = "Indonesia";
        countryCode = "ID";
      }
    }

    const now = new Date();
    const dateString = now.toISOString().split("T")[0];

    await PageVisit.create({
      path,
      ip: rawIp,
      city: city || "Jakarta",
      country: country || "Indonesia",
      countryCode: countryCode || "ID",
      userAgent: userAgent.substring(0, 300),
      dateString,
      timestamp: now,
    });

    return { success: true };
  } catch (err) {
    console.warn("Error recording page visit:", err);
    return { success: false };
  }
}

export async function clearVisitorAnalyticsAction() {
  try {
    await connectDB();
    await PageVisit.deleteMany({});
    return { success: true, message: "Visitor analytics data reset to 0." };
  } catch (err) {
    return { success: false, error: (err as Error).message };
  }
}
