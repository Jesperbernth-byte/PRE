
export enum LeadPriority {
  ACUTE = 'AKUT',
  URGENT = 'HASTER',
  PLANNED = 'PLANLAGT'
}

export enum LeadStatus {
  NEW = 'NY',
  CALLED = 'RINGET',
  CONTACTED = 'KONTAKTET',
  QUOTED = 'TILBUD SENDT',
  BOOKED = 'BOOKET',
  FINISHED = 'AFSLUTTET'
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  zipCode: string;
  problem: string;
  priority: LeadPriority;
  insuranceClaim: boolean;
  status: LeadStatus;
  aiSummary: string;
  createdAt: string;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  faqs: { question: string; answer: string }[];
  icon: string;
  image?: string;
  // Per-service override af in-content CTA-bjælken. Bruges fx på
  // TV-inspektion hvor vi ikke kan love "gratis" eller "fast pris"
  // fordi det er timelønsarbejde.
  inContentCta?: {
    label: string;     // fx "Spørgsmål til TV-inspektion?"
    description: string; // fx "Ring til Jacob og få en pris-vurdering ud fra dit setup."
    phone: 'preben' | 'jacob';
  };
}
