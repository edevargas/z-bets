export default async function({ store, redirect, route }) {
  const { user } = store.getters

  if (requiresAuth(route)) {
    if (!user) {
      redirect('/') 
    }
  }
}

const requiresAuth = (route) => route.meta[0]?.requiresAuth