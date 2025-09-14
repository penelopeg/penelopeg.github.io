<script>
  import { base } from '$app/paths';
</script>

<div class="about-hero">
  <div class="container">
    <h1>About Me</h1>
    <p class="lead">Tech lead, community builder, and creative explorer on a mission to make the most with whatever we have.</p>
    <div class="hero-actions">
      <a href="{base}/portfolio" class="button button-secondary">What?</a>
    </div>
  </div>
</div>
  
  <section class="about-content">
  <div class="container">
    <div class="about-grid">
    <div class="about-text">
      <h2>Who the hell is she?</h2>
      <p>I'm someone who gets genuinely excited about what makes communities tick.</p>
      <p>By day, I lead a development team at Contentserv, building PIM software that actually brings something new to the field. By night (and weekends), I'm working on local.foundation, a platform helping other community builders organize and get insights about their community.</p>
      <p>You'll find me jumping around the Algarve tech scene, mostly through Geek Sessions Faro, where we bring together people who love tech as much as they love good conversation (beer optional, passion required). After studying in different Portuguese cities and working with multicultural teams, I've learned that the magic happens when you throw different perspectives into a room and let them solve problems together.</p>
      <p>I've got the brain of a software engineer but the restless heart of an artist. I can't stick to just one thing. And honestly, why should anyone? So I'm constantly juggling between writing, drawing, organizing events, and somehow accumulating an absolutely unreasonable number of music playlists (90+ and counting... it's a problem).</p>
      <p>When I'm not accidentally starting new projects, you'll catch me organizing hackathons like Techstars Startup Weekend and Impact Hackers. I'm still working on that whole "sleep is important" concept, but hey: life's too interesting to waste time being tired!</p>
      
      <h2>What Drives Me</h2>
      <div class="values-grid">
      <div class="value-card">
        <h3>Permission to Be Messy</h3>
        <p>Helping people embrace their full, chaotic, multi-passionate selves instead of forcing themselves into neat boxes</p>
      </div>
      <div class="value-card">
        <h3>Movement & Connection</h3>
        <p>Creating spaces where different kinds of people can solve problems together and find their humanity in each other</p>
      </div>
      <div class="value-card">
        <h3>Controlled Chaos</h3>
        <p>Proving that you can be organized in the chaos. Planning creates the container, but magic happens in the spontaneous moments</p>
      </div>
      <div class="value-card">
        <h3>The Joy of Trying</h3>
        <p>Life's not that serious. I'd rather be remembered as someone who enjoyed trying than someone who played it safe</p>
      </div>
      </div>
  
      <h2>Current Focus</h2>
      <p>
      I'm currently focused on:
      </p>
      <ul class="focus-list">
      <li>Developing a mobile app to make networking meaningful</li>
      <li>Building a platform in local.foundation for community builders</li>
      <li>Leading my team to innovate in the PIM software space</li>
      <li>Volunteering at 351 to make Portugal Tech Week a blast</li>
      <li>Brainstorming an RPG framework for Impact Hackers</li>
      <li>Creating a wheel app for neurodivergent folk</li>
      <li>Prepping a gamejam</li>
      <li>Finishing my first draft for a space opera book</li>
      </ul>
    </div>
    <div class="about-sidebar">
      <div class="profile-card card">
      <div class="profile-image">
        <img src="{base}/images/profile/me_alternative.jpg" alt="Penelope" />
        </div>			  
      <div class="profile-info">
        <h3>Quick Facts</h3>
        <ul class="quick-facts">
        <li>
          <strong>Location: </strong>
          <span>Algarve, Portugal</span>
        </li>
        <li>
          <strong>Tech Experience: </strong>
          <span>10 years</span>
        </li>
        <li>
          <strong>Community Experience: </strong>
          <span>7 years</span>
          </li>
        <li>
          <strong>Languages: </strong>
          <span>English, Portuguese, spanish if you're very patient</span>
        </li>
        <li>
          <strong>Education: </strong>
          <span>Software Engineering, UALG, EPBJC</span>
        </li>
        </ul>
      </div>
      </div>
  
      <div class="contact-card card">
      <h3>Get in Touch</h3>
      <div class="contact-links">
        <!-- <a href="mailto:penelope@duck.com" class="button button-primary">
        Send Email
        </a> -->
        <a href="https://zez.am/lepsies" class="button button-secondary">
        Connect Online
        </a>
      </div>
      </div>
    </div>
    </div>
  </div>
  </section>
  
  <style>
  .about-hero {
    background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
    color: white;
    padding: var(--spacing-16) 0;
    text-align: center;
  }
  
  .about-hero h1 {
    margin-bottom: var(--spacing-4);
  }
  
  .lead {
    font-size: 1.25rem;
    opacity: 0.9;
    max-width: 48rem;
    margin: 0 auto;
  }
  
  .about-content {
    padding: var(--spacing-16) 0;
  }
  
  .about-grid {
    display: grid;
    gap: var(--spacing-8);
    grid-template-columns: 1fr;
  }
  
  @media (min-width: 1024px) {
    .about-grid {
    grid-template-columns: 2fr 1fr;
    }
  }
  
  .about-text h2 {
    margin-top: var(--spacing-8);
  }
  
  .about-text h2:first-child {
    margin-top: 0;
  }
  
  .values-grid {
    display: grid;
    gap: var(--spacing-4);
    grid-template-columns: repeat(1, 1fr);
    margin: var(--spacing-6) 0;
  }
  
  @media (min-width: 640px) {
    .values-grid {
    grid-template-columns: repeat(2, 1fr);
    }
  }
  
  .value-card {
    padding: var(--spacing-4);
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: var(--border-radius);
  }
  
  .value-card h3 {
    color: var(--color-primary);
    margin-bottom: var(--spacing-2);
    font-size: 1.125rem;
  }
  
  .value-card p {
    color: var(--color-text-light);
    font-size: 0.875rem;
    margin: 0;
  }
  
  .focus-list {
    list-style-type: none;
    padding: 0;
    margin: var(--spacing-4) 0;
  }
  
  .focus-list li {
    padding: var(--spacing-2) 0;
    padding-left: var(--spacing-8);
    position: relative;
  }
  
  .focus-list li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 1rem;
    width: var(--spacing-4);
    height: 2px;
    background-color: var(--color-primary);
  }
  
  .profile-card {
    text-align: center;
    margin-bottom: var(--spacing-6);
  }
  
  .profile-image {
    width: 8rem;
    height: 8rem;
    margin: 0 auto var(--spacing-4);
    border-radius: 9999px;
    overflow: hidden; /* This ensures the image stays within the rounded border */
  }

  .profile-image img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* This ensures the image fills the circular container */
  }
  
  .quick-facts {
    list-style-type: none;
    padding: 0;
    margin: var(--spacing-4) 0 0;
    text-align: left;
  }
  
  .quick-facts li {
    display: flex;
    justify-content: space-between;
    padding: var(--spacing-2) 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
  
  .quick-facts li:last-child {
    border-bottom: none;
  }
  
  .contact-card {
    text-align: center;
  }
  
  .contact-links {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-2);
    margin-top: var(--spacing-4);
  }
  </style>
