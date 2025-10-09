// skills.js — handles tab switching for the Skills section

document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll('.skills-tabs .tab');
  const panels = document.querySelectorAll('[role="tabpanel"]');

  // Function to activate a specific tab + panel
  function activateTab(tab) {
    // Deactivate all tabs and panels
    tabs.forEach(t => {
      t.classList.remove('is-active');
      t.setAttribute('aria-selected', 'false');
      t.setAttribute('tabindex', '-1');
    });
    panels.forEach(p => (p.hidden = true));

    // Activate clicked tab
    tab.classList.add('is-active');
    tab.setAttribute('aria-selected', 'true');
    tab.removeAttribute('tabindex');

    // Show corresponding panel
    const panelId = tab.getAttribute('aria-controls');
    const panel = document.getElementById(panelId);
    if (panel) panel.hidden = false;
  }

  // Set up click events
  tabs.forEach(tab => {
    tab.addEventListener('click', () => activateTab(tab));
  });

  // Optional: make arrow keys work for keyboard navigation
  document.addEventListener('keydown', e => {
    const activeIndex = [...tabs].findIndex(tab =>
      tab.classList.contains('is-active')
    );

    if (e.key === 'ArrowRight') {
      const next = tabs[(activeIndex + 1) % tabs.length];
      next.focus();
      activateTab(next);
    }

    if (e.key === 'ArrowLeft') {
      const prev = tabs[(activeIndex - 1 + tabs.length) % tabs.length];
      prev.focus();
      activateTab(prev);
    }
  });

  // Default to show "Programming" tab on first load
  const defaultTab = document.getElementById('tab-programming');
  if (defaultTab) activateTab(defaultTab);
});
