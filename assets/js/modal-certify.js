// Incident Verification & Certification Modal Controller for ElectraGuard

(function() {
  // Ensure toast container exists
  function ensureToastContainer() {
    let container = document.getElementById('tactical-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'tactical-toast-container';
      document.body.appendChild(container);
    }
    return container;
  }

  // Tactical Toast notification helper
  window.showTacticalToast = function(title, message, type = 'info') {
    const container = ensureToastContainer();
    const toast = document.createElement('div');
    toast.className = `tactical-toast toast-${type}`;
    
    let icon = 'info';
    let iconClass = 'text-blue-600';
    if (type === 'success') {
      icon = 'check_circle';
      iconClass = 'text-emerald-600';
    } else if (type === 'error') {
      icon = 'error';
      iconClass = 'text-rose-600';
    }
    
    toast.innerHTML = `
      <span class="material-symbols-outlined text-[20px] ${iconClass}">${icon}</span>
      <div class="flex flex-col flex-1">
        <div class="text-sm font-semibold tracking-normal text-slate-900">${title}</div>
        <div class="text-xs text-slate-600 mt-0.5">${message}</div>
      </div>
      <button class="text-slate-400 hover:text-slate-700 text-sm" onclick="this.parentElement.remove()">✕</button>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'toast-out 0.25s forwards';
      setTimeout(() => toast.remove(), 250);
    }, 4500);
  };

  // Create Universal Certification Modal DOM
  function createModalDOM() {
    if (document.getElementById('tactical-certify-modal')) return;

    const modalHTML = `
      <div id="tactical-certify-modal" class="tactical-modal-backdrop" onclick="if(event.target === this) closeCertifyModal()">
        <div class="tactical-modal-card bg-white border border-slate-300 p-space-24 relative select-none">
          <!-- Header -->
          <div class="flex items-center justify-between border-b border-slate-200 pb-space-16 mb-space-16">
            <div class="flex items-center gap-space-12">
              <div class="w-10 h-10 rounded-md bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                <span class="material-symbols-outlined text-[24px]">verified_user</span>
              </div>
              <div class="flex flex-col">
                <span class="text-base text-slate-900 font-semibold tracking-tight">Observer Verification & Cryptographic Certification</span>
                <span class="text-xs text-blue-700 font-medium">HITL Multi-Modal Audit Protocol • ISO/IEC 27037 Standard</span>
              </div>
            </div>
            <button onclick="closeCertifyModal()" class="p-space-8 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors">
              <span class="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          <!-- Body Content -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-space-16 mb-space-20">
            <!-- Left Panel: Incident Telemetry -->
            <div class="bg-slate-50 p-space-16 rounded-md border border-slate-200 flex flex-col gap-space-12">
              <div class="flex items-center justify-between">
                <span class="text-xs text-slate-600 font-medium">Target Anomaly</span>
                <span id="modal-incident-id" class="text-xs text-blue-700 font-bold px-space-8 py-0.5 bg-blue-100/60 rounded border border-blue-200">INC-9482-EV</span>
              </div>
              
              <div class="flex flex-col gap-space-2">
                <span class="text-xs text-slate-500 font-medium">Location & Sector</span>
                <span id="modal-incident-location" class="text-sm text-slate-900 font-semibold">Polling Station #142 — Sector 4B, Dist 07</span>
              </div>

              <div class="flex flex-col gap-space-2">
                <span class="text-xs text-slate-500 font-medium">Incident Classification</span>
                <span id="modal-incident-category" class="text-sm text-blue-700 font-medium">Voter Intimidation & Entry Blockade</span>
              </div>

              <div class="p-space-12 bg-white rounded-md border border-slate-200 text-xs flex flex-col gap-space-6 shadow-2xs">
                <div class="flex justify-between text-slate-600">
                  <span>AI Confidence Score:</span>
                  <span class="text-emerald-700 font-semibold">94.8% (High Match)</span>
                </div>
                <div class="flex justify-between text-slate-600">
                  <span>Audio Telemetry:</span>
                  <span class="text-slate-800 font-medium">Verified (00:42 wav)</span>
                </div>
                <div class="flex justify-between text-slate-600">
                  <span>Evidential Imagery:</span>
                  <span class="text-slate-800 font-medium">3 Geo-Tagged Photos</span>
                </div>
                <div class="flex justify-between text-slate-600">
                  <span>GPS Precision Radius:</span>
                  <span class="text-emerald-700 font-semibold">± 2.4 meters</span>
                </div>
              </div>
            </div>

            <!-- Right Panel: Analyst Certification Controls -->
            <div class="bg-slate-50 p-space-16 rounded-md border border-slate-200 flex flex-col justify-between">
              <div class="flex flex-col gap-space-12">
                <span class="text-xs text-slate-700 font-semibold uppercase tracking-wider">Verification Sign-Off Checklist</span>
                
                <label class="flex items-center gap-space-8 text-slate-800 cursor-pointer text-xs">
                  <input type="checkbox" checked class="accent-blue-600 w-4 h-4 rounded border-slate-300">
                  <span>Corroborated by independent ground observer report</span>
                </label>

                <label class="flex items-center gap-space-8 text-slate-800 cursor-pointer text-xs">
                  <input type="checkbox" checked class="accent-blue-600 w-4 h-4 rounded border-slate-300">
                  <span>Excludes false-positive sensory artifacts</span>
                </label>

                <label class="flex items-center gap-space-8 text-slate-800 cursor-pointer text-xs">
                  <input type="checkbox" checked class="accent-blue-600 w-4 h-4 rounded border-slate-300">
                  <span>Authorizes transmission to Rapid Response dispatch</span>
                </label>

                <div class="mt-space-8 p-space-12 bg-white rounded-md border border-slate-200 flex flex-col gap-space-4 shadow-2xs">
                  <span class="text-[11px] text-slate-500 font-medium">Observer Identity & Credentials</span>
                  <div class="flex items-center justify-between">
                    <span class="text-xs text-slate-900 font-semibold">EG-OBS-084 (Y. Singh)</span>
                    <span class="text-[10px] text-emerald-700 bg-emerald-50 px-space-6 py-0.5 rounded border border-emerald-200 font-medium">VALIDATED</span>
                  </div>
                  <div class="text-[10px] text-slate-500 break-all mt-space-4" id="modal-hash-preview">
                    SHA256: 7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069
                  </div>
                </div>
              </div>

              <div class="mt-space-16 flex items-center justify-end gap-space-12">
                <button onclick="closeCertifyModal()" type="button" class="px-space-14 py-space-8 rounded-md bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 text-xs font-medium transition-colors">
                  Cancel
                </button>
                <button id="modal-submit-certify-btn" onclick="executeCertification()" type="button" class="px-space-16 py-space-8 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-space-6 transition-all shadow-xs">
                  <span class="material-symbols-outlined text-[18px]">verified</span>
                  <span>Digitally Sign & Certify</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    const wrapper = document.createElement('div');
    wrapper.innerHTML = modalHTML;
    document.body.appendChild(wrapper.firstElementChild);
  }

  window.openCertifyModal = function(id = 'INC-9482-EV', location = 'Polling Station #142 — Sector 4B', category = 'Voter Intimidation') {
    createModalDOM();
    const modal = document.getElementById('tactical-certify-modal');
    if (!modal) return;

    document.getElementById('modal-incident-id').textContent = id;
    document.getElementById('modal-incident-location').textContent = location;
    document.getElementById('modal-incident-category').textContent = category;

    // Generate random hex hash
    const chars = '0123456789abcdef';
    let randHash = '';
    for(let i=0; i<64; i++) randHash += chars[Math.floor(Math.random() * chars.length)];
    document.getElementById('modal-hash-preview').textContent = 'SHA256: ' + randHash;

    const btn = document.getElementById('modal-submit-certify-btn');
    btn.disabled = false;
    btn.innerHTML = `<span class="material-symbols-outlined text-[18px]">verified</span><span>Digitally Sign & Certify</span>`;

    modal.classList.add('active');
  };

  window.closeCertifyModal = function() {
    const modal = document.getElementById('tactical-certify-modal');
    if (modal) modal.classList.remove('active');
  };

  window.executeCertification = function() {
    const btn = document.getElementById('modal-submit-certify-btn');
    const incidentId = document.getElementById('modal-incident-id').textContent;
    btn.disabled = true;
    btn.innerHTML = `<span class="material-symbols-outlined text-[18px] animate-spin">autorenew</span><span>Anchoring to Ledger...</span>`;

    setTimeout(() => {
      btn.innerHTML = `<span class="material-symbols-outlined text-[18px] text-emerald-600">check_circle</span><span>Certified</span>`;
      
      showTacticalToast(
        'INCIDENT CERTIFIED', 
        `Incident ${incidentId} cryptographically signed by EG-OBS-084 and committed to audit ledger.`, 
        'success'
      );

      // Find any table row or card with this incident ID and mark as verified
      document.querySelectorAll('tr, .incident-card, div').forEach(node => {
        if (node.textContent.includes(incidentId)) {
          const badge = node.querySelector('.badge-status, .status-badge, [data-status]');
          if (badge) {
            badge.textContent = 'VERIFIED';
            badge.className = 'px-space-6 py-0.5 rounded bg-emerald-50 border border-emerald-300 text-emerald-700 font-medium text-xs';
          }
        }
      });

      setTimeout(() => {
        closeCertifyModal();
      }, 1000);
    }, 900);
  };

  // Wire up any buttons in the page with .btn-verify or text 'Verify' or 'Certify'
  document.addEventListener('DOMContentLoaded', () => {
    createModalDOM();

    document.body.addEventListener('click', (e) => {
      const target = e.target.closest('button, a');
      if (!target) return;

      const text = target.textContent.trim().toLowerCase();
      if (text.includes('verify') || text.includes('certify') || text.includes('audit record') || target.classList.contains('btn-certify')) {
        // Find nearest incident ID if exists
        let row = target.closest('tr, .incident-card, div[data-incident-id]');
        let id = 'INC-9482-EV';
        let loc = 'Polling Station #142 — Sector 4B, Dist 07';
        let cat = 'Voter Intimidation & Entry Blockade';

        if (row) {
          const matchId = row.textContent.match(/INC-[A-Z0-9-]+/);
          if (matchId) id = matchId[0];
          const matchStation = row.textContent.match(/Polling Station\s*#?\d+[^\n•,]*/i);
          if (matchStation) loc = matchStation[0];
        }

        e.preventDefault();
        openCertifyModal(id, loc, cat);
      }
    });
  });
})();
