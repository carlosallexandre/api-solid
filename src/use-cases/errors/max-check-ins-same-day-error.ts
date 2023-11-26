export class MaxCheckInsSameDayError extends Error {
  constructor() {
    super('Max check-ins on same day reached')
  }
}
