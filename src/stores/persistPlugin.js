export function persistPlugin({ store, options }) {
  if (!options.persist) return

  const storageKey = `blog-${store.$id}`
  const paths = options.persist.paths

  const savedState = localStorage.getItem(storageKey)
  if (savedState) {
    store.$patch(JSON.parse(savedState))
  }

  store.$subscribe((mutation, state) => {
    let toSave = state

    if (paths) {
      toSave = {}
      paths.forEach(path => {
        toSave[path] = state[path]
      })
    }

    localStorage.setItem(storageKey, JSON.stringify(toSave))
  })
}
