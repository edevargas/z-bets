export async function logIn() {
  const provider = new $nuxt.$fireModule.auth.GoogleAuthProvider()
  
  await $nuxt.$fire.auth.signInWithPopup(provider)
    .then((result) => {
      const { additionalUserInfo: { isNewUser, profile } } = result
      if (isNewUser) {
        const welcome = $nuxt.$t('welcome')
        const notification = { type: 'info', body: `${profile.given_name}, ${welcome}` }
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
      const notification = { type: 'info', body: $nuxt.$t('sign_out_successful') }
      $nuxt.$emit('show-notification', notification)
      $nuxt.$router.push('/')
    })
    .catch(({ message: body }) => {
      const notification = { type: 'error', body }
      $nuxt.$emit('show-notification', notification)
    })
}