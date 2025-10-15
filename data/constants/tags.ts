export const TAGS = {
  DOC: { DOCUMENTED: '@docs', NOT_DOCUMENTED: '@no_docs' },
  TYPE: { API: '@api', UI: '@ui' },
  PRIORITY: { CRITICAL: '@critical', HIGH: '@high', MEDIUM: '@medium' },
  EXECUTION: { SMOKE: '@smoke', REGRESSION: '@regression' },
  SPEED: { SLOW: '@slow' }
} as const
