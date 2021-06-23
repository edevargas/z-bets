<template>
  <main class="container is-max-desktop">
    <h1 class="title is-1 mt-4">
      <img src="~/assets/svg/qa.svg" alt="" class="title-image" />
      {{ $t("faq_title") }}
    </h1>

    <table class="table is-striped is-fullwidth vivify fadeIn mb-4">
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
          question: '¿Cómo se realiza la apuesta?',
          answer:
            'La mecánica de juego solo permitirá apostar por el marcador final dentro del tiempo reglamentario (No definiciones desde el punto penal). Solo se participará registrando el resultado (cantidad de goles por equipo)',
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
          answer: 'Si. Es posible editar tu apuesta ANTES DEL INICIO del partido. La opción la encontrarás en el menú "Mis apuestas"',
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
          question: '¿Qué sucede si varios participantes ganan en un mismo partido (mismo marcador)?',
          answer:
            'El monto total acumulado que está en juego para el partido correspondiente, será dividido en iguales proporciones entre el número de ganadores que hayan acertado al marcador',
        },
        {
          question: '¿Cuándo y cómo es el pago del premio al (los) ganador (es)?',
          answer:
            'Se realizará por medio de una transferencia el día viernes después del partido, a la tarjeta zafiro o a la cuenta correspondiente',
        },
        {
          question: '¿Qué sucede si nadie gana la apuesta en un partido?',
          answer: 'El monto acumulado NO se tendrá en cuenta para el siguiente partido y por ende tampoco se descontará de la nómina. Cada partido iniciará su acumulado en cero',
        },
      ],
    }
  },
}
</script>
