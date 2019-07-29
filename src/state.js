const { shallowEqual } = require('./utls')

function makeState (initialValue) {
  let _state = initialValue
  const onChangeCallbacks = []
  let _reducer

  const onChange = (fn) => {
    onChangeCallbacks.push(fn)
  }

  const setState = (object) => {
    let state = object
    if (typeof _reducer === 'function' &&
      typeof object === 'object' &&
      'type' in object && 'payload' in object) {
      state = _reducer(_state, state)
    }

    if (shallowEqual(state, _state)) {
      return
    }

    const oldState = _state
    _state = state

    onChangeCallbacks.forEach((fn) => fn(_state, oldState))
  }

  const registerReducer = (reducer) => {
    _reducer = reducer
  }

  const getState = () => _state

  const _structure = [
    onChange,
    setState,
    getState,
    { registerReducer }
  ]

  return _structure
}

exports.makeState = makeState
