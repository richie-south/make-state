const { useState, useEffect } = require('react')

function useStore (store) {
  const [onChange, , getState] = store
  const [state, setState] = useState(getState())

  useEffect(() => {
    onChange((value) => {
      setState(value)
    })
  }, [])

  return [state]
}

exports.useStore = useStore
