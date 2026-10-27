# Tuskers Veterans Portal — Army Ordnance Corps

A static website for veterans of the Army Ordnance Corps. Plain HTML, CSS and
JavaScript — no build step, no framework, no dependencies.

## Running it

Open `index.html` directly in a browser, or serve the folder:

```bash
python3 -m http.server 8777 --directory tuskers-veterans
```

Then visit <http://localhost:8777>.

## Files

| File | What it holds |
|---|---|
| `index.html` | Page shell: tricolour strip, utility bar, masthead, nav, footer, and the registration / sign-in modal |
| `assets/css/style.css` | All styling. Design tokens are the `:root` variables at the top |
| `assets/js/data.js` | **All site content.** Edit this to update the site |
| `assets/js/app.js` | Router, views, carousel, forms, search |

**To change content, edit `assets/js/data.js`.** Everything — updates, links,
welfare schemes, units, venues, documents, jobs, heroes, obituary, insignia,
motto — is defined there as plain data.

## Adding the official artwork

The site draws stylised placeholder crests so it looks complete out of the box.
Drop real image files into `assets/img/` and they are picked up automatically on
the next page load — no code change needed. If a file is absent, the placeholder
is used instead.

| Save as | Used for |
|---|---|
| `assets/img/aoc-crest.png` | Masthead crest, registration panel, favicon |
| `assets/img/insignia-1855.png` | "The Badge Through the Years" — 1855 |
| `assets/img/insignia-1896.png` | 1896 |
| `assets/img/insignia-1918.png` | 1918 |
| `assets/img/insignia-1922.png` | 1922 |
| `assets/img/insignia-1954.png` | 1954 |
| `assets/img/insignia-1989.png` | 1989 (present badge) |

Transparent PNGs look best. The file names are set in `DATA.insignia` and
`CREST_SRC` if you prefer different ones.

For the photo carousel and gallery, the inline SVG scenes in `art()` in
`app.js` are placeholders — replace those blocks with `<img>` tags pointing at
real photographs when you have them.

## Sections

1. Registration / sign-in gate (opens on first visit; "continue as guest" available)
2. Mother unit details — searchable directory + affiliation form
3. MCMM — overview, Corps Museum, University Cell
4. AOC Centre — about, history of the Corps
5. Resources — welfare schemes, pension, materials management, Baat Cheet
6. Jobs & placement — openings plus the welfare schemes for veterans in transition
7. Links — CSD, ADGPI, AWPO, DGR, KSB, ECHS, AWES, MoD, VSK
8. Contact us — Veteran Cell
9. Search documents (PDF library with filters)
10. Institutes booking — Podam Farm, AOC Mess, Centre Mess, Band, Ordnance Club, Tuskers Institute
11. Share your thoughts / blog
12. Register a grievance (with ticket number and tracking)
13. Know your heroes — gallantry awards, battle casualties
14. Obituary, plus the DGOS message and photo scroll on the home page
15. Latest updates — revision programme, association dinner, fraternity lunch,
    golf tournament, Lady Smith Shell, CCM / Trg Association / ROSOWS meeting

Plus: the Corps motto band and the historical insignia timeline (1855–1989).

## What this build does and does not do

This is a **front-end only** build. Forms validate properly and save to the
browser's `localStorage` so the flows are demonstrable end to end — you can
register, raise a grievance, get a ticket number and track it, request a
booking, post to the blog. Nothing is sent anywhere.

Before this goes live it needs a server for: real accounts and password
hashing, grievance and booking workflow, document storage, and blog moderation.
**Do not put real veteran data into it as it stands** — `localStorage` is
unencrypted and visible to anyone using that browser.

## Content still to be verified

Text marked **[to be confirmed]** is placeholder written to be plausible, and
must be checked against official records before publication. This includes:

- The DGOS's name and the text of the message
- All gallantry award citations, battle casualty names, and obituary entries
- Scheme amounts, eligibility thresholds and application windows
- Unit and station lists, MCMM course nomenclature
- Historical dates in the Corps timeline, and the insignia descriptions
- Telephone numbers, email addresses and the VSK link
