'use strict'

import * as chai from 'chai'
import chaiHttp = require('chai-http')
import 'mocha'
import app from '../../src/app'
import { OrderModel } from '../../src/schemas/order'

chai.use(chaiHttp)

const expect = chai.expect

describe('orderRoute', () => {
  const order = {
    userId: 20,
    quantity: 1,
    shipDate: new Date(),
    status: 'PLACED',
    complete: false,
  }

  let orderIdCreated
  let token

  before(async () => {
    expect(OrderModel.modelName).to.be.equal('Order')
    OrderModel.collection.drop()
  })

  it('should be able to login and get the token to be used on orders requests', async () => {
    const res = await chai
      .request(app)
      .get('/users/login?username=John&password=password')
    expect(res.status).to.be.equal(200)
    token = res.body.token
  })

  it('should respond with HTTP 404 status because there is no order', async () => {
    const res = await chai
      .request(app)
      .get(`/store/orders/000`)
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).to.be.equal(500)
  })

  it('should create a new user for Order tests and retrieve it back', async () => {
    const user = {
      username: 'OrderUser',
      firstName: 'Order',
      lastName: 'User',
      email: 'order@myemail.com',
      password: 'password',
      phone: '5555555',
      userStatus: 1,
    }
    const res = await chai
      .request(app)
      .post('/users')
      .set('Authorization', `Bearer ${token}`)
      .send(user)
    expect(res.status).to.be.equal(201)
    expect(res.body.username).to.be.equal(user.username)
    order.userId = res.body._id
  })

  it('should create a new order and retrieve it back', async () => {
    const res = await chai
      .request(app)
      .post(`/store/orders`)
      .set('Authorization', `Bearer ${token}`)
      .send(order)
    expect(res.status).to.be.equal(201)
    expect(res.body.userId).to.be.equal(order.userId)
    expect(res.body.complete).to.be.equal(false)
    orderIdCreated = res.body._id
  })
  it('should return the order created on the step before', async () => {
    const res = await chai
      .request(app)
      .get(`/store/orders/${orderIdCreated}`)
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).to.be.equal(200)
    expect(res.body._id).to.be.equal(orderIdCreated)
    expect(res.body.status).to.be.equal(order.status)
  })
  it('should return all orders so far', async () => {
    const res = await chai
      .request(app)
      .get(`/store/orders`)
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).to.be.equal(200)
    expect(res.body.length).to.be.equal(1)
  })
  it('should not return orders because offset is higher than the size of the orders array', async () => {
    const res = await chai
      .request(app)
      .get(`/store/orders?offset=2&limit=2`)
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).to.be.equal(200)
    expect(res.body.length).to.be.equal(0)
  })
  it('should return the inventory for all users', async () => {
    const res = await chai
      .request(app)
      .get(`/store/inventory?status=PLACED`)
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).to.be.equal(200)
    expect(res.body[order.userId].length).to.be.equal(1)
  })
  it('should remove an existing order', async () => {
    const res = await chai
      .request(app)
      .del(`/store/orders/${orderIdCreated}`)
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).to.be.equal(204)
  })
  it('should return 404 when it is trying to remove an order because the order does not exist', async () => {
    const res = await chai
      .request(app)
      .del(`/store/orders/${orderIdCreated}`)
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).to.be.equal(404)
  })
})
