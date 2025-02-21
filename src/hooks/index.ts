import { useState, useEffect } from 'react';

export const useActiveSection = (sections: any[]) => {
  const [activeSection, setActiveSection] = useState(sections[0]?.id || null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let foundActiveSection = false;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            foundActiveSection = true;
          }
        });

        // If no intersecting sections, set activeSection to null
        if (!foundActiveSection) {
          setActiveSection(null);
        }
      },
      { threshold: 0.5 }
    );

    // Observe each section
    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    // Cleanup observer on unmount
    return () => {
      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [sections]);

  return activeSection;
};
