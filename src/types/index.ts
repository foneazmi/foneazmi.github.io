/**
 * Contact types for social media and communication channels
 */
export type ContactType = 'wa' | 'li' | 'gh' | 'tg' | 'email';

/**
 * Contact information for social links
 */
export interface Contact {
  link: string;
  type: ContactType;
  enable: boolean;
}

/**
 * Portfolio item with image or text representation
 */
export interface PortfolioItem {
  image?: string;
  text?: string;
  title: string;
  description: string;
  link?: string;
  icon: string;
  stack?: string[];
}

/**
 * Role position at a company
 */
export interface Role {
  role: string;
  startDate: string;
  endDate: string;
  location: string;
}

/**
 * Work experience at a company
 */
export interface Experience {
  company: string;
  roles: Role[];
}

/**
 * Main data structure for portfolio/me information
 */
export interface MeData {
  photo: string;
  name: string;
  job: string;
  year: number;
  description: string;
  contacts: Contact[];
  portfolio: PortfolioItem[];
  experiences: Experience[];
  skills: string[];
}
