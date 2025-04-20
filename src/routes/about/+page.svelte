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
      <h2>My Story</h2>
      <p>Hey there! I'm a curious soul who loves figuring out what makes communities tick. When I'm not leading a team of awesome developers at Contentserv (where we make PIM software actually fun), I'm probably cooking up some chaos at local.foundation - our attempt at helping other community builders avoid the mistakes we made!</p>
      <p>You'll find me bouncing around the Algarve tech scene, mostly through Geek Sessions Faro where we bring together people who love tech as much as they love beer. After hopping between different Portuguese cities and working with teams from all over, I've learned that the magic happens when you throw different people into a room and let them solve problems together.</p>
      <p>Think of me as a walking contradiction - I've got the somewhat a brain of a software engineer but the restless heart of an artist (minus the natural talent). I can't seem to stick to just one thing (why would anyone?), so I'm constantly jumping between writing, drawing, organizing events, and somehow ending up with an absolutely unreasonable number of Spotify playlists (80+ and counting... send help!).</p>
      <p>When I'm not accidentally starting new projects, you might catch me running around organizing events and various hackathons. I haven't learned that sleep is important yet!</p>
      
      <h2>What Drives Me</h2>
      <div class="values-grid">
      <div class="value-card">
        <h3>Innovation</h3>
        <p>Chasing what new ways we can create and connect tech and creativity</p>
      </div>
      <div class="value-card">
        <h3>Community</h3>
        <p>Building spaces where people can learn, grow, and have fun together</p>
      </div>
      <div class="value-card">
        <h3>Impact</h3>
        <p>Creating solutions that make a real difference in people's lives</p>
      </div>
      <div class="value-card">
        <h3>Creativity</h3>
        <p>Life's not that serious... Having fun and trying is the way to go</p>
      </div>
      </div>
  
      <h2>Current Focus</h2>
      <p>
      I'm currently focused on:
      </p>
      <ul class="focus-list">
      <li>Leading my team to innovate in the PIM software space</li>
      <li>Building solutions for community builders</li>
      <li>Growing the tech community in the Algarve</li>
      <li>Organizing events</li>
      <li>Writing a fiction book, a poetry book, and a non-fiction book</li>
      </ul>
    </div>
  
    <div class="about-sidebar">
      <div class="profile-card card">
      <div class="profile-image">
        <img src="{base}/images/profile/penelope.jpeg" alt="Penelope" />
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
        <a href="https://zez.am/lepsie" class="button button-secondary">
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