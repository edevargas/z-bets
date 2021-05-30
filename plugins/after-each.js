export default async({ app }) => {
  app.router.afterEach((to, from) => window?.$nuxt?.$emit('close-nav'))
}