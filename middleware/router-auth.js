import { getAdminAccess } from '~/endpoints/auth'

export default async function({ store, redirect, route }) {
  const { user } = store.getters
  if (!user) {
    if (requiresAuth(route)) {
      redirect('/login')
    }

    return
  }

  const adminAccess = await getAdminAccess(user.email)
  if (adminAccess) setAmin(store, user, adminAccess)

  if (route.name === 'login') {
    redirect('/')
    return
  }

  if(requiresAdmin(route)) {
    if (!adminAccess || !isAdmin(route, adminAccess)) {
      redirect('/')
    }

    return
  }
}

const requiresAuth = ({ meta }) => meta[0]?.requiresAuth

const requiresAdmin = ({ meta }) => meta[0]?.adminAccess

const setAmin = (store, user, adminAccess) => {
  store.commit('mutation', {
    key: 'user',
    value: { ...user, adminAccess },
  })
}

const isAdmin = (route, adminAccess) => {
  const routeAccess = requiresAdmin(route)
  const accessRegex = new RegExp(adminAccess)
  return routeAccess.match(accessRegex)
}