const { makeStore } = require('./store')
const { shallowEqual } = require('./utls')

function combine (stores, mapStateFn) {
  const _store = makeStore()
  const [_onStoreChange, _setStoreState, _getState] = _store

  const onChange = () => {
    const result = mapStateFn(
      ...stores.map(([_, __, getState]) => getState())
    )

    if (shallowEqual(result, _getState())) {
      return
    }

    _setStoreState(result)
  }

  const _setState = (state) => {
    stores.forEach(([, setState]) => setState(state))
  }

  onChange()
  stores.forEach(([fn], i) => fn(onChange, i))

  return [_onStoreChange, _setState, _getState, _store[3]]
}

exports.combine = combine
