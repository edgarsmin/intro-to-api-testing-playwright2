export interface LoanRequestDto {
  income: number
  debt: number
  age: number
  employed: boolean
  loanAmount: number
  loanPeriod: number
}

export class LoanRequestFactory {
  static createValidRequest(overrides: Partial<LoanRequestDto> = {}): LoanRequestDto {
    return {
      income: Math.floor(Math.random() * 5000) + 1000,
      debt: Math.floor(Math.random() * 1000),
      age: Math.floor(Math.random() * 50) + 18,
      employed: true,
      loanAmount: Math.floor(Math.random() * 50000) + 1000,
      loanPeriod: [12, 24, 36][Math.floor(Math.random() * 3)],
      ...overrides,
    }
  }

  static createInvalidRequest(overrides: Partial<LoanRequestDto> = {}): LoanRequestDto {
    return {
      income: -500,
      debt: -100,
      age: 15,
      employed: false,
      loanAmount: -1000,
      loanPeriod: 0,
      ...overrides,
    }
  }
}
