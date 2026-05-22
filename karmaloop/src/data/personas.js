export const KL_PERSONAS = {
  priya: { id: 'priya', name: 'Priya Mehta', role: 'Product Manager', initials: 'PM', color: '#A78BFA', status: 'online', bio: '4 yrs · friendly, fast, slightly scattered. Hidden: ₹40L demo at 2pm.' },
  rajan: { id: 'rajan', name: 'Rajan Krishnamurthy', role: 'Senior Engineer', initials: 'RK', color: '#F59E0B', status: 'meeting', bio: 'Blunt. Knows the root cause but waits for you to ask the right question.' },
  kiran: { id: 'kiran', name: 'Kiran Patel', role: 'Junior Developer', initials: 'KP', color: '#10B981', status: 'online', bio: "6 months in. Pushed to main yesterday — hasn't told anyone." },
  client: { id: 'client', name: 'Vikram Sharma', role: 'PM · TechCorp (client)', initials: 'VS', color: '#EF4444', status: 'offline', bio: 'Anxious. Campaign live at 2pm. Will escalate by 1:30 if silent.', hidden: true },
};

export const KL_CHANNELS = ['priya', 'rajan', 'kiran', 'client'];

export const KL_TICKETS = [
  { id: 'KT-118', priority: 'P0', title: 'Fix checkout API timeout · Tier-2 cities', status: 'Triaging', assignee: 'me', onFire: true, description: 'Checkout requests timing out for users in Tier 2 cities. Reported overnight by Bhopal & Bhubaneswar merchants. Stack: payment-service → external processor. Reproducible at 6+ req/s. Suspected: API call to payment processor.' },
  { id: 'KT-119', priority: 'P1', title: 'Add coupon code field to checkout UI', status: 'In Progress', assignee: 'me', onFire: false, description: "Marketing campaign launches tomorrow. Originally spec'd for flat discount only. Spec may shift mid-sprint." },
  { id: 'KT-120', priority: 'P2', title: 'Write unit tests for payment module', status: 'In Progress', assignee: 'me', onFire: false, description: 'Tech debt cleanup. Can wait if other work fires.' },
  { id: 'KT-115', priority: 'P1', title: 'Refactor user auth middleware', status: 'In Progress', assignee: 'kiran', onFire: false, description: "Kiran's PR. DO NOT touch this — Rajan flagged it mid-refactor." },
  { id: 'KT-117', priority: 'P1', title: 'Integrate Razorpay v2 SDK', status: 'Triaging', assignee: 'kiran', onFire: false, description: 'Waiting on API keys from ops. Kiran is stuck and asking around.' },
];

export const KL_PERSONA_HINT = {
  priya: 'Friendly · changes scope often',
  rajan: 'Senior · in meetings most of today',
  kiran: 'Junior · seems anxious',
  client: 'Client · campaign live 2pm',
};

export const KL_SCRIPT_START_TIME = '16:47';
