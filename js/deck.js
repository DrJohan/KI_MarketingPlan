(() => {
  "use strict";

  const slides = [
    {
      title: "Sales & Marketing Plan — Cellmax New Phase",
      notes: "Frame the session as an approval and execution discussion for August–December 2026."
    },
    {
      title: "The new commercial phase",
      notes: "Registration is an enabler; disciplined execution and compliance are still required."
    },
    {
      title: "Strategic principle",
      notes: "Position the complete wound-care service; Cellmax is one clinically assessed option."
    },
    {
      title: "Five intended outcomes",
      notes: "Success combines positioning, conversion, differentiation, referrals and revenue."
    },
    {
      title: "Priority audiences and service offer",
      notes: "Target patients, caregivers and professional referrers with a complete wound-care offer."
    },
    {
      title: "Five-month roadmap",
      notes: "The sequence builds capability before scaling spend."
    },
    {
      title: "August 2026 — Foundation and soft launch",
      notes: "August is a controlled soft launch. Remove operational and compliance gaps before meaningful spend is committed."
    },
    {
      title: "September 2026 — Awareness and lead generation",
      notes: "Combine education, paid discovery, outreach and disciplined WhatsApp follow-up."
    },
    {
      title: "October 2026 — Clinical authority and referral network",
      notes: "Turn awareness into authority and referral access through transparent process, professional education and an easier referral route."
    },
    {
      title: "November 2026 — Diabetic wound campaign",
      notes: "Keep education clinically responsible and give every screening activity an immediate route to booked assessment."
    },
    {
      title: "December 2026 — Scale, retention and 2027 readiness",
      notes: "Scale proven channels, protect treatment continuity and carry qualified demand into January."
    },
    {
      title: "Funnel targets",
      notes: "Treat the numbers as stretch targets to calibrate against capacity and pricing."
    },
    {
      title: "Proposed revenue ramp",
      notes: "Confirm the July baseline, then close the gap to RM100,000 in staged increments."
    },
    {
      title: "Weekly control KPIs",
      notes: "Use six questions to connect activity, conversion, revenue and operational discipline."
    },
    {
      title: "Content and channel strategy",
      notes: "Education leads the mix; each channel has a specific role in discovery, trust or conversion."
    },
    {
      title: "Sales operating system",
      notes: "Standardise the patient journey from first enquiry through monitoring."
    },
    {
      title: "Indicative paid-media budget",
      notes: "Approve the range and guardrails; scale only when performance is acceptable."
    },
    {
      title: "Roles and accountability",
      notes: "Assign clear owners and maintain a 30-minute weekly performance review."
    },
    {
      title: "Compliance and risk controls",
      notes: "Treat compliance as a release gate; registration does not approve every advertisement."
    },
    {
      title: "Decisions required",
      notes: "Secure six approvals so the controlled soft launch can begin."
    }
  ];

  const slidesRoot = document.getElementById("slides");

  slides.forEach((slide, index) => {
    const slideNumber = String(index + 1).padStart(2, "0");
    const section = document.createElement("section");
    section.dataset.slideNumber = slideNumber;
    section.setAttribute("aria-label", `${index + 1} of ${slides.length}: ${slide.title}`);

    const image = document.createElement("img");
    image.className = "slide-image";
    image.src = `slides/slide-${slideNumber}.png`;
    image.alt = `Slide ${index + 1}: ${slide.title}`;
    image.width = 1600;
    image.height = 900;
    image.loading = "eager";
    image.decoding = "async";
    image.draggable = false;

    const semantic = document.createElement("div");
    semantic.className = "semantic-content";
    semantic.innerHTML = `<h2>${slide.title}</h2><p>${slide.notes}</p>`;

    const notes = document.createElement("aside");
    notes.className = "notes";
    notes.textContent = slide.notes;

    section.append(image, semantic, notes);
    slidesRoot.appendChild(section);
  });

  const deck = new Reveal(document.querySelector(".reveal"), {
    width: 1600,
    height: 900,
    margin: 0,
    minScale: 0.1,
    maxScale: 2,
    hash: true,
    controls: true,
    controlsTutorial: false,
    progress: true,
    slideNumber: "c/t",
    center: true,
    navigationMode: "linear",
    touch: true,
    overview: true,
    transition: "fade",
    transitionSpeed: "fast",
    backgroundTransition: "fade",
    pdfSeparateFragments: false,
    plugins: [RevealNotes, RevealSearch, RevealZoom]
  });

  deck.initialize();

  const tools = document.querySelector("[data-deck-tools]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const menu = document.getElementById("deck-tools-menu");
  const toast = document.querySelector("[data-toast]");
  let toastTimer;

  const setMenu = (open) => {
    menu.hidden = !open;
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close presentation tools" : "Open presentation tools");
    if (open) {
      menu.querySelector("button")?.focus();
    }
  };

  const showToast = (message) => {
    window.clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add("is-visible");
    toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2800);
  };

  const toggleFullscreen = async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
        return;
      }

      const element = document.documentElement;
      const request = element.requestFullscreen || element.webkitRequestFullscreen;
      if (request) {
        await request.call(element);
      } else {
        showToast("Full-screen mode is not available in this browser. Use the browser menu instead.");
      }
    } catch (_error) {
      showToast("The browser blocked full-screen mode. Try again after interacting with the page.");
    }
  };

  const actions = {
    overview: () => deck.toggleOverview(),
    presenter: () => {
      const notesPlugin = deck.getPlugin("notes");
      if (notesPlugin?.open) {
        notesPlugin.open();
      } else {
        showToast("Presenter view is unavailable in this browser context.");
      }
    },
    search: () => {
      const searchPlugin = deck.getPlugin("search");
      if (searchPlugin?.open) {
        searchPlugin.open();
      } else {
        showToast("Search is unavailable in this browser context.");
      }
    },
    fullscreen: toggleFullscreen,
    print: () => {
      const printUrl = new URL(window.location.href);
      printUrl.searchParams.set("print-pdf", "");
      window.open(printUrl.toString(), "_blank", "noopener,noreferrer");
    },
    restart: () => deck.slide(0, 0, 0)
  };

  menuToggle.addEventListener("click", () => setMenu(menu.hidden));

  menu.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;
    const action = actions[button.dataset.action];
    setMenu(false);
    action?.();
  });

  document.addEventListener("click", (event) => {
    if (!menu.hidden && !tools.contains(event.target)) setMenu(false);
  });

  document.addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase();

    if (key === "escape" && !menu.hidden) {
      setMenu(false);
      menuToggle.focus();
      return;
    }

    if (key === "m" && !event.ctrlKey && !event.metaKey && !event.altKey) {
      event.preventDefault();
      setMenu(menu.hidden);
      return;
    }

    if (key === "f" && !event.ctrlKey && !event.metaKey && !event.altKey) {
      event.preventDefault();
      toggleFullscreen();
    }
  });
})();
