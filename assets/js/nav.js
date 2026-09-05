// Global Navigation & Tactical Action Controller for ElectraGuard

(function() {
  function initNavigation() {
    const currentPath = window.location.pathname.toLowerCase();
    
    // Determine active route key
    let activeKey = 'overview';
    if (currentPath.includes('live-incidents')) activeKey = 'live-incidents';
    else if (currentPath.includes('tactical-map')) activeKey = 'tactical-map';
    else if (currentPath.includes('priority-alerts')) activeKey = 'priority-alerts';
    else if (currentPath.includes('verification-queue')) activeKey = 'verification-queue';
    else if (currentPath.includes('rapid-response')) activeKey = 'rapid-response';
    else if (currentPath.includes('analytics')) activeKey = 'analytics';
    else if (currentPath.includes('citizen-portal')) activeKey = 'citizen-portal';
    else if (currentPath.includes('incident-certify')) activeKey = 'verification-queue';

    // Highlight active nav item in sidebar cleanly without altering structure or font size
    document.querySelectorAll('nav a, aside nav a').forEach(link => {
      const href = (link.getAttribute('href') || '').toLowerCase();
      const pathAttr = link.getAttribute('data-path') || '';

      const isMatch = (
        (activeKey === 'overview' && (href === 'index.html' || href === 'overview.html' || pathAttr === 'overview')) ||
        (activeKey === 'live-incidents' && (href.includes('live-incidents') || pathAttr === 'live-incidents')) ||
        (activeKey === 'tactical-map' && (href.includes('tactical-map') || pathAttr === 'tactical-map')) ||
        (activeKey === 'priority-alerts' && (href.includes('priority-alerts') || pathAttr === 'priority-alerts')) ||
        (activeKey === 'verification-queue' && (href.includes('verification-queue') || pathAttr === 'verification-queue')) ||
        (activeKey === 'rapid-response' && (href.includes('rapid-response') || pathAttr === 'rapid-response')) ||
        (activeKey === 'analytics' && (href.includes('analytics') || pathAttr.includes('analytics'))) ||
        (activeKey === 'citizen-portal' && (href.includes('citizen-portal') || pathAttr === 'citizen-portal'))
      );

      if (isMatch) {
        link.classList.add('active');
        link.setAttribute('data-active', 'true');
      } else {
        link.classList.remove('active');
        link.removeAttribute('data-active');
      }
    });
  }

  // Create Escalation Modal
  function createEscalateModal() {
    if (document.getElementById('tactical-escalate-modal')) return;

    const modalHTML = `
      <div id="tactical-escalate-modal" class="tactical-modal-backdrop" onclick="if(event.target === this) closeEscalateModal()">
        <div class="tactical-modal-card bg-white border border-slate-300 p-space-24 relative max-w-lg select-none">
          <div class="flex items-center gap-space-12 pb-space-16 border-b border-slate-200">
            <div class="w-10 h-10 rounded-md bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center">
              <span class="material-symbols-outlined text-[24px]">warning</span>
            </div>
            <div class="flex flex-col">
              <span class="text-base font-semibold text-slate-900 tracking-tight">Critical Threat Escalation</span>
              <span class="text-xs text-rose-700 font-medium">Command Level Authorization Required</span>
            </div>
          </div>

          <div class="py-space-16 flex flex-col gap-space-12 text-slate-800 text-sm">
            <p>You are about to initiate an immediate escalation to <strong>DEFCON 2 // HIGH THREAT</strong>.</p>
            <div class="p-space-12 bg-slate-50 rounded-md border border-slate-200 text-xs text-slate-700 flex flex-col gap-space-6">
              <div class="flex justify-between">
                <span class="text-slate-500">Impacted Zone:</span>
                <span class="text-slate-900 font-semibold">Sector 4B & District 07</span>
              </div>
              <div class="flex justify-between">
                <span class="text-slate-500">Operational Response:</span>
                <span class="text-rose-700 font-semibold">Immediate Rapid Response Dispatch</span>
              </div>
              <div class="flex justify-between">
                <span class="text-slate-500">Notified Bodies:</span>
                <span class="text-slate-900">Election Commission, Cyber Cell, Rapid Force</span>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-end gap-space-12 pt-space-12 border-t border-slate-200">
            <button onclick="closeEscalateModal()" type="button" class="px-space-14 py-space-8 rounded-md bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-medium transition-colors">
              Cancel
            </button>
            <button onclick="confirmEscalation()" type="button" class="px-space-16 py-space-8 rounded-md bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold flex items-center gap-space-6 shadow-xs transition-colors">
              <span class="material-symbols-outlined text-[18px]">emergency</span>
              <span>Confirm Immediate Escalation</span>
            </button>
          </div>
        </div>
      </div>
    `;

    const wrapper = document.createElement('div');
    wrapper.innerHTML = modalHTML;
    document.body.appendChild(wrapper.firstElementChild);
  }

  window.openEscalateModal = function() {
    createEscalateModal();
    const modal = document.getElementById('tactical-escalate-modal');
    if (modal) modal.classList.add('active');
  };

  window.closeEscalateModal = function() {
    const modal = document.getElementById('tactical-escalate-modal');
    if (modal) modal.classList.remove('active');
  };

  window.confirmEscalation = function() {
    closeEscalateModal();
    if (window.showTacticalToast) {
      window.showTacticalToast(
        'DEFCON ESCALATION BROADCASTED',
        'National Command alerted. Rapid response units mobilized to District 07.',
        'error'
      );
    }
  };

  // Quick Report Modal
  function createReportModal() {
    if (document.getElementById('tactical-quick-report-modal')) return;

    const modalHTML = `
      <div id="tactical-quick-report-modal" class="tactical-modal-backdrop" onclick="if(event.target === this) closeReportModal()">
        <div class="tactical-modal-card bg-white border border-slate-300 p-space-24 relative max-w-lg select-none">
          <div class="flex items-center justify-between pb-space-16 border-b border-slate-200">
            <div class="flex items-center gap-space-12">
              <div class="w-10 h-10 rounded-md bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center">
                <span class="material-symbols-outlined text-[24px]">campaign</span>
              </div>
              <div class="flex flex-col">
                <span class="text-base text-slate-900 font-semibold tracking-tight">Fast Incident Ingest</span>
                <span class="text-xs text-blue-700 font-medium">Observer Direct Entry</span>
              </div>
            </div>
            <button onclick="closeReportModal()" class="text-slate-400 hover:text-slate-700">✕</button>
          </div>

          <form onsubmit="submitQuickReport(event)" class="py-space-16 flex flex-col gap-space-12 text-slate-800 text-xs">
            <div class="flex flex-col gap-1">
              <label class="text-xs font-medium text-slate-700">Polling Center / Sector</label>
              <input required id="qr-station" class="h-9 px-space-12 bg-white border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:border-blue-600" placeholder="e.g. Polling Station #142 - Sector 4B" />
            </div>

            <div class="grid grid-cols-2 gap-space-12">
              <div class="flex flex-col gap-1">
                <label class="text-xs font-medium text-slate-700">Category</label>
                <select id="qr-cat" class="h-9 px-space-8 bg-white border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:border-blue-600">
                  <option>Voter Intimidation / Blockade</option>
                  <option>EVM / Tabulator Hardware Malfunction</option>
                  <option>Polling Station Disruption / Capture</option>
                  <option>Unreasonable Queue Anomaly (>2h)</option>
                  <option>Disinformation Broadcast</option>
                </select>
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-xs font-medium text-slate-700">Severity Level</label>
                <select id="qr-sev" class="h-9 px-space-8 bg-white border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:border-blue-600">
                  <option value="critical">Critical (Immediate)</option>
                  <option value="high" selected>High Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="low">Low (Informational)</option>
                </select>
              </div>
            </div>

            <div class="flex flex-col gap-1">
              <label class="text-xs font-medium text-slate-700">Observation Narrative</label>
              <textarea required id="qr-desc" rows="3" class="p-space-8 bg-white border border-slate-300 rounded-md text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600" placeholder="Summarize ground report, witness count, and current status..."></textarea>
            </div>

            <div class="flex items-center justify-between pt-space-12 border-t border-slate-200">
              <a href="citizen-portal.html" class="text-blue-600 hover:text-blue-700 font-medium text-xs flex items-center gap-1">
                <span>Open Citizen Portal Flow</span>
                <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
              </a>
              <div class="flex items-center gap-space-8">
                <button onclick="closeReportModal()" type="button" class="px-space-12 py-space-6 rounded-md bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-medium">
                  Cancel
                </button>
                <button type="submit" class="px-space-16 py-space-6 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs">
                  Ingest Report
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    `;

    const wrapper = document.createElement('div');
    wrapper.innerHTML = modalHTML;
    document.body.appendChild(wrapper.firstElementChild);
  }

  window.openReportModal = function() {
    createReportModal();
    const modal = document.getElementById('tactical-quick-report-modal');
    if (modal) modal.classList.add('active');
  };

  window.closeReportModal = function() {
    const modal = document.getElementById('tactical-quick-report-modal');
    if (modal) modal.classList.remove('active');
  };

  window.submitQuickReport = function(e) {
    e.preventDefault();
    const station = document.getElementById('qr-station')?.value || 'Sector 4B';
    const cat = document.getElementById('qr-cat')?.value || 'General Anomaly';
    const sev = document.getElementById('qr-sev')?.value || 'high';

    closeReportModal();

    if (window.showTacticalToast) {
      window.showTacticalToast(
        'INCIDENT INGESTED',
        `Report logged for ${station} [${cat}]. Broadcasted to National Monitoring Console.`,
        sev === 'critical' ? 'error' : 'success'
      );
    }
  };

  // Notification Dropdown Drawer
  function createNotificationDrawer() {
    if (document.getElementById('tactical-notification-dropdown')) return;

    const drawerHTML = `
      <div id="tactical-notification-dropdown" class="fixed top-16 right-16 w-96 bg-white border border-slate-200 rounded-lg shadow-xl z-50 p-space-16 hidden select-none">
        <div class="flex items-center justify-between pb-space-12 border-b border-slate-200 mb-space-12">
          <div class="flex items-center gap-space-8">
            <span class="material-symbols-outlined text-blue-600 text-[20px]">notifications_active</span>
            <span class="text-sm font-semibold text-slate-900">Priority Notifications</span>
          </div>
          <span class="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-xs font-semibold">7 New</span>
        </div>

        <div class="flex flex-col gap-space-8 max-h-80 overflow-y-auto pr-1">
          <a href="live-incidents.html" class="p-space-8 rounded-md bg-slate-50 hover:bg-slate-100 border border-slate-200 flex flex-col gap-1 transition-colors">
            <div class="flex items-center justify-between text-xs">
              <span class="text-red-700 font-semibold">Critical // Booth Capture Attempt</span>
              <span class="text-slate-400 text-[11px]">2m ago</span>
            </div>
            <div class="text-xs text-slate-700">Polling Station #142 EVM physically obstructed.</div>
          </a>

          <a href="priority-alerts.html" class="p-space-8 rounded-md bg-slate-50 hover:bg-slate-100 border border-slate-200 flex flex-col gap-1 transition-colors">
            <div class="flex items-center justify-between text-xs">
              <span class="text-amber-800 font-semibold">High // Queue Stalling Anomaly</span>
              <span class="text-slate-400 text-[11px]">8m ago</span>
            </div>
            <div class="text-xs text-slate-700">Waiting time exceeded 140 min in Sector 4B.</div>
          </a>

          <a href="rapid-response.html" class="p-space-8 rounded-md bg-slate-50 hover:bg-slate-100 border border-slate-200 flex flex-col gap-1 transition-colors">
            <div class="flex items-center justify-between text-xs">
              <span class="text-emerald-700 font-semibold">Dispatch // Unit Alpha-4 En Route</span>
              <span class="text-slate-400 text-[11px]">14m ago</span>
            </div>
            <div class="text-xs text-slate-700">ETA 4.2 mins to Polling Center #88.</div>
          </a>
        </div>

        <div class="pt-space-12 border-t border-slate-200 mt-space-12 text-center">
          <a href="priority-alerts.html" class="text-xs font-medium text-blue-600 hover:text-blue-800">
            View All Priority Alerts & Escalations →
          </a>
        </div>
      </div>
    `;

    const wrapper = document.createElement('div');
    wrapper.innerHTML = drawerHTML;
    document.body.appendChild(wrapper.firstElementChild);
  }

  function toggleNotificationDrawer() {
    createNotificationDrawer();
    const el = document.getElementById('tactical-notification-dropdown');
    if (el) el.classList.toggle('hidden');
  }

  // Setup Event Listeners
  document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    createEscalateModal();
    createReportModal();
    createNotificationDrawer();

    // Wire Escalate buttons
    document.querySelectorAll('button').forEach(btn => {
      const text = btn.textContent.trim().toUpperCase();
      if (text.includes('ESCALATE')) {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          openEscalateModal();
        });
      }
      if (text.includes('REPORT INCIDENT')) {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          openReportModal();
        });
      }
    });

    // Wire Notification bells
    document.querySelectorAll('button[aria-label="Notifications"], button').forEach(btn => {
      if (btn.querySelector('span')?.textContent?.trim() === 'notifications') {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          toggleNotificationDrawer();
        });
      }
    });

    // Close notification drawer on outside click
    document.addEventListener('click', (e) => {
      const dropdown = document.getElementById('tactical-notification-dropdown');
      if (dropdown && !dropdown.classList.contains('hidden') && !dropdown.contains(e.target)) {
        dropdown.classList.add('hidden');
      }
    });

    // Wire table & list search inputs
    const searchInputs = document.querySelectorAll('input[placeholder*="Search"], input[placeholder*="Filter"]');
    searchInputs.forEach(input => {
      input.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        document.querySelectorAll('tbody tr, .incident-card, .triage-card').forEach(row => {
          if (!query) {
            row.style.display = '';
          } else {
            const matches = row.textContent.toLowerCase().includes(query);
            row.style.display = matches ? '' : 'none';
          }
        });
      });
    });
  });
})();
