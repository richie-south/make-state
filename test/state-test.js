/* eslint-env mocha */
/* eslint-disable no-unused-expressions */
const chai = require('chai')
const expect = chai.expect

const { makeState } = require('../src/state')

describe('state.js', () => {
  it('get state', () => {
    const [,, getState] = makeState(true)

    expect(getState()).to.be.true
  })

  it('set state', () => {
    const [, setState, getState] = makeState(true)

    setState(false)

    expect(getState()).to.be.false
  })

  it('on change', (done) => {
    const [onChange, setState, getState] = makeState(true)

    onChange((updatedState) => {
      expect(updatedState).to.be.false
      expect(getState()).to.be.false
      done()
    })

    setState(false)
  })

  it('should not call onChange if setState is equal to state', (done) => {
    const [onChange, setState] = makeState(true)

    onChange(() => {
      throw new Error('should not run this function')
    })

    setState(true)

    setTimeout(() => {
      done()
    }, 60)
  })

  it('register reducer', (done) => {
    const [, setState, , { registerReducer }] = makeState(true)

    registerReducer((state, action) => {
      expect(state).to.be.true
      expect(action).to.be.eql({ type: 'update', payload: false })

      done()
    })

    setState({
      type: 'update',
      payload: false
    })
  })

  it('reducer updates state', (done) => {
    const [onChange, setState, getState, { registerReducer }] = makeState(true)

    registerReducer((state, action) => {
      expect(state).to.be.true
      expect(action).to.be.eql({ type: 'update', payload: false })
      return action.payload
    })

    onChange((value) => {
      expect(value).to.be.false
      expect(getState()).to.be.false

      done()
    })

    setState({
      type: 'update',
      payload: false
    })
  })
})
