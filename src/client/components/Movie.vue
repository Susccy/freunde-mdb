<template>
  <component
    :is="modal ? 'div' : 'fragment'"
    ref="modalBackdrop"
    @click="closeModal"
    class="g-modal-backdrop"
  >
    <article @click.stop class="c-movie" :class="[modal && 'c-movie--modal']">
      <h1>{{ title }}</h1>
      <button v-if="modal" @click="closeModal">X</button>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit unde sint
        necessitatibus totam illum qui quasi, debitis quia voluptatem in odio ea
        quis cum ipsam sequi reprehenderit ad, accusamus commodi corrupti! Dicta
        ducimus, atque mollitia autem sit modi? Nisi, possimus! Quas nobis
        corrupti fugiat at perspiciatis molestiae, quam commodi iste, dolore
        unde exercitationem expedita, dolores voluptatum iure nisi rerum quod?
        Harum nemo obcaecati excepturi non veniam dolor. Dolore cum quasi in
        sint laboriosam magnam vel laudantium obcaecati voluptatem beatae, quam
        facilis. Sit ratione rem expedita et enim officiis dolorem quasi ad quod
        debitis, sint, quas quaerat dignissimos nisi dolorum tempore porro error
        architecto cum consectetur earum provident? Architecto temporibus
        facilis unde voluptates inventore praesentium maxime et nostrum
        cupiditate? Tenetur amet voluptate sunt? Libero, magnam! Ad soluta quae
        nisi voluptates eius quidem sit consequuntur dolorum debitis fugiat
        excepturi praesentium voluptas, reiciendis aliquam quod voluptatum eum
        repellat ab, ratione cum cumque! Facere ipsa quam repellat obcaecati.
        Minima omnis quasi nulla tempora harum ad temporibus officia itaque at,
        sit, rerum nihil sunt cum deserunt eum error? Perferendis, commodi.
        Possimus voluptatibus itaque impedit autem quae amet. Asperiores eum
        totam quo illo ex a libero vitae placeat vero? Unde ea laboriosam, odio
        ipsa dignissimos vel exercitationem nisi sit, placeat impedit incidunt
        velit rerum quis obcaecati soluta tempora voluptas accusantium. Ipsum
        repudiandae aliquam obcaecati autem vitae ratione quasi, doloribus
        consequatur reiciendis laborum modi dolorum aut consectetur ea odit
        dolorem quae fugiat minus ex ullam, incidunt inventore saepe! Facere
        quibusdam voluptas, dolorum eos, optio quia officia dignissimos
        laudantium porro mollitia maiores corporis. Veniam laudantium assumenda
        non quasi, blanditiis ad doloremque ea exercitationem earum. Aspernatur
        dolor eum adipisci consequuntur aut debitis fugit laborum illo
        necessitatibus quas? Possimus nisi dignissimos quas, adipisci minima in
        animi quibusdam omnis temporibus! Voluptatem itaque eos dolorum magnam,
        ullam veniam voluptas et accusantium asperiores nesciunt ad molestiae
        reprehenderit commodi doloremque alias nam praesentium eius voluptate
        natus! At, iste? Ab molestias consequatur maxime minus fugit nisi ipsam
        distinctio repudiandae mollitia quas laborum corporis tenetur provident
        aliquam, atque quidem perspiciatis dignissimos quaerat illum. Quasi
        quidem cumque reiciendis dolor nihil repudiandae magnam debitis dolores
        nobis, odit eius magni asperiores, tempore necessitatibus unde molestiae
        similique pariatur, nam quas enim. Tempora doloremque ullam inventore,
        perspiciatis aspernatur consequatur sint quas voluptatibus saepe
        suscipit nesciunt tenetur placeat eos nobis quos quae veniam nulla
        obcaecati quam sit. Libero veritatis maxime cupiditate in quasi magni
        saepe porro exercitationem ullam? Deleniti voluptas distinctio cumque
        soluta consectetur est nesciunt fugiat? Itaque doloribus et optio
        adipisci, deserunt earum ipsam? Maiores consectetur doloremque odio cum
        a. Quo quas cumque maiores, ad expedita dolore suscipit ratione harum
        libero et vel beatae. Maxime saepe reprehenderit ducimus sed minus
        suscipit iusto eligendi, porro aut incidunt eos! Dolor totam aperiam
        officia! A, repellat explicabo? Numquam repellat odit necessitatibus?
        Nam, sint reiciendis. Consequuntur dolorem eaque, perferendis facere
        optio, architecto magnam ipsam quo vel eius temporibus maxime deserunt
        in minima necessitatibus perspiciatis. Provident tempore nulla ipsa
        soluta deserunt. Itaque doloribus quasi corporis ipsa esse, eum, commodi
        libero deleniti cupiditate pariatur omnis numquam quae illum consectetur
        quas doloremque ipsam expedita aspernatur placeat? Aliquam, minima alias
        iste ipsa ea necessitatibus pariatur perspiciatis adipisci soluta magnam
        quasi fugit ipsam omnis, aperiam, perferendis excepturi officiis atque
        esse voluptates rerum iusto dolorum! At ex accusantium ullam debitis
        nostrum facere magni, enim rem odio aperiam labore neque dignissimos
        esse doloribus quis aut assumenda amet ad vitae pariatur veritatis? Quas
        voluptas, suscipit iure accusamus aliquam, minima illum ratione, quos
        dolore dignissimos quod dolorum est repudiandae aspernatur! Soluta
        magnam reiciendis nam, cumque atque fugit sint ducimus harum
        necessitatibus voluptas? Ad, obcaecati architecto, deserunt quia
        deleniti placeat quo molestiae et blanditiis reprehenderit non fugit
        maxime tenetur enim rem libero omnis quaerat eaque, commodi similique
        dolorem! Debitis sunt ut illum minima qui pariatur porro, laudantium
        aliquam tempore quia, consequuntur quidem aut minus nemo facere dolor
        iste quisquam placeat maiores consequatur error nihil voluptates sit
        eos. Magnam laudantium saepe non assumenda earum aliquam sed, corporis
        nostrum sapiente inventore explicabo quisquam a reprehenderit nisi.
        Culpa magni illum laboriosam doloremque esse iusto nulla deserunt quod
        odio, similique doloribus quam libero! Rem eveniet fugiat ad eaque fugit
        consectetur neque ipsam vel inventore amet deleniti vero earum provident
        quaerat atque ipsa, ex mollitia commodi! Error incidunt ea odit qui
        asperiores perferendis, nulla quis temporibus dolore consectetur minima
        saepe possimus est distinctio fuga autem, quidem quam debitis recusandae
        ipsam! Sit sequi, odio cumque minima sunt distinctio velit est itaque,
        qui eveniet magnam laudantium excepturi ea. Iure ea aut ipsa nihil
        quidem. Ullam, temporibus atque eius quibusdam libero expedita obcaecati
        quaerat tenetur sint perspiciatis nostrum culpa dicta quasi in qui
        voluptatibus, cupiditate quod? Cum minima dolore nulla, dolorum nisi
        repellendus perferendis cupiditate omnis dolores! Dolorum sequi, cum
        pariatur et architecto, rem reiciendis laboriosam impedit repudiandae
        repellendus est? Minima architecto perspiciatis aspernatur reiciendis
        eum maxime dignissimos ad deleniti. Quia sed ratione odio sapiente sunt
        doloribus fugit, ut laborum officia similique praesentium illo
        voluptates itaque dolores tempore mollitia cumque temporibus totam
        corporis beatae sint quidem accusamus laboriosam? Vitae perferendis
        voluptas commodi molestiae recusandae est accusamus? Dolores quia
        voluptates eaque suscipit placeat, veritatis aliquid sint odit, numquam
        minima accusantium fugiat iste. Molestiae veniam corporis praesentium
        ratione eaque. Temporibus laboriosam voluptates minus facere mollitia
        fuga iusto aliquam possimus laborum numquam assumenda et omnis aut,
        deserunt nostrum hic sint id explicabo saepe. Rerum vitae illo sint,
        molestiae architecto consectetur quod, omnis dolor, ducimus corrupti
        fugiat fugit consequuntur recusandae dolorem corporis itaque sed?
        Quidem, atque accusantium? Dolore, id! Iusto, dicta! Rem consequatur,
        perferendis at cupiditate, dignissimos omnis similique itaque porro
        praesentium consequuntur velit earum accusantium iusto illo distinctio
        labore adipisci voluptas ipsa! Cumque unde provident accusamus
        laboriosam sequi, vel deserunt totam ex consequatur. Exercitationem
        labore dicta assumenda tempore quibusdam illum aspernatur quae modi
        delectus, vitae necessitatibus dolorum rerum nisi. Possimus optio, error
        ex culpa ab quasi. Soluta aliquid officiis sunt neque quam similique
        dolor autem harum veritatis impedit, enim eos nihil doloribus fugit
        dolores facere maiores cum obcaecati, numquam quae. Aliquid modi est
        accusantium quo nostrum soluta. Tempora est ea, debitis expedita
        repudiandae ducimus earum veniam!
      </p>
    </article>
  </component>
</template>

<script lang="ts">
import Vue from "vue"
import type { VueConstructor } from "vue"
import computedMovieData from "~/client/mixins/computedMovieData"

const MODAL_OPEN = "modal-open"

export default (
  Vue as VueConstructor<Vue & InstanceType<typeof computedMovieData>>
).extend({
  mixins: [computedMovieData],
  props: {
    modal: {
      type: Boolean,
      default: false,
    },
  },

  // https://css-tricks.com/prevent-page-scrolling-when-a-modal-is-open/
  mounted () {
    if (!this.modal) return

    const { body } = document

    ;(this.$refs.modalBackdrop as HTMLElement).style.top = `${window.scrollY}px`
    body.style.top = `-${window.scrollY}px`
    body.classList.add(MODAL_OPEN)
  },

  methods: {
    closeModal () {
      const { body } = document
      const scrollY = body.style.top

      body.style.top = ""
      body.classList.remove(MODAL_OPEN)
      window.scrollTo(0, parseInt(scrollY || "0") * -1)
      this.$emit("close")
    },
  },
})
</script>
