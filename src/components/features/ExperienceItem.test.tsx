import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ExperienceItem } from './ExperienceItem';
import type { Experience } from '@/types';

describe('ExperienceItem', () => {
  const mockExperience: Experience = {
    company: 'Tech Company',
    roles: [
      {
        role: 'Senior Developer',
        startDate: '01/2022',
        endDate: '',
        location: 'Remote',
      },
      {
        role: 'Developer',
        startDate: '06/2020',
        endDate: '12/2021',
        location: 'Jakarta',
      },
    ],
  };

  it('should render company name', () => {
    render(<ExperienceItem data={mockExperience} index={0} isLast={false} />);
    
    expect(screen.getByText('Tech Company')).toBeInTheDocument();
  });

  it('should render all roles', () => {
    render(<ExperienceItem data={mockExperience} index={0} isLast={false} />);
    
    expect(screen.getByText('Senior Developer')).toBeInTheDocument();
    expect(screen.getByText('Developer')).toBeInTheDocument();
  });

  it('should render locations', () => {
    render(<ExperienceItem data={mockExperience} index={0} isLast={false} />);
    
    expect(screen.getByText('Remote')).toBeInTheDocument();
    expect(screen.getByText('Jakarta')).toBeInTheDocument();
  });

  it('should show "Present" for current role', () => {
    render(<ExperienceItem data={mockExperience} index={0} isLast={false} />);
    
    // "Present" appears in the time element
    const timeElement = document.querySelector('time');
    expect(timeElement?.textContent).toContain('Present');
  });

  it('should render date range', () => {
    render(<ExperienceItem data={mockExperience} index={0} isLast={false} />);
    
    // Check the time element contains the earliest start date
    const timeElement = document.querySelector('time');
    expect(timeElement?.textContent).toContain('06/2020');
  });

  it('should apply animation delay based on index', () => {
    const { container } = render(
      <ExperienceItem data={mockExperience} index={2} isLast={false} />
    );
    
    const item = container.firstChild as HTMLElement;
    expect(item.style.animationDelay).toBe('200ms');
  });

  it('should handle single role', () => {
    const singleRoleExperience: Experience = {
      company: 'Startup',
      roles: [
        {
          role: 'Founder',
          startDate: '01/2023',
          endDate: '',
          location: 'Remote',
        },
      ],
    };

    render(<ExperienceItem data={singleRoleExperience} index={0} isLast={true} />);
    
    expect(screen.getByText('Founder')).toBeInTheDocument();
    expect(screen.getByText('Startup')).toBeInTheDocument();
  });

  it('should have proper semantic HTML', () => {
    render(<ExperienceItem data={mockExperience} index={0} isLast={false} />);
    
    // Check for time element (semantic HTML for dates)
    const timeElement = document.querySelector('time');
    expect(timeElement).toBeInTheDocument();
  });
});
