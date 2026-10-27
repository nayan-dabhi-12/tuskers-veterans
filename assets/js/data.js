/* =========================================================
   TUSKERS VETERANS PORTAL — content data
   Edit this file to update site content. No build step needed.
   Items marked [to be confirmed] need verification against
   official Centre / Directorate records before publication.
   ========================================================= */
const DATA = {

  /* ---------------- DGOS ----------------
     Name read from the nameplate in the supplied photograph.
     [rank, spelling and tenure to be confirmed] */
  dgos: {
    rank: 'Lt Gen',
    name: 'Deepak Ahuja',
    appt: 'Director General Ordnance Services',
    org:  'Integrated HQ of MoD (Army)',
    sub:  'Colonel Commandant, Army Ordnance Corps'
  },

  /* ---------------- MOTTO ---------------- */
  motto: {
    roman: 'SHATRA SE SHAKTI',
    deva:  'शस्त्र से शक्ति',
    gloss: 'Strength through Arms'
  },

  /* ---------------- HISTORICAL INSIGNIA ----------------
     Images are optional. Drop the artwork in assets/img/ using the
     file names below and each badge appears automatically; until then a
     stylised placeholder of the right era is drawn instead.
     Descriptions below describe the device as it appears in the artwork
     and are indicative. [to be confirmed against Corps records]
     ------------------------------------------------------ */
  insignia: [
    { y:'1855', era:'crown', img:'insignia-1855.png',
      t:'The armorial achievement',
      d:'A full coat of arms — crown above, a quartered shield between two supporters, and a scroll below. The earliest of the six devices.' },
    { y:'1896', era:'crown', img:'insignia-1896.png',
      t:'Ordnance Department',
      d:'A gold plate with three roundels across the head and a banded field, the curved red scroll beneath carrying the word ORDNANCE.' },
    { y:'1918', era:'crown', img:'insignia-1918.png',
      t:'Indian Army Ordnance Corps',
      d:'On a dark ground: the crown over a circular garter enclosing a shield, with the pale scroll below reading ARMY ORDNANCE.' },
    { y:'1922', era:'crown', img:'insignia-1922.png',
      t:'Post-war reorganisation',
      d:'Worked throughout in gold — crown, oval garter and banner — adopted as the Corps took formal shape in the reorganisation of the Indian Army.' },
    { y:'1954', era:'lions', img:'insignia-1954.png',
      t:'The Republic pattern',
      d:'After Independence the crown gives way to the Lion Capital of Ashoka, set above a broad maroon device on a gold crescent scroll.' },
    { y:'1989', era:'lions', img:'insignia-1989.png',
      t:'The present badge',
      d:'The badge worn today — the Lion Capital over the Corps device and crossed swords, with the motto scroll beneath.' }
  ],

  /* ---------------- HERO CAROUSEL ---------------- */
  slides: [
    { kicker:'Army Ordnance Corps',
      title:'Sustaining the Sinews of War',
      text:'From the forward-most post to the largest depot, the Tuskers keep the Indian Army armed, equipped and supplied.',
      art:'parade' },
    { kicker:'AOC Centre, Secunderabad',
      title:'The Home of Every Tusker',
      text:'Where recruits become soldiers and soldiers remain family — for life and beyond.',
      art:'centre' },
    { kicker:'MCEME Campus · MCMM',
      title:'Military College of Materials Management',
      text:'The Corps’ premier seat of learning in materials and logistics management, and home of the Corps Museum.',
      art:'college' },
    { kicker:'Veteran Welfare',
      title:'Once a Tusker, Always a Tusker',
      text:'Distress grants, scholarships, ADLRS, pension guidance and placement support for our veterans and their families.',
      art:'welfare' },
    { kicker:'Regimental Fellowship',
      title:'Bound by the Same Cap Badge',
      text:'Reunions, association dinners, golf tournaments and the Lady Smith Shell competition keep the bond alive.',
      art:'fellowship' }
  ],

  /* ---------------- TICKER ---------------- */
  ticker: [
    { text:'Revision Programme for veterans — nominations open till 30 Sep 2026', href:'#/updates' },
    { text:'Regimental Association Dinner · AOC Centre · 14 Nov 2026', href:'#/updates' },
    { text:'Fraternity Golf Tournament — registration now live', href:'#/updates' },
    { text:'Educational Scholarship applications for AY 2026-27 close 15 Sep 2026', href:'#/welfare' },
    { text:'ECHS smart card renewal camp at AOC Centre, every 2nd Saturday', href:'#/links' }
  ],

  /* ---------------- LATEST UPDATES ---------------- */
  updates: [
    { d:'02', m:'Sep', y:'2026', tag:'new', type:'Programme',
      title:'Revision Programme (Revision Pgme)',
      text:'Refresher and revision programme for veterans and serving personnel on revised materials management procedures, updated provisioning policy and the current inventory management suite. Conducted at MCMM in two capsules; nominations through parent formation.' },
    { d:'14', m:'Nov', y:'2026', tag:'evt', type:'Event',
      title:'Regimental Association Dinner',
      text:'The annual Regimental Association Dinner at the AOC Centre Officers’ Mess, Secunderabad. Veterans, serving officers and families of the Corps are invited. Dress: as intimated in the invitation.' },
    { d:'15', m:'Nov', y:'2026', tag:'evt', type:'Event',
      title:'Fraternity Lunch',
      text:'Fraternity Lunch hosted the day after the Association Dinner, bringing together veterans, veer naris and serving fraternity of the Corps in an informal setting.' },
    { d:'16', m:'Nov', y:'2026', tag:'evt', type:'Sport',
      title:'Fraternity Golf Tournament',
      text:'The annual Fraternity Golf Tournament on the Corps course. Open to veteran and serving members of the Corps and their invited guests. Handicap certificates to be furnished at registration.' },
    { d:'22', m:'Oct', y:'2026', tag:'evt', type:'Competition',
      title:'Lady Smith Shell Competition',
      text:'The historic Lady Smith Shell — one of the Corps’ oldest competitions — contested between units and establishments of the Army Ordnance Corps. Trophy presentation at the AOC Centre parade ground.' },
    { d:'05', m:'Dec', y:'2026', tag:'not', type:'Conference',
      title:'CCM, Trg Association &amp; ROSOWS Meeting',
      text:'Combined Commanders’ / Corps Coordination Meeting, Training Association meeting and the ROSOWS (Retired Ordnance Services Officers’ Welfare Society) general body meeting held back-to-back at the AOC Centre. Agenda points to be forwarded to the Veteran Cell in advance.' }
  ],

  /* ---------------- QUICK LINKS ---------------- */
  links: [
    { code:'CSD',   name:'Canteen Stores Department', url:'https://csdindia.gov.in',
      note:'Canteen smart card, AFD online portal, grocery and liquor entitlements.' },
    { code:'ADGPI', name:'Indian Army (ADGPI)', url:'https://indianarmy.nic.in',
      note:'Official Indian Army website — news, policies, recruitment and veteran services.' },
    { code:'AWPO',  name:'Army Welfare Placement Organisation', url:'https://www.awpo.in',
      note:'Second-career placement for retiring and retired Army personnel.' },
    { code:'DGR',   name:'Directorate General Resettlement', url:'https://www.dgrindia.gov.in',
      note:'Resettlement training, self-employment schemes, security agency and CNG/oil dealership schemes.' },
    { code:'KSB',   name:'Kendriya Sainik Board', url:'https://ksb.gov.in',
      note:'Central welfare board — penury grants, education, marriage and funeral grants, ESM identity.' },
    { code:'ECHS',  name:'Ex-Servicemen Contributory Health Scheme', url:'https://echs.gov.in',
      note:'Polyclinics, empanelled hospitals, 64 KB card, referrals and claims.' },
    { code:'AWES',  name:'Army Welfare Education Society', url:'https://www.awesindia.com',
      note:'Army Public Schools, colleges and professional institutions.' },
    { code:'MoD',   name:'Ministry of Defence', url:'https://www.mod.gov.in',
      note:'Policy letters, government orders and departmental notifications.' },
    { code:'VSK',   name:'Veteran Sainik Kalyan / Veterans Portal', url:'https://indianarmyveterans.gov.in',
      note:'Indian Army veterans portal — grievance, pension and identity services. [link to be confirmed]' }
  ],

  /* ---------------- WELFARE SCHEMES ---------------- */
  welfare: [
    { id:'distress', icon:'🤝', title:'Distress Grant',
      lede:'Immediate financial relief to veterans, veer naris and their families in acute distress.',
      body:`<p>The Distress Grant is a one-time, non-recurring financial assistance sanctioned by the Corps welfare fund to Tuskers and their next of kin facing sudden hardship — prolonged illness, hospitalisation, natural calamity, fire, or loss of the sole earning member.</p>
      <h4>Who may apply</h4>
      <ul class="tick"><li>Veterans of the Army Ordnance Corps and defence civilians of the Corps</li>
      <li>Veer naris and widows of departed Tuskers</li>
      <li>Dependants where the veteran is incapacitated</li></ul>
      <h4>Documents required</h4>
      <ul class="tick"><li>Application on the prescribed proforma, countersigned by the nearest ZSB / RSB</li>
      <li>Discharge book and PPO copy</li><li>Medical papers / estimate, or damage assessment</li>
      <li>Bank details with cancelled cheque, Aadhaar and ESM card copy</li></ul>
      <p class="notice">Sanctioned amount and periodicity are governed by the Corps welfare fund rules in force. <b>[amount to be confirmed]</b></p>` },

    { id:'adlrs', icon:'🏅', title:'ADLRS — Assured Decent Living Rehabilitation Scheme',
      lede:'A sustained monthly support scheme for the most vulnerable of our fraternity.',
      body:`<p>ADLRS is the Corps’ flagship rehabilitation scheme, which provides an assured monthly stipend to veterans, veer naris and dependants who have no other means of dignified subsistence — the destitute, the permanently disabled, and the very elderly without family support.</p>
      <h4>Eligibility criteria</h4>
      <ul class="tick"><li>Verified indigence, with income below the threshold laid down under the scheme</li>
      <li>No pension, or pension insufficient for subsistence</li>
      <li>Recommendation by the Veteran Cell after physical verification through the nearest unit or ZSB</li></ul>
      <h4>How the scheme works</h4>
      <ul class="tick"><li>Cases are screened by the Welfare Committee and sanctioned by the Commandant, AOC Centre</li>
      <li>Payment is made directly to the beneficiary’s bank account, monthly</li>
      <li>Continuation is reviewed annually against a life certificate and fresh means verification</li></ul>
      <p class="notice"><b>Note:</b> Scheme quantum and thresholds are revised periodically. <b>[to be confirmed]</b></p>` },

    { id:'aochist', icon:'📜', title:'AOC History Publications',
      lede:'The recorded history of the Corps — volumes, monographs and unit histories.',
      body:`<p>The Corps maintains a body of published history covering its raising, campaigns, transformation and personalities. Volumes are available for reference at the Corps Museum and MCMM library, and selected titles may be purchased by veterans through the Veteran Cell.</p>
      <ul class="tick"><li><b>History of the Army Ordnance Corps</b> — multi-volume regimental history</li>
      <li><b>Unit and depot histories</b> — COD, FOD, AFV and ammunition depot records</li>
      <li><b>Monographs</b> on ordnance support in operations</li>
      <li><b>Baat Cheet</b> back issues — the Corps’ house magazine archive</li></ul>
      <p><a class="btn btn--ghost btn--sm" href="#/pdf">Search the document library →</a></p>` },

    { id:'torch', icon:'🔥', title:'Torch Bearers',
      lede:'Recognising Tuskers who have distinguished themselves after the uniform.',
      body:`<p>The <b>Torch Bearers</b> initiative honours veterans of the Corps who have gone on to achieve distinction in a second career — in industry, academia, public service, entrepreneurship, sport or social work — and who continue to carry the values of the Corps into civil life.</p>
      <h4>Purpose</h4>
      <ul class="tick"><li>To hold up role models for veterans in transition</li>
      <li>To build a mentoring network between established veterans and those newly retired</li>
      <li>To record, in the Corps’ own archive, what Tuskers have achieved beyond service</li></ul>
      <h4>Nominations</h4>
      <p>Nominations, including self-nominations, may be forwarded to the Veteran Cell with a brief citation and supporting material. Selected Torch Bearers are featured in <i>Baat Cheet</i> and on this portal.</p>
      <p><a class="btn btn--ghost btn--sm" href="#/blog">Nominate a Torch Bearer →</a></p>` },

    { id:'scholar', icon:'🎓', title:'Educational Scholarships',
      lede:'Merit and means-based scholarships for the children of Tuskers.',
      body:`<p>Scholarships are awarded annually to the children and dependants of veterans, veer naris and serving personnel of the Corps, across school, undergraduate and professional courses.</p>
      <div class="tbl-wrap mt24"><table>
        <thead><tr><th>Category</th><th>Applicable to</th><th>Basis</th></tr></thead>
        <tbody>
          <tr><td>School education (Cl VI–XII)</td><td>Children of veterans &amp; veer naris</td><td>Means-cum-merit</td></tr>
          <tr><td>Undergraduate / graduation</td><td>Children of veterans &amp; veer naris</td><td>Merit, min. 60% in qualifying exam</td></tr>
          <tr><td>Professional courses</td><td>Engineering, medicine, law, management</td><td>Merit + entrance rank</td></tr>
          <tr><td>Special needs education</td><td>Dependants with disability</td><td>On assessment, no merit bar</td></tr>
          <tr><td>Widows &amp; veer naris</td><td>Self-education / skilling</td><td>On recommendation</td></tr>
        </tbody></table></div>
      <h4 class="mt24">Application window</h4>
      <p>Applications for the academic year open in <b>June</b> and close on <b>15 September</b>. Late applications are not entertained except on the Commandant’s sanction.</p>
      <p class="notice notice--info">Applicants should also register in parallel for KSB, AWES and PM Scholarship Scheme benefits, which are additive to Corps scholarships. <b>[quantum to be confirmed]</b></p>` }
  ],

  /* ---------------- PENSION ---------------- */
  pension: {
    civil: [
      { q:'Who is covered as a defence civilian pensioner?',
        a:'Civilian employees of Ordnance depots, workshops, establishments and the Directorate who retire under the CCS (Pension) Rules, along with their family pensioners. Entitlements flow through the CDA and the pension disbursing bank.' },
      { q:'What documents must be kept current?',
        a:'PPO (original and e-PPO), Aadhaar seeded with the bank account, annual life certificate (Jeevan Pramaan or physical), and updated family details in the pension record for family pension continuity.' },
      { q:'How is the annual life certificate submitted?',
        a:'Through Jeevan Pramaan (digital, at any CSC or bank), through the doorstep banking service, or physically at the pension disbursing bank branch between 1 November and 30 November each year. Pensioners aged 80 and above may submit from 1 October.' },
      { q:'Where are grievances on civilian pension raised?',
        a:'First with the pension disbursing bank, then with the office of the CDA (Pension) Allahabad, and in parallel through CPENGRAMS. The Veteran Cell will assist in escalation — see the grievance page of this portal.' }
    ],
    entitlement: [
      { q:'Service pension',
        a:'Payable on completion of the minimum qualifying service prescribed for the rank and category. Assessed on the last drawn emoluments with reckonable service, and subject to the OROP revisions notified from time to time.' },
      { q:'Disability element',
        a:'Payable where disability is assessed as attributable to or aggravated by military service, at the percentage assessed by the Release Medical Board. Rounding-off benefits apply as per the rules in force.' },
      { q:'War injury pension',
        a:'Payable where the injury is attributable to operations against the enemy or in disturbed areas, at rates higher than the disability element, with the applicable rounding-off.' },
      { q:'Family pension — ordinary, special and liberalised',
        a:'Ordinary family pension on death not attributable to service; special family pension where death is attributable to or aggravated by service; liberalised family pension in cases of death in action or operations. Eligibility of the claimant follows the notified order of precedence.' },
      { q:'OROP revision',
        a:'One Rank One Pension revisions are applied automatically by the pension disbursing agency. Veterans should verify the revised entitlement against the Corrigendum PPO and take up discrepancies with the record office and CDA (P). [current cycle to be confirmed]' },
      { q:'Second / re-employment pension',
        a:'Veterans re-employed in central or state government service should declare military pension at the time of joining. The treatment of pension during re-employment follows the extant rules.' }
    ],
    contacts: [
      { name:'Principal CDA (Pensions), Prayagraj', detail:'Sanction, revision and corrigendum PPOs' },
      { name:'AOC Records, Secunderabad', detail:'Service records, discharge documents, family pension claims' },
      { name:'SPARSH helpdesk', detail:'Defence pension disbursement system — profile, life certificate, grievances' },
      { name:'Veteran Cell, AOC Centre', detail:'Hand-holding, escalation and follow-up for Tuskers' }
    ]
  },

  /* ---------------- MOTHER UNITS ---------------- */
  units: [
    { name:'AOC Centre, Secunderabad', type:'Training', loc:'Secunderabad, Telangana', note:'The Corps’ regimental home and training centre.' },
    { name:'Central Ordnance Depot (COD), Kanpur', type:'Depot', loc:'Kanpur, Uttar Pradesh', note:'One of the oldest ordnance depots of the Corps.' },
    { name:'Central Ordnance Depot (COD), Agra', type:'Depot', loc:'Agra, Uttar Pradesh', note:'General stores and clothing.' },
    { name:'Central Ordnance Depot (COD), Delhi Cantt', type:'Depot', loc:'Delhi', note:'Stores support to the National Capital Region.' },
    { name:'Central Ordnance Depot (COD), Jabalpur', type:'Depot', loc:'Jabalpur, Madhya Pradesh', note:'Vehicles and spares.' },
    { name:'Central Ordnance Depot (COD), Chheoki', type:'Depot', loc:'Prayagraj, Uttar Pradesh', note:'General stores.' },
    { name:'Central Ammunition Depot (CAD), Pulgaon', type:'Ammunition', loc:'Pulgaon, Maharashtra', note:'The Army’s largest ammunition depot.' },
    { name:'Ammunition Depot, Dehu Road', type:'Ammunition', loc:'Pune, Maharashtra', note:'Ammunition storage and issue.' },
    { name:'Vehicle Depot, Chennai', type:'Depot', loc:'Chennai, Tamil Nadu', note:'A vehicle holding and issue depot.' },
    { name:'Field Ordnance Depot (FOD)', type:'Field', loc:'Various field formations', note:'Forward ordnance support to formations.' },
    { name:'Ordnance Mobile Depot (OMD)', type:'Field', loc:'With strike and pivot formations', note:'Mobile ordnance support in operations.' },
    { name:'Military College of Materials Management (MCMM)', type:'Training', loc:'Jabalpur, Madhya Pradesh', note:'Premier training institution of the Corps. [station to be confirmed]' },
    { name:'Ordnance Directorate, Army HQ', type:'Directorate', loc:'New Delhi', note:'Office of the Director General Ordnance Services.' },
    { name:'AOC Records', type:'Records', loc:'Secunderabad, Telangana', note:'Custodian of service records of the Corps.' }
  ],

  /* ---------------- AOC HISTORY TIMELINE ---------------- */
  history: [
    { y:'1775', t:'The Board of Ordnance is established at Fort William, Calcutta — the origin from which the Army Ordnance Corps traces its lineage.' },
    { y:'1884', t:'The Ordnance Department is reorganised, laying the foundation of a professional ordnance service in India.' },
    { y:'1922', t:'The Indian Army Ordnance Corps takes formal shape in the post-Great War reorganisation of the Indian Army.' },
    { y:'1939–45', t:'The Corps expands enormously through the Second World War, sustaining Indian formations across Burma, North Africa, Italy and the Middle East.' },
    { y:'1947', t:'On Independence, the Corps is reconstituted for the Indian Army and undertakes the immense task of division of ordnance stores.' },
    { y:'1962 · 1965 · 1971', t:'Ordnance support in the operations of 1962, 1965 and 1971 — supply of ammunition, equipment and stores to the fighting formations.' },
    { y:'1999', t:'Kargil — the Corps sustains a high-intensity mountain conflict at unprecedented rates of ammunition consumption.' },
    { y:'Today', t:'A modern, computerised, inventory-managed Corps supporting the entire equipment life cycle — provisioning, procurement, storage, distribution and disposal.' }
  ],

  /* ---------------- HEROES ---------------- */
  gallantry: [
    { name:'[Name to be confirmed]', rank:'Havildar', award:'Ashoka Chakra', unit:'Army Ordnance Corps', year:'—',
      cite:'Citation to be reproduced from the official Gazette notification. The Veteran Cell is compiling verified records of all gallantry awards conferred on personnel of the Corps.' },
    { name:'[Name to be confirmed]', rank:'Major', award:'Kirti Chakra', unit:'Army Ordnance Corps', year:'—',
      cite:'Citation to be reproduced from the official Gazette notification.' },
    { name:'[Name to be confirmed]', rank:'Naib Subedar', award:'Shaurya Chakra', unit:'Ammunition Depot', year:'—',
      cite:'Citation to be reproduced from the official Gazette notification.' },
    { name:'[Name to be confirmed]', rank:'Sepoy', award:'Sena Medal (Gallantry)', unit:'Field Ordnance Depot', year:'—',
      cite:'Citation to be reproduced from the official Gazette notification.' }
  ],

  bcas: [
    { name:'[Name to be confirmed]', rank:'Havildar', unit:'Central Ammunition Depot', op:'Op Rakshak', year:'—' },
    { name:'[Name to be confirmed]', rank:'Naik', unit:'Field Ordnance Depot', op:'Op Meghdoot', year:'—' },
    { name:'[Name to be confirmed]', rank:'Sepoy', unit:'Ordnance Mobile Depot', op:'Op Vijay', year:'—' },
    { name:'[Name to be confirmed]', rank:'Subedar', unit:'AOC Centre', op:'Op Pawan', year:'—' }
  ],

  obituary: [
    { name:'[Name to be confirmed]', rank:'Col', unit:'AOC', b:'1938', d:'2026' },
    { name:'[Name to be confirmed]', rank:'Sub Maj', unit:'COD Kanpur', b:'1944', d:'2026' },
    { name:'[Name to be confirmed]', rank:'Brig', unit:'Ord Dte', b:'1935', d:'2026' },
    { name:'[Name to be confirmed]', rank:'Hav', unit:'CAD Pulgaon', b:'1951', d:'2026' }
  ],

  /* ---------------- INSTITUTES / BOOKING ---------------- */
  venues: [
    { id:'podam', icon:'🌾', name:'Podam Farm', cap:'Up to 400 guests',
      type:'Open-air venue &amp; farm retreat',
      note:'The Centre’s farm venue for large functions, regimental get-togethers, family days and open-air dinners. Lawns, covered shamiana area, parking and kitchen support.',
      rates:'Veteran concessional tariff applicable. [tariff to be confirmed]' },
    { id:'aocmess', icon:'🍽️', name:'AOC Mess', cap:'Rooms + dining',
      type:'Officers’ Mess accommodation &amp; dining',
      note:'Transit accommodation and dining for visiting officers and veterans. Advance booking is essential; allotment is subject to availability and precedence.',
      rates:'As per extant mess tariff for veterans.' },
    { id:'centremess', icon:'🏛️', name:'Centre Mess', cap:'Up to 250 guests',
      type:'Function halls &amp; banquet',
      note:'The Centre Mess halls for weddings, receptions, farewells and regimental dinners, with in-house catering and bar support.',
      rates:'Hall charges plus catering on actuals.' },
    { id:'band', icon:'🎺', name:'AOC Band',
      cap:'Full band / brass ensemble', type:'Ceremonial and event engagement',
      note:'The AOC Band may be requisitioned for regimental functions, weddings of Corps families, ceremonial occasions and approved public events, subject to commitments.',
      rates:'On sanction of the Commandant; charges as notified.' },
    { id:'club', icon:'🎱', name:'Ordnance Club',
      cap:'Members &amp; guests', type:'Club, sports and recreation',
      note:'Bar, billiards, cards room, lawn tennis, swimming and family recreation. Veterans may seek associate membership through the Veteran Cell.',
      rates:'Membership and guest charges as per club bye-laws.' },
    { id:'tuskers', icon:'🐘', name:'Tuskers Institute',
      cap:'Auditorium &amp; seminar rooms', type:'Institute, auditorium and conferencing',
      note:'Auditorium, seminar rooms and conference facilities for courses, reunions, association meetings and lectures, with audio-visual support.',
      rates:'Concessional rates for Corps associations and veteran bodies.' }
  ],

  /* ---------------- PDF LIBRARY ---------------- */
  pdfs: [
    { t:'Distress Grant — application proforma', c:'Welfare', y:'2026', s:'240 KB' },
    { t:'ADLRS — scheme rules and eligibility', c:'Welfare', y:'2025', s:'610 KB' },
    { t:'Educational Scholarship — application form (AY 2026-27)', c:'Welfare', y:'2026', s:'380 KB' },
    { t:'Torch Bearers — nomination proforma', c:'Welfare', y:'2026', s:'190 KB' },
    { t:'Pension — Corrigendum PPO checklist', c:'Pension', y:'2025', s:'420 KB' },
    { t:'OROP revision — ready reckoner for AOC ranks', c:'Pension', y:'2025', s:'1.4 MB' },
    { t:'Life certificate — Jeevan Pramaan step-by-step guide', c:'Pension', y:'2026', s:'700 KB' },
    { t:'Family pension — claim documents checklist', c:'Pension', y:'2024', s:'330 KB' },
    { t:'ECHS — 64 KB card application guide', c:'Health', y:'2025', s:'880 KB' },
    { t:'Materials Management — provisioning policy digest', c:'Professional', y:'2025', s:'2.1 MB' },
    { t:'Inventory management — codification handbook', c:'Professional', y:'2024', s:'3.6 MB' },
    { t:'Baat Cheet — Vol XLII, Issue 1', c:'Magazine', y:'2026', s:'12 MB' },
    { t:'Baat Cheet — Vol XLI, Issue 2', c:'Magazine', y:'2025', s:'11 MB' },
    { t:'History of the Army Ordnance Corps — Vol I (extract)', c:'History', y:'2020', s:'5.2 MB' },
    { t:'AOC Centre — veterans’ facilities and entitlements', c:'General', y:'2026', s:'560 KB' },
    { t:'Institute booking — requisition proforma', c:'General', y:'2026', s:'210 KB' },
    { t:'Grievance redressal — standard operating procedure', c:'General', y:'2025', s:'450 KB' },
    { t:'Resettlement — DGR course catalogue digest', c:'Placement', y:'2026', s:'1.8 MB' }
  ],

  /* ---------------- JOBS ---------------- */
  jobs: [
    { role:'Head — Warehouse &amp; Logistics', org:'Leading 3PL logistics group', loc:'Pune / Nagpur',
      exp:'Retired Col / Lt Col, Materials Management', tag:'Logistics' },
    { role:'Manager — Inventory &amp; Supply Chain', org:'Automotive components manufacturer', loc:'Chennai',
      exp:'Retired Maj / Sub Maj with depot experience', tag:'Supply Chain' },
    { role:'Security &amp; Administration Officer', org:'IT campus, corporate services', loc:'Hyderabad',
      exp:'Retired JCO / Officer', tag:'Admin' },
    { role:'Stores &amp; Materials Officer', org:'Public sector undertaking', loc:'Bhopal',
      exp:'Retired Sub / Sub Maj, Ordnance trades', tag:'Materials' },
    { role:'Faculty — Logistics &amp; Operations', org:'Management institute', loc:'Delhi NCR',
      exp:'Retired officer with MCMM instructional experience', tag:'Academia' },
    { role:'Project Coordinator — Defence Offsets', org:'Defence manufacturing firm', loc:'Bengaluru',
      exp:'Retired officer, procurement background', tag:'Defence Industry' }
  ],

  states: ['Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal','Andaman &amp; Nicobar Islands','Chandigarh','Dadra &amp; Nagar Haveli and Daman &amp; Diu','Delhi (NCT)','Jammu &amp; Kashmir','Ladakh','Lakshadweep','Puducherry'],

  /* ---------------- SEED BLOG POSTS ---------------- */
  posts: [
    { name:'Col (Retd) R Menon', unit:'COD Jabalpur', date:'28 Jul 2026',
      title:'Forty years on, the depot still smells of grease and rain',
      text:'I walked into the depot as a young captain in 1984 and did not know a bin card from a ledger. What the Corps taught me was not stores accounting — it was that somewhere at the end of every demand there is a soldier waiting. That lesson outlasted my uniform.' },
    { name:'Sub Maj (Retd) H Singh', unit:'CAD Pulgaon', date:'19 Jul 2026',
      title:'The night we cleared a hundred tonnes before first light',
      text:'Kargil summer. The demand came at 2200 hours and the convoy had to move by 0500. Nobody was ordered to stay. Nobody left. That is the only kind of discipline that has ever meant anything to me.' },
    { name:'Mrs S Rawat', unit:'Veer Nari, AOC', date:'11 Jul 2026',
      title:'What the Corps did for us afterwards',
      text:'When my husband passed, I expected forms and offices. What arrived instead were three officers from the Centre who sat in my drawing room and did the forms for me. I write this so that other families know: ask the Veteran Cell. They will come.' }
  ]
};
