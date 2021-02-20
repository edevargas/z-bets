export async function login() {
  const provider = new $nuxt.$fireModule.auth.GoogleAuthProvider()
  
  await $nuxt.$fire.auth.signInWithPopup(provider)
    .then((result) => {
      const { additionalUserInfo: { isNewUser, profile } } = result
      if (isNewUser) {
        const notification = { type: 'info', body: `${profile.given_name}, welcome to Z-Bets` }
        $nuxt.$emit('show-notification', notification)
      }
    }).catch(({ message: body }) => {
      const notification = { type: 'error', body }
      $nuxt.$emit('show-notification', notification)
    })
}

export function logOut() {
  $nuxt.$fire.auth.signOut()
    .then(() => {
      const notification = { type: 'info', body: 'Sign-out successful' }
      $nuxt.$emit('show-notification', notification)
      $nuxt.$router.push('/')
    })
    .catch(({ message: body }) => {
      const notification = { type: 'error', body }
      $nuxt.$emit('show-notification', notification)
    })
}