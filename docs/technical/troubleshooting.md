# Technical Reference — Troubleshooting

## Common Technical Issues & Log Traces

### 1. MongoDB Connection Failed (`MongooseServerSelectionError`)
- **Diagnostic Trace**: `MongooseServerSelectionError: connect ECONNREFUSED 127.0.0.1:27017`
- **Root Cause**: Local MongoDB daemon is not running or `MONGODB_URI` string points to invalid host.
- **Resolution**: Verify `MONGODB_URI` in `.env`. Ensure IP whitelist in MongoDB Atlas includes target server.

### 2. Next.js Hydration Error in WebGL Component
- **Diagnostic Trace**: `Text content does not match server-rendered HTML.`
- **Root Cause**: Attempting to initialize WebGL canvas before client hydration completes.
- **Resolution**: Ensure canvas component uses `useIsMounted()` hook via `useSyncExternalStore`.

### 3. Build Memory Limit Exceeded
- **Diagnostic Trace**: `JavaScript heap out of memory during next build`
- **Resolution**: Increase Node memory limit when compiling:
  ```bash
  NODE_OPTIONS="--max-old-space-size=4096" npm run build
  ```
