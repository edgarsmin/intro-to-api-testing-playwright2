
import { expect, test } from '@playwright/test'
import { LoginDto } from './dto/login-dto'
const serviceURL = 'https://backend.tallinn-learning.ee/'
const loginPath = 'login/student'

test.describe('Tallinn delivery API tests', () => {
  test('login with correct data', async ({ request }) => {
    const requestBody = LoginDto.createLoginWithCorrectData()
    const response = await request.post(`${serviceURL}${loginPath}`, {
      data: requestBody
    })

    expect(response.status()).toBe(200)
  })
  test('login with incorrect data', async ({ request }) => {
    const requestBody = LoginDto.createLoginWithIncorrectData()
    const response = await request.post(`${serviceURL}${loginPath}`, {
      data: requestBody
    })

    expect(response.status()).toBe(401)
  })
})