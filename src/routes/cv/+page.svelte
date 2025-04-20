<script>
  import { base } from '$app/paths';
    import { slide } from 'svelte/transition';

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
          'Tackles the growing problem of loneliness in Community builders',
          'Activating people with the right tools and mindsets to foster communities'
        ]
      },
      {
        title: 'Community Builder',
        company: 'Geek Sessions Faro',
        period: '2021 - Present',
        achievements: [
          'Organize regular tech events in Faro and Algarve region',
          'Work with local tech scene to bring exciting talks and workshops',
          'Build and nurture the local tech community'
        ]
      },
      {
        title: 'Trainee Web Developer',
        company: 'frinch AG',
        period: '2015 - 2016',
        achievements: []
      },
      {
        title: 'Internship',
        company: 'NEWVISION S.A.',
        period: 'Mar 2013 - Jun 2013',
        achievements: [
          'Developed web platform in C# for FalaComigo project at Parques de Sintra',
          'Built management applications for various FalaComigo project components',
          'Contributed to Newvision product line applications using C# and Visual Basic .NET'
        ]
      },
      {
        title: 'Internship',
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
        'Full-Stack Development',
        'JavaScript/Node.js',
        'React.js',
        'PHP',
        'Elixir',
        'C#',
        'C',
        'HTML/CSS',
        'MySQL',
        'Microsoft SQL Server',
        'Shopify',
        'jQuery',
        'AJAX'
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
        degree: 'Licentiate degree, Engineering Informática',
        institution: 'Universidade do Algarve',
        year: '2017'
      },
      {
        degree: 'Computer Science',
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
</script>
  
  <div class="cv-hero">
    <div class="container">
      <h1>Curriculum Vitae</h1>
      <div class="cv-actions">
        <!-- <button class="button button-primary" disabled>
          Download PDF
        </button> -->
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
  </style>