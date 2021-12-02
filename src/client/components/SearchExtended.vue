<template>
  <form @submit.prevent="submit" class="c-search-extended">
    <div class="c-search-extended__row c-search-extended__primary">
      <p>Allgemein</p>
      <div>
        <div class="c-search-extended__title">
          <label for="title">Filmtitel (deutsch oder original)</label>
          <div>
            <input id="title" v-model="title" type="text" />
            <button @click="title = null" type="button">❌</button>
          </div>
        </div>
        <div>
          <label for="fsk">FSK</label>
          <div>
            <select id="fsk" v-model="fsk">
              <option value="0">0</option>
              <option value="6">6</option>
              <option value="12">12</option>
              <option value="16">16</option>
              <option value="18">18</option>
            </select>
            <button @click="fsk = null" type="button">❌</button>
          </div>
        </div>
        <!-- @todo create genre table in db and request all available genres for select here -->
        <div class="c-search-extended__genre">
          <label for="genre">Genre</label>
          <div>
            <select id="genre" v-model="genre">
              <option value="horror">Horror</option>
            </select>
            <button @click="genre = null" type="button">❌</button>
          </div>
        </div>
        <div class="c-search-extended__mm">
          <span>MindestMovie</span>
          <div>
            <label for="mm-true">Ja</label>
            <input
              id="mm-true"
              v-model="mm"
              type="radio"
              name="mm"
              :value="true"
            />
            <label for="mm-false">Nein</label>
            <input
              id="mm-false"
              v-model="mm"
              type="radio"
              name="mm"
              :value="false"
            />
            <button @click="mm = null" type="button">❌</button>
          </div>
        </div>
      </div>
    </div>

    <div class="c-search-extended__row c-search-extended__rating">
      <p>Rating</p>
      <div>
        <div>
          <label for="rating-total">Gesamt</label>
          <StyledVueSlider
            id="rating-total"
            v-model="ratingTotal"
            :interval="25"
            :max="1000"
            :marks="STATIC.ratingMarks"
            :tooltip-formatter="STATIC.ratingTooltips"
            class="c-search-extended__slider"
          />
        </div>
        <div :class="[!includeIndividualRatings && 'hidden']">
          <label for="rating-ch">CH</label>
          <StyledVueSlider
            id="rating-ch"
            v-model="ratingCH"
            :interval="50"
            :max="1000"
            :marks="STATIC.ratingMarks"
            :tooltip-formatter="STATIC.ratingTooltips"
            :disabled="!includeIndividualRatings"
            class="c-search-extended__slider"
          />
        </div>
        <div :class="[!includeIndividualRatings && 'hidden']">
          <label for="rating-rt">RT</label>
          <StyledVueSlider
            id="rating-rt"
            v-model="ratingRT"
            :interval="50"
            :max="1000"
            :marks="STATIC.ratingMarks"
            :tooltip-formatter="STATIC.ratingTooltips"
            :disabled="!includeIndividualRatings"
            class="c-search-extended__slider"
          />
        </div>
        <div>
          <button
            @click="includeIndividualRatings = !includeIndividualRatings"
            type="button"
          >
            {{
              `Individuelle Ratings ${
                includeIndividualRatings ? "de" : ""
              }aktivieren`
            }}
          </button>
        </div>
      </div>
    </div>

    <div class="c-search-extended__row">
      <p>Gesehen (Datum)</p>
      <div>
        <label for="seen-min">von</label>
        <input
          id="seen-min"
          v-model="dateSeen[0]"
          type="date"
          min="2016-01-01"
          :max="STATIC.now.toLocaleDateString('en-ca')"
        />
        <label for="seen-max">bis</label>
        <input
          id="seen-max"
          v-model="dateSeen[1]"
          type="date"
          min="2016-01-01"
          :max="STATIC.now.toLocaleDateString('en-ca')"
        />
      </div>
    </div>

    <div class="c-search-extended__row">
      <p>Erschienen (Jahr)</p>
      <div>
        <label for="released-min">von</label>
        <input
          id="released-min"
          v-model="yearReleased[0]"
          type="number"
          min="1900"
          :max="STATIC.now.getUTCFullYear()"
        />
        <label for="released-max">bis</label>
        <input
          id="released-max"
          v-model="yearReleased[1]"
          type="number"
          min="1900"
          :max="STATIC.now.getUTCFullYear()"
        />
      </div>
    </div>

    <div class="c-search-extended__row">
      <p>Laufzeit (Minuten)</p>
      <div>
        <label for="runtime-min">von</label>
        <input
          id="runtime-min"
          v-model="runtime[0]"
          type="number"
          min="0"
          max="500"
        />
        <label for="runtime-max">bis</label>
        <input
          id="runtime-max"
          v-model="runtime[1]"
          type="number"
          min="0"
          max="500"
        />
      </div>
    </div>

    <div class="c-search-extended__row">
      <label for="sort">Sortieren</label>
      <div>
        <select id="sort" v-model="sortParam">
          <option value="title.german">Titel (deutsch)</option>
          <option value="title.original">Titel (original)</option>
          <option value="rating.total">Rating Gesamt</option>
          <option value="rating.ch">Rating CH</option>
          <option value="rating.rt">Rating RT</option>
          <option value="dateSeen">Gesehen</option>
          <option value="releaseDate">Erscheinungsjahr</option>
          <option value="fsk">FSK</option>
          <option value="mm">MM</option>
          <option value="runtime">Laufzeit</option>
        </select>
        <label for="sort-asc">aufsteigend</label>
        <input
          id="sort-asc"
          v-model="sortOrder"
          type="radio"
          name="sort"
          value="ASC"
        />
        <label for="sort-des">absteigend</label>
        <input
          id="sort-des"
          v-model="sortOrder"
          type="radio"
          name="sort"
          value="DES"
        />
      </div>
    </div>

    <div class="c-search-extended__row">
      <button type="submit">Suchen</button>
    </div>
  </form>
</template>

<script lang="ts">
import Vue from "vue"

const STATIC = {
  ratingMarks: (val: number) => val % 100 === 0 && { label: val / 100 },
  ratingTooltips: (val: number) => (val / 100).toFixed(2),
  now: new Date(),
}

export default Vue.extend({
  data () {
    return {
      title: this.$route.query.title || null,
      ratingTotal: [
        this.$route.query.rating_total_min || 0,
        this.$route.query.rating_total_max || 1000,
      ],
      ratingCH: [
        this.$route.query.rating_ch_min || 0,
        this.$route.query.rating_ch_max || 1000,
      ] as null[] | number[],
      ratingRT: [
        this.$route.query.rating_rt_min || 0,
        this.$route.query.rating_rt_max || 1000,
      ] as null[] | number[],
      includeIndividualRatings: [
        this.$route.query.rating_ch_min,
        this.$route.query.rating_ch_max,
        this.$route.query.rating_rt_min,
        this.$route.query.rating_rt_max,
      ].some((v) => typeof v === "number"),
      dateSeen: [
        this.$route.query.date_seen_min || null,
        this.$route.query.date_seen_max || null,
      ],
      yearReleased: [
        this.$route.query.date_released_min || null,
        this.$route.query.date_released_max || null,
      ],
      genre: this.$route.query.genre || null,
      fsk: this.$route.query.fsk || null,
      mm: this.$route.query.mm || null,
      runtime: [
        this.$route.query.runtime_min || null,
        this.$route.query.runtime_max || null,
      ],
      sortParam:
        this.$route.query.sort?.indexOf("-") === 0
          ? this.$route.query.sort.slice(1)
          : this.$route.query.sort || "title.german",
      sortOrder: "ASC",
      STATIC,
    }
  },

  computed: {
    sort (): string | null {
      return (
        this.sortParam &&
        `${this.sortOrder === "DES" ? "-" : ""}${this.sortParam}`
      )
    },
  },

  methods: {
    submit () {
      const QUERY_PARAM_MAP = {
        title: "title",
        ratingTotal: ["rating_total_min", "rating_total_max"],
        ...(this.includeIndividualRatings && {
          ratingCH: ["rating_ch_min", "rating_ch_max"],
          ratingRT: ["rating_rt_min", "rating_rt_max"],
        }),
        dateSeen: ["date_seen_min", "date_seen_max"],
        fsk: "fsk",
        mm: "mm",
        genre: "genre",
        yearReleased: ["date_released_min", "date_released_max"],
        runtime: ["runtime_min", "runtime_max"],
        sort: "sort",
      }

      const requestObject = Object.entries({
        ...this.$data,
        sort: this.sort,
      }).reduce(
        (requestObject, [dataName, dataValue]) => ({
          ...requestObject,
          ...(dataName in QUERY_PARAM_MAP &&
            dataValue !== null &&
            (Array.isArray(
              QUERY_PARAM_MAP[dataName as keyof typeof QUERY_PARAM_MAP]
            )
              ? {
                  ...(dataValue[0] !== null && {
                    [QUERY_PARAM_MAP[
                      dataName as keyof typeof QUERY_PARAM_MAP
                    ]![0]]: dataValue[0],
                  }),
                  ...(dataValue[1] !== null && {
                    [QUERY_PARAM_MAP[
                      dataName as keyof typeof QUERY_PARAM_MAP
                    ]![1]]: dataValue[1],
                  }),
                }
              : { ...(dataValue && { [dataName]: dataValue }) })),
        }),
        {}
      )

      console.log(requestObject, this.$data.sort)

      this.$router.push({ name: "search", query: requestObject })
    },
  },
})
</script>
