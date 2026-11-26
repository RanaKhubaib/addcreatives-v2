export interface Stats {
  projectsDelivered: number;
  clientsServed: number;
  yearsExperience: number;
  channelsManaged: number;
  avgResponseHours: number;
}

// PLACEHOLDER SAMPLE NUMBERS — do not present as verified facts;
// hidden behind SHOW_STATS=false in site-config.ts.
export const stats: Stats = {
  projectsDelivered: 120,
  clientsServed: 48,
  yearsExperience: 5,
  channelsManaged: 12,
  avgResponseHours: 24,
};
