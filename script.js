// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
updateBtn();

function updateBtn() {
    if (themeToggle) {
        themeToggle.textContent = html.getAttribute('data-theme') === 'dark' ? 'Morning Ed.' : 'Evening Ed.';
    }
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        updateBtn();
    });
}

// Dynamic date
const dateline = document.getElementById('dateline');
if (dateline) {
    dateline.textContent = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

// Smooth scroll for section nav
document.querySelectorAll('.section-nav a').forEach(a => {
    a.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(a.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

// Prevent placeholder href="#" links from scrolling to top
document.querySelectorAll('a[href="#"]').forEach(a => a.addEventListener('click', e => e.preventDefault()));

// ── Config Population ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  if (typeof USER_CONFIG === 'undefined') return;
  populateSimpleFields(USER_CONFIG);
  populateLists(USER_CONFIG);
});

function formatMarkdown(text) {
    if (!text) return "";

    return text
        // ***bold + italic***
        .replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>")

        // **bold**
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")

        // *italic*
        .replace(/\*(.+?)\*/g, "<em>$1</em>");
}

function populateSimpleFields(cfg) {
    // ── Simple text fields ──────────────────────────────
    document.querySelectorAll('[data-config]').forEach(el => {
        const key = el.dataset.config;

        if (cfg[key] !== undefined && cfg[key] !== null) {

            // Fields that support Markdown formatting
            const markdownFields = ["bio", "intro"];

            if (markdownFields.includes(key)) {
                el.innerHTML = formatMarkdown(cfg[key]);
            } else {
                el.textContent = cfg[key];
            }
        }
    });


    // ── Page title ──────────────────────────────────────
    if (cfg.name) {
        document.title = `${cfg.name} | Academic Homepage`;
    }


    // ── Profile photo ───────────────────────────────────
    const photo = document.getElementById('profilePhoto');

    if (photo && cfg.photo) {
        photo.innerHTML = `
            <img
                class="profile-photo cartoon-photo"
                src="${cfg.photo.cartoon}"
                alt="${cfg.name || 'Profile photo'}"
            >
            <img
                class="profile-photo real-photo"
                src="${cfg.photo.real}"
                alt="${cfg.name || 'Profile photo'}"
            >
        `;

        // Tap/click support for touch devices
        photo.addEventListener('click', () => {
            photo.classList.toggle('show-real');
        });
    }


    // ── Email ───────────────────────────────────────────
    const profileEmail = document.getElementById('profileEmail');

    if (profileEmail && cfg.email) {
        profileEmail.innerHTML =
            `<a href="mailto:${cfg.email}">${cfg.email}</a>`;
    }


    const contactEmail = document.getElementById('contactEmail');

    if (contactEmail && cfg.email) {
        contactEmail.innerHTML =
            `<a href="mailto:${cfg.email}">${cfg.email}</a>`;
    }


    // ── External links ──────────────────────────────────
    const profileLinks = document.getElementById('profileLinks');

    if (profileLinks && cfg.links) {

        const labels = {
            scholar: "Google Scholar",
            github: "GitHub",
            orcid: "ORCID",
            linkedin: "LinkedIn",
            twitter: "Twitter",
            cv: "CV"
        };

        const links = Object.entries(cfg.links)
            .filter(([key, url]) => url)
            .map(([key, url]) => {
                const label = labels[key] || key;

                return `<a href="${url}"
                           target="_blank"
                           rel="noopener noreferrer">${label}</a>`;
            });

        profileLinks.innerHTML = links.join(' · ');
    }


    // ── Statistics ──────────────────────────────────────
    const latestNews = document.getElementById('latestNews');

    if (latestNews && cfg.news?.length) {
        latestNews.innerHTML = cfg.news
          .slice(0, 5)
          .map(item => `
              <div class="sidebar-news">
                  <div class="sidebar-news-meta">
                      ${item.badge ? `<span class="news-badge">${item.badge}</span>` : ""}
                      <span class="sidebar-news-date">${item.date}</span>
                  </div>
                  <div class="sidebar-news-text">
                      ${formatMarkdown(item.text)}
                  </div>
              </div>
          `)
          .join('');
    }


    // ── Footer ──────────────────────────────────────
    const footer = document.getElementById('siteFooter');

    if (footer && cfg.name) {
        footer.innerHTML =
            `&copy; ${new Date().getFullYear()} ${cfg.name} · Built upon <a href="https://github.com/Galaxy-Dawn/academic-homepage-templates" target="_blank" rel="noopener noreferrer">Galaxy-Dawn</a>`;
    }


    // -- More Publictaions
    const publicationsMore = document.getElementById('publicationsMore');

    if (publicationsMore && cfg.publicationsPage) {
        publicationsMore.innerHTML = `
            <a href="${cfg.publicationsPage}" class="publications-more-link">
                VIEW ALL PUBLICATIONS →
            </a>
        `;
    }
}

function boldName(authors, name) {
  if (!name) return authors;
  return authors.replace(name, `<strong>${name}</strong>`);
}

function populateLists(cfg) {
  const artCols = document.getElementById('cfg-publications');
  if (artCols && cfg.publications?.length) {

    const selectedPublications = cfg.publications
      .filter(p => p.selected)
      .sort((a, b) =>
        (a.selectedOrder ?? 999) - (b.selectedOrder ?? 999)
      )
      .slice(0, 4);

    artCols.innerHTML = selectedPublications.map(p => `
      <article class="news-article">

        <h4 class="article-headline">
          ${p.title}
        </h4>

        <p class="article-byline">
          ${boldName(p.authors, cfg.name)}
        </p>

        <div class="article-meta">

          ${p.venue ? `
            <span class="pub-venue">
              ${p.venue}
            </span>
          ` : ''}

          ${p.links && Object.keys(p.links).length ? `
            <span class="article-links">
              ${Object.entries(p.links)
                .map(([k, v]) =>
                  `<a href="${v}"
                      target="_blank"
                      rel="noopener noreferrer">
                    [${k.toUpperCase()}]
                  </a>`
                )
                .join(' · ')}
            </span>
          ` : ''}

        </div>

        ${p.abstract ? `
          <p class="article-body">
            ${p.abstract}
          </p>
        ` : ''}

      </article>
    `).join('');
  }


  const projectsSection = document.getElementById('projects');
  const classifieds = document.getElementById('cfg-projects');

  if (classifieds && cfg.projects?.length) {

      classifieds.innerHTML = cfg.projects.map(p => `
          <div class="classified-ad">

              <h5 class="ad-title">
                  ★ ${
                      p.url
                          ? `<a href="${p.url}"
                                target="_blank"
                                rel="noopener noreferrer">
                                ${p.name}
                            </a>`
                          : p.name
                  }
              </h5>

              <p class="ad-body">${p.desc}</p>

              <p class="ad-tags">
                  ${(p.tags || []).join(' · ')}
              </p>

          </div>
      `).join('');

  } else if (projectsSection) {

      projectsSection.style.display = 'none';

  }


  const bulletin = document.getElementById('cfg-news');
  if (bulletin && cfg.news?.length) {
    bulletin.innerHTML = cfg.news.map(n => `
      <div class="bulletin-item">
        <span class="bulletin-date">${n.date}</span>
        <span class="bulletin-badge">${n.badge.toUpperCase()}</span>
        <span class="bulletin-text">${formatMarkdown(n.detail || n.text)}</span>
      </div>`).join('');
  }


  const career = document.getElementById('cfg-experience');
  if (career) {
    const edu = cfg.education || [];
    const exp = cfg.experience || [];

    let html = '';

    if (edu.length) {
      html += `
        <div class="career-block">
          <h5 class="career-cat">EDUCATION</h5>

          ${edu.map(e => `
            <div class="career-entry">
              <span class="career-period">${e.period}</span>
              <strong class="career-title">${e.degree}</strong>
              <span class="career-place">${e.institution}</span>
            </div>
          `).join('')}
        </div>
      `;
    }

    if (exp.length) {
      html += `
        <div class="career-block">
          <h5 class="career-cat">EXPERIENCE</h5>

          ${exp.map(e => `
            <div class="career-entry">
              <span class="career-period">${e.period}</span>
              <strong class="career-title">${e.role}</strong>
              <span class="career-place">${e.institution}</span>
            </div>
          `).join('')}
        </div>
      `;
    }

    career.innerHTML = html;
  }


  const photoStrip = document.getElementById('cfg-photos');
  const photosSection = document.getElementById('photosSection');

  if (photoStrip && cfg.photos?.length) {

    photoStrip.innerHTML = cfg.photos.map(photo => `
      <figure class="photo-card">

        <img
          src="${photo.src}"
          alt="${photo.caption || 'Photo'}"
          loading="lazy"
        >

        <figcaption>
          ${photo.caption ? `
            <span class="photo-caption">
              ${photo.caption}
            </span>
          ` : ''}

          ${photo.date ? `
            <span class="photo-date">
              ${photo.date}
            </span>
          ` : ''}
        </figcaption>

      </figure>
    `).join('');

  } else if (photosSection) {

    photosSection.style.display = 'none';

  }
}
