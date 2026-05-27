export const CACHE_TTL = {
  SHORT: 60 * 1000, // 60 seconds
  MEDIUM: 5 * 60 * 1000, // 5 minutes
  LONG: 60 * 60 * 1000, // 1 hour
};

export const CACHE_KEYS = {
  VENUE_LIST: (query: any) => `venues_list_${JSON.stringify(query)}`,
  VENUE_DETAIL: (id: string) => `venue_${id}`,
  
  EVENT_LIST: (query: any) => `events_list_${JSON.stringify(query)}`,
  EVENT_DETAIL: (id: string) => `event_${id}`,
};
