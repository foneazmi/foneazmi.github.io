import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import {
  IconGitHub,
  IconLinkedIn,
  IconTelegram,
  IconWhatsapp,
  IconEmail,
} from './Icons';

describe('Icons', () => {
  describe('IconGitHub', () => {
    it('should render GitHub icon', () => {
      render(<IconGitHub />);
      const svg = document.querySelector('svg[aria-label="GitHub"]');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg');
    });

    it('should apply custom className', () => {
      render(<IconGitHub className="custom-class" />);
      const svg = document.querySelector('svg[aria-label="GitHub"]');
      expect(svg).toHaveClass('custom-class');
    });
  });

  describe('IconLinkedIn', () => {
    it('should render LinkedIn icon', () => {
      render(<IconLinkedIn />);
      const svg = document.querySelector('svg[aria-label="LinkedIn"]');
      expect(svg).toBeInTheDocument();
    });

    it('should apply custom className', () => {
      render(<IconLinkedIn className="linkedin-class" />);
      const svg = document.querySelector('svg[aria-label="LinkedIn"]');
      expect(svg).toHaveClass('linkedin-class');
    });
  });

  describe('IconTelegram', () => {
    it('should render Telegram icon', () => {
      render(<IconTelegram />);
      const svg = document.querySelector('svg[aria-label="Telegram"]');
      expect(svg).toBeInTheDocument();
    });
  });

  describe('IconWhatsapp', () => {
    it('should render WhatsApp icon', () => {
      render(<IconWhatsapp />);
      const svg = document.querySelector('svg[aria-label="WhatsApp"]');
      expect(svg).toBeInTheDocument();
    });
  });

  describe('IconEmail', () => {
    it('should render Email icon', () => {
      render(<IconEmail />);
      const svg = document.querySelector('svg[aria-label="Email"]');
      expect(svg).toBeInTheDocument();
    });
  });
});
