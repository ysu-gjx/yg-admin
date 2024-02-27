import { defineComponent } from 'vue'
import Sidebar from './Sidebar'
import { useRouter } from 'vue-router'
import { filterRoutes, generateMenu } from '@/utils/route'

export default defineComponent({
  props: {},
  setup(props) {
    const router = useRouter()
    const fRoutes = filterRoutes(router.getRoutes())
    const menu = generateMenu(fRoutes)

    return () => {
      return <Sidebar menu={menu} />
    }
  }
})
