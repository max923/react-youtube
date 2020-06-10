const breakpoints = [768, 1200]

const mq = breakpoints.map(
  bp => `@media (max-width: ${bp}px)`
)
export default mq