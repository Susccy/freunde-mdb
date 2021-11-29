<template>
  <form @submit.prevent="submit" class="c-search-extended">
    <div>
      <label for="title">Filmtitel (deutsch oder original)</label>
      <input id="title" v-model="title" type="text" />
    </div>

    <div>
      <label for="rating-total">Rating Gesamt</label>
      <VueSlider
        id="rating-total"
        v-model="ratingTotal"
        :interval="25"
        :max="1000"
        :marks="STATIC.ratingMarks"
        :tooltip-formatter="STATIC.ratingTooltips"
      />
    </div>

    <div style="display: flex; gap: 1rem">
      <div style="flex-grow: 1">
        <label for="rating-ch">Rating CH</label>
        <VueSlider
          id="rating-ch"
          v-model="ratingCH"
          :interval="50"
          :max="1000"
          :marks="STATIC.ratingMarks"
          :tooltip-formatter="STATIC.ratingTooltips"
          :disabled="chNull"
        />
      </div>
      <div>
        <label for="ch-null">null</label>
        <input id="ch-null" v-model="chNull" type="checkbox" />
      </div>
    </div>

    <div style="display: flex; gap: 1rem">
      <div style="flex-grow: 1">
        <label for="rating-rt">Rating RT</label>
        <VueSlider
          id="rating-rt"
          v-model="ratingRT"
          :interval="50"
          :max="1000"
          :marks="STATIC.ratingMarks"
          :tooltip-formatter="STATIC.ratingTooltips"
          :disabled="rtNull"
        />
      </div>
      <div>
        <label for="rt-null">null</label>
        <input id="rt-null" v-model="rtNull" type="checkbox" />
      </div>
    </div>

    <div>
      <label for="seen-min">Gesehen (von)</label>
      <input
        id="seen-min"
        v-model="dateSeen[0]"
        type="date"
        min="2016-01-01"
        :max="STATIC.now.toLocaleDateString('en-ca')"
      />
      <label for="seen-max">Gesehen (bis)</label>
      <input
        id="seen-max"
        v-model="dateSeen[1]"
        type="date"
        min="2016-01-01"
        :max="STATIC.now.toLocaleDateString('en-ca')"
      />
    </div>

    <div>
      <label for="released-min">Erscheinungsjahr (von)</label>
      <input
        id="released-min"
        v-model="yearReleased[0]"
        type="number"
        min="1900"
        :max="STATIC.now.getUTCFullYear()"
      />
      <label for="released-max">Erscheinungsjahr (bis)</label>
      <input
        id="released-max"
        v-model="yearReleased[1]"
        type="number"
        min="1900"
        :max="STATIC.now.getUTCFullYear()"
      />
    </div>

    <!-- @todo create genre table in db and request all available genres for select here -->
    <div>
      <label for="genre">Genre</label>
      <select id="genre" v-model="genre">
        <option value="horror">Horror</option>
      </select>
    </div>

    <div>
      <label for="fsk">FSK</label>
      <select id="fsk" v-model="fsk">
        <option value="0">0</option>
        <option value="6">6</option>
        <option value="12">12</option>
        <option value="16">16</option>
        <option value="18">18</option>
      </select>
    </div>

    <div>
      <p>MindestMovie</p>
      <label for="mm-true">Ja</label>
      <input id="mm-true" v-model="mm" type="radio" name="mm" :value="true" />
      <label for="mm-false">Nein</label>
      <input id="mm-false" v-model="mm" type="radio" name="mm" :value="false" />
    </div>

    <div>
      <label for="runtime-min">Laufzeit in min (von)</label>
      <input
        id="runtime-min"
        v-model="runtime[0]"
        type="number"
        min="0"
        max="500"
      />
      <label for="runtime-max">Laufzeit in min (bis)</label>
      <input
        id="runtime-max"
        v-model="runtime[1]"
        type="number"
        min="0"
        max="500"
      />
    </div>

    <div>
      <label for="sort">Sortieren</label>
      <select id="sort" v-model="sortParam">
        <option value="title.original">Titel (original)</option>
        <option value="title.german">Titel (deutsch)</option>
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

    <button type="submit">Suchen</button>
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
      title: this.$route.query.title || "",
      ratingTotal: [
        this.$route.query.rating_total_min || 0,
        this.$route.query.rating_total_max || 1000,
      ],
      ratingCH: [
        this.$route.query.rating_ch_min || null,
        this.$route.query.rating_ch_max || null,
      ] as null[] | number[],
      // @todo fix logic
      chNull:
        !(this.$route.query.rating_ch_min || this.$route.query.rating_ch_max) ||
        true,
      ratingRT: [
        this.$route.query.rating_rt_min || null,
        this.$route.query.rating_rt_max || null,
      ] as null[] | number[],
      // @todo fix logic
      rtNull:
        !(this.$route.query.rating_rt_min || this.$route.query.rating_rt_max) ||
        true,
      dateSeen: [
        this.$route.query.date_seen_min || "",
        this.$route.query.date_seen_max || "",
      ],
      yearReleased: [
        this.$route.query.date_released_min || null,
        this.$route.query.date_released_max || null,
      ],
      genre: this.$route.query.genre || "",
      fsk: this.$route.query.fsk || null,
      mm: this.$route.query.mm || null,
      runtime: [
        this.$route.query.runtime_min || null,
        this.$route.query.runtime_max || null,
      ],
      sortParam:
        this.$route.query.sort?.indexOf("-") === 0
          ? this.$route.query.sort.slice(1)
          : this.$route.query.sort || null,
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

  watch: {
    chNull (newValue) {
      this.ratingCH = newValue ? [null, null] : [0, 1000]
    },
    rtNull (newValue) {
      this.ratingRT = newValue ? [null, null] : [0, 1000]
    },
  },

  methods: {
    submit () {
      // @todo fix annoying ts error that occurs without the any cast, then remove any cast
      const QUERY_PARAM_MAP = {
        title: "title",
        ratingTotal: ["rating_total_min", "rating_total_max"],
        ratingCH: ["rating_ch_min", "rating_ch_max"],
        ratingRT: ["rating_rt_min", "rating_rt_max"],
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
            (Array.isArray(
              QUERY_PARAM_MAP[dataName as keyof typeof QUERY_PARAM_MAP]
            )
              ? {
                  ...(dataValue![0] && {
                    [QUERY_PARAM_MAP[
                      dataName as keyof typeof QUERY_PARAM_MAP
                    ][0]]: dataValue![0],
                  }),
                  ...(dataValue![1] && {
                    [QUERY_PARAM_MAP[
                      dataName as keyof typeof QUERY_PARAM_MAP
                    ][1]]: dataValue![1],
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
