const { useState, useEffect } = require('react')

function useStore (store) {
  const [onChange, setStoreState, getState] = store
  const [state, setState] = useState(getState())

  useEffect(() => {
    onChange((value) => {
      setState(value)
    })
  }, [])

  return [state, setStoreState]
}

exports.useStore = useStore
