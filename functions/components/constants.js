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

// DEV: pyKzpfS3E8SxA3FRbGjr6T7n
// const SLACK_WEBHOOK = 'https://hooks.slack.com/services/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';
// PROD: 88PaHvJg4OG3N2WambzcN2yN
const SLACK_WEBHOOK = 'https://hooks.slack.com/services/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';

module.exports = {
  MATCH_STATUS,
  BET_STATUS,
  SLACK_WEBHOOK,
};