<script>
  import { slide, fade } from 'svelte/transition';
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';

  let html2pdf;

  onMount(async () => {
    if (browser) {
      html2pdf = (await import('html2pdf.js')).default;
    }
  });

  // Hat definitions with associated data
  const hats = {
    cpo: {
      id: 'cpo',
      title: 'Co-founder/CPO',
      icon: '🚀',
      color: '#9333ea',
      tagline: 'Building products that solve real problems',
      experience: [
        {
          title: 'Co-Founder & Chief Product Officer',
          company: 'local.foundation',
          period: '2024 - Present',
          achievements: [
            'Tackle the growing problem of loneliness in Community builders',
            'Build platform that connects community builders with the right resources',
            'Lead product strategy and vision from ideation to execution'
          ]
        }
      ],
      skills: {
        core: ['Product Strategy', 'Product Management', 'User Research', 'Go-to-Market Strategy', 'Data-Driven Decision Making'],
        technical: ['Full-Stack', 'React', 'Nodejs', 'MySQL', 'Python'],
        soft: ['Strategic Thinking', 'Problem Solving', 'Stakeholder Management', 'Agile Methodologies']
      },
      volunteering: [
        {
          title: 'Volunteer',
          organization: '351 Startup Community',
          period: '2024 - Present',
          description: 'Contributing to Portugal\'s startup ecosystem through community engagement and support.'
        },
        {
          title: 'Facilitator',
          organization: 'Techstars Startup Weekend',
          period: '2023 - Present',
          description: 'Co-facilitated Techstars Startup Weekend in several cities in Portugal including Faro, Coimbra, Albufeira, Évora, and Lagos.'
        },
        {
          title: 'Facilitator',
          organization: 'Impact Hackers - Social Hackathon',
          period: 'Sep 2024',
          description: 'Problem-solving event where volunteers collaborate to devise and implement TECH solutions for local not-for-profit organizations.'
        }
      ],
      awards: [
        {
          name: 'Top 10 Finalists for Rising Female Awards',
          issuer: 'Unicorn Factory Lisboa',
          year: '2025'
        },
        {
          name: 'Nominee',
          issuer: 'New Era of Leaders',
          year: '2018'
        }
      ]
    },
    techLead: {
      id: 'techLead',
      title: 'Tech Lead',
      icon: '💻',
      color: '#0891b2',
      tagline: 'Building scalable solutions with modern technology',
      experience: [
        {
          title: 'Technical & Team Lead',
          company: 'Contentserv',
          period: '2016 - Present',
          achievements: [
            'Lead efforts in main PIM features, from architecture approach to delivery',
            'Build modern interfaces with a high focus on UI/UX',
            'Build innovative proof of concept demos for integration with different platforms',
            'Mentor junior developers and conduct code reviews',
            'Establish best practices and coding standards for the team'
          ]
        },
        {
          title: 'Trainee Web Developer',
          company: 'frinch AG',
          period: '2015 - 2016',
          achievements: [
            'Developed web applications using modern JavaScript frameworks',
            'Collaborated with senior developers on complex technical challenges'
          ]
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
      ],
      skills: {
        core: ['Full-Stack Development', 'Technical Architecture', 'Team Leadership', 'Code Review', 'Performance Optimization'],
        technical: ['React', 'PHP', 'Nodejs', 'HTML/CSS/JavaScript', 'jQuery', 'MySQL', 'Python', 'Elixir', 'C#', 'Shopify'],
        soft: ['Mentoring', 'Technical Communication', 'Problem Solving', 'Agile Methodologies', 'Project Management']
      },
      volunteering: [
        {
          title: 'Mentor',
          organization: 'European Erasmus+ E-Steam project',
          period: 'Jan - Jun 2020',
          description: 'Mentoring young girls by making contact with the STEM area.'
        }
      ],
      awards: [
        {
          name: 'Menção Honrosa for Algarve Water Watch',
          issuer: 'Ideias em Caixa',
          year: '2025',
          description: 'Environmental impact project making groundwater data easily available for academia, businesses, journalists and the public to build early alarm systems.'
        },
        {
          name: 'Top 3 Developers',
          issuer: 'Portuguese Women in Tech Awards',
          year: '2018'
        }
      ]
    },
    community: {
      id: 'community',
      title: 'Community Builder',
      icon: '🎪',
      color: '#10b981',
      tagline: 'Creating spaces where people connect and grow',
      experience: [
        {
          title: 'Community Builder & Event Organizer',
          company: 'Geek Sessions Faro',
          period: '2021 - Present',
          achievements: [
            'Work with local tech scene in Algarve to bring exciting talks, workshops and networking',
            'Organize monthly tech meetups with 50+ attendees',
            'Curate speakers and topics that resonate with the community',
            'Build partnerships with local businesses and tech companies'
          ]
        }
      ],
      skills: {
        core: ['Event Planning', 'Public Speaking', 'Community Engagement', 'Partnership Building', 'Content Curation'],
        technical: ['Event Management Platforms', 'Social Media', 'Content Creation', 'Marketing'],
        soft: ['Communication', 'Networking', 'Empathy', 'Facilitation', 'Storytelling']
      },
      volunteering: [
        {
          title: 'Volunteer',
          organization: '351 Startup Community',
          period: '2024 - Present',
          description: 'Contributing to Portugal\'s startup ecosystem through community engagement and support.'
        },
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
          description: 'Co-facilitated Techstars Startup Weekend in several cities in Portugal including Faro, Coimbra, Albufeira, Évora, and Lagos.'
        },
        {
          title: 'Faro Ambassador',
          organization: 'Geek Girls Portugal',
          period: '2018 - 2021',
          description: 'Represented Geek Girls Portugal in Faro, organizing local events and building the local tech community'
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
      ],
      awards: [
        {
          name: 'Top 5 Best Community Leads',
          issuer: 'Portuguese Women in Tech Awards',
          year: '2025'
        },
        {
          name: 'Nominee',
          issuer: 'New Era of Leaders',
          year: '2018'
        }
      ]
    },
    all: {
      id: 'all',
      title: 'Full Picture',
      icon: '🌟',
      color: '#f59e0b',
      tagline: 'The complete story - all roles, all expertise, all impact',
      experience: [
        {
          title: 'Co-Founder & Chief Product Officer',
          company: 'local.foundation',
          period: '2024 - Present',
          achievements: [
            'Tackle the growing problem of loneliness in Community builders',
            'Build platform that connects community builders with the right resources',
            'Lead product strategy and vision from ideation to execution'
          ]
        },
        {
          title: 'Technical & Team Lead',
          company: 'Contentserv',
          period: '2016 - Present',
          achievements: [
            'Lead efforts in main PIM features, from architecture approach to delivery',
            'Build modern interfaces with a high focus on UI/UX',
            'Build innovative proof of concept demos for integration with different platforms',
            'Mentor junior developers and conduct code reviews',
            'Establish best practices and coding standards for the team'
          ]
        },
        {
          title: 'Community Builder & Event Organizer',
          company: 'Geek Sessions Faro',
          period: '2021 - Present',
          achievements: [
            'Work with local tech scene in Algarve to bring exciting talks, workshops and networking',
            'Organize monthly tech meetups with 50+ attendees',
            'Curate speakers and topics that resonate with the community',
            'Build partnerships with local businesses and tech companies'
          ]
        },
        {
          title: 'Trainee Web Developer',
          company: 'frinch AG',
          period: '2015 - 2016',
          achievements: [
            'Developed web applications using modern JavaScript frameworks',
            'Collaborated with senior developers on complex technical challenges'
          ]
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
      ],
      skills: {
        core: ['Product Strategy', 'Product Management', 'Full-Stack Development', 'Technical Architecture', 'Team Leadership', 'Event Planning', 'Public Speaking', 'Community Engagement', 'User Research', 'Go-to-Market Strategy'],
        technical: ['React', 'PHP', 'Nodejs', 'HTML/CSS/JavaScript', 'jQuery', 'MySQL', 'Python', 'Elixir', 'C#', 'Shopify', 'Event Management Platforms', 'Social Media', 'Content Creation'],
        soft: ['Strategic Thinking', 'Problem Solving', 'Stakeholder Management', 'Mentoring', 'Technical Communication', 'Agile Methodologies', 'Project Management', 'Networking', 'Empathy', 'Facilitation', 'Storytelling']
      },
      volunteering: [
        {
          title: 'Volunteer',
          organization: '351 Startup Community',
          period: '2024 - Present',
          description: 'Contributing to Portugal\'s startup ecosystem through community engagement and support.'
        },
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
          description: 'Co-facilitated Techstars Startup Weekend in several cities in Portugal including Faro, Coimbra, Albufeira, Évora, and Lagos.'
        },
        {
          title: 'Faro Ambassador',
          organization: 'Geek Girls Portugal',
          period: '2018 - 2021',
          description: 'Represented Geek Girls Portugal in Faro, organizing local events and building the local tech community'
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
      ],
      awards: [
        {
          name: 'Top 5 Best Community Leads',
          issuer: 'Portuguese Women in Tech Awards',
          year: '2025'
        },
        {
          name: 'Top 10 Finalists for Rising Female Awards',
          issuer: 'Unicorn Factory Lisboa',
          year: '2025'
        },
        {
          name: 'Menção Honrosa for Algarve Water Watch',
          issuer: 'Ideias em Caixa',
          year: '2025',
          description: 'Environmental impact project making groundwater data easily available for academia, businesses, journalists and the public to build early alarm systems.'
        },
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
      ]
    }
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

  const languages = [
    'Portuguese (Native)',
    'English (Professional)'
  ];

  // Active hat state
  let activeHat = 'cpo';
  $: currentHat = hats[activeHat];

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

  function switchHat(hatId) {
    activeHat = hatId;
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
    <p class="cv-subtitle">Choose your adventure - explore my expertise through different lenses</p>

    <!-- Hat Switcher -->
    <div class="hat-switcher">
      {#each Object.values(hats).filter(h => h.id !== 'all') as hat}
        <button
          class="hat-button"
          class:active={activeHat === hat.id}
          style="--hat-color: {hat.color}"
          on:click={() => switchHat(hat.id)}
        >
          <span class="hat-icon">{hat.icon}</span>
          <span class="hat-title">{hat.title}</span>
        </button>
      {/each}
    </div>

    <!-- Spoilers Button -->
    <div class="spoilers-section">
      <button
        class="spoilers-button"
        class:active={activeHat === 'all'}
        on:click={() => switchHat('all')}
      >
        <span class="spoilers-emoji">👀</span>
        <span>Spoilers: Show me the full picture</span>
      </button>
    </div>

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

<!-- Hat Tagline -->
<div class="hat-tagline" style="background-color: {currentHat.color}">
  <div class="container">
    <p transition:fade={{ duration: 200 }}>{currentHat.tagline}</p>
  </div>
</div>

<div class="cv-content">
  <div class="container">
    <div class="cv-grid">
      <div class="cv-main">
        <!-- Experience Section -->
        <section class="cv-section">
          <h2 class="section-header" on:click={() => toggleSection('experience')}>
            Professional Experience
            <span class="toggle-icon">{expanded.experience ? '−' : '+'}</span>
          </h2>
          {#if expanded.experience}
            <div transition:slide>
              {#key activeHat}
                <div transition:fade={{ duration: 300 }}>
                  {#each currentHat.experience as job}
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
              {/key}
            </div>
          {/if}
        </section>

        <!-- Education Section -->
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

        <!-- Volunteering Section -->
        {#if currentHat.volunteering.length > 0}
          <section class="cv-section">
            <h2 class="section-header" on:click={() => toggleSection('volunteering')}>
              Volunteering
              <span class="toggle-icon">{expanded.volunteering ? '−' : '+'}</span>
            </h2>
            {#if expanded.volunteering}
              <div transition:slide>
                {#key activeHat}
                  <div transition:fade={{ duration: 300 }}>
                    {#each currentHat.volunteering as role}
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
                {/key}
              </div>
            {/if}
          </section>
        {/if}
      </div>

      <div class="cv-sidebar">
        <!-- Skills Section -->
        <section class="cv-section">
          <h2 class="section-header" on:click={() => toggleSection('skills')}>
            Skills
            <span class="toggle-icon">{expanded.skills ? '−' : '+'}</span>
          </h2>
          {#if expanded.skills}
            <div transition:slide>
              {#key activeHat}
                <div transition:fade={{ duration: 300 }}>
                  <div class="skills-group card">
                    <h3 style="color: {currentHat.color}">Core Skills</h3>
                    <div class="skills-list">
                      {#each currentHat.skills.core as skill}
                        <span class="skill-tag" style="background-color: {currentHat.color}">{skill}</span>
                      {/each}
                    </div>
                  </div>

                  <div class="skills-group card">
                    <h3 style="color: {currentHat.color}">Technical</h3>
                    <div class="skills-list">
                      {#each currentHat.skills.technical as skill}
                        <span class="skill-tag" style="background-color: {currentHat.color}">{skill}</span>
                      {/each}
                    </div>
                  </div>

                  <div class="skills-group card">
                    <h3 style="color: {currentHat.color}">Soft Skills</h3>
                    <div class="skills-list">
                      {#each currentHat.skills.soft as skill}
                        <span class="skill-tag" style="background-color: {currentHat.color}">{skill}</span>
                      {/each}
                    </div>
                  </div>

                  <div class="skills-group card">
                    <h3 style="color: {currentHat.color}">Languages</h3>
                    <div class="skills-list">
                      {#each languages as language}
                        <span class="skill-tag" style="background-color: {currentHat.color}">{language}</span>
                      {/each}
                    </div>
                  </div>
                </div>
              {/key}
            </div>
          {/if}
        </section>

        <!-- Awards Section -->
        {#if currentHat.awards.length > 0}
          <section class="cv-section">
            <h2 class="section-header" on:click={() => toggleSection('awards')}>
              Awards
              <span class="toggle-icon">{expanded.awards ? '−' : '+'}</span>
            </h2>
            {#if expanded.awards}
              <div transition:slide>
                {#key activeHat}
                  <div transition:fade={{ duration: 300 }}>
                    <div class="card">
                      {#each currentHat.awards as award}
                        <div class="certification-item" class:has-description={award.description}>
                          <div>
                            <h3>{award.name}</h3>
                            <p>{award.issuer}</p>
                            {#if award.description}
                              <p class="award-description">{award.description}</p>
                            {/if}
                          </div>
                          <span class="year">{award.year}</span>
                        </div>
                      {/each}
                    </div>
                  </div>
                {/key}
              </div>
            {/if}
          </section>
        {/if}
      </div>
    </div>
  </div>
</div>

<!-- PDF template (unchanged - shows all experience) -->
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
      {#each Object.values(hats) as hat}
        {#each hat.experience as job}
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
      <h2>Skills</h2>
      <div class="skills-list">
        {#each Object.values(hats) as hat}
          {#each hat.skills.core as skill}
            <span class="skill-item">{skill}</span>
          {/each}
        {/each}
        {#each languages as language}
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
    padding: var(--spacing-12) 0 var(--spacing-8) 0;
    text-align: center;
  }

  .cv-hero h1 {
    margin-bottom: var(--spacing-2);
  }

  .cv-subtitle {
    font-size: 1.125rem;
    margin-bottom: var(--spacing-8);
    opacity: 0.9;
  }

  /* Hat Switcher Styles - Anti-Design/Deconstructivism */
  .hat-switcher {
    display: flex;
    gap: var(--spacing-3);
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: var(--spacing-8);
  }

  .hat-button {
    background: var(--hat-color);
    border: 3px solid rgba(0, 0, 0, 0.8);
    color: white;
    padding: var(--spacing-4) var(--spacing-6);
    border-radius: 0;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    transition: transform 0.15s ease;
    display: flex;
    align-items: center;
    gap: var(--spacing-2);
    position: relative;
    text-transform: uppercase;
    letter-spacing: -0.5px;
    box-shadow: 6px 6px 0 rgba(0, 0, 0, 0.4);
  }

  .hat-button:nth-child(1) {
    transform: rotate(-1.5deg);
  }

  .hat-button:nth-child(2) {
    transform: rotate(1deg);
  }

  .hat-button:nth-child(3) {
    transform: rotate(-0.5deg);
  }

  .hat-button::before {
    content: '';
    position: absolute;
    top: -3px;
    right: -3px;
    bottom: -3px;
    left: -3px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    pointer-events: none;
  }

  .hat-button::after {
    content: '';
    position: absolute;
    width: 8px;
    height: 8px;
    background: rgba(0, 0, 0, 0.3);
    bottom: -4px;
    right: -4px;
    clip-path: polygon(0 0, 100% 100%, 0 100%);
  }

  .hat-button:hover {
    transform: rotate(0deg) translateY(-2px);
    box-shadow: 8px 8px 0 rgba(0, 0, 0, 0.4);
  }

  .hat-button.active {
    background: rgba(0, 0, 0, 0.9);
    border-color: var(--hat-color);
    border-width: 3px;
    box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.4);
    transform: rotate(0deg) translate(2px, 2px);
  }

  .hat-button.active::before {
    border-color: var(--hat-color);
    opacity: 0.6;
  }

  .hat-icon {
    font-size: 1.5rem;
    line-height: 1;
    transform: rotate(5deg);
  }

  .hat-title {
    font-size: 0.9rem;
    font-weight: 900;
  }

  /* Spoilers Section - Anti-Design/Deconstructivism */
  .spoilers-section {
    display: flex;
    justify-content: center;
    margin-bottom: var(--spacing-6);
  }

  .spoilers-button {
    background: rgba(255, 255, 255, 0.1);
    border: 2px dashed rgba(255, 255, 255, 0.6);
    color: white;
    padding: var(--spacing-3) var(--spacing-5);
    border-radius: 0;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.15s ease;
    display: flex;
    align-items: center;
    gap: var(--spacing-2);
    position: relative;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    transform: rotate(-0.8deg);
    box-shadow: 4px 4px 0 rgba(255, 255, 255, 0.15);
  }

  .spoilers-button::before {
    content: '';
    position: absolute;
    top: 4px;
    left: 4px;
    right: -4px;
    bottom: -4px;
    border: 2px solid rgba(255, 255, 255, 0.2);
    pointer-events: none;
  }

  .spoilers-button:hover {
    transform: rotate(0deg) translateY(-1px);
    border-style: solid;
    box-shadow: 5px 5px 0 rgba(255, 255, 255, 0.2);
  }

  .spoilers-button.active {
    background: #f59e0b;
    border: 3px solid rgba(0, 0, 0, 0.8);
    box-shadow:
      0 0 0 2px #f59e0b,
      0 0 0 5px rgba(0, 0, 0, 0.8),
      6px 6px 0 5px rgba(0, 0, 0, 0.3);
    transform: rotate(0deg) translate(2px, 2px);
  }

  .spoilers-button.active::before {
    border-color: rgba(0, 0, 0, 0.5);
  }

  .spoilers-emoji {
    font-size: 1.1rem;
    line-height: 1;
    transform: rotate(-8deg);
  }

  /* Hat Tagline */
  .hat-tagline {
    color: white;
    padding: var(--spacing-6) 0;
    text-align: center;
    font-size: 1.25rem;
    font-weight: 500;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .hat-tagline p {
    margin: 0;
  }

  .cv-actions {
    display: flex;
    gap: var(--spacing-4);
    justify-content: center;
    margin-top: var(--spacing-6);
  }

  /* Action Buttons - Simplified Anti-Design */
  .cv-actions .button {
    border: 2px solid white;
    border-radius: 0;
    padding: var(--spacing-3) var(--spacing-6);
    font-size: 0.9rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    cursor: pointer;
    transition: transform 0.15s ease;
    text-decoration: none;
    display: inline-block;
    position: relative;
    box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.3);
  }

  .cv-actions .button-primary {
    background: white;
    color: var(--color-primary);
  }

  .cv-actions .button-secondary {
    background: transparent;
    color: white;
  }

  .cv-actions .button:hover {
    transform: translate(1px, 1px);
    box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.3);
  }

  .cv-actions .button:active {
    transform: translate(3px, 3px);
    box-shadow: 0 0 0 rgba(0, 0, 0, 0.3);
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

  @media (max-width: 640px) {
    .hat-button {
      padding: var(--spacing-3) var(--spacing-4);
      font-size: 0.85rem;
      box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.4);
    }

    .hat-button.active {
      box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.4);
    }

    .hat-icon {
      font-size: 1.25rem;
    }

    .hat-title {
      font-size: 0.8rem;
    }

    .cv-subtitle {
      font-size: 1rem;
    }

    .hat-tagline {
      font-size: 1rem;
    }

    .spoilers-button {
      padding: var(--spacing-2) var(--spacing-4);
      font-size: 0.8rem;
      box-shadow: 3px 3px 0 rgba(255, 255, 255, 0.15);
    }

    .spoilers-button.active {
      box-shadow:
        0 0 0 2px #f59e0b,
        0 0 0 4px rgba(0, 0, 0, 0.8),
        4px 4px 0 4px rgba(0, 0, 0, 0.3);
    }

    .spoilers-emoji {
      font-size: 1rem;
    }

    .cv-actions .button {
      padding: var(--spacing-2) var(--spacing-4);
      font-size: 0.85rem;
      box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.3);
    }

    .skill-tag {
      font-size: 0.7rem;
      padding: var(--spacing-1) var(--spacing-2);
      box-shadow: 1px 1px 0 rgba(0, 0, 0, 0.2);
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
  }

  .skills-list {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-2);
  }

  /* Skill Tags - Anti-Design Pills */
  .skill-tag {
    color: white;
    padding: var(--spacing-1) var(--spacing-3);
    border-radius: 0;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.3px;
    position: relative;
    border: 2px solid rgba(0, 0, 0, 0.4);
    box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.2);
    display: inline-block;
  }

  .skill-tag:nth-child(odd) {
    transform: rotate(-0.5deg);
  }

  .skill-tag:nth-child(even) {
    transform: rotate(0.5deg);
  }

  .skill-tag:nth-child(3n) {
    transform: rotate(0deg) translateY(-1px);
  }

  .skill-tag::before {
    content: '';
    position: absolute;
    top: -1px;
    left: -1px;
    right: 50%;
    height: 1px;
    background: rgba(255, 255, 255, 0.4);
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

  .award-description {
    margin-top: var(--spacing-3);
    color: var(--color-text);
    font-size: 0.95rem;
    line-height: 1.5;
  }

  .certification-item.has-description {
    flex-direction: column;
    align-items: flex-start;
  }

  .certification-item.has-description .year {
    margin-top: var(--spacing-2);
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

  /* PDF Styles */
  .pdf-doc {
    width: 210mm;
    padding: 15mm;
    background: white;
    font-family: Arial, sans-serif;
    color: #333;
    -webkit-user-select: text;
    user-select: text;
  }

  .pdf-doc h1 {
    font-size: 24px;
    color: #0891b2;
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
