export class LateCheckInValidationError extends Error {
  constructor() {
    super('The check-in must be validate until 20minutes from its creation.')
  }
}
