export interface Portfolio {
  photo: string;
  name: string;
  job: string;
  year: number;
  description: string;
  contacts: Contact[];
  portfolio: (PortfolioItem | PortfolioTextItem)[];
  experiences: Experience[];
}

export interface Contact {
  link: string;
  type: "wa" | "li" | "gh" | "tg" | "email";
  enable: boolean;
}

export interface PortfolioItem {
  image: string;
  title: string;
  description: string;
  link: string;
  icon: string;
}

export interface PortfolioTextItem {
  text: string;
  title: string;
  description: string;
  link: string;
  icon: string;
}

export interface Experience {
  company: string;
  roles: Role[];
}

export interface Role {
  role: string;
  startDate: string;
  endDate: string;
  location: string;
}
