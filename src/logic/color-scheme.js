export const POSSIBLE_SCHEMES = {
  light: 'light',
  dark: 'dark'
}

// this function set the colorScheme
export function setUpColorScheme () {
  // if localStorage doesn't contain color Scheme, it is obtained from prefers-color-scheme of OS
  if (!window.localStorage.getItem('color-scheme')) {
    const colorScheme = window.matchMedia('(prefers-color-scheme: light)').matches
      ? POSSIBLE_SCHEMES.light
      : POSSIBLE_SCHEMES.dark
    window.localStorage.setItem('color-scheme', colorScheme)
  }
  // set color-scheme at <body> with the value on localStorage
  document.body.setAttribute('color-scheme', window.localStorage.getItem('color-scheme'))
}

export function toggleColorScheme () {
  // newScheme can be null if body doesn't have the attribute 'color-scheme'
  const newScheme = document.body.getAttribute('color-scheme') === POSSIBLE_SCHEMES.light
    ? POSSIBLE_SCHEMES.dark
    : POSSIBLE_SCHEMES.light
  document.body.setAttribute('color-scheme', newScheme)
  window.localStorage.setItem('color-scheme', newScheme)
  return newScheme
}
