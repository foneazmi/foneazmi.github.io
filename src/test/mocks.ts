import type { MeData, Contact, PortfolioItem, Experience, Role } from '@/types';

export const mockContacts: Contact[] = [
  { link: 'https://github.com/testuser', type: 'gh', enable: true },
  { link: 'https://linkedin.com/in/testuser', type: 'li', enable: true },
  { link: 'https://t.me/testuser', type: 'tg', enable: false },
  { link: 'https://wa.me/1234567890', type: 'wa', enable: true },
  { link: 'mailto:test@example.com', type: 'email', enable: true },
];

export const mockPortfolio: PortfolioItem[] = [
  {
    image: 'https://example.com/project1.jpg',
    title: 'Project One',
    description: 'A sample project description',
    link: 'https://project1.com',
    icon: '🚀',
    stack: ['React Native', 'TypeScript', 'Firebase', 'Redux'],
  },
  {
    text: 'CLI Tool',
    title: 'CLI Tool',
    description: 'A command-line tool for developers',
    link: 'https://github.com/testuser/cli-tool',
    icon: '⚡',
    stack: ['Node.js', 'TypeScript', 'Commander.js'],
  },
  {
    image: 'https://example.com/project3.jpg',
    title: 'Web App',
    description: 'A modern web application',
    link: 'https://webapp.example.com',
    icon: '🌐',
    stack: ['React', 'Next.js', 'TailwindCSS', 'PostgreSQL', 'Prisma', 'Vercel'],
  },
];

export const mockRoles: Role[] = [
  {
    role: 'Senior Software Engineer',
    startDate: '01/2022',
    endDate: '',
    location: 'Remote',
  },
  {
    role: 'Software Engineer',
    startDate: '06/2020',
    endDate: '12/2021',
    location: 'Jakarta, Indonesia',
  },
];

export const mockExperiences: Experience[] = [
  {
    company: 'Tech Company A',
    roles: mockRoles,
  },
  {
    company: 'Startup B',
    roles: [
      {
        role: 'Full Stack Developer',
        startDate: '01/2019',
        endDate: '05/2020',
        location: 'Bandung, Indonesia',
      },
    ],
  },
];

export const mockSkills = [
  'React',
  'TypeScript',
  'Node.js',
  'Python',
  'Go',
  'AWS',
  'Docker',
  'PostgreSQL',
];

export const mockMeData: MeData = {
  photo: 'https://example.com/photo.jpg',
  name: 'Test User',
  job: 'Senior Software Engineer',
  year: 2024,
  description:
    'A passionate software engineer with 5+ years of experience building scalable applications.',
  contacts: mockContacts,
  portfolio: mockPortfolio,
  experiences: mockExperiences,
  skills: mockSkills,
};

export const mockMeDataEmpty: MeData = {
  photo: '',
  name: '',
  job: '',
  year: 0,
  description: '',
  contacts: [],
  portfolio: [],
  experiences: [],
  skills: [],
};
