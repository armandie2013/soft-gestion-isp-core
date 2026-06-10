// src/lib/rate-limit.ts

type RateLimitOptions = {
  key: string;
  limit: number;
  windowMs: number;
};

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
};

const store = new Map<string, RateLimitEntry>();

let lastCleanup = 0;

function cleanupExpiredEntries(now: number) {
  if (now - lastCleanup < 60_000) {
    return;
  }

  for (const [key, entry] of store.entries()) {
    if (entry.resetAt <= now) {
      store.delete(key);
    }
  }

  lastCleanup = now;
}

export function checkRateLimit({
  key,
  limit,
  windowMs,
}: RateLimitOptions): RateLimitResult {
  const now = Date.now();

  cleanupExpiredEntries(now);

  const current = store.get(key);

  if (!current || current.resetAt <= now) {
    store.set(key, {
      count: 1,
      resetAt: now + windowMs,
    });

    return {
      allowed: true,
      remaining: Math.max(limit - 1, 0),
      retryAfterSeconds: 0,
    };
  }

  if (current.count >= limit) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.max(
        Math.ceil((current.resetAt - now) / 1000),
        1,
      ),
    };
  }

  current.count += 1;
  store.set(key, current);

  return {
    allowed: true,
    remaining: Math.max(limit - current.count, 0),
    retryAfterSeconds: 0,
  };
}

export function buildRateLimitKey(parts: Array<string | null | undefined>) {
  return parts
    .map((part) => String(part || "unknown").trim().toLowerCase())
    .join(":");
}