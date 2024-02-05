import { defineComponent } from 'vue'
import Sidebar from './Sidebar'
import { useRouter } from 'vue-router'

export default defineComponent({
  props: {},
  setup(props) {
    const router = useRouter()
    console.log(router.getRoutes())

    return () => {
      return <Sidebar />
    }
  }
})
