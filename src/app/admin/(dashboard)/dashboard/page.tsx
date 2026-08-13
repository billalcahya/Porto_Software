import React from "react";
import Link from "next/link";
import { Briefcase, BookOpen, Code2, MessageSquare, ArrowUpRight, Activity, Users, Eye, TrendingUp, MapPin, Globe } from "lucide-react";
import { StatsCard } from "@/components/admin/StatsCard";
import connectDB from "@/lib/db";
import Portfolio from "@/models/Portfolio";
import BlogPost from "@/models/BlogPost";
import Service from "@/models/Service";
import ContactMessage from "@/models/ContactMessage";
import ActivityLog from "@/models/ActivityLog";
import PageVisit from "@/models/PageVisit";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import { IContactMessage, IActivityLog } from "@/types";

export const dynamic = "force-dynamic";

interface ILocationStat {
  _id: { city: string; country: string; countryCode: string };
  count: number;
  lastVisit: Date;
}

export default async function AdminDashboardPage() {
  let totalPortfolios = 0, totalBlogs = 0, totalServices = 0, totalMessages = 0, publishedBlogs = 0, draftBlogs = 0;
  let totalVisitors = 0, todayVisitors = 0, totalUniqueVisitors = 0, todayUniqueVisitors = 0;
  let recentMessages: IContactMessage[] = [], recentActivities: IActivityLog[] = [];
  let locationStats: ILocationStat[] = [];

  try {
    await connectDB();

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const [
      tp, tb, ts, tm, pb, db, rm, ra,
      totVisits, todVisits, totUniq, todUniq,
      locAgg
    ] = await Promise.all([
      Portfolio.countDocuments(),
      BlogPost.countDocuments(),
      Service.countDocuments(),
      ContactMessage.countDocuments(),
      BlogPost.countDocuments({ status: "PUBLISHED" }),
      BlogPost.countDocuments({ status: "DRAFT" }),
      ContactMessage.find().sort({ createdAt: -1 }).limit(5).lean(),
      ActivityLog.find().sort({ timestamp: -1 }).limit(6).lean(),
      PageVisit.countDocuments(),
      PageVisit.countDocuments({ timestamp: { $gte: startOfToday } }),
      PageVisit.distinct("ip"),
      PageVisit.distinct("ip", { timestamp: { $gte: startOfToday } }),
      PageVisit.aggregate([
        {
          $group: {
            _id: { city: "$city", country: "$country", countryCode: "$countryCode" },
            count: { $sum: 1 },
            lastVisit: { $max: "$timestamp" },
          },
        },
        { $sort: { count: -1 } },
        { $limit: 6 },
      ]),
    ]);

    totalPortfolios = tp;
    totalBlogs = tb;
    totalServices = ts;
    totalMessages = tm;
    publishedBlogs = pb;
    draftBlogs = db;
    totalVisitors = totVisits;
    todayVisitors = todVisits;
    totalUniqueVisitors = totUniq.length;
    todayUniqueVisitors = todUniq.length;
    recentMessages = JSON.parse(JSON.stringify(rm));
    recentActivities = JSON.parse(JSON.stringify(ra));
    locationStats = JSON.parse(JSON.stringify(locAgg));
  } catch (err) {
    console.warn("Dashboard DB offline:", err);
  }

  return (
    <div className="space-y-8">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <StatsCard
          title="Pengunjung Hari Ini"
          value={todayVisitors}
          description={`${todayUniqueVisitors} Pengunjung Unik`}
          iconName="trending-up"
          color="amber"
        />
        <StatsCard
          title="Total Pengunjung"
          value={totalVisitors}
          description={`${totalUniqueVisitors} Total Unik`}
          iconName="users"
          color="purple"
        />
        <StatsCard title="Total Portofolio" value={totalPortfolios} description="Studi kasus dipublikasi" iconName="briefcase" color="blue" />
        <StatsCard title="Artikel Blog" value={totalBlogs} description={`${publishedBlogs} Terbit, ${draftBlogs} Draf`} iconName="book-open" color="indigo" />
        <StatsCard title="Layanan Aktif" value={totalServices} description="Layanan teknologi utama" iconName="code" color="cyan" />
        <StatsCard title="Pesan Kontak" value={totalMessages} description="Pertanyaan klien masuk" iconName="message-square" color="emerald" />
      </div>

      {/* Visitor Location Analytics & Recent Data Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Visitor Geolocation Breakdown */}
        <div className="rounded-2xl p-6 bg-zinc-900 border border-zinc-800 shadow-md space-y-4 lg:col-span-1">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-400" />
              Lokasi Pengunjung (Geolocation)
            </h3>
            <Badge variant="outline" className="bg-zinc-800 text-amber-300 border-amber-500/30 text-[10px] font-mono">
              REAL-TIME
            </Badge>
          </div>

          <div className="space-y-3">
            {locationStats.length === 0 ? (
              <div className="text-center text-zinc-500 py-10 text-xs">
                <Globe className="w-8 h-8 mx-auto mb-2 text-zinc-700 animate-pulse" />
                Belum ada data kunjungan.
                <br />
                Buka landing page untuk mulai mencatat lokasi.
              </div>
            ) : (
              locationStats.map((loc, idx) => {
                const percentage = totalVisitors > 0 ? Math.round((loc.count / totalVisitors) * 100) : 0;
                return (
                  <div key={idx} className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold font-mono flex items-center justify-center">
                          {loc._id.countryCode || "ID"}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white leading-none">{loc._id.city || "Jakarta"}</div>
                          <div className="text-[10px] text-zinc-500 mt-0.5">{loc._id.country || "Indonesia"}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-mono font-bold text-amber-300">{loc.count} Visit</div>
                        <div className="text-[10px] text-zinc-500 font-mono">{percentage}% Total</div>
                      </div>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-amber-400 h-1.5 rounded-full transition-all duration-500" style={{ width: `${percentage}%` }} />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Recent Messages */}
        <div className="rounded-2xl p-6 bg-zinc-900 border border-zinc-800 shadow-md space-y-4 lg:col-span-1">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-blue-400" />
              Pesan Kontak Terbaru
            </h3>
            <Link href="/admin/messages" className="text-xs text-blue-400 hover:underline flex items-center gap-1">
              View All <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentMessages.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-zinc-500 py-6">
                    Belum ada pesan masuk.
                  </TableCell>
                </TableRow>
              ) : (
                recentMessages.map((msg, idx) => (
                  <TableRow key={msg._id || idx}>
                    <TableCell className="font-semibold text-white">
                      <div>{msg.name}</div>
                      <div className="text-[11px] text-zinc-500 font-mono">{msg.email}</div>
                    </TableCell>
                    <TableCell className="text-xs text-zinc-300">{msg.service || "General"}</TableCell>
                    <TableCell>
                      <Badge variant={msg.status === "NEW" ? "glow" : "secondary"}>{msg.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Recent System Activity Logs */}
        <div className="rounded-2xl p-6 bg-zinc-900 border border-zinc-800 shadow-md space-y-4 lg:col-span-1">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-indigo-400" />
              Audit Trail & Aktivitas
            </h3>
            <Link href="/admin/activity-logs" className="text-xs text-indigo-400 hover:underline flex items-center gap-1">
              View All <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentActivities.length === 0 ? (
              <p className="text-center text-zinc-500 text-xs py-6">Belum ada aktivitas tercatat.</p>
            ) : (
              recentActivities.map((act, idx) => (
                <div key={act._id || idx} className="flex items-start justify-between p-3 rounded-xl bg-zinc-950/80 border border-zinc-800/80 text-xs">
                  <div>
                    <span className="font-semibold text-blue-400">{act.userName}</span> executed{" "}
                    <span className="font-mono text-white px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700">{act.action}</span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500 shrink-0 ml-2">{formatDate(act.timestamp || new Date())}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
