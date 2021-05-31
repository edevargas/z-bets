<template>
  <main class="container is-max-desktop">
    <h1 class="title is-1 mt-4">
      <img src="~/assets/svg/qa.svg" alt="" class="title-image" />
      {{ $t("faq_title") }}
    </h1>

    <table class="table is-striped is-fullwidth vivify fadeIn">
      <tbody>
        <tr v-for="(item, index) in items" :key="index">
          <td class="is-size-5">
            <p class="has-text-info">{{ item.question }}</p>
            <p>{{ item.answer }}</p>
          </td>
        </tr>
      </tbody>
    </table>
  </main>
</template>

<script>
/* eslint-disable max-len */
export default {
  name: 'FAQ',
  data() {
    return {
      items: [
        {
          question: '¿Cómo se realiza el pago de la apuesta?',
          answer:
            'Al momento de realizar una apuesta, el participante acepta y autoriza a Zemoga SAS a realizar un descuento en la siguiente nómina, por el valor acordado para la apuesta',
        },
        {
          question: '¿Existe un canal en slack para las notificaciones?',
          answer: 'Si, el canal #z-bets',
        },
        {
          question: '¿Es posible realizar varias apuestas?',
          answer: 'Si, cada usuario puede realizar cuántas apuestas desee',
        },
        {
          question: '¿Puedo editar mi apuesta?',
          answer:
            'Si. Es posible editar tu apuesta ANTES DEL INICIO del partido. La opción la encontrarás en el menú "Mis apuestas"',
        },
        {
          question: '¿Puedo borrar mi apuesta?',
          answer:
            'Si. Es posible borrar tu apuesta ANTES DEL INICIO del partido. La opción la encontrarás en el menú "Mis apuestas"',
        },
        {
          question: '¿Qué sucede cuando inicia el partido?',
          answer:
            'Una vez iniciado el partido, las apuestas se cerrarán sin derecho a modificar o borrar alguna. Cada apuesta registrada entrará a participar y será sujeto de descuento en la siguiente nómina',
        },
        {
          question: '¿Qué sucede si nadie gana la apuesta en un partido?',
          answer: 'El monto será acumulado para el siguiente partido',
        },
      ],
    }
  },
}
</script>
