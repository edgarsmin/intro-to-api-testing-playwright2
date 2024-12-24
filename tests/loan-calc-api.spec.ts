import { test, expect } from '@playwright/test'
import { LoanRequestFactory } from './dto/loan-request-dto'

test.describe('/api/loan-calc/decision API Tests', () => {
  const baseURL = 'https://backend.tallinn-learning.ee/api/loan-calc/decision'

  test('should return 200 and valid response for a valid request', async ({ request }) => {
    const requestBody = LoanRequestFactory.createValidRequest()

    const response = await request.post(baseURL, {
      data: requestBody,
    })

    expect(response.status()).toBe(200)

    const responseBody = await response.json()
    console.log('Response body:', responseBody)

    expect.soft(responseBody).toHaveProperty('riskScore')
    expect.soft(responseBody.riskScore).toBeGreaterThanOrEqual(0)

    expect.soft(responseBody).toHaveProperty('riskLevel')

    expect.soft(responseBody).toHaveProperty('riskPeriods')
    expect.soft(Array.isArray(responseBody.riskPeriods)).toBe(true)

    expect.soft(responseBody).toHaveProperty('applicationId')
    expect.soft(responseBody.applicationId).toBeTruthy()

    expect.soft(responseBody).toHaveProperty('riskDecision')
    expect.soft(responseBody.riskDecision).toBeTruthy()
  })

  test('should return 400 for an invalid request', async ({ request }) => {
    const requestBody = LoanRequestFactory.createInvalidRequest()

    const response = await request.post(baseURL, {
      data: requestBody,
    })

    expect(response.status()).toBe(400)

    const contentType = response.headers()['content-type']
    if (contentType && contentType.includes('application/json')) {
      const responseBody = await response.json()
      console.log('Parsed response body:', responseBody)

      expect.soft(responseBody).toHaveProperty('error')
      expect.soft(responseBody.error).toBeTruthy()
    } else {
      console.warn('Response body is empty or not JSON.')
      const responseBodyRaw = await response.text()
      console.log('Raw response body:', responseBodyRaw)
    }
  })
})
