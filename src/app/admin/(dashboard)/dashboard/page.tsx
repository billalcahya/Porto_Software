/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import Link from "next/link";
import { Briefcase, BookOpen, Code2, MessageSquare, CheckCircle, FileText, ArrowUpRight, Activity } from "lucide-react";
import { StatsCard } from "@/components/admin/StatsCard";
import connectDB from "@/lib/db";
import Portfolio from "@/models/Portfolio";
import BlogPost from "@/models/BlogPost";
import Service from "@/models/Service";
import ContactMessage from "@/models/ContactMessage";
import ActivityLog from "@/models/ActivityLog";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import { IContactMessage, IActivityLog } from "@/types";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  let totalPortfolios = 0, totalBlogs = 0, totalServices = 0, totalMessages = 0, publishedBlogs = 0, draftBlogs = 0;
  let recentMessages: IContactMessage[] = [], recentActivities: IActivityLog[] = [];

  try {
    await connectDB();

    const [tp, tb, ts, tm, pb, db, rm, ra] = await Promise.all([
      Portfolio.countDocuments(),
      BlogPost.countDocuments(),
      Service.countDocuments(),
      ContactMessage.countDocuments(),
      BlogPost.countDocuments({ status: "PUBLISHED" }),
      BlogPost.countDocuments({ status: "DRAFT" }),
      ContactMessage.find().sort({ createdAt: -1 }).limit(5).lean(),
      ActivityLog.find().sort({ timestamp: -1 }).limit(6).lean(),
    ]);

    totalPortfolios = tp;
    totalBlogs = tb;
    totalServices = ts;
    totalMessages = tm;
    publishedBlogs = pb;
    draftBlogs = db;
    recentMessages = JSON.parse(JSON.stringify(rm));
    recentActivities = JSON.parse(JSON.stringify(ra));
  } catch (err) {
    console.warn("Dashboard DB offline:", err);
  }

  return (
    <div className="space-y-8">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Total Portfolios" value={totalPortfolios} description="Case studies published" iconName="briefcase" color="blue" />
        <StatsCard title="Total Blog Posts" value={totalBlogs} description={`${publishedBlogs} Published, ${draftBlogs} Drafts`} iconName="book-open" color="indigo" />
        <StatsCard title="Active Services" value={totalServices} description="Core technology offerings" iconName="code" color="cyan" />
        <StatsCard title="Total Messages" value={totalMessages} description="Client inquiries received" iconName="message-square" color="emerald" />
      </div>

      {/* Grid 2 Columns: Recent Messages & Activity Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Messages */}
        <div className="rounded-2xl p-6 bg-zinc-900 border border-zinc-800 shadow-md space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-blue-400" />
              Recent Contact Inquiries
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
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentMessages.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-zinc-500 py-6">
                    No messages received yet.
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
                    <TableCell className="text-xs font-mono text-zinc-500">{formatDate(msg.createdAt || new Date())}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Recent System Activity Logs */}
        <div className="rounded-2xl p-6 bg-zinc-900 border border-zinc-800 shadow-md space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-indigo-400" />
              Audit Trail & Activity Logs
            </h3>
            <Link href="/admin/activity-logs" className="text-xs text-indigo-400 hover:underline flex items-center gap-1">
              View All <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentActivities.length === 0 ? (
              <p className="text-center text-zinc-500 text-xs py-6">No recent activity recorded.</p>
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
