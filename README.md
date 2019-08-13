The idea is to split your state into multible smaller stores instead of a large one.

# make-zustand

state management library

install `npm i make-zustand`

**basic example**
```javascript
const settingsStore = makeStore({
  name: '',
})

const [onSettingsChange, setSettingsState, getSettings] = settingsStore

onSettingsChange((settingsState) => {
  console.log(settingsState) // >> { name: 'joanna' }
})

setSettingsState({
  ...getSettings(),
  name: 'joanna'
})

```

**combine example**

```javascript
const settingsStore = makeStore({ name: '' })
const [onSettingsChange, setSettingsState, getSettings] = settingsStore

const todoStore = makeStore([])
const [onTodoChange, setTodoState, getTodo] = todoStore


const settingsTodoStores = combine([
  settingsStore,
  todoStore
], (settings, todo) => ({
  settings,
  todo
}))

const [onSettingsOrTodoChange] = settingsTodoStores

onSettingsOrTodoChange((settingsTodoMap) => {
  console.log(settingsTodoMap) // >> { settings: { name: 'joanna' }, todo: [] }
})

setSettingsState({
  ...getSettings(),
  name: 'joanna'
})

```


# make-zustand-react

react hook bindings for make-zustand

install `npm i make-zustand-react`

**example**
```javascript

import React from 'react'
import { makeStore } from 'make-zustand'
import { useStore } from 'make-zustand-react'

const settingsStore = makeStore({
  name: '',
})

const [, setSettingsState] = settingsStore

export function App() {
  const [settings] = useStore(settingsStore)

  return (
    <div>
      <p>{settings.name}</p>

      <input
        onChange={(e) =>
          setSettingsState({
            ...settings,
            name: e.target.value
          })
        }
      />
    </div>
  )
}

```
