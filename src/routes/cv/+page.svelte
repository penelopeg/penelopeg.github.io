<script>
  import { slide } from 'svelte/transition';
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';

  let html2pdf;

  onMount(async () => {
    if (browser) {
      html2pdf = (await import('html2pdf.js')).default;
    }
  });

  const experience = [
    {
      title: 'Technical & Team Lead',
      company: 'Contentserv',
      period: '2016 - Present',
      achievements: [
        'Lead efforts in main PIM features, from architecture approach to delivery',
        'Build modern interfaces with a high focus on UI/UX',
        'Build innovative proof of concept demos for integration with different platforms'
      ]
    },
    {
      title: 'Co-Founder',
      company: 'local.foundation',
      period: '2024 - Present',
      achievements: [
        'Tackle the growing problem of loneliness in Community builders',
        'Build platform that connects community builders with the right resources'
      ]
    },
    {
      title: 'Community Builder',
      company: 'Geek Sessions Faro',
      period: '2021 - Present',
      achievements: [
        'Work with local tech scene in Algarve to bring exciting talks, workshops and networking',
      ]
    },
    {
      title: 'Trainee Web Developer',
      company: 'frinch AG',
      period: '2015 - 2016',
      achievements: []
    },
    {
      title: 'Intern Developer',
      company: 'NEWVISION S.A.',
      period: 'Mar 2013 - Jun 2013',
      achievements: [
        'Developed web platform in C# for FalaComigo project at Parques de Sintra',
        'Built management applications for various FalaComigo project components',
        'Contributed to Newvision product line applications using C# and Visual Basic .NET'
      ]
    },
    {
      title: 'Intern Developer',
      company: 'Ministério da Educação - DGRHE',
      period: 'Jun 2012 - Jul 2012',
      achievements: [
        'Developed modules for OpenERP application using Python',
        'Built features for teacher management system in schools',
        'Worked in IT department on system improvements'
      ]
    }
  ];

  const skills = {
    technical: [
      'Full-Stack',
      'React',
      'PHP',
      'Nodejs',
      'HTML/CSS/JavaScript',
      'jQuery',
      'MySQL',
      'Python',
      'Elixir',
      'C#',
      'Shopify',
      // 'C',
      // 'AJAX',
      // 'Microsoft SQL Server',
    ],
    leadership: [
      'Team Leadership',
      'Community Building',
      'Event Planning',
      'Public Speaking',
      'Agile Methodologies',
      'Project Management'
    ],
    languages: [
      'Portuguese (Native)',
      'English (Professional)'
    ]
  };

  const education = [
    {
      degree: 'Licentiate degree, Computer Sciences Engineering',
      institution: 'Universidade do Algarve',
      year: '2017'
    },
    {
      degree: 'Software Development and management',
      institution: 'Escola Profissional Bento de Jesus Caraça',
      year: '2013'
    }
  ];

  const awards = [
    {
      name: 'Top 3 Developers',
      issuer: 'Portuguese Women in Tech Awards',
      year: '2018'
    },
    {
      name: 'Nominee',
      issuer: 'New Era of Leaders',
      year: '2018'
    }
  ];

  const volunteering = [
    {
      title: 'Facilitator',
      organization: 'Impact Hackers - Social Hackathon',
      period: 'Sep 2024',
      description: 'Problem-solving event where volunteers collaborate to devise and implement TECH solutions for local not-for-profit organizations. First edition partnership with AIPAR for foster care families.'
    },
    {
      title: 'Facilitator',
      organization: 'Techstars Startup Weekend',
      period: '2023 - Present',
      description: 'Co-facilitated Techstars Startup Weekend in several cities in Portugal including Faro, Coimbra and Albufeira.'
    },
    {
      title: 'Faro Ambassador',
      organization: 'Geek Girls Portugal',
      period: '2018 - 2021',
      description: ''
    },
    {
      title: 'Event Organizer',
      organization: 'Agile Connect®',
      period: '2020 - 2021',
      description: 'Organized events for the agile community online'
    },
    {
      title: 'Mentor',
      organization: 'European Erasmus+ E-Steam project',
      period: 'Jan - Jun 2020',
      description: 'Mentoring young girls by making contact with the STEM area.'
    }
  ];

  let expanded = {
    experience: true,
    education: true,
    volunteering: true,
    skills: true,
    awards: true
  };

  function toggleSection(section) {
    expanded[section] = !expanded[section];
  }

  async function downloadPDF() {
    if (!browser || !html2pdf) return;
    
    const element = document.getElementById('pdf-template');
    element.style.display = 'block';
    
    const opt = {
      margin: 0,
      filename: 'penelope-goncalves-cv.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2,
        useCORS: true,
        logging: true
      },
      jsPDF: { 
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait'
      }
    };
    
    try {
      await html2pdf().set(opt).from(element).save();
    } finally {
      element.style.display = 'none';
    }
  }
</script>

<div class="cv-hero">
  <div class="container">
    <h1>Curriculum Vitae</h1>
    <div class="cv-actions">
      <button class="button button-primary" on:click={downloadPDF}>
        Download PDF
      </button>
      <a href="mailto:penelope@duck.com" class="button button-secondary">
        Contact Me
      </a>
    </div>
  </div>
</div>

<div class="cv-content">
  <div class="container">
    <div class="cv-grid">
      <div class="cv-main">
        <section class="cv-section">
          <h2 class="section-header" on:click={() => toggleSection('experience')}>
            Professional Experience
            <span class="toggle-icon">{expanded.experience ? '−' : '+'}</span>
          </h2>
          {#if expanded.experience}
            <div transition:slide>
              {#each experience as job}
                <div class="experience-card card">
                  <div class="experience-header">
                    <div>
                      <h3>{job.title}</h3>
                      <p class="company">{job.company}</p>
                    </div>
                    <span class="period">{job.period}</span>
                  </div>
                  <ul class="achievements">
                    {#each job.achievements as achievement}
                      <li>{achievement}</li>
                    {/each}
                  </ul>
                </div>
              {/each}
            </div>
          {/if}
        </section>

        <section class="cv-section">
          <h2 class="section-header" on:click={() => toggleSection('education')}>
            Education
            <span class="toggle-icon">{expanded.education ? '−' : '+'}</span>
          </h2>
          {#if expanded.education}
            <div transition:slide>
              <div class="card">
                {#each education as edu}
                  <div class="education-item">
                    <div>
                      <h3>{edu.degree}</h3>
                      <p>{edu.institution}</p>
                    </div>
                    <span class="year">{edu.year}</span>
                  </div>
                {/each}
              </div>
            </div>
          {/if}
        </section>

        <section class="cv-section">
          <h2 class="section-header" on:click={() => toggleSection('volunteering')}>
            Volunteering
            <span class="toggle-icon">{expanded.volunteering ? '−' : '+'}</span>
          </h2>
          {#if expanded.volunteering}
            <div transition:slide>
              {#each volunteering as role}
                <div class="experience-card card">
                  <div class="experience-header">
                    <div>
                      <h3>{role.title}</h3>
                      <p class="company">{role.organization}</p>
                    </div>
                    <span class="period">{role.period}</span>
                  </div>
                  {#if role.description}
                    <p class="volunteer-description">{role.description}</p>
                  {/if}
                </div>
              {/each}
            </div>
          {/if}
        </section>
      </div>

      <div class="cv-sidebar">
        <section class="cv-section">
          <h2 class="section-header" on:click={() => toggleSection('skills')}>
            Skills
            <span class="toggle-icon">{expanded.skills ? '−' : '+'}</span>
          </h2>
          {#if expanded.skills}
            <div transition:slide>
              <div class="skills-group card">
                <h3>Technical</h3>
                <div class="skills-list">
                  {#each skills.technical as skill}
                    <span class="skill-tag">{skill}</span>
                  {/each}
                </div>
              </div>

              <div class="skills-group card">
                <h3>Leadership</h3>
                <div class="skills-list">
                  {#each skills.leadership as skill}
                    <span class="skill-tag">{skill}</span>
                  {/each}
                </div>
              </div>

              <div class="skills-group card">
                <h3>Languages</h3>
                <div class="skills-list">
                  {#each skills.languages as language}
                    <span class="skill-tag">{language}</span>
                  {/each}
                </div>
              </div>
            </div>
          {/if}
        </section>

        <section class="cv-section">
          <h2 class="section-header" on:click={() => toggleSection('awards')}>
            Awards
            <span class="toggle-icon">{expanded.awards ? '−' : '+'}</span>
          </h2>
          {#if expanded.awards}
            <div transition:slide>
              <div class="card">
                {#each awards as award}
                  <div class="certification-item">
                    <div>
                      <h3>{award.name}</h3>
                      <p>{award.issuer}</p>
                    </div>
                    <span class="year">{award.year}</span>
                  </div>
                {/each}
              </div>
            </div>
          {/if}
        </section>
      </div>
    </div>
  </div>
</div>

<!-- PDF template -->
<div id="pdf-template" style="display: none;">
  <div class="pdf-doc">
    <div class="pdf-header">
      <h1>Penélope Gonçalves</h1>
      <p class="contact-info">
        Faro, Portugal • tg.penelope@gmail.com • linkedin.com/in/penelopeg • penelopeg.github.io
      </p>
      <p class="intro">
        Chasing difficult problems, finding simple solutions. Working on building a sense of community everywhere I go. Probably have one too many hobbies, but what's life without a little adventure?
      </p>
    </div>

    <div class="pdf-section">
      <h2>Experience</h2>
      {#each experience as job}
        <div class="pdf-job">
          <div class="job-header">
            <h3>- {job.title}</h3>
            <p class="company">{job.company} • {job.period}</p>
          </div>
          {#if job.achievements.length > 0}
            <ul>
              {#each job.achievements as achievement}
                <li>{achievement}</li>
              {/each}
            </ul>
          {/if}
        </div>
      {/each}
    </div>

    <div class="pdf-section">
      <h2>Education</h2>
      {#each education as edu}
        <div class="pdf-education">
          <h3>{edu.degree}</h3>
          <p class="institution">{edu.institution} • {edu.year}</p>
        </div>
      {/each}
    </div>

    <div class="pdf-section">
      <h2>Technical Skills</h2>
      <div class="skills-list">
        {#each skills.technical as skill}
          <span class="skill-item">{skill}</span>
        {/each}
      </div>

      <h2>Leadership & Languages</h2>
      <div class="skills-list">
        {#each skills.leadership as skill}
          <span class="skill-item">{skill}</span>
        {/each}
        {#each skills.languages as language}
          <span class="skill-item">{language}</span>
        {/each}
      </div>
    </div>
  </div>
</div>

<style>
  .cv-hero {
    background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
    color: white;
    padding: var(--spacing-12) 0;
    text-align: center;
  }

  .cv-hero h1 {
    margin-bottom: var(--spacing-6);
  }

  .cv-actions {
    display: flex;
    gap: var(--spacing-4);
    justify-content: center;
  }

  .cv-content {
    padding: var(--spacing-16) 0;
  }

  .cv-grid {
    display: grid;
    gap: var(--spacing-8);
    grid-template-columns: 1fr;
  }

  @media (min-width: 1024px) {
    .cv-grid {
      grid-template-columns: 2fr 1fr;
    }
  }

  .cv-section {
    margin-bottom: var(--spacing-8);
  }

  .cv-section h2 {
    margin-bottom: var(--spacing-6);
  }

  .experience-card {
    margin-bottom: var(--spacing-4);
  }

  .experience-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: var(--spacing-4);
  }

  .company {
    color: var(--color-text-light);
    margin-top: var(--spacing-1);
  }

  .period {
    color: var(--color-text-light);
    font-size: 0.875rem;
  }

  .achievements {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  .achievements li {
    padding: var(--spacing-2) 0;
    padding-left: var(--spacing-6);
    position: relative;
  }

  .achievements li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 1rem;
    width: var(--spacing-3);
    height: 2px;
    background-color: var(--color-primary);
  }

  .skills-group {
    margin-bottom: var(--spacing-4);
  }

  .skills-group h3 {
    margin-bottom: var(--spacing-4);
    color: var(--color-primary);
  }

  .skills-list {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-2);
  }

  .skill-tag {
    background-color: var(--color-primary);
    color: white;
    padding: var(--spacing-1) var(--spacing-2);
    border-radius: var(--border-radius);
    font-size: 0.875rem;
  }

  .education-item,
  .certification-item {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: var(--spacing-4) 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  .education-item:last-child,
  .certification-item:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  .education-item:first-child,
  .certification-item:first-child {
    padding-top: 0;
  }

  .education-item p,
  .certification-item p {
    color: var(--color-text-light);
    margin-top: var(--spacing-1);
  }

  .year {
    color: var(--color-text-light);
    font-size: 0.875rem;
  }

  .volunteer-description {
    margin-top: var(--spacing-2);
    color: var(--color-text);
    line-height: 1.5;
    font-size: 0.95rem;
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    user-select: none;
    padding: var(--spacing-2) 0;
  }

  .section-header:hover {
    color: var(--color-primary);
  }

  .toggle-icon {
    font-size: 1.5rem;
    font-weight: normal;
    line-height: 1;
  }

  /* Updated PDF Styles */
  .pdf-doc {
    width: 210mm; /* A4 width */
    padding: 15mm;
    background: white;
    font-family: Arial, sans-serif;
    color: #333;
    -webkit-user-select: text;
    user-select: text;
  }

  .pdf-doc h1 {
    font-size: 24px;
    color: #0891b2; /* Using direct color to ensure PDF rendering */
    margin: 0 0 8px 0;
  }

  .pdf-doc .contact-info {
    font-size: 12px;
    color: #666;
    margin: 0 0 16px 0;
  }

  .pdf-doc .intro {
    font-size: 12px;
    line-height: 1.4;
    margin: 0 0 24px 0;
  }

  .pdf-doc .pdf-section {
    margin: 0 0 24px 0;
  }

  .pdf-doc h2 {
    font-size: 16px;
    color: var(--color-primary);
    margin: 0 0 12px 0;
    padding: 0 0 8px 0;
    border-bottom: 1px solid var(--color-primary);
  }

  .pdf-doc .pdf-job {
    margin: 0 0 12px 0;
  }

  .pdf-doc .job-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 4px;
  }

  .pdf-doc .job-header h3 {
    font-size: 14px;
    margin: 0;
    display: flex;
    gap: 8px;
    align-items: baseline;
  }

  .pdf-doc .job-header h3::after {
    content: "•";
    color: #666;
    margin: 0 4px;
  }

  .pdf-doc .pdf-job .company {
    font-size: 12px;
    color: #666;
    margin: 0;
    flex: 1;
  }

  .pdf-doc .pdf-education {
    margin-bottom: 8px;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }

  .pdf-doc .pdf-education h3 {
    font-size: 14px;
    margin: 0;
    display: flex;
    gap: 8px;
    align-items: baseline;
  }

  .pdf-doc .pdf-education .institution {
    font-size: 12px;
    color: #666;
    margin: 0;
  }

  .pdf-doc .skills-list {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    margin: 12px 0;
  }

  .pdf-doc .skill-item {
    font-size: 12px;
    padding-bottom: 2px;
    border-bottom: 2px solid var(--color-primary);
    line-height: 1.4;
  }
</style>