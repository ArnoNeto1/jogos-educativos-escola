import{t as e}from"./useTranslation-DrD1TzT5.js";import{a as t,c as n}from"./components-CNg-QliY.js";import{t as r}from"./jsx-runtime-NZYk81nU.js";import{n as i}from"./lib-Dm3bhtL9.js";import{t as a}from"./icon-BeNVfpaM.js";import{t as o}from"./text-Cm62XDf0.js";import{t as s}from"./page-metadata-CCH651Pc.js";import{t as c}from"./page-contents-BEt8LBMm.js";import{a as l,i as u,n as d,r as f,t as p}from"./breadcrumb-DPUMeFVf.js";import{t as m}from"./alert-0NtWafpk.js";import{t as h}from"./version-DT1J5S9v.js";var g=r(),_=e=>{let t=e.replace(/^#+\s*/,``).trim(),n=new Date(t);return Number.isNaN(Number(n))?null:n},v=e=>{let t=e.split(/\r?\n/),n=[],r=null,i=null,a=null,o=null,s=()=>{r&&i&&a&&n.push({version:r,date:i,groups:a}),r=null,i=null,a=null,o=null};for(let e=0;e<t.length;e++){let n=t[e],c=n.match(/^##\s+Version\s+(.+)$/i);if(c){s(),r=c[1].trim(),a={},o=null;continue}if(!r)continue;if(!i){let e=_(n);if(e){i=e,o=null;continue}}if(!i||!a)continue;let l=n.match(/^\*\s+\[([^\]]+)]\s+(.*)$/);if(l){let e=l[1].trim(),t=l[2].trim();a[e]||(a[e]=[]),a[e].push(t),o=e;continue}let u=n.match(/^\s{2,}(\S.*)$/);if(u&&o&&a[o]?.length){let e=u[1].trim(),t=a[o];t[t.length-1]=`${t[t.length-1]} ${e}`}}return s(),n},y=[`Breaking`,`Feature`,`BugFix`,`Performance`,`TechnicalImprovement`,`UIUXImprovement`],b=e=>{let t=e.match(/(\d+\.\d+\.\d+)/);if(t){let[e,n,r]=h(t[1]);return`version-${e}-${n}-${r}`}return`version-${e}`.toLowerCase().replace(/[^a-z0-9.]+/g,`-`).replace(/\.+/g,`-`).replace(/-+/g,`-`).replace(/^-|-$/g,``)},x=`## Version 0.4.62\r
\r
#### Sep 1, 2026\r
\r
* [Feature] Added Hunter's Lodge quests for capturing animals.\r
* [Feature] Added Gatherer's Hut quests for total resources gathered through gathering expeditions.\r
\r
## Version 0.4.61\r
\r
#### Aug 31, 2026\r
\r
* [UIUXImprovement] Made the mobile village header collapsible, allowing resource details to be hidden when you need\r
  more space for the current view. You can collapse or expand the header by clicking on it. Since clicking on the header\r
  previously took you to Production Overview, we have now moved it to resource production building tabs.\r
\r
## Version 0.4.60\r
\r
#### Aug 29, 2026\r
\r
* [Feature] Smithy's upgrade tables were moved to a new Unit upgrade table tab. This tab displays level, upgrade cost,\r
  upgrade duration and attributes tables.\r
* [UIUXImprovement] Restyled tabs across the app with a cleaner segmented appearance and added a "More" popover for tabs\r
  that do not fit in the available space.\r
\r
## Version 0.4.59\r
\r
#### Aug 27, 2026\r
\r
* [UIUXImprovement] Highlighted missing resources in cost displays.\r
* [UIUXImprovement] Removed breadcrumbs to reduce UI bloat.\r
* [BugFix] Fixed horizontally scrollable tables hijacking clicks on buttons and links.\r
* [BugFix] Fixed resource availability estimates showing a ready time when resource production is negative or a missing\r
  resource cannot grow.\r
* [BugFix] Fixed mobile touch interactions causing hero resource production dropdowns to close immediately, village\r
  building fields to queue upgrades while scrolling, and long-pressed building fields to sometimes queue duplicate\r
  upgrades.\r
\r
## Version 0.4.58\r
\r
#### Aug 23, 2026\r
\r
* [UIUXImprovement] Player pages now show occupied oasis in the village list.\r
* [BugFix] Fixed NPC oasis occupation seeding so villages occupy oasis based on their Hero's Mansion level, allowing\r
  villages with sufficient Hero's Mansion levels to occupy multiple oasis.\r
* [Performance] Updated database indexes to improve query performance.\r
\r
## Version 0.4.57\r
\r
#### Aug 21, 2026\r
\r
* [BugFix] Fixed an issue where some already scheduled troop return movements could fail to resolve.\r
* [UIUXImprovement] Reworked map filters into an expandable control to reduce UI clutter.\r
\r
## Version 0.4.56\r
\r
#### Aug 21, 2026\r
\r
* [BugFix] Fixed an issue where scheduled building construction would allow resource fields to be queued even when\r
  warehouse or granary capacity was too low to ever afford the upgrade.\r
* [BugFix] Fixed an issue where troop list wasn't showing up.\r
\r
## Version 0.4.55\r
\r
#### Aug 20, 2026\r
\r
* [Feature] As part of preparatory work for attacks and raids, added a resource replenishment functionality to oasis.\r
* [UIUXImprovement] Added a splash screen while the game is loading.\r
* [UIUXImprovement] Preferences cleanup. Only usable preference settings are now visible.\r
* [Performance] Optimized villages seeder, reducing its execution time by ~ 60%.\r
* [Performance] Optimized effects seeder, reducing its execution time by ~ 50%.\r
* [Performance] Removed guaranteed croppers seeder by reimplementing its functionality as part of tiles generation. This\r
  reduced game world creation time by ~ 15%.\r
* [Performance] Removed unnecessary database indexes.\r
* [Performance] Dropped support for migrating older game worlds. Only last 20 minor versions are now supported. This\r
  allows us to spend less time worrying about migrating older game worlds while in development.\r
* [TechnicalImprovement] Reworked database schema. New schema simplifies how resource replenishment is handled much\r
  easier with fewer exceptions.\r
\r
## Version 0.4.54\r
\r
#### Aug 20, 2026\r
\r
* [Feature] Smithy received a small update. It will now show a unit upgrade duration table, allowing you to more easily\r
  plan unit upgrades.\r
* [BugFix] Rebalanced Smithy unit upgrade duration. Unit upgrades should now be much faster.\r
* [UIUXImprovement] Horizontally overflowing tables are now scrollable with mouse.\r
\r
## Version 0.4.53\r
\r
#### Aug 16, 2026\r
\r
* [Feature] Battle reports will now display a row for hospitalized and imprisoned troops.\r
* [Feature] Battle reports will now include a sum of losses, imprisoned and hospitalized troops.\r
* [Feature] Battle reports will now include a list of damaged buildings.\r
* [Feature] Preparatory work for attacks and raids. When attacking with only scouts, confirmation modal will now display\r
  scouting target. When your attack includes catapults, you'll now have the option of selecting targets. When attacking\r
  an unoccupied oasis with a hero and your hero has cages equipped, you'll now have the option of selecting either a\r
  battle or capture mode.\r
* [UIUXImprovement] For PWA-installations, toast notifications will now no longer render out of bounds, and construction\r
  list & troop list will no longer render with incorrect bottom offset.\r
* [TechnicalImprovement] Large cleanup of the backend to improve type safety and remove redundant code branches.\r
\r
## Version 0.4.52\r
\r
#### Aug 6, 2026\r
\r
* [Feature] Added Hospital & Spartan Asclepeion buildings. Once combat is added, your losses will be automatically\r
  tracked and ready for healing.\r
\r
## Version 0.4.51\r
\r
#### Aug 5, 2026\r
\r
* [TechnicalImprovement] Reworked our internal building definition system. This allows us to define tribe-specific\r
  building effects (namely Cranny & Trade Office).\r
\r
## Version 0.4.50\r
\r
#### Aug 5, 2026\r
\r
* [Feature] We implemented **Trade Office** building. Your merchants will now carry more resources and transferring\r
  resources between your villages should be less tedious!\r
\r
## Version 0.4.49\r
\r
#### Aug 3, 2026\r
\r
* [Feature] **Our most requested feature is finally here!** You may now schedule future building construction. Each\r
  village may have up to 5 buildings under construction or scheduled for construction. Scheduled construction may\r
  include both new buildings and upgrades, and may be reordered or cancelled at any time. Resource requirements are\r
  checked only once construction begins, and resources are consumed at that time. Romans retain their ability to\r
  construct one resource field and one village building at the same time. Construction queues continue progressing while\r
  you're away. We also added the ability to reorder your scheduled construction list.\r
\r
## Version 0.4.48\r
\r
#### Jul 27, 2026\r
\r
* [BugFix] Fixed an issue where a duplicated trade report was creating when transferring resources between your own\r
  villages.\r
* [BugFix] Fixed dialog height on longer dialogs.\r
* [BugFix] Fixed an issue where hero would be assigned additional attribute points even after level 99.\r
* [UIUXImprovement] Reworked mobile bottom navigation bar. Links with no counters are now positioned inside a popover.\r
  This reduces the amount of scrolling players have to do to navigate the app.\r
\r
## Version 0.4.47\r
\r
#### Jul 26, 2026\r
\r
* [Feature] Added the ability to exclude battle reports in which you have no losses as the attacker and trade reports in\r
  which you're trading between your own villages.\r
* [Feature] Added report cap of a thousand reports. Automatic report deletion of the oldest, non-archived reports kicks\r
  in after the cap is reached.\r
\r
## Version 0.4.46\r
\r
#### Jul 24, 2026\r
\r
* [UIUXImprovement] Reworked report actions. Actions for individual reports are now available through a context menu,\r
  while bulk actions are displayed in the table header after selecting reports. Only actions relevant to the selected\r
  reports are shown.\r
* [UIUXImprovement] Report timestamps now use a shorter, locale-aware format. Reports received today display the time,\r
  while older reports display the date. The full timestamp is available by hovering over it.\r
* [UIUXImprovement] Archived reports now display an archive icon and report subjects have been shortened for easier\r
  scanning.\r
* [UIUXImprovement] Report details now include actions for deleting, archiving and changing the read status of the\r
  report. Adventure, hunting party and gathering expedition reports also received cleaner headings.\r
\r
## Version 0.4.45\r
\r
#### Jul 24, 2026\r
\r
* [Feature] **Reports are finally here!** This was one of the last missing features blocking us from working on combat\r
  mechanics. We added adventure, merchant, troop relocation and reinforcements, hunting party, gathering expedition,\r
  scouting and battle reports.\r
\r
## Version 0.4.44\r
\r
#### Jul 16, 2026\r
\r
* [Feature] Production overview page will now properly display negative wheat production caused by population and\r
  troops.\r
\r
## Version 0.4.43\r
\r
#### Jul 14, 2026\r
\r
* [UIUXImprovement] This version includes a reworked UI. Page & section descriptions have now been removed from the page\r
  and instead added to **information popovers**. This reduces the length of the pages, reducing the amount of scrolling\r
  required and enabling faster navigation through the pages. Information popovers are available as page, section or\r
  block level elements, so you may encounter more than one on a given page.\r
\r
## Version 0.4.42\r
\r
#### Jul 11, 2026\r
\r
* [UIUXImprovement] When switching villages with a building details view open, the app now attempts to open the same\r
  building, even if it occupies a different position in the new village. Previously, it would always open the building\r
  at the same position, regardless of which building was actually there.\r
\r
## Version 0.4.41\r
\r
#### Jul 11, 2026\r
\r
* [BugFix] Fixed an issue where rearranging a building, which you have multiple instances of, would sometimes cause the\r
  incorrect building to be rearranged.\r
\r
## Version 0.4.40\r
\r
#### Jul 8, 2026\r
\r
* [Feature] Added the ability to create Gaul traps.\r
\r
## Version 0.4.39\r
\r
#### Jul 7, 2026\r
\r
* [BugFix] Fixed oasis resources calculation ahead of upcoming attacking and raiding feature.\r
* [Performance] Reworked \`effects\` table. This is our largest table that contains village/oasis properties. This rework\r
  reduced size of \`effects\` table by around 40% (which amounts to around 800KB in practice) and improved execution speed\r
  of most common queries by around 20-25%.\r
* [Performance] Reworked \`tiles\` table. This minor change reduced our total database size by around 4% (150KB in\r
  practice) and improved execution speed of map-related queries by around 1-2%.\r
* [Performance] Reworked \`oasis\` table. This minor change reduced our total database size by around 1.5% (45KB in\r
  practice) and improved execution speed of oasis-related queries around 15%-70%.\r
\r
## Version 0.4.38\r
\r
#### Jul 6, 2026\r
\r
* [BugFix] Fixed an issue where current resource amount wasn't accurately represented when attempting to send resources\r
  through the marketplace.\r
* [Feature] Added the ability to preview which tiles are already occupied in Oasis Bonus Finder.\r
* [Performance] Improved search performance of Oasis Bonus Finder by 20-45%, depending on the amount of search filters\r
  used.\r
\r
## Version 0.4.37\r
\r
#### Jul 1, 2026\r
\r
* [BugFix] Fixed an issue where relocating buildings would cause building effects to be incorrectly calculated.\r
* [BugFix] Fixed an issue where hero regeneration rate wasn't correctly updated for faster game worlds.\r
* [Performance] Reduced web worker memory usage during game world imports by roughly 50%.\r
* [Performance] Improved Resources & Village view's building fields render timing by ~ 3.4%\r
* [Performance] Improved controller route matching performance by roughly 45-50%.\r
\r
## Version 0.4.36\r
\r
#### Jun 24, 2026\r
\r
* [Feature] Added **Gatherer's Hut** building. Gatherer's Hut enables you to send your idle troops on to gathering\r
  expeditions, where they collect resources. Each unit sent carries 4 resources. Gathering expeditions are meant as a\r
  low-risk, although lower-reward alternative to raiding.\r
\r
## Version 0.4.35\r
\r
#### Jun 22, 2026\r
\r
* [Feature] Added **Trade routes** functionality. You may now schedule periodic resource transfers between your\r
  villages. You may schedule as many trade routes as you wish. Trade routes persist through demolishing the Marketplace.\r
* [BugFix] Fixed long village names breaking mobile navigation alignment. Village navigation now also shows resource\r
  layout of the village.\r
\r
## Version 0.4.34\r
\r
#### Jun 19, 2026\r
\r
* [BugFix] Improved internal data structures to prevent event execution happening with stale data, which was observed to\r
  (potentially) happen in some cases.\r
\r
## Version 0.4.33\r
\r
#### Jun 18, 2026\r
\r
* [Feature] Added the ability to transfer resources between villages. You require a Marketplace of at least level 1. You\r
  may transfer resources through the Marketplace view or through the map directly.\r
\r
## Version 0.4.32\r
\r
#### Jun 16, 2026\r
\r
* [Performance] Improve the performance of training units. Unit training events now resolve approximately 40% faster,\r
  which should be especially noticeable when training hundreds of units.\r
\r
## Version 0.4.31\r
\r
#### Jun 15, 2026\r
\r
* [Feature] **A long awaited feature is here at last!** We added the ability to send reinforcements or relocate troops\r
  to villages and oases you own. You may do so either through the map, by clicking on the tile you own, or through the\r
  Rally Point's Send Troops tab. Sent reinforcements may also be relocated to target village's garrison troops at any\r
  point. Relocating troops allows you to use them from the target village.\r
\r
* [BugFix] Fixed a stale resource counter, that would be especially noticeable when switching between villages.\r
\r
## Version 0.4.30\r
\r
#### Jun 9, 2026\r
\r
* [BugFix] Fixed a navigation bar overlaying app elements on some browsers.\r
\r
## Version 0.4.29\r
\r
#### Jun 6, 2026\r
\r
* [BugFix] Fixed a stale UI issue where constructing a new building wouldn't update the construction timer.\r
* [BugFix] Fixed an error being thrown when toggling between "compact" and "detailed" building construction list.\r
* [BugFix] Fixed an error, which in some cases caused a Hero unit to be duplicated after completing an adventure.\r
\r
## Version 0.4.28\r
\r
#### Jun 4, 2026\r
\r
* [Feature] Added our first new building, the **Hunter's Lodge**. Hunter's Lodge allows you to send out hunting parties\r
  which will hunt animals from nearby oasis. These captured animals will serve as reinforcements, defending your village\r
  from incoming attacks. Hunter's Lodge also allows you to manufacture **Animal cages**, which you'll be able to use\r
  with your Hero and capture animals yourself.\r
\r
## Version 0.4.27\r
\r
#### Jun 1, 2026\r
\r
* [BugFix] Fixed overflowing tables on mobile devices.\r
* [BugFix] Added missing bookmark functionality to Rally Point's Send troops view.\r
* [TechnicalImprovement] Reworked backend structure.\r
* [TechnicalImprovement] SQL queries with parameters now throw a type error if said parameters are not provided.\r
\r
## Version 0.4.26\r
\r
#### May 25, 2026\r
\r
* [Performance] Improved game world creation speed. Tests indicate between 35% to 40% speed increase.\r
\r
## Version 0.4.25\r
\r
#### May 23, 2026\r
\r
* [Feature] Added the ability to mark map tiles with markers. You're able to attach a description and select a color for\r
  the marker.\r
\r
## Version 0.4.24\r
\r
#### May 21, 2026\r
\r
* [Feature] Added the ability to rearrange buildings in villages. This feature can be accessed through Main Building by\r
  accessing Village management's Rearrange buildings tab. Buildings may be rearranged by dragging them onto empty or\r
  occupied building fields. Note that Wall and Rally point can't be rearranged and no buildings may be assigned to their\r
  building fields.\r
\r
## Version 0.4.23\r
\r
#### May 20, 2026\r
\r
* [Feature] Tile modal now displays a link to player profile.\r
* [BugFix] Minor technical changes to prevent common errors from occurring.\r
\r
## Version 0.4.22\r
\r
#### May 19, 2026\r
\r
* [Performance] Greatly improved adventure point calculation, resolving in noticeably faster game world initialization,\r
  especially for game worlds which haven't been opened in a while.\r
\r
## Version 0.4.21\r
\r
#### May 16, 2026\r
\r
* [BugFix] Fixed an issue where starting a building demolition, the demolition countdown would not appear in the Village\r
  Overview or Main Building's Demolish Buildings views.\r
* [BugFix] Fixed an issue where upgrading a building would prevent a separate building from being downgraded.\r
* [BugFix] Fixed an issue where Village Overview's demolition table would not appear unless the Main Building was at\r
  level 11.\r
* [TechnicalImprovement] Reworded some error descriptions for more clarity.\r
\r
## Version 0.4.20\r
\r
#### May 15, 2026\r
\r
* [Feature] Added the ability to cancel building downgrade/demolish events.\r
* [Feature] Added the ability to downgrade buildings by more than one level at a time.\r
* [Feature] Reworked building downgrade/demolish duration. Duration is now based on level difference. Each level of\r
  difference adds \`300 seconds / game world speed\` to the duration.\r
\r
## Version 0.4.19\r
\r
#### May 10, 2026\r
\r
* [TechnicalImprovement] Toast popups and notifications will now display the village name.\r
* [BugFix] Fixed an issue where village founding events didn't show a correct timestamp on the Events page.\r
* [BugFix] Fixed an issue where NPC reputation level was incorrectly calculated, resulting in all NPC being shown as\r
  with "hated" reputation level.\r
\r
## Version 0.4.18\r
\r
#### May 8, 2026\r
\r
* [TechnicalImprovement] We reworked how communication between threads works, enabling complete type safety. Previously,\r
  we had no way to guarantee that the data we pass between threads is actually correct, without just manually testing\r
  it. This caused issues during refactoring, since any missing argument/parameter isn't actually caught during\r
  lint/type-check and had to be manually validated to be working.\r
\r
## Version 0.4.17\r
\r
#### May 6, 2026\r
\r
* [Feature] Introduced stacked tabs layout on desktop devices.\r
* [Feature] Split Rally Point's Troop movements tab in to a Troop movements tab & Stationed units tab.\r
\r
## Version 0.4.16\r
\r
#### May 5, 2026\r
\r
* [Performance] Removed unnecessary sorting operations on player, building details and quests pages.\r
\r
## Version 0.4.15\r
\r
#### May 5, 2026\r
\r
* [Feature] Expanded NPC village templates. NPC villages will now be created with more buildings and a higher\r
  population.\r
\r
## Version 0.4.14\r
\r
#### May 4, 2026\r
\r
* [BugFix] Minor CSS overflow fixes.\r
\r
## Version 0.4.13\r
\r
#### May 1, 2026\r
\r
* [Feature] Added \`Oasis animal finder\` page. Oasis animal finder page allows you to search for all oases with a\r
  specific combination of animals present. For each selected animal type, you can set a minimum number of animals of\r
  that type that must be present in the oasis, allowing you to further narrow down the search. Oasis animal finder is\r
  accessible through the map page.\r
\r
## Version 0.4.12\r
\r
#### Apr 29, 2026\r
\r
* [Performance] Optimized background event generation. This update speeds up simulating of past events by 4-6x on game\r
  worlds, inactive by more than 10 days.\r
\r
## Version 0.4.11\r
\r
#### Apr 29, 2026\r
\r
* [Feature] Added the ability to cancel unit improvements.\r
* [Feature] Added a confirmation modal for cancelling unit improvements.\r
* [BugFix] Fixed an incorrectly calculated cost for unit improvements.\r
\r
## Version 0.4.10\r
\r
#### Apr 25, 2026\r
\r
fix: building downgrade fixes\r
\r
* [Feature] Added a table of current ongoing demolishments to the "Demolish buildings" tab of Village management.\r
* [Feature] Added a confirmation modal with details of what will happen if you confirm downgrading or demolishing\r
  buildings.\r
* [BugFix] Building overview and building field tooltip will now properly display "Currently downgrading to level x", if\r
  the building is being downgraded.\r
* [BugFix] Toast notifications will now properly say, "Building was downgraded to level x".\r
\r
## Version 0.4.9\r
\r
#### Apr 23, 2026\r
\r
* [Feature] Added Natars as a possible NPC tribe during game world creation.\r
* [BugFix] Removed Nature and Spartans from game world overview charts.\r
\r
## Version 0.4.8\r
\r
#### Apr 20, 2026\r
\r
* [BugFix] Fixed a Zod type issue occurring on Hero's Mansion page when NPC players are occupying an oasis in your\r
  vicinity.\r
\r
## Version 0.4.7\r
\r
#### Apr 19, 2026\r
\r
* [BugFix] Fixed an issue where queuing troops would refund resources.\r
\r
## Version 0.4.6\r
\r
#### Apr 18, 2026\r
\r
* [Feature] "Train \`{number}\` \`{unit_name}\`" quests may now be progressed.\r
\r
## Version 0.4.5\r
\r
#### Apr 15, 2026\r
\r
* [Feature] Added a stationed troops section to the Rally Point's Troop movements tab. This section displays troops\r
  currently stationed in your village, both deployable troops and reinforcements.\r
\r
## Version 0.4.4\r
\r
#### Apr 13, 2026\r
\r
* [BugFix] Fixed an issue where a hero unit would get duplicated when being sent on an adventure from a non-home\r
  village.\r
\r
## Version 0.4.3\r
\r
#### Apr 13, 2026\r
\r
* [Feature] Building benefits tab now shows all building effect values.\r
\r
* [BugFix] Fixed wall building incorrectly showing defense bonus of over 100%.\r
\r
## Version 0.4.2\r
\r
#### Apr 12, 2026\r
\r
* [BugFix] Rename village screen will now correctly show the current village's name on village change.\r
\r
* [BugFix] Map tile tooltips and modals will now correctly show the "%" sign next to the oasis bonus value.\r
\r
* [BugFix] Fixed incorrect wheat field label on 0-0-0-15 resource fields.\r
\r
* [BugFix] Fixed certain frontend caches not being properly invalidated when specific events were triggered.\r
\r
* [BugFix] Fixed homepage's Discord button not correctly showing current server user count.\r
\r
* [TechnicalImprovement] Selected filters and toggles (ex. on report page) will now persist through app refreshes.\r
\r
* [TechnicalImprovement] Improved error-handling flow when exporting game worlds.\r
\r
## Version 0.4.1\r
\r
#### Apr 10, 2026\r
\r
* [BugFix] Fixed missing spacings between labels and inputs on forms.\r
\r
## Version 0.4.0\r
\r
#### Apr 9, 2026\r
\r
* [Breaking] This version introduces breaking changes\r
\r
* [Feature] We added the ability to found new villages. You're able to found new villages by selecting an empty tile on\r
  the map, while having three settlers present in your village.\r
\r
* [Feature] We're getting a new page! **Event log page** will show a list of the latest events happening in your\r
  kingdom! It will show completed **construction/destruction/downgrade events**, **training events**, as well as **unit\r
  improvement events**, **unit research events** and **new village founding events**. You'll be able to toggle between\r
  village-specific events or all events. This will allow you to see what was done since you were last online, at a\r
  glance!\r
\r
* [Feature] We added new custom-made icons! This time for **cavalry defense** and **infantry defense**.\r
\r
* [Feature] We added experimental support for transferring a game world between devices on the same network. This is\r
  done using WebRTC technology. To transfer the game world to a new device, both devices must have the app open and be\r
  on the same network.\r
\r
* [Feature] We added an initial implementation for village loyalty mechanic. This will be expanded in the future with\r
  the introduction of combat mechanics.\r
\r
* [Feature] We added an initial implementation for farm lists. This will be expanded in the future with the introduction\r
  of combat mechanics.\r
\r
* [Feature] We reworked how construction cancellation works. Previously, cancelling an ongoing construction refunded a\r
  flat 80% of the construction cost, regardless of when the construction was canceled. This penalized players who\r
  initialized construction by mistake. The new refund system is based on the proportionality of already-completed\r
  construction. Cancelling immediately or in the first 5% of construction duration will refund 95% of the construction\r
  cost. From 5% of construction duration forwards, the system will refund resources proportionally, with the minimum\r
  amount return of 40%.\r
\r
## Version 0.3.17\r
\r
#### Mar 31, 2026\r
\r
* [BugFix] Fixed an issue where double-clicking a building field would take you to a non-existing page.\r
\r
## Version 0.3.16\r
\r
#### Mar 27, 2026\r
\r
* [BugFix] Fixed an issue where Smithy unit improvement events were not properly accounted for in other villages.\r
\r
## Version 0.3.15\r
\r
#### Mar 19, 2026\r
\r
* [BugFix] Replaced \`withResolvers\` with a manual implementation to support older devices.\r
\r
## Version 0.3.14\r
\r
#### Mar 19, 2026\r
\r
* [BugFix] Fixed an issue where navigating to certain pages did not work correctly.\r
\r
## Version 0.3.13\r
\r
#### Mar 17, 2026\r
\r
* [TechnicalImprovement] App will now remember your position when navigating between nested tabs.\r
\r
## Version 0.3.12\r
\r
#### Mar 14, 2026\r
\r
* [TechnicalImprovement] Upgraded our internal graphics library version, which now provides smaller and more efficient\r
  icons.\r
\r
## Version 0.3.11\r
\r
#### Mar 13, 2026\r
\r
* [BugFix] Fixed a bug where multiple building construction events could have been queued up at once.\r
\r
## Version 0.3.10\r
\r
#### Mar 12, 2026\r
\r
* [BugFix] Added a missing residence training queue to the Village Overview page.\r
\r
## Version 0.3.9\r
\r
#### Mar 11, 2026\r
\r
* [BugFix] Fixed the incorrect building duration value shown on Upgrade Details' Upgrade Duration tab.\r
\r
## Version 0.3.8\r
\r
#### Mar 8, 2026\r
\r
* [TechnicalImprovement] Improved api-worker error detection flow. Users will now be properly notified when an error\r
  occurs.\r
\r
## Version 0.3.7\r
\r
#### Mar 6, 2026\r
\r
* [BugFix] Added additional validations to prevent the app from getting in to incorrect state.\r
\r
## Version 0.3.6\r
\r
#### Mar 6, 2026\r
\r
* [BugFix] Fixed formatting issues with increasing percentage values in building cards.\r
\r
## Version 0.3.5\r
\r
#### Mar 6, 2026\r
\r
* [BugFix] Added additional validations to prevent the app from getting to an incorrect state. These fixes should\r
  prevent users from being able to upgrade units beyond level 20, upgrade buildings beyond their max level and surpass\r
  other similar limitations.\r
\r
## Version 0.3.4\r
\r
#### Mar 5, 2026\r
\r
* [BugFix] Fixed an issue where resource fields showed an incorrect hourly production.\r
\r
* [BugFix] Fixed an issue where unit training didn't correctly subtract resources.\r
\r
## Version 0.3.3\r
\r
#### Mar 4, 2026\r
\r
* [BugFix] Fixed an issue where controller parameter type-casting was not working correctly.\r
\r
## Version 0.3.2\r
\r
#### Mar 4, 2026\r
\r
* [BugFix] Fixed an issue upgrading buildings wouldn't complete "upgrade building to level x" quests.\r
\r
* [BugFix] Fixed an issue where training multiple units at once actually trained X * X number of units, instead of X.\r
\r
* [BugFix] Fixed an issue where a Hero would return immediately after completing an adventure.\r
\r
* [BugFix] Added missing dark mode support on various elements.\r
\r
## Version 0.3.1\r
\r
#### Mar 3, 2026\r
\r
* [Feature] Added dark mode support for both public and in-game pages.\r
\r
## Version 0.3.0\r
\r
#### Mar 3, 2026\r
\r
* [Breaking] This version introduces breaking changes\r
\r
* [Feature] Added hero adventures! Too long have our heroes sat idly by. No longer! You'll now be able to send a hero on\r
  adventures to gather loot and experience! <br /> Adventures will take anywhere from 8 to 12 minutes, and are scaled\r
  with game world speed.<br /> Each adventure will cost your hero some health points; 5 to be exact. This can be reduced\r
  by wearing damage-reducing gear!<br /> Your hero earns experience each time it completes an adventure. It currently\r
  receives \`10 * (number_of_completed_adventures + 1)\` experience per successful adventure!<br /> Your hero will receive\r
  loot on successfully finishing an adventure. We're currently still missing loot tables, so this is coming in a later\r
  patch, along with hero inventory interface.<br />\r
\r
* [Feature] Added the ability to train Chiefs and Settlers.\r
\r
* [Feature] Added more missing unit icons.\r
\r
* [Feature] Added custom-made icons for resources.\r
\r
* [BugFix] Fixed an issue where some occupiable oasis did not have proper resource bonuses and animals generated.\r
\r
* [BugFix] Fixed an issue where not all occupiable oases were shown in Hero's Mansion.\r
\r
* [Performance] Improved database seeding performance and reduced the overall size of the database file. We implemented\r
  2 separate changes in regard to a database. The first one reduced overall database size by around 10-30%, depending on\r
  game world size. The second one cut the time to seed the database by over 50% on game worlds of all sizes. This\r
  results in faster game world creation, as well as better performance while in the game!\r
\r
* [TechnicalImprovement] Improved database breaking changes detection. App will now more consistently detect outdated\r
  game worlds.\r
\r
## Version 0.2.5\r
\r
#### Feb 28, 2026\r
\r
* [Feature] Error messages for resource-dependent actions now display the exact time at which the required resources\r
  will be available.\r
\r
## Version 0.2.4\r
\r
#### Feb 23, 2026\r
\r
* [Feature] Village overview page now shows an ongoing building construction table with the ability to cancel\r
  construction\r
\r
## Version 0.2.3\r
\r
#### Feb 21, 2026\r
\r
* [BugFix] Fixed the discrepancy between population count shown on the map and in statistics.\r
\r
## Version 0.2.2\r
\r
#### Feb 21, 2026\r
\r
* [BugFix] Fixed building construction queue tooltips overlapping on tables.\r
\r
## Version 0.2.1\r
\r
#### Feb 16, 2026\r
\r
* [Feature] Added an option to view the constructable buildings list in compacted form. This change allows players to\r
  scroll less, especially on mobile devices.\r
\r
* [Feature] Added the ability to commit minor database upgrades without breaking game worlds.\r
\r
## Version 0.2.0\r
\r
#### Feb 15, 2026\r
\r
* [Breaking] This version introduces breaking changes\r
\r
* [Feature] Added hero attributes page. You're now able to see all your hero attributes. There are some additional\r
  attributes that are not shown (cranny plunder, ...). These options will be added in a later patch. Page also allows\r
  you to change hero's ability points, along with the ability to switch hero resource production focus. The dropdown\r
  shows you production values to expect on change.\r
\r
* [Feature] A "hero level up" option has been added to developer tools.\r
\r
## Version 0.1.2\r
\r
#### Feb 11, 2026\r
\r
* [BugFix] Fixed an issue where barracks and stable upgrades wouldn't decrease unit training duration.\r
\r
## Version 0.1.1\r
\r
#### Feb 11, 2026\r
\r
* [BugFix] Fixed an issue where upgrading buildings wouldn't increase the building effect values (building duration,\r
  troop training, ...).\r
\r
* [BugFix] Fixed an issue where environment variables weren't getting injected.\r
\r
* [Performance] Improved performance of resolving events. Updating resource query now doesn't run if there's no change\r
  to resources.\r
\r
## Version 0.1.0\r
\r
#### Feb 9, 2026\r
\r
* [Breaking] This update is not compatible with existing game worlds and requires the creation of new game worlds\r
* [Feature] Player pages - you can now see player information, along with the list of villages they occupy.\r
* [Feature] Statistics pages - you can now see the ranking of all players and all villages, based on population.\r
* [Feature] Game world overview page - you can now see the split of tribes, factions and basic game world information.\r
* [Feature] Oasis bonus finder - long gone are the days of manually checking the map for your perfect location of your\r
  next village. This tool allows you to find all tiles with specific resource composition and bonuses!\r
* [Feature] Reworked developer tools - you may now toggle instant completion and cost-free of individual event types,\r
  add or remove resources, add adventure points or spawn hero items!\r
* [Feature] Tons of new quests - we've expanded the quest list from humble 160 to over 1000. More will get added as\r
  development continues!\r
\r
  From a technical improvement perspective, we haven't been idling. The new version fixes the long-standing issue of\r
  game world state corruption, it massively improves developer experience and speed, adds over 200 tests and enables us\r
  to onboard new contributors easier! These changes were contributed by over seven new contributors!\r
\r
## Version 0.0.49\r
\r
#### Jan 26, 2026\r
\r
* [Performance] We've improved the performance of the game world creation. You can expect 10-15% faster game world\r
  generation!\r
\r
## Version 0.0.48\r
\r
#### Jan 19, 2026\r
\r
* [Feature] You'll now be able to start building upgrades faster on mobile! Press the building upgrade indicator for a\r
  second, and the building will start upgrading, without you having to open the building interface and clicking the\r
  build button.\r
\r
## Version 0.0.47\r
\r
#### Jan 7, 2026\r
\r
* [Performance] We've reworked some of the scripts used in game-world generation, and as a result, generation is now\r
  about 10-15% faster. This is especially important in larger worlds or when using a lower-end device, where generation\r
  may take a couple of seconds.\r
\r
* [TechnicalImprovement] We transitioned the repository to a monorepo. This came with some technical challenges, but\r
  also a ton of clarity. Project is now much simpler to navigate and reason about!\r
\r
* [TechnicalImprovement] We've added oxlint to the project. This is a new linting tool, and it's very promising. Plan is\r
  to use it side-by-side with Biome (our current linter), with the goal of eventually transitioning fully off of Biome.\r
\r
## Version 0.0.46\r
\r
#### Jan 4, 2026\r
\r
* [Feature] We added a game-world-overview page. Thank you very much for your contribution!\r
\r
## Version 0.0.45\r
\r
#### Dec 30, 2025\r
\r
* [Feature] We added player pages! You'll now be able to see general information about each player, along with a list of\r
  their villages. Thank you very much for your contribution!\r
\r
## Version 0.0.44\r
\r
#### Dec 24, 2025\r
\r
* [Feature] UI color scheme (dark/light mode), graphic skin variant (default, snow, ...), locale and graphics day-night\r
  setting are now persistent between game worlds. This doesn't mean much yet. We don't have graphics, only support a\r
  single locale and don't have a dark mode yet, but once those things arrive, you'll be able to set them once and have\r
  the setting persist through all game worlds.\r
\r
* [Performance] We've done a minor cleanup. In this case, we managed to remove a minor dependency, which reduced the\r
  final bundle by about ~60 kb.\r
\r
## Version 0.0.43\r
\r
#### Dec 19, 2025\r
\r
* [Feature] We now have a global not-found page. We've been seeing a small rise of routing errors lately. We're not sure\r
  if these are just bots trying different subpages, but in case some real users are getting lost, this should help them\r
  out a bit.\r
\r
* [Feature] We've reworked the in-game error pages for a game world not found and game world is already opened errors.\r
  Instead of being redirected to /404 or /403, you'll now remain inside the relevant game world url. This reduces the\r
  number of clicks needed to solve a particular error.\r
\r
## Version 0.0.42\r
\r
#### Dec 12, 2025\r
\r
* [BugFix] We've fixed an annoying layout shift, which appeared when changing between village and non-village pages!\r
\r
* [Performance] We've substantially improved the performance of the construct new building page. This page was actually\r
  flagged as one of the slowest pages we have. The reason for this is that to determine which buildings you're allowed\r
  to construct, we have to run a bunch of checks. While these checks are not that slow individually, we had to run these\r
  checks multiple times for each building, which added up quickly. We've now reworked this to make it more efficient.\r
  You should be seeing faster page renders, especially on mid/lower-end devices.\r
`,S=({children:e})=>e?(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)(`div`,{className:`flex gap-2 items-center`,children:[(0,g.jsx)(a,{iconId:`ri-react-icons-tb-TbBugOff`,className:`size-6`}),(0,g.jsx)(o,{className:`font-semibold`,children:`Bug fixes`})]}),(0,g.jsx)(`div`,{className:`ml-2`,children:e})]}):null,C=({children:e})=>e?(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)(`div`,{className:`flex gap-2 items-center`,children:[(0,g.jsx)(a,{iconId:`ri-react-icons-md-MdOutlineNewReleases`,className:`size-6`}),(0,g.jsx)(o,{className:`font-semibold`,children:`New features`})]}),(0,g.jsx)(`div`,{className:`ml-2`,children:e})]}):null,w=({children:e})=>e?(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)(`div`,{className:`flex gap-2 items-center`,children:[(0,g.jsx)(a,{iconId:`ri-react-icons-bi-BiWrench`,className:`size-6`}),(0,g.jsx)(o,{className:`font-semibold`,children:`Performance`})]}),(0,g.jsx)(`div`,{className:`ml-2`,children:e})]}):null,T=({children:e})=>e?(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)(`div`,{className:`flex gap-2 items-center`,children:[(0,g.jsx)(a,{iconId:`ri-react-icons-io-IoMdGitCompare`,className:`size-6`}),(0,g.jsx)(o,{className:`font-semibold`,children:`Technical improvements`})]}),(0,g.jsx)(`div`,{className:`ml-2`,children:e})]}):null,E={Feature:C,BugFix:S,Performance:w,TechnicalImprovement:T,UIUXImprovement:({children:e})=>e?(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)(`div`,{className:`flex gap-2 items-center`,children:[(0,g.jsx)(a,{iconId:`ri-react-icons-lu-LuEye`,className:`size-6`}),(0,g.jsx)(o,{className:`font-semibold`,children:`UI/UX improvements`})]}),(0,g.jsx)(`div`,{className:`ml-2`,children:e})]}):null},D=/(<br\s*\/?>)|\*\*([^*]+)\*\*|`([^`]+)`|\[([^\]]+)]\(([^)]+)\)/gi,O=e=>{let t=[],n=0,r=0;for(let i of e.matchAll(D))i.index!==void 0&&(i.index>n&&t.push(e.slice(n,i.index)),i[1]?t.push((0,g.jsx)(`br`,{},r++)):i[2]?t.push((0,g.jsx)(`strong`,{children:i[2]},r++)):i[3]?t.push((0,g.jsx)(`code`,{children:i[3]},r++)):i[4]&&i[5]&&t.push((0,g.jsx)(`a`,{href:i[5],children:i[4]},r++)),n=i.index+i[0].length);return n<e.length&&t.push(e.slice(n)),t},k=v(x),A=()=>k.length?(0,g.jsx)(g.Fragment,{children:k.map(e=>(0,g.jsxs)(`section`,{id:b(e.version),style:{position:`relative`},children:[!1,(0,g.jsxs)(`h2`,{children:[`Version `,e.version]}),(0,g.jsx)(`h4`,{children:e.date.toLocaleDateString(`en-US`,{month:`long`,day:`numeric`,year:`numeric`})}),y.map(t=>{let n=e.groups[t]??[];if(!n.length)return null;if(t===`Breaking`)return(0,g.jsx)(m,{variant:`error`,children:n[0]},t);let r=E[t]??T;return(0,g.jsx)(r,{children:(0,g.jsx)(`ul`,{children:n.map(e=>(0,g.jsx)(`li`,{children:O(e)},e))})},t)})]},e.version))}):null;function j(e){return(0,g.jsx)(A,{})}function M(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,g.jsx)(t,{...e,children:(0,g.jsx)(j,{...e})}):j(e)}var N={changelog:`_changelog_16yfd_2`},P=t(()=>{let{t}=e(`public`),{pathname:r}=n(),i=t(`{{title}} | Pillage First!`,{title:`Latest updates`});return(0,g.jsxs)(c,{children:[(0,g.jsx)(s,{title:i,description:`Read the latest Pillage First! release notes, including new gameplay features, bug fixes, performance improvements and technical changes.`,pathname:r}),(0,g.jsxs)(`div`,{className:`flex flex-col gap-4 max-w-3xl px-2 lg:px-0 mx-auto`,children:[(0,g.jsx)(p,{children:(0,g.jsxs)(u,{children:[(0,g.jsx)(d,{children:(0,g.jsx)(f,{to:`/`,children:t(`Home`)})}),(0,g.jsx)(l,{}),(0,g.jsx)(d,{children:t(`Latest updates`)})]})}),(0,g.jsxs)(`main`,{className:`flex flex-col gap-4`,children:[(0,g.jsx)(o,{as:`h1`,className:`text-3xl font-medium leading-tight lg:text-5xl`,children:t(`Latest updates`)}),(0,g.jsx)(o,{children:t(`All the latest news and updates about the project.`)}),(0,g.jsx)(`div`,{className:N.changelog,children:(0,g.jsx)(M,{})})]})]})]})});export{P as default};
//# sourceMappingURL=page-BR4rVAIB.js.map