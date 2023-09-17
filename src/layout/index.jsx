import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Layout',
  props: {},
  setup(props) {
    return () => {
      return <h1>Layout</h1>
    }
  }
})
