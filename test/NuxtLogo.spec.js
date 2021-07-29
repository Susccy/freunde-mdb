import { mount } from "@vue/test-utils"
import index from "~/pages/index.vue"

describe("index page", () => {
  test("is a Vue instance", () => {
    const wrapper = mount(index, { stubs: ["Sample"] })
    expect(wrapper.vm).toBeTruthy()
  })
})
