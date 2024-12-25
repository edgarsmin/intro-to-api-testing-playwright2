import { test, expect } from '@playwright/test'
import { LoginDto } from '../dto/login-dto'
import { OrderDto } from '../dto/order-dto'
import { StatusCodes } from 'http-status-codes'

const serviceURL = 'https://backend.tallinn-learning.ee/'
const loginPath = 'login/student'
const orderPath = 'orders'

test.describe('Tests without api client', () => {
  test('Login and create order without api client', async ({ request }) => {
    const authResponse = await request.post(`${serviceURL}${loginPath}`, {
      data: LoginDto.createLoginWithCorrectData(),
    })
    const jwt = await authResponse.text()
    const orderResponse = await request.post(`${serviceURL}${orderPath}`, {
      data: OrderDto.createOrderWithRandomData(),
      headers: { Authorization: `Bearer ${jwt}` },
    })
    const orderData = await orderResponse.json()
    expect(orderResponse.status()).toBe(200)
    expect(orderData.status).toBe('OPEN')
  })
  test('login and get order by id without api client', async ({ request }) => {
    const authResponse = await request.post(`${serviceURL}${loginPath}`, {
      data: LoginDto.createLoginWithCorrectData(),
    })
    const jwt = await authResponse.text()
    const orderResponse = await request.post(`${serviceURL}${orderPath}`, {
      data: OrderDto.createOrderWithRandomData(),
      headers: { Authorization: `Bearer ${jwt}` },
    })
    expect(orderResponse.status()).toBe(StatusCodes.OK)
    const orderData = await orderResponse.json()
    const orderId = orderData.id
    const getOrderById = await request.get(`${serviceURL}${orderPath}/${orderId}`, {
      headers: { Authorization: `Bearer ${jwt}` },
    })
    const orderDataById = await getOrderById.json()
    expect(getOrderById.status()).toBe(StatusCodes.OK)
    expect(orderDataById.status).toBe('OPEN')
  })
  test('delete order without api client', async ({ request }) => {
    const authResponse = await request.post(`${serviceURL}${loginPath}`, {
      data: LoginDto.createLoginWithCorrectData(),
    })
    const jwt = await authResponse.text()
    const orderResponse = await request.post(`${serviceURL}${orderPath}`, {
      data: OrderDto.createOrderWithRandomData(),
      headers: { Authorization: `Bearer ${jwt}` },
    })
    expect(orderResponse.status()).toBe(StatusCodes.OK)
    const orderData = await orderResponse.json()
    const orderId = orderData.id
    const deleteOrderById = await request.delete(`${serviceURL}${orderPath}/${orderId}`, {
      headers: { Authorization: `Bearer ${jwt}` },
    })
    expect(deleteOrderById.status()).toBe(StatusCodes.OK)

    const getOrderById = await request.get(`${serviceURL}${orderPath}/${orderId}`, {
      headers: { Authorization: `Bearer ${jwt}` },
    })
    expect(getOrderById.status()).toBe(200)
  })
})
