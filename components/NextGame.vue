<template>
    <section class="hero is-medium is-success is-bold">
        <div class="hero-body">
            <div class="container">
                <h1 class="title has-text-centered">
                    Next Game
                </h1>
                <div class="wrap-teams">
                    <Team team="Colombia" />
                    <div class="has-text-centered">VS</div>
                    <Team team="Brasil" />
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'NextGame',
    components: {
        Team: () => import('~/components/Team'),
    }
}
</script>

<style scoped>
.wrap-teams {
  display: grid;
  grid-template-rows: 400px;
  grid-template-columns: 1fr 100px 1fr;
  column-gap: 1rem;
  align-items: center;
  justify-content: center;
}
</style>