"use client";

import { useEffect } from "react";

export default function HomeInteractions() {
  useEffect(() => {
    document.body.classList.add("home-body");

    const container = document.getElementById("hero-particles");
    if (container && container.childElementCount === 0) {
      for (let i = 0; i < 20; i += 1) {
        const particle = document.createElement("div");
        particle.classList.add("hero-particle");
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 8}s`;
        particle.style.animationDuration = `${Math.random() * 6 + 6}s`;

        const size = Math.random() * 3 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        if (Math.random() > 0.5) {
          particle.style.background = "rgba(194, 58, 43, 0.3)";
        }

        container.appendChild(particle);
      }
    }

    const observerOptions: IntersectionObserverInit = {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;

        if (el.classList.contains("showcase-card")) {
          const siblings = Array.from(el.parentElement?.children || []);
          const idx = siblings.indexOf(el);
          setTimeout(() => {
            el.classList.add("visible");
          }, idx * 150);
        } else if (el.classList.contains("journey-item")) {
          el.classList.add("visible");
        } else if (el.classList.contains("goal-item")) {
          const siblings = Array.from(el.parentElement?.children || []);
          const idx = siblings.indexOf(el);
          setTimeout(() => {
            el.classList.add("visible");
          }, idx * 100);
        }

        observer.unobserve(el);
      });
    }, observerOptions);

    document.querySelectorAll(".showcase-card").forEach((el) => observer.observe(el));
    document.querySelectorAll(".journey-item").forEach((el) => observer.observe(el));
    document.querySelectorAll(".goal-item").forEach((el) => observer.observe(el));

    const scrollBtn = document.getElementById("hero-scroll-btn");
    const handleScroll = (event: Event) => {
      event.preventDefault();
      const target = document.getElementById("showcase");
      if (!target) return;
      const navHeight =
        parseInt(getComputedStyle(document.documentElement).getPropertyValue("--nav-height"), 10) || 72;
      const targetPos = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
      window.scrollTo({ top: targetPos, behavior: "smooth" });
    };

    if (scrollBtn) {
      scrollBtn.addEventListener("click", handleScroll);
    }

    return () => {
      observer.disconnect();
      if (scrollBtn) {
        scrollBtn.removeEventListener("click", handleScroll);
      }
      document.body.classList.remove("home-body");
    };
  }, []);

  return null;
}
