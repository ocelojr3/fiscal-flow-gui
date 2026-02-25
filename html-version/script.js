// Calendar Rendering
document.addEventListener('DOMContentLoaded', function() {
  renderCalendar();
  fetchIndicators();
  setInterval(fetchIndicators, 30000);
});

function renderCalendar() {
  const grid = document.getElementById('calendar-grid');
  if (!grid) return;

  const weekDays = ['dom.', 'seg.', 'ter.', 'qua.', 'qui.', 'sex.', 'sáb.'];
  const calendarDays = [
    [28, 29, 30, 1, 2, 3, 4],
    [5, 6, 7, 8, 9, 10, 11],
    [12, 13, 14, 15, 16, 17, 18],
    [19, 20, 21, 22, 23, 24, 25],
    [26, 27, 28, 29, 30, 31, 1],
  ];
  const highlighted = [1, 6, 7, 14, 15, 20, 24, 31];

  weekDays.forEach(d => {
    const el = document.createElement('div');
    el.className = 'cal-header';
    el.textContent = d;
    grid.appendChild(el);
  });

  calendarDays.flat().forEach((day, i) => {
    const el = document.createElement('div');
    el.className = 'cal-day';
    const isNextMonth = day < 10 && i > 15;
    if (highlighted.includes(day) && !isNextMonth) el.classList.add('highlight');
    if (isNextMonth || (day > 25 && i < 3)) el.classList.add('muted');
    el.textContent = day;
    grid.appendChild(el);
  });
}

// Financial Indicators - Real-time
async function fetchIndicators() {
  const list = document.getElementById('indicators-list');
  const info = document.getElementById('update-info');
  
  try {
    const [usdRes, eurRes] = await Promise.all([
      fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL'),
      fetch('https://economia.awesomeapi.com.br/json/last/EUR-BRL')
    ]);

    const usd = (await usdRes.json()).USDBRL;
    const eur = (await eurRes.json()).EURBRL;

    const indicators = [
      { label: 'Dólar/EUA', type: 'compra', value: parseFloat(usd.bid).toFixed(4), change: parseFloat(usd.pctChange) },
      { label: 'Dólar/EUA', type: 'venda', value: parseFloat(usd.ask).toFixed(4), change: parseFloat(usd.pctChange) },
      { label: 'Euro', type: 'compra', value: parseFloat(eur.bid).toFixed(4), change: parseFloat(eur.pctChange) },
      { label: 'Euro', type: 'venda', value: parseFloat(eur.ask).toFixed(4), change: parseFloat(eur.pctChange) },
    ];

    list.innerHTML = indicators.map(ind => `
      <div class="indicator-row">
        <div class="indicator-label">
          <strong>${ind.label}</strong> <span>- ${ind.type}</span>
        </div>
        <div class="indicator-value">
          <strong>R$ ${ind.value}</strong>
          <span class="change ${ind.change >= 0 ? 'up' : 'down'}">
            ${ind.change >= 0 ? '▲' : '▼'} ${Math.abs(ind.change).toFixed(2)}%
          </span>
        </div>
      </div>
    `).join('');

    const now = new Date();
    info.textContent = '🔄 Atualizado às ' + now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  } catch (e) {
    list.innerHTML = '<p style="color:var(--muted);font-size:.85rem;">Erro ao carregar cotações.</p>';
  }
}