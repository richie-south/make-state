/* eslint-env mocha */
/* eslint-disable no-unused-expressions */
const chai = require('chai')
const expect = chai.expect

const { makeState } = require('../src/state')
const { combine } = require('../src/combine')

describe('combine.js', () => {
  it('merge two stores', () => {
    const LoadingState = makeState(true)
    const DataState = makeState({ data: null })

    const [,, getState] = combine(
      [
        LoadingState,
        DataState
      ],
      (isLoading, data) => ({
        isLoading,
        ...data
      })
    )

    expect(getState()).to.eql({ isLoading: true, data: null })
  })

  it('on change is any store updates', (done) => {
    const LoadingState = makeState(true)
    const [, setLoading] = LoadingState
    const DataState = makeState({ data: null })

    const [onLoadingDataChanges,, getState] = combine(
      [
        LoadingState,
        DataState
      ],
      (isLoading, data) => ({
        isLoading,
        ...data
      })
    )

    onLoadingDataChanges((value) => {
      expect(getState()).to.eql({ isLoading: false, data: null })
      expect(value).to.eql({ isLoading: false, data: null })
      done()
    })

    setLoading(false)
  })

  it('merge with combined', (done) => {
    const LoadingState = makeState(true)
    const [, setLoading] = LoadingState
    const DataState = makeState({ data: null })

    const loadingData = combine(
      [
        LoadingState,
        DataState
      ],
      (isLoading, data) => ({
        isLoading,
        ...data
      }))

    const listState = makeState([])
    const [onChange, , getState] = combine(
      [
        loadingData,
        listState
      ],
      (loadingData, list) => ({
        profile: loadingData,
        list
      })
    )

    onChange((value) => {
      expect(getState()).to.eql({ profile: { isLoading: false, data: null }, list: [] })
      expect(value).to.eql({ profile: { isLoading: false, data: null }, list: [] })
      done()
    })

    setLoading(false)
  })
})
