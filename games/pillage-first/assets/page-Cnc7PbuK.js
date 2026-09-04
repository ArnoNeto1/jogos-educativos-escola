import{t as e}from"./useTranslation-DrD1TzT5.js";import{a as t,c as n}from"./components-CNg-QliY.js";import{t as r}from"./jsx-runtime-NZYk81nU.js";import{n as i,t as a}from"./lib-Dm3bhtL9.js";import{t as o}from"./text-Cm62XDf0.js";import{t as s}from"./page-metadata-CCH651Pc.js";import{t as c}from"./page-contents-BEt8LBMm.js";import{a as l,i as u,n as d,r as f,t as p}from"./breadcrumb-DPUMeFVf.js";var m=r();function h(e){let t={h1:`h1`,h2:`h2`,li:`li`,p:`p`,strong:`strong`,ul:`ul`,...i(),...e.components};return(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(t.h1,{children:`Frequently asked questions`}),`
`,(0,m.jsxs)(`section`,{children:[(0,m.jsx)(t.h2,{children:`Is there a project roadmap available?`}),(0,m.jsx)(t.p,{children:`Due to the nature of this project (I get work on it only in my free time), I'm not willing to commit to any specific\r
timeline for any features.`}),(0,m.jsx)(`br`,{}),(0,m.jsxs)(t.p,{children:[(0,m.jsx)(t.strong,{children:`That being said, here's the general plan for upcoming development`}),`:`]}),(0,m.jsxs)(t.ul,{children:[`
`,(0,m.jsx)(t.li,{children:`Combat mechanics`}),`
`,(0,m.jsx)(t.li,{children:`Hero inventory & auction system`}),`
`,(0,m.jsx)(t.li,{children:`NPC behavior (attacking, trading, sending reinforcements, ...)`}),`
`,(0,m.jsx)(t.li,{children:`Various accessibility features (time skip, vacation mode)`}),`
`]}),(0,m.jsxs)(t.p,{children:[(0,m.jsx)(t.strong,{children:`The following systems are currently available`}),`:`]}),(0,m.jsxs)(t.ul,{children:[`
`,(0,m.jsx)(t.li,{children:`Game world creation and management (exporting, importing, duplicating)`}),`
`,(0,m.jsx)(t.li,{children:`Village building mechanics`}),`
`,(0,m.jsx)(t.li,{children:`Unit training`}),`
`,(0,m.jsx)(t.li,{children:`Troop movements (reinforcements and relocations)`}),`
`,(0,m.jsx)(t.li,{children:`Establishing new villages`}),`
`,(0,m.jsx)(t.li,{children:`Transferring resources between villages`}),`
`,(0,m.jsx)(t.li,{children:`Hero adventures and management`}),`
`,(0,m.jsx)(t.li,{children:`Various building-specific functionalities (village building rearrangement, hunting parties & gathering expeditions,\r
...)`}),`
`]})]}),`
`,(0,m.jsxs)(`section`,{children:[(0,m.jsx)(t.h2,{children:`Are there game design differences between Travian and Pillage First!?`}),(0,m.jsx)(t.p,{children:`There's a couple of differences with Travian, and a lot more are on the way.`}),(0,m.jsx)(t.p,{children:`The biggest one is that Pillage First! is a single player game. There's no multiplayer, nor are there currently plans\r
for one to be built on top.`}),(0,m.jsx)(`br`,{}),(0,m.jsxs)(t.p,{children:[(0,m.jsx)(t.strong,{children:`This is deliberate as it allows us a couple of nice benefits, namely`}),`:`]}),(0,m.jsxs)(t.ul,{children:[`
`,(0,m.jsx)(t.li,{children:`game worlds can be generated at will by each player`}),`
`,(0,m.jsx)(t.li,{children:`game worlds can (will?) be fully customizable to best fit your preferences`}),`
`,(0,m.jsx)(t.li,{children:`we already experimented with, and plan to add features like vacation mode (which pauses the whole game world) and\r
time skip`}),`
`]}),(0,m.jsxs)(t.p,{children:[(0,m.jsx)(t.strong,{children:`Gameplay wise we also differ a bit`}),`:`]}),(0,m.jsxs)(t.ul,{children:[`
`,(0,m.jsx)(t.li,{children:`Unit upgrades are global, meaning you do them once and units in all villages are upgraded permanently.`}),`
`,(0,m.jsx)(t.li,{children:`We added a few new buildings, namely Hunter's Lodge, and Gatherer's Hut, with more on the way.`}),`
`,(0,m.jsx)(t.li,{children:`We removed "capital village" mechanic. You are free to upgrade resource fields in all villages up to level 20, if\r
you so wish.`}),`
`]})]}),`
`,(0,m.jsxs)(`section`,{children:[(0,m.jsx)(t.h2,{children:`Can this project be converted to multiplayer?`}),(0,m.jsxs)(t.p,{children:[(0,m.jsx)(t.strong,{children:`Yes!`}),` This project was actually rebuilt from the ground up to make it as compatible as possible with a potential\r
backend integration.`]}),(0,m.jsxs)(t.p,{children:[`That being said, the current goal is to keep this repository as a `,(0,m.jsx)(t.strong,{children:`standalone, offline-first app focused on\r
single-player gameplay`}),`.`]}),(0,m.jsx)(`br`,{}),(0,m.jsx)(t.p,{children:`One of the hopes for the future of this project is that someone might eventually fork the project, restructure it, and\r
connect it to a backend, enabling a multiplayer experience. Most of the frontend can be completely reused, making the\r
transition easier than starting from scratch.`}),(0,m.jsx)(`br`,{}),(0,m.jsx)(t.p,{children:(0,m.jsx)(t.strong,{children:`If you're passionate about backend development and want to help bring multiplayer to life, feel free to reach out!`})})]}),`
`,(0,m.jsxs)(`section`,{children:[(0,m.jsx)(t.h2,{children:`How does the game continue running if the app is closed?`}),(0,m.jsx)(t.p,{children:`In a nutshell, whenever you open a game world, we simulate every event that would have taken place, had the app been\r
open all this time. These events would happen at some time in the past, but since app can't run without the browser\r
being open, we resolve these events now. This means you can be attacked while offline, since this attack would also\r
have happened if you were online.`}),(0,m.jsx)(`br`,{}),(0,m.jsx)(t.p,{children:`The major downside is that we can't know which events have happened until we actually open the game world and simulate\r
the timeline. This means we can't let the player know if they're under attack, because the only way for us to know\r
whether an attack has been triggered is to actually open the game.`})]}),`
`,(0,m.jsxs)(`section`,{children:[(0,m.jsx)(t.h2,{children:`Why not stick with the original?`}),(0,m.jsx)(t.p,{children:`While I love Travian, I (and many more like me) just don't have the time to commit to it anymore. Pulling\r
all-nighters, finding duals from across the world and making sure account is covered 24/7 was fun in middle school,\r
but it's not something I want to (or even can?) engage in now. I want to be able to take a break, whenever life gets\r
in the way, and for the game to respect that.`}),(0,m.jsx)(`br`,{}),(0,m.jsxs)(t.p,{children:[`I want this game to be a `,(0,m.jsx)(t.strong,{children:`more accessible, customizable and time-friendly version of Travian`}),`.`]})]}),`
`,(0,m.jsxs)(`section`,{children:[(0,m.jsx)(t.h2,{children:`Is this project in danger of being taken down due to copyright violations?`}),(0,m.jsxs)(t.p,{children:[`We've made a lot of effort to differentiate this game from Travian. Even though Pillage First! is inspired by Travian,\r
we've made (and plan for more) `,(0,m.jsx)(t.strong,{children:`fundamental gameplay, technological & design differences`}),` between games.`]}),(0,m.jsx)(`br`,{}),(0,m.jsxs)(t.p,{children:[(0,m.jsx)(t.strong,{children:`Codebase has been written completely from scratch`}),`. We're not using Travian codebase as a reference or any other\r
reason in any stage of development.`]}),(0,m.jsx)(`br`,{}),(0,m.jsx)(t.p,{children:`Art is completely handmade. We don't use or allow any Travian assets. Furthermore, we don't use and don't allow\r
AI-transformed Travian assets to be used in this project.`}),(0,m.jsx)(`br`,{}),(0,m.jsx)(t.p,{children:`We also include legal notices on the page to explicitly differentiate this project from Travian.`})]}),`
`,(0,m.jsxs)(`section`,{children:[(0,m.jsx)(t.h2,{children:`Does the game continue even if I close the app?`}),(0,m.jsxs)(t.p,{children:[(0,m.jsx)(t.strong,{children:`Yes!`}),` You're free to close the app at any time and the game will pick off right next time you open it again! Units\r
will continue to be trained, buildings will continue to be constructed and troops will continue to raid exactly as\r
they would if you kept the app running.`]})]}),`
`,(0,m.jsxs)(`section`,{children:[(0,m.jsx)(t.h2,{children:`Are game worlds stable between new releases?`}),(0,m.jsxs)(t.p,{children:[(0,m.jsx)(t.strong,{children:`Sometimes, but most often not`}),`. Despite this project being developed in my free-time only, we still have a\r
relatively high update cadence. Typically, we push out 3-5 (mostly minor) updates per week. Most of these updates are\r
completely safe and don't affect the underlying data structures that the app requires, but not always. Sometimes, even\r
minor changes break the game world, either completely, or partially.`]}),(0,m.jsx)(`br`,{}),(0,m.jsxs)(t.ul,{children:[`
`,(0,m.jsxs)(t.li,{children:[`
`,(0,m.jsxs)(t.p,{children:[(0,m.jsx)(t.strong,{children:`Until full release`}),` - Until the full release of the game, I don't intend to keep worlds compatible between\r
changes.\r
This means game worlds should be expected to break relatively regularly and should only be used for testing the game\r
out. I can't afford to spend time migrating old game states to new structures to keep compatibility, due to this\r
slowing down development quite a bit.`]}),`
`]}),`
`,(0,m.jsxs)(t.li,{children:[`
`,(0,m.jsxs)(t.p,{children:[(0,m.jsx)(t.strong,{children:`After full release`}),` - After the game is officially released, I will commit to keeping game worlds stable between\r
releases. This means that with each a game change, I'll also provide a script to migrate old game states to new ones.\r
This process should be completely transparent to users.`]}),`
`]}),`
`]})]}),`
`,(0,m.jsxs)(`section`,{children:[(0,m.jsx)(t.h2,{children:`Why single-player?`}),(0,m.jsx)(t.p,{children:`There are a few key reasons I chose to focus on single-player:`}),(0,m.jsxs)(t.ul,{children:[`
`,(0,m.jsxs)(t.li,{children:[`
`,(0,m.jsxs)(t.p,{children:[(0,m.jsx)(t.strong,{children:`Customizable gameplay`}),` - Each of us has a different expectation of the game. Some players prefer speedier game\r
worlds, some prefer more difficult opponents, while others look for a more peaceful coexisting with their neighbors.\r
This isn't something that we can offer in a multiplayer setting, where you have no control of other players' actions.\r
Thus, one of the goals of this app is to give you the power to customize your gameplay as much as possible. You'll be\r
able to choose speed, difficulty (NPC troop levels,...) and more at server creation form!`]}),`
`]}),`
`,(0,m.jsxs)(t.li,{children:[`
`,(0,m.jsxs)(t.p,{children:[(0,m.jsx)(t.strong,{children:`Respecting your time`}),` - Most of us are not in high school anymore. Waking up at 3am to send out attacks may have\r
been a valid strategy 10 years ago, but it's out of the question now. Because we realize real-life takes priority, we\r
plan on adding multiple mechanism to help you balance game needs. Two, currently planned ones are `,(0,m.jsx)(t.strong,{children:`unlimited vacation\r
mode`}),`, available at any point for any reason and `,(0,m.jsx)(t.strong,{children:`the ability to disable attacks while you're offline`}),`.`]}),`
`]}),`
`,(0,m.jsxs)(t.li,{children:[`
`,(0,m.jsxs)(t.p,{children:[(0,m.jsx)(t.strong,{children:`Moderation cost & complexity`}),` - multiplayer comes with a whole layer of moderation challenges, things like chat\r
filters, reporting tools, cheat prevention, account and support systems. They're not just one-time features either;\r
they need constant upkeep and care. For a solo developer, that's a massive investment of time and energy that could\r
easily overshadow the development of the actual game. Single-player allows me to limit the scope of the project and\r
deliver faster.`]}),`
`]}),`
`,(0,m.jsxs)(t.li,{children:[`
`,(0,m.jsxs)(t.p,{children:[(0,m.jsx)(t.strong,{children:`Offline-first`}),` - One of the goals of this project is to allows players to load the app once and then have it work\r
fully offline. This makes it more accessible to players with limited or unreliable internet access, and ensures the\r
experience is consistent regardless of connection quality.`]}),`
`]}),`
`]})]}),`
`,(0,m.jsxs)(`section`,{children:[(0,m.jsx)(t.h2,{children:`Is there an in-game Wiki available?`}),(0,m.jsx)(t.p,{children:`Not yet, but I can (officially?) confirm there's one in the making!`}),(0,m.jsx)(t.p,{children:`It's going to include units (cost, attack and defence upgrade tables and durations), buildings (cost, upgrade\r
durations), hero (exp tables and revive cost) and some general advice and tips.`})]}),`
`,(0,m.jsxs)(`section`,{children:[(0,m.jsx)(t.h2,{children:`Is 10x the highest supporter game world speed?`}),(0,m.jsx)(t.p,{children:`Yes. This might get revised upwards in the future. The limiting factor here is players' own devices. Since the app\r
runs 100% on your device, we can't really guarantee good performance. Higher speed game worlds require more device\r
resources, and maxing these out could cause lag, excessive battery drain and other issues.`}),(0,m.jsx)(t.p,{children:`A 10x speed appears stable even on lower-end devices, which is why this speed was determined to be the higher limit\r
for now.`})]})]})}function g(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,m.jsx)(t,{...e,children:(0,m.jsx)(h,{...e})}):h(e)}var _={h2:e=>(0,m.jsx)(o,{...e,className:`mb-4 !text-2xl`,as:`h2`})},v=t(()=>{let{t}=e(`public`),{pathname:r}=n(),i=t(`{{title}} | Pillage First!`,{title:`Frequently asked questions`});return(0,m.jsxs)(c,{children:[(0,m.jsx)(s,{title:i,description:`Find answers to frequently asked questions about the Pillage First! roadmap, game design, technical limitations, game world compatibility, multiplayer possibilities and more.`,pathname:r}),(0,m.jsxs)(`div`,{className:`flex flex-col gap-4 max-w-3xl px-2 lg:px-0 mx-auto`,children:[(0,m.jsx)(p,{children:(0,m.jsxs)(u,{children:[(0,m.jsx)(d,{children:(0,m.jsx)(f,{to:`/`,children:t(`Home`)})}),(0,m.jsx)(l,{}),(0,m.jsx)(d,{children:t(`Frequently asked questions`)})]})}),(0,m.jsx)(`main`,{className:`flex flex-col gap-4`,children:(0,m.jsx)(a,{components:_,children:(0,m.jsx)(g,{})})})]})]})});export{v as default};
//# sourceMappingURL=page-Cnc7PbuK.js.map