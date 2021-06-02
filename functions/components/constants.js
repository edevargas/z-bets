const MATCH_STATUS = {
  PENDING: 'pending',
  STARTED: 'started',
  FINISHED: 'finished',
};

const BET_STATUS = {
  PENDING: 'pending',
  IN_PROGRESS: 'in-progress',
  WON: 'won',
  LOST: 'lost',
  PAID: 'paid',
  PENDING_PAYMENT: 'pending-payment',
};

const SLACK_WEBHOOK = 'https://hooks.slack.com/services/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';

module.exports = {
  MATCH_STATUS,
  BET_STATUS,
  SLACK_WEBHOOK,
};