// Usage tracking and limits for the excuse generator

export interface UsageStats {
  daily: number;
  weekly: number;
  lastResetDaily: string; // ISO date string
  lastResetWeekly: string; // ISO date string
}

export interface UsageLimits {
  dailyLimit: number;
  weeklyLimit: number;
}

// Free tier limits
export const FREE_LIMITS: UsageLimits = {
  dailyLimit: 3,
  weeklyLimit: 7,
};

// Get current usage stats from localStorage
export function getUsageStats(): UsageStats {
  const stored = localStorage.getItem("excuseUsageStats");
  
  if (stored) {
    try {
      const stats: UsageStats = JSON.parse(stored);
      return resetIfNeeded(stats);
    } catch (error) {
      console.error("Failed to parse usage stats");
    }
  }
  
  // Initialize new stats
  const now = new Date();
  return {
    daily: 0,
    weekly: 0,
    lastResetDaily: now.toISOString(),
    lastResetWeekly: now.toISOString(),
  };
}

// Check if we need to reset counters based on time
function resetIfNeeded(stats: UsageStats): UsageStats {
  const now = new Date();
  const lastDaily = new Date(stats.lastResetDaily);
  const lastWeekly = new Date(stats.lastResetWeekly);
  
  let newStats = { ...stats };
  
  // Reset daily if it's a new day
  if (!isSameDay(now, lastDaily)) {
    newStats.daily = 0;
    newStats.lastResetDaily = now.toISOString();
  }
  
  // Reset weekly if it's been 7+ days
  const daysSinceWeeklyReset = Math.floor(
    (now.getTime() - lastWeekly.getTime()) / (1000 * 60 * 60 * 24)
  );
  
  if (daysSinceWeeklyReset >= 7) {
    newStats.weekly = 0;
    newStats.lastResetWeekly = now.toISOString();
  }
  
  // Save if changed
  if (newStats.daily !== stats.daily || newStats.weekly !== stats.weekly) {
    saveUsageStats(newStats);
  }
  
  return newStats;
}

// Helper to check if two dates are the same day
function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

// Save usage stats to localStorage
function saveUsageStats(stats: UsageStats): void {
  localStorage.setItem("excuseUsageStats", JSON.stringify(stats));
}

// Increment usage counter (call when generating or copying an excuse)
export function incrementUsage(): UsageStats {
  const stats = getUsageStats();
  
  const newStats: UsageStats = {
    ...stats,
    daily: stats.daily + 1,
    weekly: stats.weekly + 1,
  };
  
  saveUsageStats(newStats);
  return newStats;
}

// Check if user has exceeded limits
export function hasExceededLimits(stats: UsageStats): boolean {
  return stats.daily >= FREE_LIMITS.dailyLimit || stats.weekly >= FREE_LIMITS.weeklyLimit;
}

// Check if user can generate more excuses
export function canGenerateExcuse(): boolean {
  const stats = getUsageStats();
  return !hasExceededLimits(stats);
}

// Get remaining excuses
export function getRemainingExcuses(stats: UsageStats): { daily: number; weekly: number } {
  return {
    daily: Math.max(0, FREE_LIMITS.dailyLimit - stats.daily),
    weekly: Math.max(0, FREE_LIMITS.weeklyLimit - stats.weekly),
  };
}

// Track excuse copy attempts to detect duplicates
interface CopyTracker {
  [excuseHash: string]: number;
}

// Simple hash function for excuses
function hashExcuse(excuse: string): string {
  let hash = 0;
  for (let i = 0; i < excuse.length; i++) {
    const char = excuse.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash.toString();
}

// Track when an excuse is copied
export function trackExcuseCopy(excuse: string): number {
  const hash = hashExcuse(excuse);
  const stored = localStorage.getItem("excuseCopyTracker");
  
  let tracker: CopyTracker = {};
  if (stored) {
    try {
      tracker = JSON.parse(stored);
    } catch (error) {
      console.error("Failed to parse copy tracker");
    }
  }
  
  tracker[hash] = (tracker[hash] || 0) + 1;
  localStorage.setItem("excuseCopyTracker", JSON.stringify(tracker));
  
  return tracker[hash];
}

// Get copy count for an excuse
export function getCopyCount(excuse: string): number {
  const hash = hashExcuse(excuse);
  const stored = localStorage.getItem("excuseCopyTracker");
  
  if (!stored) return 0;
  
  try {
    const tracker: CopyTracker = JSON.parse(stored);
    return tracker[hash] || 0;
  } catch (error) {
    return 0;
  }
}
