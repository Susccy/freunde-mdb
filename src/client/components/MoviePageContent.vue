<template>
  <transition :name="isModal ? 'fade' : ''" appear>
    <component
      :is="isModal ? 'div' : 'fragment'"
      ref="modalBackdrop"
      @click="closeModal"
      @keydown.esc="closeModal"
      class="g-modal-backdrop"
      tabindex="0"
    >
      <transition :name="isModal ? 'grow-fade' : ''" appear>
        <article
          v-if="!isModal || modalOpen"
          ref="modalContent"
          @click.stop
          class="c-movie"
          :class="[isModal && 'c-movie--modal']"
          tabindex="0"
        >
          <button
            v-if="isModal"
            @click="closeModal"
            class="c-movie--modal__close-btn"
          >
            X
          </button>

          <img :src="getPosterSrc(342)" :alt="imgAlt" class="area-poster" />

          <section class="area-title">
            <h1>{{ title }}</h1>
            <p>{{ movie.tagline }}</p>
          </section>

          <section class="area-meta">
            <h2>Allgemeine Daten</h2>
            <table>
              <tr>
                <th>Originaltitel</th>
                <td>{{ movie.title.original }}</td>
              </tr>
              <tr>
                <th>Genres</th>
                <td>{{ genres }}</td>
              </tr>
              <tr>
                <th>Erscheinungsdatum</th>
                <td>{{ formatDateDE(movie.releaseDate) }}</td>
              </tr>
              <tr>
                <th>FSK</th>
                <td>
                  <img
                    v-if="fskIcon"
                    :src="fskIcon"
                    :alt="`FSK ${movie.fsk}`"
                    style="height: 1rem"
                  />
                </td>
              </tr>
              <tr>
                <th>Laufzeit (min)</th>
                <td>{{ movie.runtime || "?" }}</td>
              </tr>
              <tr>
                <th>Budget</th>
                <td>
                  {{
                    movie.budget
                      ? new Intl.NumberFormat("de-DE", {
                          style: "currency",
                          currency: "USD",
                        }).format(movie.budget)
                      : "?"
                  }}
                </td>
              </tr>
              <tr>
                <th>Eingespielt</th>
                <td>
                  {{
                    movie.revenue
                      ? new Intl.NumberFormat("de-DE", {
                          style: "currency",
                          currency: "USD",
                        }).format(movie.revenue)
                      : "?"
                  }}
                </td>
              </tr>
              <tr>
                <th>MM</th>
                <td>{{ movie.mm ? "✔" : "✖" }}</td>
              </tr>
            </table>
          </section>

          <div class="area-main">
            <p>Gesehen: {{ dateSeen }}</p>
            <p>
              Rating:
              <span>
                {{ (rating.ch && `${rating.ch}ch`) || "nur Gesamt" }}
              </span>
              |
              <span>
                {{ rating.total }}
              </span>
              |
              <span>
                {{ (rating.rt && `${rating.rt}rt`) || "nur Gesamt" }}
              </span>
            </p>
          </div>

          <section class="area-overview">
            <h2>Zusammenfassung</h2>
            <p>{{ movie.overview || "keine Beschreibung vorhanden" }}</p>
          </section>
        </article>
      </transition>
    </component>
  </transition>
</template>

<script lang="ts">
import Vue from "vue"
import type { VueConstructor } from "vue"
import computedMovieData from "~/client/mixins/computedMovieData"

const MODAL_OPEN = "modal-open"

const Movie = (
  Vue as VueConstructor<Vue & InstanceType<typeof computedMovieData>>
).extend({
  mixins: [computedMovieData],

  props: {
    isModal: {
      type: Boolean,
      default: false,
    },
  },

  data () {
    return {
      modalOpen: false,
    }
  },

  mounted () {
    if (!this.isModal) return

    const { body } = document
    const { modalBackdrop } = this.$refs as {
      [k: string]: HTMLElement
    }

    // https://css-tricks.com/prevent-page-scrolling-when-a-modal-is-open/
    modalBackdrop.style.top = `${window.scrollY}px`
    body.style.top = `-${window.scrollY}px`
    body.classList.add(MODAL_OPEN)

    this.modalOpen = true
    modalBackdrop.focus()
  },

  methods: {
    async closeModal () {
      const { body } = document
      const scrollY = body.style.top

      body.style.top = ""
      body.classList.remove(MODAL_OPEN)
      window.scrollTo(0, parseInt(scrollY || "0") * -1)

      this.modalOpen = false

      await this.$nextTick()

      this.$emit("close")
    },
  },
})

export default Movie

export type MovieInstance = InstanceType<typeof Movie>
</script>
