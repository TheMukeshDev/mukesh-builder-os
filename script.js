(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const html = document.documentElement;

  /* ---------- Footer year ---------- */
  document.querySelectorAll("[data-year]").forEach(function (node) {
    node.textContent = String(new Date().getFullYear());
  });

  /* ---------- Menubar state ---------- */
  const menubar = document.querySelector("[data-menubar]");
  const nav = document.getElementById("primary-nav");
  const navToggle = document.querySelector("[data-nav-toggle]");
  const navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav__list a"));
  const sections = Array.prototype.slice.call(
    document.querySelectorAll("main section[id]")
  );

  function onScroll() {
    if (menubar) {
      menubar.classList.toggle("is-scrolled", window.scrollY > 8);
    }
    updateActiveNav();
  }

  let activeFrame = null;
  function queueScroll() {
    if (activeFrame !== null) return;
    activeFrame = window.requestAnimationFrame(function () {
      activeFrame = null;
      onScroll();
    });
  }

  function updateActiveNav() {
    const marker = window.scrollY + 150;
    let current = "";

    sections.forEach(function (section) {
      if (section.offsetTop <= marker) {
        current = section.id;
      }
    });

    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 8) {
      const last = sections[sections.length - 1];
      if (last) current = last.id;
    }

    navLinks.forEach(function (link) {
      const isMatch = link.getAttribute("href") === "#" + current;
      link.classList.toggle("is-active", isMatch);
      if (isMatch) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  window.addEventListener("scroll", queueScroll, { passive: true });
  window.addEventListener("resize", queueScroll, { passive: true });
  onScroll();

  function closeNav() {
    if (!nav || !navToggle) return;
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      const willOpen = !nav.classList.contains("is-open");
      nav.classList.toggle("is-open", willOpen);
      navToggle.setAttribute("aria-expanded", String(willOpen));
    });

    navLinks.forEach(function (link) {
      link.addEventListener("click", closeNav);
    });

    document.addEventListener("click", function (event) {
      if (!nav.classList.contains("is-open")) return;
      if (menubar && menubar.contains(event.target)) return;
      closeNav();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        closeNav();
        navToggle.focus();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 900) closeNav();
    });
  }

  /* ---------- Reveal on scroll ---------- */
  const revealNodes = Array.prototype.slice.call(document.querySelectorAll(".reveal"));

  if (reduceMotion.matches || !("IntersectionObserver" in window)) {
    revealNodes.forEach(function (node) {
      node.classList.add("is-visible");
    });
  } else {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" }
    );

    revealNodes.forEach(function (node) {
      revealObserver.observe(node);
    });
  }

  /* ---------- Builder OS data ---------- */
  const projectData = {
    codepath: {
      title: "CodePath AI",
      sub: "CodeYatra · AI codebase navigator · open source",
      problem:
        "Students approaching an unfamiliar codebase — often for a first open-source contribution — spend more time orienting than building.",
      solution:
        "An AI-powered platform that helps developers understand codebases, navigate open-source projects, and contribute with greater confidence.",
      contribution:
        "Developed the AI-assisted learning and code exploration experience, focused on helping students understand unfamiliar codebases.",
      stack: "Not specified in source material.",
      links: [
        { label: "Live demo ↗", href: "https://codepathai.streamlit.app/" },
        { label: "GitHub ↗", href: "https://github.com/TheMukeshDev/CodePath-AI" }
      ]
    },
    festivo: {
      title: "Festivo AI",
      sub: "AI-powered event planning",
      problem:
        "Event planning is fragmented: decisions, lists, and coordination live in different places, which makes celebrations feel like logistics work.",
      solution:
        "An AI-powered event planning platform that guides users through celebrations with intelligent assistance.",
      contribution:
        "Worked on the AI-driven planning experience and integrated AI capabilities into the web app, focused on making planning easier and more organized.",
      stack: "Not specified in source material.",
      links: [
        { label: "Live demo ↗", href: "https://festivoai01.vercel.app/" },
        { label: "GitHub ↗", href: "https://github.com/TheMukeshDev/festivo-ai" }
      ]
    },
    nawi: {
      title: "NAWI TestFlow",
      sub: "OIML R-76 metrology testing",
      problem:
        "NAWI testing under OIML R-76 demands deterministic metrology calculations and structured, auditable reports.",
      solution:
        "A digital workflow that automates testing, validates calculations, and generates structured test reports.",
      contribution:
        "Designed the deterministic metrology calculation and validation engine, and worked on test workflows, structured data storage, and report generation. Maintained a strict boundary: AI cannot make compliance decisions.",
      stack: "Not specified in source material.",
      links: [{ label: "GitHub ↗", href: "https://github.com/TheMukeshDev/nawi-sahayak" }]
    }
  };

  const arsenalData = {
    backend: {
      title: "Backend",
      items: [
        "Python",
        "Flask",
        "REST APIs",
        "Backend architecture",
        "API integration"
      ]
    },
    frontend: {
      title: "Frontend",
      items: ["HTML", "CSS", "JavaScript", "React · learning", "MERN · learning"]
    },
    ai: {
      title: "AI & Automation",
      items: [
        "AI application development",
        "Gemini API integration",
        "AI agents",
        "Workflow automation",
        "LLM-powered applications"
      ]
    },
    data: {
      title: "Data & Cloud",
      items: ["MongoDB", "Supabase", "PostgreSQL", "Firebase", "AWS · SBCL experience"]
    },
    tools: {
      title: "Programming & Tools",
      items: ["C++ · learning", "DSA · learning", "Git", "GitHub", "VS Code", "Vercel"]
    },
    community: {
      title: "Community & Leadership",
      items: [
        "Technical community building",
        "Team leadership",
        "Event management",
        "Hackathon coordination",
        "Developer community engagement"
      ]
    }
  };

  /* ---------- Dialog ---------- */
  const dialog = document.getElementById("builder-os");
  const openTriggers = Array.prototype.slice.call(document.querySelectorAll("[data-open-os]"));
  const closeTrigger = document.querySelector("[data-close-os]");
  let lastTrigger = null;

  function openOS(trigger) {
    if (!dialog) return;
    lastTrigger = trigger || null;
    closeNav();
    if (typeof dialog.showModal === "function") {
      if (!dialog.open) dialog.showModal();
    } else {
      dialog.setAttribute("open", "");
    }
    document.body.classList.add("os-open");
    if (closeTrigger) {
      window.requestAnimationFrame(function () {
        closeTrigger.focus();
      });
    }
  }

  function closeOS() {
    if (!dialog) return;
    if (typeof dialog.close === "function") {
      dialog.close();
    } else {
      dialog.removeAttribute("open");
      document.body.classList.remove("os-open");
      if (lastTrigger) lastTrigger.focus();
    }
  }

  openTriggers.forEach(function (trigger) {
    trigger.addEventListener("click", function () {
      openOS(trigger);
    });
  });

  if (closeTrigger) {
    closeTrigger.addEventListener("click", closeOS);
  }

  if (dialog) {
    dialog.addEventListener("close", function () {
      document.body.classList.remove("os-open");
      if (lastTrigger) lastTrigger.focus();
    });

    dialog.addEventListener("cancel", function () {
      document.body.classList.remove("os-open");
    });

    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) closeOS();
    });
  }

  /* ---------- Tabs ---------- */
  const tabs = Array.prototype.slice.call(document.querySelectorAll(".os-tab"));
  const panels = Array.prototype.slice.call(document.querySelectorAll(".os-panel"));

  function activateTab(tab, shouldFocus) {
    if (!tab) return;
    const app = tab.getAttribute("data-app");

    tabs.forEach(function (item) {
      const selected = item === tab;
      item.setAttribute("aria-selected", String(selected));
      item.tabIndex = selected ? 0 : -1;
    });

    panels.forEach(function (panel) {
      const match = panel.getAttribute("data-app-panel") === app;
      panel.hidden = !match;
    });

    if (shouldFocus) tab.focus();
  }

  tabs.forEach(function (tab, index) {
    tab.addEventListener("click", function () {
      activateTab(tab, false);
    });

    tab.addEventListener("keydown", function (event) {
      const keys = ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"];
      if (keys.indexOf(event.key) === -1) return;
      event.preventDefault();

      let nextIndex = index;
      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        nextIndex = (index + 1) % tabs.length;
      } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        nextIndex = (index - 1 + tabs.length) % tabs.length;
      } else if (event.key === "Home") {
        nextIndex = 0;
      } else if (event.key === "End") {
        nextIndex = tabs.length - 1;
      }

      activateTab(tabs[nextIndex], true);
    });
  });

  /* ---------- Project Lab ---------- */
  const missionButtons = Array.prototype.slice.call(document.querySelectorAll("[data-mission]"));
  const missionDetail = document.querySelector("[data-mission-detail]");

  function makeText(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    node.textContent = text;
    return node;
  }

  function renderMission(key) {
    const data = projectData[key];
    if (!data || !missionDetail) return;

    missionDetail.replaceChildren();
    missionDetail.appendChild(makeText("h3", "", data.title));
    missionDetail.appendChild(makeText("p", "mission-sub", data.sub));

    const list = document.createElement("dl");
    [
      ["Problem", data.problem],
      ["Solution", data.solution],
      ["My contribution", data.contribution],
      ["Stack", data.stack]
    ].forEach(function (row) {
      const wrap = document.createElement("div");
      wrap.appendChild(makeText("dt", "", row[0]));
      wrap.appendChild(makeText("dd", "", row[1]));
      list.appendChild(wrap);
    });
    missionDetail.appendChild(list);

    const links = document.createElement("div");
    links.className = "mission-links";
    data.links.forEach(function (link) {
      const anchor = document.createElement("a");
      anchor.href = link.href;
      anchor.target = "_blank";
      anchor.rel = "noopener noreferrer";
      anchor.textContent = link.label;
      links.appendChild(anchor);
    });
    missionDetail.appendChild(links);
  }

  missionButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      missionButtons.forEach(function (item) {
        item.setAttribute("aria-pressed", String(item === button));
      });
      renderMission(button.getAttribute("data-mission"));
    });
  });

  renderMission("codepath");

  /* ---------- Tech Arsenal ---------- */
  const arsenalButtons = Array.prototype.slice.call(document.querySelectorAll("[data-arsenal-cat]"));
  const arsenalList = document.querySelector("[data-arsenal-list]");

  function renderArsenal(key) {
    const data = arsenalData[key];
    if (!data || !arsenalList) return;

    arsenalList.replaceChildren();
    data.items.forEach(function (item) {
      const chip = makeText("span", "tag", item);
      if (item.indexOf("learning") !== -1) {
        chip.className = "tag tag--learning";
      }
      arsenalList.appendChild(chip);
    });
  }

  arsenalButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      arsenalButtons.forEach(function (item) {
        item.setAttribute("aria-pressed", String(item === button));
      });
      renderArsenal(button.getAttribute("data-arsenal-cat"));
    });
  });

  renderArsenal("backend");

  /* ---------- Secret Console ---------- */
  const consoleRoot = document.querySelector("[data-console]");
  const out = document.querySelector("[data-console-out]");
  const form = document.querySelector("[data-console-form]");
  const input = document.querySelector("[data-console-input]");
  const resetButton = document.querySelector("[data-console-reset]");
  const history = [];
  let historyIndex = 0;

  function clearOut() {
    if (out) out.replaceChildren();
  }

  function writeLine(text, className) {
    if (!out) return;
    out.appendChild(makeText("p", className || "", text));
  }

  function writeLink(label, href) {
    if (!out) return;
    const paragraph = document.createElement("p");
    const anchor = document.createElement("a");
    anchor.href = href;
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
    anchor.textContent = label;
    paragraph.appendChild(anchor);
    out.appendChild(paragraph);
  }

  function scrollConsole() {
    if (out) out.scrollTop = out.scrollHeight;
  }

  function bootConsole() {
    clearOut();
    writeLine("Builder OS console v1.0", "cmd");
    writeLine("Portfolio demo only — no system access.", "dim");
    writeLine('Type "help" to see the commands.', "dim");
    scrollConsole();
  }

  function resetConsole() {
    history.length = 0;
    historyIndex = 0;
    if (input) input.value = "";
    bootConsole();
    if (input) input.focus();
  }

  const commands = {
    help: function () {
      writeLine("available commands", "accent");
      [
        "help          this list",
        "about         who I am",
        "whoami        the short version",
        "motto         the line I keep coming back to",
        "now           what I am focused on",
        "projects      project lab briefs",
        "skills        tech arsenal",
        "community     communities and leadership",
        "achievements  competition and event results",
        "learning      what is in progress",
        "reset         clear the console"
      ].forEach(function (row) {
        writeLine(row);
      });
    },
    about: function () {
      writeLine("Mukesh Kumar", "cmd");
      writeLine("Backend developer & AI application builder.", "ok");
      writeLine("B.Tech CSE, 2nd year · BBSCET, Prayagraj.");
      writeLine("Focus: Python, Flask, AI applications, and automation.");
      writeLine("Community: Tech Hub BBS, NEXORA, GDG Prayagraj, AWS SBCL.", "dim");
    },
    whoami: function () {
      writeLine("mukesh", "cmd");
      writeLine("Backend developer, AI app builder, community organizer.", "ok");
      writeLine("Happiest when a messy idea turns into something people can actually use.", "dim");
    },
    motto: function () {
      writeLine("Beyond code. Into creation.", "cmd");
      writeLine("It sits at the top of this page because it is the part I mean.", "dim");
    },
    now: function () {
      writeLine("currently", "accent");
      writeLine("Second-year B.Tech CSE at BBSCET, Prayagraj.");
      writeLine("Learning C++, DSA, React, MERN, and AI agents.");
      writeLine("Open to internships — email is the fastest route.", "dim");
    },
    sudo: function () {
      writeLine("Nice try. This console has no root access.", "err");
      writeLine("Try \"motto\" instead — it is more useful anyway.", "dim");
    },
    projects: function () {
      writeLine("project lab / 3 missions", "accent");
      writeLine("CodePath AI — AI codebase navigator (open source)");
      writeLink("  live demo → codepathai.streamlit.app", "https://codepathai.streamlit.app/");
      writeLine("Festivo AI — AI-powered event planning");
      writeLink("  live demo → festivoai01.vercel.app", "https://festivoai01.vercel.app/");
      writeLine("NAWI TestFlow — OIML R-76 metrology testing");
      writeLink("  code → github.com/TheMukeshDev/nawi-sahayak", "https://github.com/TheMukeshDev/nawi-sahayak");
      writeLine("Stacks are marked as not specified where the source material is silent.", "dim");
    },
    skills: function () {
      writeLine("tech arsenal", "accent");
      Object.keys(arsenalData).forEach(function (key) {
        const group = arsenalData[key];
        writeLine(group.title + ": " + group.items.join(", "));
      });
    },
    community: function () {
      writeLine("community hub", "accent");
      writeLine("Tech Hub BBS — Community Lead (TechQuiz 2026: 550+ registrations)");
      writeLine("NEXORA E-Cell BBSCET — Team Lead (Launchpad 2026)");
      writeLine("GDG Prayagraj — Volunteer");
      writeLine("AWS Student Builder Campus Leader — Participant");
      writeLine("GeeksforGeeks — GFG Campus Mantri 2026");
    },
    achievements: function () {
      writeLine("achievements", "accent");
      writeLine("SyntaxClash 2026 — 1st place, first-year category, 120/120");
      writeLine("RIFT Series Hackathon — selected for the offline round");
      writeLine("AI applications — built and deployed");
      writeLine("Community events — reached hundreds of students");
    },
    learning: function () {
      writeLine("learning journey", "accent");
      writeLine("C++ & DSA — language fundamentals, data structures, algorithms");
      writeLine("React — component-based frontend development");
      writeLine("MERN stack — full-stack JavaScript fundamentals");
      writeLine("Core CS — core computer science subjects");
      writeLine("Backend system design — backend architecture");
      writeLine("AI agents — cloud technologies and agent development");
      writeLine("status: in progress · no percentages", "dim");
    },
    reset: function () {
      resetConsole();
    }
  };

  function runCommand(raw) {
    const value = raw.trim();
    if (!value) return;

    writeLine("builder@os:~$ " + value, "cmd");
    const name = value.toLowerCase();
    const command = commands[name];

    if (!command) {
      writeLine('command not found: "' + value + '"', "err");
      writeLine('type "help" for the command list.', "dim");
      scrollConsole();
      return;
    }

    command();
    scrollConsole();
  }

  function submitCommand(raw) {
    if (!raw.trim()) return;
    if (!commands[raw.trim().toLowerCase()] || raw.trim().toLowerCase() !== "reset") {
      history.push(raw);
    }
    historyIndex = history.length;
    runCommand(raw);
  }

  if (form && input) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const raw = input.value;
      input.value = "";
      submitCommand(raw);
    });

    input.addEventListener("keydown", function (event) {
      if (event.key === "ArrowUp") {
        if (!history.length) return;
        event.preventDefault();
        historyIndex = Math.max(0, historyIndex - 1);
        input.value = history[historyIndex] || "";
        input.setSelectionRange(input.value.length, input.value.length);
      } else if (event.key === "ArrowDown") {
        if (!history.length) return;
        event.preventDefault();
        historyIndex = Math.min(history.length, historyIndex + 1);
        input.value = historyIndex === history.length ? "" : history[historyIndex];
        input.setSelectionRange(input.value.length, input.value.length);
      }
    });
  }

  if (resetButton) {
    resetButton.addEventListener("click", resetConsole);
  }

  if (consoleRoot) {
    bootConsole();
  }
})();
