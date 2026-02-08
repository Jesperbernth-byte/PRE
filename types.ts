
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
}
