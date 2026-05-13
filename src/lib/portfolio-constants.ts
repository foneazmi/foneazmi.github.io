import type { MeData } from '@/types';

export const EMPTY_ME: MeData = {
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

export const STATIC_FALLBACK: MeData = {
  photo: 'https://example.com/photo.jpg',
  name: 'Farkhan Azmi',
  job: 'Software Engineer',
  year: 2024,
  description: 'Portfolio temporarily unavailable. Please try again later.',
  contacts: [],
  portfolio: [],
  experiences: [],
  skills: [],
};

export const CACHE_KEY = 'portfolio_me_data';
export const CACHE_TTL = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

export const RETRY_CONFIG = {
  maxRetries: 2,
  baseDelay: 100,
  maxDelay: 2000,
};
