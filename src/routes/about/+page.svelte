<script>
  import { base } from '$app/paths';
</script>

<div class="about-hero ct-hero">
  <div class="container">
    <h1 class="chaos-rotate-1">About Me</h1>
    <div class="handwritten" style="position: absolute; top: 20px; right: 20px; z-index: 100;">
      that's me!
    </div>
    <p class="lead chaos-spacing">Creative explorer on a mission to make the most with whatever we have.</p>
    <div class="hero-actions" style="position: relative;">
      <a href="{base}/portfolio" class="button button-secondary chaos-rotate-2">What?</a>
      <div class="handwritten" style="position: absolute; bottom: -20px; left: 50%; transform: translateX(-50%); z-index: 100;">
        see my stuff!
      </div>
    </div>
  </div>
</div>
  
  <section class="about-content">
  <div class="container">
    <div class="about-grid">
    <div class="about-text">
      <h2 class="chaos-rotate-3">who is she? <span class="handwritten" style="font-size: 0.7em; margin-left: 10px;">...do i wanna know?</span></h2>
      <p>My name is Penélope, and I am genuinely curious about what makes communities tick.</p>
      <p>By day, I lead a development team at Centric Software, building PIM software that actually brings something new to the field. On my free time, I'm building local.foundation, a platform to map and develop communities and regional ecosystems from the ground up.</p>
      <p>You'll find me jumping around the Algarve tech scene, mostly through Geek Sessions Faro, where we bring together people who love tech as much as they love good conversation (beer optional). After studying in different Portuguese cities and working with multicultural teams, I've learned that the magic happens when you throw different perspectives into a room and let them solve problems together.</p>
      <p>I've got the brain of a software engineer but the restless heart of an artist and I can't stick to just one thing. And why should anyone? So I'm constantly juggling between writing, drawing, organizing events, and somehow accumulating an absolutely unreasonable number of music playlists (90+ and counting... it's a problem).</p>
      <p>When I'm not accidentally starting new projects, you'll catch me organizing hackathons like Techstars Startup Weekend and Impact Hackers. I'm still working on that whole "sleep is important" concept, but hey: life's too interesting to waste time being tired!</p>
      
      <h2 class="chaos-rotate-1">some core principles</h2>
      <div class="values-grid">
      <div class="wonky-border value-card chaos-rotate-2">
        <h3 class="scribble-underline">Always moving and connecting</h3>
        <p>The world is a good place. Create spaces where different kinds of people can solve problems together and find their humanity in each other</p>
      </div>
      <div class="wonky-border value-card chaos-rotate-3">
        <h3 class="scribble-underline">Chaos Theory</h3>
        <p>Proving that you can be organized in the chaos of a multi-passion life. Planning is an essential, but magic happens in the spontaneous moments</p>
        <div class="handwritten" style="position: absolute; bottom: -20px; right: -25px; z-index: 100;">
          this one!
        </div>
      </div>
      <div class="wonky-border value-card chaos-rotate-4">
        <h3 class="scribble-underline">The joy of trying</h3>
        <p>Life's not that serious. I'd rather be remembered as someone who enjoyed trying than someone who played it safe</p>
      </div>
      <div class="wonky-border value-card chaos-rotate-1">
        <h3 class="scribble-underline">Do it scared</h3>
        <p>Being fearless is misunderstood. You need fear in order to be brave. You just need to do it while scared</p>
      </div>
      </div>
  
      <h2 class="chaos-rotate-2">current focus</h2>
      <div class="handwritten" style="position: absolute; margin-top: -15px; margin-left: 180px; z-index: 100;">
        what I'm up to
      </div>
      <ul class="focus-list chaos-spacing">
      <li>Improving startup ecosystem mapping features on local.foundation</li>
      <li>Developing a mobile app to make networking meaningful</li>
      <li>Leading my team to innovate in the PIM software space</li>
      <li>Brainstorming an RPG framework for Impact Hackers</li>
      <li>Creating a wheel app for neurodivergent folk</li>
      <li>Prepping a new format for future-led people</li>
      <li>Finishing my first draft for a space opera book</li>
      </ul>
    </div>
    <div class="about-sidebar chaos-spacing">
      <div class="profile-card wonky-border chaos-rotate-1">
      <div class="profile-image">
        <img src="{base}/images/profile/me_alternative.jpg" alt="Penelope" />
        </div>
        <div class="handwritten" style="position: absolute; top: -20px; right: -25px; z-index: 100;">
          that's me!
        </div>			  
      <div class="profile-info">
        <h3 class="scribble-underline">Quick Facts</h3>
        <ul class="quick-facts">
        <li>
          <strong>Location: </strong>
          <span>Algarve, Portugal</span>
        </li>
        <li>
          <strong>Tech Experience: </strong>
          <span>12 years</span>
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
  
      <div class="contact-card wonky-border chaos-rotate-3">
      <h3 class="scribble-underline">Get in Touch</h3>
      <div class="contact-links">
        <a href="https://zez.am/lepsies" class="button button-secondary chaos-rotate-1">
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
    /* cream hero via ct-hero class */
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
    transform: rotate(-0.2deg);
    transform-origin: center center;
    position: relative;
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
      grid-template-rows: repeat(2, 1fr);
    }
    
    .values-grid .value-card:nth-child(1) { grid-column: 1; grid-row: 1; }
    .values-grid .value-card:nth-child(2) { grid-column: 2; grid-row: 1; }
    .values-grid .value-card:nth-child(3) { grid-column: 1; grid-row: 2; }
    .values-grid .value-card:nth-child(4) { grid-column: 2; grid-row: 2; }
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
    height: 3px;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 4'%3E%3Cpath d='M0,2 Q4,0 8,2 T16,2' stroke='%230891b2' stroke-width='2' fill='none'/%3E%3C/svg%3E") no-repeat;
    background-size: 100% 100%;
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

  /* Sticker-style Button Overrides */
  .hero-actions .button,
  .contact-links .button {
    font-size: 1rem;
    transform: rotate(-1.5deg);
    --hover-rotate: -1.5deg;
  }

  .hero-actions .button:hover,
  .contact-links .button:hover {
    transform: translateY(-4px) rotate(calc(var(--hover-rotate) * 1.5));
  }

  .contact-links .button:nth-child(odd) {
    transform: rotate(-2deg);
  }

  .contact-links .button:nth-child(even) {
    transform: rotate(2deg);
  }
  </style>
