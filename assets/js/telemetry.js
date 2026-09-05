// Telemetry & Live Clock Controller for ElectraGuard

(function() {
  function updateClocks() {
    const now = new Date();
    
    // UTC formatting
    const utcHours = String(now.getUTCHours()).padStart(2, '0');
    const utcMinutes = String(now.getUTCMinutes()).padStart(2, '0');
    const utcSeconds = String(now.getUTCSeconds()).padStart(2, '0');
    const utcStr = `${utcHours}:${utcMinutes}:${utcSeconds} UTC`;

    // Local / IST formatting (UTC + 5:30)
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istDate = new Date(now.getTime() + istOffset);
    const istHours = String(istDate.getUTCHours()).padStart(2, '0');
    const istMinutes = String(istDate.getUTCMinutes()).padStart(2, '0');
    const istSeconds = String(istDate.getUTCSeconds()).padStart(2, '0');
    const istStr = `${istHours}:${istMinutes}:${istSeconds} IST`;

    // Target elements
    document.querySelectorAll('.telemetry-utc-clock').forEach(el => {
      el.textContent = utcStr;
    });

    document.querySelectorAll('.telemetry-ist-clock').forEach(el => {
      el.textContent = istStr;
    });

    // Also look for timestamp spans in headers
    document.querySelectorAll('span').forEach(el => {
      if (el.textContent.includes('UTC') && /\d{2}:\d{2}:\d{2}/.test(el.textContent) && !el.classList.contains('no-auto-clock')) {
        el.textContent = utcStr;
      }
      if (el.textContent.includes('IST') && /\d{2}:\d{2}:\d{2}/.test(el.textContent) && !el.classList.contains('no-auto-clock')) {
        el.textContent = istStr;
      }
    });
  }

  function simulateLatencyJitter() {
    // Random latency between 35ms and 42ms
    const latency = Math.floor(Math.random() * 8) + 35;
    document.querySelectorAll('.telemetry-latency, span:contains("38ms")').forEach(el => {
      el.textContent = `${latency}ms`;
    });
  }

  // Initialize
  document.addEventListener('DOMContentLoaded', () => {
    updateClocks();
    setInterval(updateClocks, 1000);
    setInterval(simulateLatencyJitter, 4000);
  });
})();
