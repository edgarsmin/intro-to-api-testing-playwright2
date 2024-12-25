import { expect, test } from '@playwright/test'
import { ApiClient } from './api-client'

test.describe('Tests with an api client', () => {
  test('login and create order with api client', async ({ request }) => {
    const apiClient = await ApiClient.getInstance(request)
    const orderId = await apiClient.createOrderAndReturnOrderId()
    console.log('orderId:', orderId)
  })
  test('login and get order by id', async ({ request }) => {
    const apiClient = await ApiClient.getInstance(request)
    const getOrderById = await apiClient.createOrderAndGetData()
    expect(getOrderById.status).toBe('OPEN')
  })
  test('delete order by id', async ({ request }) => {
    const apiClient = await ApiClient.getInstance(request)
    const deleteOrder = await apiClient.createOrderAndDelete()
    expect(deleteOrder.status()).toBe(200)
  })
})
