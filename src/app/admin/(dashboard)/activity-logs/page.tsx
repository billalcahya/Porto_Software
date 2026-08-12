import connectDB from "@/lib/db";
import ActivityLog from "@/models/ActivityLog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import { IActivityLog } from "@/types";

export const dynamic = "force-dynamic";

export default async function AdminActivityLogsPage() {
  let logs: IActivityLog[] = [];
  try {
    await connectDB();
    const logDocs = await ActivityLog.find().sort({ timestamp: -1 }).limit(100).lean();
    logs = JSON.parse(JSON.stringify(logDocs));
  } catch (err) {
    console.warn("Activity logs DB offline:", err);
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">System Audit & Activity Logs</h2>
        <p className="text-xs text-zinc-400">Track all administrative mutations, user logins, and content updates.</p>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User Name</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Entity Affected</TableHead>
            <TableHead>Timestamp</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-zinc-500 py-8">
                No activity logs recorded yet.
              </TableCell>
            </TableRow>
          ) : (
            logs.map((log: IActivityLog) => (
              <TableRow key={log._id}>
                <TableCell className="font-semibold text-white">{log.userName}</TableCell>
                <TableCell>
                  <span className="font-mono text-xs text-blue-400 px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/30">
                    {log.action}
                  </span>
                </TableCell>
                <TableCell className="text-xs text-zinc-300 font-mono">{log.entity} ({log.entityId || "N/A"})</TableCell>
                <TableCell className="text-xs font-mono text-zinc-500">{formatDate(log.timestamp || new Date())}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
