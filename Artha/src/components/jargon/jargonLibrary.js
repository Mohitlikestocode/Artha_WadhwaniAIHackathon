export const jargonLibrary = {
  standup: {
    term: 'Standup',
    definition: 'A short daily team meeting (usually 15 minutes) where everyone shares what they did yesterday, what they\'re doing today, and any blockers.',
    example: '"We have standup at 10am — be ready to share your update in 60 seconds."',
    category: 'workplace',
  },
  P0: {
    term: 'P0 (Priority Zero)',
    definition: 'The highest severity level for a bug or incident. A P0 means the system is down or critically broken and needs immediate attention — everything else stops.',
    example: '"The payment service is throwing 500s — this is a P0. Drop everything."',
    category: 'technical',
  },
  sprint: {
    term: 'Sprint',
    definition: 'A fixed time period (usually 2 weeks) in which a team commits to completing a set of tasks. At the end, you demo what you built.',
    example: '"We\'re in Sprint 14 right now. KT-118 needs to be resolved before sprint closes."',
    category: 'process',
  },
  stakeholder: {
    term: 'Stakeholder',
    definition: 'Anyone who has an interest in your project — this includes your team, manager, clients, and even end users. Managing their expectations is a core job skill.',
    example: '"The client is a key stakeholder. Priya is managing stakeholder communication right now."',
    category: 'business',
  },
  ETA: {
    term: 'ETA (Estimated Time of Arrival)',
    definition: 'How long until something will be done. Giving an ETA — even a rough one — is far better than silence when people are waiting.',
    example: '"What\'s your ETA on the fix? I need to tell the client something."',
    category: 'workplace',
  },
  escalate: {
    term: 'Escalate',
    definition: 'To bring a problem to a higher authority when you\'re stuck, it\'s urgent, or it\'s beyond your decision-making power. Escalating early is a sign of maturity, not weakness.',
    example: '"If we can\'t fix this in 20 minutes, Priya will escalate to the VP of Engineering."',
    category: 'workplace',
  },
  'scope creep': {
    term: 'Scope Creep',
    definition: 'When a project gradually expands beyond its original boundaries, usually because of unplanned additions. It slows teams down and is a leading cause of missed deadlines.',
    example: '"Adding a dashboard wasn\'t in the spec — that\'s scope creep. We need to push it to the next sprint."',
    category: 'business',
  },
  blocker: {
    term: 'Blocker',
    definition: 'Something that stops you from making progress on a task. You\'re expected to surface blockers in standup so your team can help remove them.',
    example: '"I can\'t push the fix — I don\'t have prod access. That\'s my blocker."',
    category: 'process',
  },
  RACI: {
    term: 'RACI',
    definition: 'A framework that defines who is Responsible, Accountable, Consulted, and Informed for a task. Used to avoid confusion about who owns what.',
    example: '"According to the RACI, you\'re responsible for the fix, and Priya is accountable to the client."',
    category: 'process',
  },
  'pull request': {
    term: 'Pull Request (PR)',
    definition: 'A request to merge your code changes into the main codebase. It goes through a review process where teammates check for bugs and quality issues before it\'s accepted.',
    example: '"Your fix looks good. Raise a PR and tag Rajan as reviewer."',
    category: 'technical',
  },
  PR: {
    term: 'PR (Pull Request)',
    definition: 'Short for Pull Request — a request to merge your code into the main codebase. Reviewers check it before it\'s accepted.',
    example: '"Raise a PR and tag Rajan as reviewer."',
    category: 'technical',
  },
  'technical debt': {
    term: 'Technical Debt',
    definition: 'Code that works but was written quickly or poorly, creating future problems. Like financial debt, it accumulates interest — ignored tech debt eventually slows everything down.',
    example: '"We took a shortcut here last quarter. That technical debt is probably contributing to this bug."',
    category: 'technical',
  },
  prod: {
    term: 'Production (Prod)',
    definition: 'The live environment where real users interact with your product. Mistakes in prod have immediate, real consequences — unlike staging or dev.',
    example: '"Do NOT test this in prod. Use staging first."',
    category: 'technical',
  },
  production: {
    term: 'Production',
    definition: 'The live environment where real users interact with your product. Issues in production directly affect users and business revenue.',
    example: '"The payment service is failing in production — 12% of checkout requests are hitting errors."',
    category: 'technical',
  },
  staging: {
    term: 'Staging',
    definition: 'A test environment that mirrors production. You deploy here first to catch bugs before they reach real users.',
    example: '"Test the fix on staging. If it looks good, we\'ll push to prod."',
    category: 'technical',
  },
  'status update': {
    term: 'Status Update',
    definition: 'A brief communication to your team or stakeholders about where things stand. Proactive status updates build trust — waiting to be asked is a red flag.',
    example: '"Even a quick \'still investigating\' message is better than silence when a P0 is active."',
    category: 'workplace',
  },
  ETA: {
    term: 'ETA',
    definition: 'Estimated Time of Arrival — when you expect something to be done. Always give an ETA when asked, even if it\'s rough.',
    example: '"What\'s your ETA? I need to set expectations with the client."',
    category: 'workplace',
  },
}

export const getJargonTerms = () => Object.keys(jargonLibrary)

export const findJargonInText = (text) => {
  const terms = getJargonTerms()
  const found = []
  const lowerText = text.toLowerCase()

  for (const term of terms) {
    const lowerTerm = term.toLowerCase()
    if (lowerText.includes(lowerTerm)) {
      found.push({ term, data: jargonLibrary[term] })
    }
  }
  return found
}
