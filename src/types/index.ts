export interface Contact {
  link: string;
  type: string;
  enable: boolean;
}

export interface PortfolioItem {
  image?: string;
  text?: string;
  title: string;
  description: string;
  link?: string;
  icon: string;
}

export interface Role {
  role: string;
  startDate: string;
  endDate: string;
  location: string;
}

export interface Experience {
  company: string;
  roles: Role[];
}

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
