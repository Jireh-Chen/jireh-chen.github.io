(() => {
  'use strict';

  const cfg =
    (typeof USER_CONFIG !== 'undefined' && USER_CONFIG) ||
    window.USER_CONFIG ||
    window.userConfig ||
    window.CONFIG;

  const archive = document.getElementById('publicationArchive');

  if (!archive) return;

  if (!cfg) {
    archive.innerHTML =
      '<p class="publication-empty">Unable to load publication data from config.js.</p>';
    return;
  }


  /* -------------------------------------------------------
     Helpers
  ------------------------------------------------------- */

  const escapeHTML = (value) =>
    String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');


  const normalizeName = (name) =>
    String(name || '')
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase();


  /* -------------------------------------------------------
     Authors
  ------------------------------------------------------- */

  const getAuthors = (paper) => {

    if (Array.isArray(paper.authors)) {
      return paper.authors;
    }

    if (typeof paper.authors === 'string') {
      return paper.authors
        .split(',')
        .map(name => name.trim())
        .filter(Boolean);
    }

    return [];
  };


  const getCorrespondingAuthors = (paper) => {

    const value =
      paper.correspondingAuthors ??
      paper.corresponding ??
      [];

    if (Array.isArray(value)) {
      return value;
    }

    if (typeof value === 'string') {
      return value
        .split(',')
        .map(name => name.trim())
        .filter(Boolean);
    }

    return [];
  };

  const getEqualContributors = (paper) => {

    const value =
        paper.equalContributors ??
        [];

    if (Array.isArray(value)) {
        return value;
    }

    if (typeof value === 'string') {
        return value
        .split(',')
        .map(name => name.trim())
        .filter(Boolean);
    }

    return [];
  };

  const renderAuthors = (paper) => {

    const selfName = normalizeName(
        cfg.authorName || cfg.name
    );

    const corresponding = new Set(
        getCorrespondingAuthors(paper).map(normalizeName)
    );

    const equalContributors = new Set(
        getEqualContributors(paper).map(normalizeName)
    );

    return getAuthors(paper)
        .map(author => {

        const normalized = normalizeName(author);

        const isSelf =
            normalized === selfName;

        const isCorresponding =
            corresponding.has(normalized);

        const isEqualContributor =
            equalContributors.has(normalized);


        // Highlight myself
        const authorText = isSelf
            ? `<span class="pub-author-self">${escapeHTML(author)}</span>`
            : escapeHTML(author);


        // Equal contribution
        const equalMark = isEqualContributor
            ? `<sup class="pub-equal-mark"
                    title="Equal contribution">†</sup>`
            : '';


        // Corresponding author
        const correspondingMark = isCorresponding
            ? `<sup class="pub-corresponding-mark"
                    title="Corresponding author">*</sup>`
            : '';


        return `${authorText}${equalMark}${correspondingMark}`;

        })
        .join(', ');
  };


  /* -------------------------------------------------------
     Links
  ------------------------------------------------------- */

  const renderLinks = (links = {}) => {

    const validLinks =
      Object.entries(links)
        .filter(([, url]) => url);

    if (!validLinks.length) {
      return '';
    }


    return `
      <span class="pub-list-links">

        ${validLinks
          .map(([label, url]) => `
            <a
              href="${escapeHTML(url)}"
              target="_blank"
              rel="noopener noreferrer"
            >
              ${escapeHTML(label.toUpperCase())}
            </a>
          `)
          .join('')}

      </span>
    `;
  };


  /* -------------------------------------------------------
     Sort Publications
  ------------------------------------------------------- */

  const papers =
    (cfg.publications || [])

      // Allow individual publications to be hidden
      .filter(paper => !paper.hidden)

      // Keep original order inside the same year
      .map((paper, originalIndex) => ({
        ...paper,
        _originalIndex: originalIndex
      }))

      // Sort by year descending
      .sort((a, b) => {

        const yearA =
          Number(a.year) || 0;

        const yearB =
          Number(b.year) || 0;


        if (yearA !== yearB) {
          return yearB - yearA;
        }

        return (
          a._originalIndex -
          b._originalIndex
        );
      });


  if (!papers.length) {
    archive.innerHTML =
      '<p class="publication-empty">No publications have been added yet.</p>';
    return;
  }


  /* -------------------------------------------------------
     Group Publications by Year
  ------------------------------------------------------- */

  const groups = new Map();

  papers.forEach(paper => {

    const year = Number(paper.year);

    // 2026 and later: group individually by year
    // Before 2026: merge into one group
    const groupKey =
      year >= 2026
      ? String(year)
      : 'Before';

    if (!groups.has(groupKey)) {
      groups.set(groupKey, []);
    }

    groups.get(groupKey).push(paper);
  });


  /* -------------------------------------------------------
     Render
  ------------------------------------------------------- */
  let globalIndex = 0;
  
  archive.innerHTML =
    Array.from(groups.entries())
      .map(([year, yearPapers]) => `

        <section
          class="pub-year-section"
          aria-labelledby="pub-year-${escapeHTML(year)}"
        >

          <!-- Year column -->
          <div class="pub-year-column">

            <h2
              class="pub-year"
              id="pub-year-${escapeHTML(year)}"
            >
              ${escapeHTML(year)}
            </h2>

            <span class="pub-year-count">
              ${yearPapers.length}
              ${yearPapers.length === 1
                ? 'paper'
                : 'papers'}
            </span>

          </div>


          <!-- Publication list -->
          <div class="pub-year-list">

            ${yearPapers
                .map(paper => {

                globalIndex += 1;

                const paperIndex =
                    String(globalIndex).padStart(2, '0');

                return `
                    <article
                    class="pub-list-item"
                    data-index="${paperIndex}"
                    >

                    <h3 class="pub-list-title">
                        ${escapeHTML(paper.title)}
                    </h3>

                    <p class="pub-list-authors">
                        ${renderAuthors(paper)}
                    </p>

                    <div class="pub-list-meta">

                        ${paper.venue ? `
                        <span class="pub-list-venue">
                            ${escapeHTML(paper.venue)}
                        </span>
                        ` : ''}

                        ${renderLinks(paper.links)}

                    </div>

                    </article>
                `;
                })
                .join('')}

          </div>

        </section>

      `)
      .join('');


  /* -------------------------------------------------------
     Page Metadata
  ------------------------------------------------------- */

  if (cfg.name) {
    document.title =
      `${cfg.name} | Publications`;
  }


  const intro =
    document.getElementById('publicationsIntro');

  if (intro && cfg.name) {
    intro.textContent =
      `Complete publication list of ${cfg.name}, grouped by year.`;
  }

})();