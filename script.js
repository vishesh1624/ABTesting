const metrics = [
  {
    id: 'conversion_rate',
    name: 'Conversion Rate',
    category: 'Funnel',
    type: 'rate',
    unitLabel: '%',
    baseline: 2.8,
    uplift: 5,
    defaultStdDev: 0,
    description: 'Best for PDP, checkout, pricing, merchandising, and landing-page experiments.',
    whyItMatters: 'Directly captures whether a visitor completes a purchase, which makes it the most common north-star experiment metric in e-commerce.',
    recommendations: ['Revenue per Visitor', 'Average Order Value', 'Bounce Rate', 'Return Rate'],
    metricLabelSingular: 'conversions',
    detailAssumption: 'Baseline conversion rates in e-commerce often sit in the low single digits, so even small relative lifts need large sample sizes.'
  },
  {
    id: 'add_to_cart_rate',
    name: 'Add-to-Cart Rate',
    category: 'Funnel',
    type: 'rate',
    unitLabel: '%',
    baseline: 8.5,
    uplift: 4,
    defaultStdDev: 0,
    description: 'Useful for testing product pages, search ranking, recommendation modules, and visual merchandising.',
    whyItMatters: 'A strong leading indicator when the experiment influences product discovery and consideration more than checkout mechanics.',
    recommendations: ['Conversion Rate', 'Revenue per Visitor', 'Bounce Rate', 'Out-of-Stock Rate'],
    metricLabelSingular: 'add-to-carts',
    detailAssumption: 'This metric usually moves earlier in the funnel and will be more sensitive than purchases for merchandising experiments.'
  },
  {
    id: 'checkout_completion_rate',
    name: 'Checkout Completion Rate',
    category: 'Funnel',
    type: 'rate',
    unitLabel: '%',
    baseline: 42,
    uplift: 3,
    defaultStdDev: 0,
    description: 'Relevant for payment UX, delivery promises, coupon flow, guest checkout, and friction-removal tests.',
    whyItMatters: 'Helps isolate changes inside the checkout flow where the top-funnel traffic quality remains largely unchanged.',
    recommendations: ['Conversion Rate', 'Payment Failure Rate', 'Average Order Value', 'Refund Rate'],
    metricLabelSingular: 'completed checkouts',
    detailAssumption: 'Because this metric is measured among initiated checkouts, it often has a higher baseline and needs fewer users than sitewide conversion rate.'
  },
  {
    id: 'revenue_per_visitor',
    name: 'Revenue per Visitor',
    category: 'Revenue',
    type: 'continuous',
    unitLabel: '₹',
    baseline: 180,
    uplift: 4,
    defaultStdDev: 900,
    description: 'Strong choice when the experiment could affect both conversion and basket value at the same time.',
    whyItMatters: 'Combines conversion and monetization, which makes it useful for pricing, bundling, recommendations, and promotion tests.',
    recommendations: ['Conversion Rate', 'Average Order Value', 'Gross Margin %', 'Return Rate'],
    metricLabelSingular: 'average revenue',
    detailAssumption: 'Revenue metrics are typically noisier than funnel rates, so the simulator uses a standard deviation field you can edit.'
  },
  {
    id: 'average_order_value',
    name: 'Average Order Value',
    category: 'Revenue',
    type: 'continuous',
    unitLabel: '₹',
    baseline: 2200,
    uplift: 3,
    defaultStdDev: 2500,
    description: 'Best when the experiment targets bundling, cross-sell, upsell, cart threshold, or merchandising depth.',
    whyItMatters: 'Useful when you want to grow basket size without necessarily changing how many shoppers convert.',
    recommendations: ['Conversion Rate', 'Revenue per Visitor', 'Discount Rate', 'Return Rate'],
    metricLabelSingular: 'average order value',
    detailAssumption: 'Basket-value metrics can be highly skewed, so standard deviation is especially important for realistic planning.'
  },
  {
    id: 'repeat_purchase_rate',
    name: 'Repeat Purchase Rate',
    category: 'Retention',
    type: 'rate',
    unitLabel: '%',
    baseline: 18,
    uplift: 6,
    defaultStdDev: 0,
    description: 'Useful for CRM, loyalty, post-purchase, subscription, and retention-oriented tests.',
    whyItMatters: 'Captures long-term quality of customer experience rather than only immediate purchase behavior.',
    recommendations: ['Revenue per Visitor', 'Customer Support Contact Rate', 'Refund Rate', 'Unsubscribe Rate'],
    metricLabelSingular: 'repeat purchasers',
    detailAssumption: 'Retention metrics often require longer observation windows, so use them when delayed impact matters more than speed.'
  }
];

const state = {
  selectedMetricId: 'conversion_rate'
};

const els = {
  metricGrid: document.getElementById('metricGrid'),
  metricDetail: document.getElementById('metricDetail'),
  selectedMetricTitle: document.getElementById('selectedMetricTitle'),
  baselineInput: document.getElementById('baselineInput'),
  baselineSuffix: document.getElementById('baselineSuffix'),
  upliftInput: document.getElementById('upliftInput'),
  alphaInput: document.getElementById('alphaInput'),
  powerInput: document.getElementById('powerInput'),
  trafficInput: document.getElementById('trafficInput'),
  allocationInput: document.getElementById('allocationInput'),
  stdDevInput: document.getElementById('stdDevInput'),
  stdDevLabel: document.getElementById('stdDevLabel'),
  stdDevLabelText: document.getElementById('stdDevLabelText'),
  stdDevSuffix: document.getElementById('stdDevSuffix'),
  guardrailList: document.getElementById('guardrailList'),
  resultsGrid: document.getElementById('resultsGrid'),
  analysisNote: document.getElementById('analysisNote'),
  loadDefaultsBtn: document.getElementById('loadDefaultsBtn'),
  calculateBtn: document.getElementById('calculateBtn'),
  resetBtn: document.getElementById('resetBtn'),
  controlUsersInput: document.getElementById('controlUsersInput'),
  treatmentUsersInput: document.getElementById('treatmentUsersInput'),
  controlMetricLabel: document.getElementById('controlMetricLabel'),
  treatmentMetricLabel: document.getElementById('treatmentMetricLabel'),
  controlMetricInput: document.getElementById('controlMetricInput'),
  treatmentMetricInput: document.getElementById('treatmentMetricInput'),
  controlStdDevLabel: document.getElementById('controlStdDevLabel'),
  treatmentStdDevLabel: document.getElementById('treatmentStdDevLabel'),
  controlStdDevInput: document.getElementById('controlStdDevInput'),
  treatmentStdDevInput: document.getElementById('treatmentStdDevInput'),
  observedResults: document.getElementById('observedResults'),
  runObservedBtn: document.getElementById('runObservedBtn')
};

function getSelectedMetric() {
  return metrics.find((metric) => metric.id === state.selectedMetricId);
}

function formatNumber(value, options = {}) {
  if (!Number.isFinite(value)) return '—';
  const { decimals = 0, prefix = '', suffix = '' } = options;
  return `${prefix}${value.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  })}${suffix}`;
}

function formatMetricValue(metric, value, decimals = 2) {
  if (!Number.isFinite(value)) return '—';
  if (metric.type === 'rate') {
    return `${value.toFixed(decimals)}%`;
  }
  return `${metric.unitLabel}${value.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  })}`;
}

function renderMetricCards() {
  els.metricGrid.innerHTML = metrics
    .map(
      (metric) => `
        <button class="metric-card ${metric.id === state.selectedMetricId ? 'selected' : ''}" data-metric-id="${metric.id}">
          <div class="metric-meta">
            <span class="mini-pill">${metric.category}</span>
            <span class="mini-pill">${metric.type === 'rate' ? 'Rate metric' : 'Continuous metric'}</span>
          </div>
          <h3>${metric.name}</h3>
          <p>${metric.description}</p>
        </button>
      `
    )
    .join('');

  [...document.querySelectorAll('[data-metric-id]')].forEach((button) => {
    button.addEventListener('click', () => {
      state.selectedMetricId = button.dataset.metricId;
      applyMetricDefaults(false);
    });
  });
}

function renderMetricDetail(metric) {
  els.selectedMetricTitle.textContent = metric.name;
  els.metricDetail.innerHTML = `
    <div class="metric-detail-card">
      <h4>Why this is relevant</h4>
      <p>${metric.whyItMatters}</p>
    </div>
    <div class="metric-detail-card">
      <h4>Baseline assumption</h4>
      <p>Recommended starting point: <strong>${formatMetricValue(metric, metric.baseline)}</strong></p>
      <p>${metric.detailAssumption}</p>
    </div>
    <div class="metric-detail-card">
      <h4>Suggested guardrails</h4>
      <p>${metric.recommendations.join(', ')}</p>
    </div>
  `;
}

function renderGuardrails(metric) {
  els.guardrailList.innerHTML = metric.recommendations
    .map(
      (item, index) => `
        <label class="guardrail-pill">
          <input type="checkbox" ${index < 2 ? 'checked' : ''} value="${item}" />
          <span>${item}</span>
        </label>
      `
    )
    .join('');
}

function applyMetricDefaults(preserveObserved = true) {
  const metric = getSelectedMetric();
  renderMetricCards();
  renderMetricDetail(metric);
  renderGuardrails(metric);

  els.baselineInput.value = metric.baseline;
  els.upliftInput.value = metric.uplift;
  els.baselineSuffix.textContent = metric.type === 'rate' ? '%' : metric.unitLabel;
  els.stdDevSuffix.textContent = metric.unitLabel;
  els.stdDevInput.value = metric.defaultStdDev || '';

  const isContinuous = metric.type === 'continuous';
  els.stdDevLabel.classList.toggle('hidden', !isContinuous);
  els.stdDevLabelText.textContent = isContinuous ? 'Standard deviation assumption' : 'Standard deviation';

  els.controlStdDevLabel.classList.toggle('hidden', !isContinuous);
  els.treatmentStdDevLabel.classList.toggle('hidden', !isContinuous);
  els.controlMetricLabel.textContent =
    metric.type === 'rate' ? `Control ${metric.metricLabelSingular}` : `Control mean ${metric.name.toLowerCase()}`;
  els.treatmentMetricLabel.textContent =
    metric.type === 'rate'
      ? `Treatment ${metric.metricLabelSingular}`
      : `Treatment mean ${metric.name.toLowerCase()}`;

  if (!preserveObserved) {
    if (metric.type === 'rate') {
      const visitors = 50000;
      const controlCount = Math.round((metric.baseline / 100) * visitors);
      const treatmentCount = Math.round(((metric.baseline * (1 + metric.uplift / 100)) / 100) * visitors);
      els.controlMetricInput.value = controlCount;
      els.treatmentMetricInput.value = treatmentCount;
    } else {
      els.controlMetricInput.value = metric.baseline;
      els.treatmentMetricInput.value = (metric.baseline * (1 + metric.uplift / 100)).toFixed(2);
      els.controlStdDevInput.value = metric.defaultStdDev;
      els.treatmentStdDevInput.value = metric.defaultStdDev;
    }
  }

  runDesignCalculation();
  runObservedCalculation();
}

function normalCDF(x) {
  return 0.5 * (1 + erf(x / Math.sqrt(2)));
}

function erf(x) {
  const sign = x >= 0 ? 1 : -1;
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;
  const ax = Math.abs(x);
  const t = 1 / (1 + p * ax);
  const y = 1 - (((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-ax * ax));
  return sign * y;
}

function inverseNormalCDF(p) {
  if (p <= 0 || p >= 1) {
    throw new Error('p must be between 0 and 1');
  }

  const a = [
    -3.969683028665376e1,
    2.209460984245205e2,
    -2.759285104469687e2,
    1.38357751867269e2,
    -3.066479806614716e1,
    2.506628277459239
  ];
  const b = [
    -5.447609879822406e1,
    1.615858368580409e2,
    -1.556989798598866e2,
    6.680131188771972e1,
    -1.328068155288572e1
  ];
  const c = [
    -7.784894002430293e-3,
    -3.223964580411365e-1,
    -2.400758277161838,
    -2.549732539343734,
    4.374664141464968,
    2.938163982698783
  ];
  const d = [
    7.784695709041462e-3,
    3.224671290700398e-1,
    2.445134137142996,
    3.754408661907416
  ];

  const plow = 0.02425;
  const phigh = 1 - plow;
  let q;
  let r;

  if (p < plow) {
    q = Math.sqrt(-2 * Math.log(p));
    return (
      (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
      ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1)
    );
  }

  if (p > phigh) {
    q = Math.sqrt(-2 * Math.log(1 - p));
    return -(
      (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
      ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1)
    );
  }

  q = p - 0.5;
  r = q * q;
  return (
    (((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q /
    (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1)
  );
}

function getAllocationShare() {
  const allocation = Number(els.allocationInput.value);
  const treatmentShare = Math.min(0.99, Math.max(0.01, allocation / 100));
  return treatmentShare;
}

function getCheckedGuardrails() {
  return [...els.guardrailList.querySelectorAll('input:checked')].map((checkbox) => checkbox.value);
}

function calculateSampleSize(metric) {
  const baselineRaw = Number(els.baselineInput.value);
  const uplift = Number(els.upliftInput.value) / 100;
  const alpha = Number(els.alphaInput.value);
  const power = Number(els.powerInput.value);
  const dailyTraffic = Number(els.trafficInput.value);
  const treatmentShare = getAllocationShare();
  const controlShare = 1 - treatmentShare;
  const allocationPenalty = 1 / (4 * treatmentShare * controlShare);

  if (baselineRaw <= 0 || uplift <= 0 || dailyTraffic <= 0) {
    return null;
  }

  const zAlpha = inverseNormalCDF(1 - alpha / 2);
  const zPower = inverseNormalCDF(power);
  let targetValue;
  let totalSample;

  if (metric.type === 'rate') {
    const p1 = baselineRaw / 100;
    const p2 = p1 * (1 + uplift);
    const pooled = (p1 + p2) / 2;
    const numerator =
      Math.pow(zAlpha * Math.sqrt(2 * pooled * (1 - pooled)) + zPower * Math.sqrt(p1 * (1 - p1) + p2 * (1 - p2)), 2);
    const perGroupBalanced = numerator / Math.pow(p2 - p1, 2);
    const balancedTotal = 2 * perGroupBalanced;
    totalSample = Math.ceil(balancedTotal * allocationPenalty);
    targetValue = p2 * 100;
  } else {
    const stdDev = Number(els.stdDevInput.value);
    if (stdDev <= 0) return null;
    const delta = baselineRaw * uplift;
    const perGroupBalanced = (2 * Math.pow(stdDev, 2) * Math.pow(zAlpha + zPower, 2)) / Math.pow(delta, 2);
    const balancedTotal = 2 * perGroupBalanced;
    totalSample = Math.ceil(balancedTotal * allocationPenalty);
    targetValue = baselineRaw * (1 + uplift);
  }

  const treatmentUsers = Math.ceil(totalSample * treatmentShare);
  const controlUsers = Math.ceil(totalSample * controlShare);
  const durationDays = totalSample / dailyTraffic;

  return {
    baselineRaw,
    uplift: uplift * 100,
    targetValue,
    totalSample,
    treatmentUsers,
    controlUsers,
    durationDays,
    alpha,
    power,
    guardrails: getCheckedGuardrails(),
    treatmentShare
  };
}

function runDesignCalculation() {
  const metric = getSelectedMetric();
  const result = calculateSampleSize(metric);

  if (!result) {
    els.resultsGrid.innerHTML = `
      <div class="result-card"><h3>Status</h3><div class="value negative">Incomplete</div><p>Enter valid assumptions to generate a plan.</p></div>
    `;
    els.analysisNote.textContent = 'Use positive values for baseline, uplift, daily traffic, and standard deviation where relevant.';
    return;
  }

  els.resultsGrid.innerHTML = [
    {
      title: 'Recommended total sample',
      value: formatNumber(result.totalSample),
      note: 'Total visitors or users required for the test.'
    },
    {
      title: 'Control group size',
      value: formatNumber(result.controlUsers),
      note: `Based on ${(100 - result.treatmentShare * 100).toFixed(0)}% control allocation.`
    },
    {
      title: 'Treatment group size',
      value: formatNumber(result.treatmentUsers),
      note: `Based on ${(result.treatmentShare * 100).toFixed(0)}% treatment allocation.`
    },
    {
      title: 'Estimated duration',
      value: `${result.durationDays.toFixed(1)} days`,
      note: 'Assumes the listed daily eligible traffic stays steady.'
    },
    {
      title: 'Baseline metric',
      value: formatMetricValue(metric, result.baselineRaw),
      note: 'Your current performance assumption before the test.'
    },
    {
      title: 'Target detectible value',
      value: formatMetricValue(metric, result.targetValue),
      note: `Equivalent to a ${result.uplift.toFixed(1)}% relative change.`
    },
    {
      title: 'Significance threshold',
      value: `${result.alpha.toFixed(2)} alpha`,
      note: 'Two-sided significance threshold used in planning.'
    },
    {
      title: 'Statistical power',
      value: `${(result.power * 100).toFixed(0)}%`,
      note: 'Probability of detecting the planned effect if it is real.'
    }
  ]
    .map(
      (card) => `
        <div class="result-card">
          <h3>${card.title}</h3>
          <div class="value">${card.value}</div>
          <p>${card.note}</p>
        </div>
      `
    )
    .join('');

  const guardrailText = result.guardrails.length ? result.guardrails.join(', ') : 'No guardrails selected';
  els.analysisNote.innerHTML = `
    For <strong>${metric.name}</strong>, the simulator recommends running until roughly <strong>${formatNumber(result.totalSample)}</strong>
    total users are observed. With your current traffic assumption, that is about <strong>${result.durationDays.toFixed(1)} days</strong>.
    Guardrails to watch during the run: <strong>${guardrailText}</strong>. This is a directional planning estimate,
    so revisit it if traffic quality, variance, or allocation meaningfully changes.
  `;
}

function calculateObservedResult(metric) {
  const nControl = Number(els.controlUsersInput.value);
  const nTreatment = Number(els.treatmentUsersInput.value);
  const controlMetric = Number(els.controlMetricInput.value);
  const treatmentMetric = Number(els.treatmentMetricInput.value);
  const alpha = Number(els.alphaInput.value);

  if (nControl <= 0 || nTreatment <= 0) return null;

  if (metric.type === 'rate') {
    if (controlMetric < 0 || treatmentMetric < 0 || controlMetric > nControl || treatmentMetric > nTreatment) {
      return null;
    }

    const pControl = controlMetric / nControl;
    const pTreatment = treatmentMetric / nTreatment;
    const pooled = (controlMetric + treatmentMetric) / (nControl + nTreatment);
    const se = Math.sqrt(pooled * (1 - pooled) * (1 / nControl + 1 / nTreatment));
    const z = se === 0 ? 0 : (pTreatment - pControl) / se;
    const pValue = 2 * (1 - normalCDF(Math.abs(z)));
    const absLiftPctPoints = (pTreatment - pControl) * 100;
    const relLift = pControl === 0 ? 0 : ((pTreatment - pControl) / pControl) * 100;

    return {
      controlValue: pControl * 100,
      treatmentValue: pTreatment * 100,
      absLift: absLiftPctPoints,
      relLift,
      z,
      pValue,
      significant: pValue < alpha,
      threshold: alpha
    };
  }

  const controlStdDev = Number(els.controlStdDevInput.value);
  const treatmentStdDev = Number(els.treatmentStdDevInput.value);
  if (controlStdDev <= 0 || treatmentStdDev <= 0) return null;

  const se = Math.sqrt(Math.pow(controlStdDev, 2) / nControl + Math.pow(treatmentStdDev, 2) / nTreatment);
  const z = se === 0 ? 0 : (treatmentMetric - controlMetric) / se;
  const pValue = 2 * (1 - normalCDF(Math.abs(z)));
  const absLift = treatmentMetric - controlMetric;
  const relLift = controlMetric === 0 ? 0 : (absLift / controlMetric) * 100;

  return {
    controlValue: controlMetric,
    treatmentValue: treatmentMetric,
    absLift,
    relLift,
    z,
    pValue,
    significant: pValue < alpha,
    threshold: alpha
  };
}

function runObservedCalculation() {
  const metric = getSelectedMetric();
  const result = calculateObservedResult(metric);

  if (!result) {
    els.observedResults.innerHTML = `
      <div class="observed-card"><h3>Status</h3><div class="value negative">Invalid</div><p>Please enter valid observed results for both groups.</p></div>
    `;
    return;
  }

  const significanceClass = result.significant ? 'positive' : 'negative';
  const significanceText = result.significant ? 'Statistically significant' : 'Not statistically significant';

  els.observedResults.innerHTML = [
    {
      title: 'Control observed value',
      value: formatMetricValue(metric, result.controlValue),
      note: 'Observed performance in the control group.'
    },
    {
      title: 'Treatment observed value',
      value: formatMetricValue(metric, result.treatmentValue),
      note: 'Observed performance in the treatment group.'
    },
    {
      title: 'Absolute lift',
      value: metric.type === 'rate' ? `${result.absLift.toFixed(2)} pp` : formatMetricValue(metric, result.absLift),
      note: 'Difference between treatment and control.'
    },
    {
      title: 'Relative lift',
      value: `${result.relLift.toFixed(2)}%`,
      note: 'Lift relative to the control result.'
    },
    {
      title: 'Test statistic',
      value: result.z.toFixed(2),
      note: 'Z-score style directional significance check.'
    },
    {
      title: 'P-value',
      value: result.pValue.toFixed(4),
      note: 'Compared against the selected alpha threshold.'
    },
    {
      title: 'Decision',
      value: significanceText,
      note: `Alpha threshold: ${result.threshold.toFixed(2)}`,
      extraClass: significanceClass
    },
    {
      title: 'Interpretation',
      value: result.relLift >= 0 ? 'Treatment ahead' : 'Treatment behind',
      note: result.significant
        ? 'The observed difference is unlikely to be random at the selected alpha.'
        : 'The observed difference does not yet clear the selected significance bar.',
      extraClass: result.relLift >= 0 ? 'positive' : 'negative'
    }
  ]
    .map(
      (card) => `
        <div class="observed-card">
          <h3>${card.title}</h3>
          <div class="value ${card.extraClass || ''}">${card.value}</div>
          <p>${card.note}</p>
        </div>
      `
    )
    .join('');
}

els.loadDefaultsBtn.addEventListener('click', () => applyMetricDefaults(false));
els.calculateBtn.addEventListener('click', runDesignCalculation);
els.resetBtn.addEventListener('click', () => {
  els.alphaInput.value = '0.05';
  els.powerInput.value = '0.8';
  els.trafficInput.value = '25000';
  els.allocationInput.value = '50';
  applyMetricDefaults(false);
});
els.runObservedBtn.addEventListener('click', runObservedCalculation);

[
  els.baselineInput,
  els.upliftInput,
  els.alphaInput,
  els.powerInput,
  els.trafficInput,
  els.allocationInput,
  els.stdDevInput
].forEach((input) => input.addEventListener('input', runDesignCalculation));

[
  els.controlUsersInput,
  els.treatmentUsersInput,
  els.controlMetricInput,
  els.treatmentMetricInput,
  els.controlStdDevInput,
  els.treatmentStdDevInput,
  els.alphaInput
].forEach((input) => input.addEventListener('input', runObservedCalculation));

applyMetricDefaults(false);
