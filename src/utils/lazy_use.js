import Vue from 'vue'

// base library
import {
  Switch,
  Modal,
  Popover,
  Dropdown,
  Spin,
  Drawer,
  Tooltip,
  Alert,
  Popconfirm,
  message,
  notification
} from 'ant-design-vue'

Vue.use(Switch)
Vue.use(Modal)
Vue.use(Popover)
Vue.use(Dropdown)
Vue.use(Spin)
Vue.use(Drawer)
Vue.use(Tooltip)
Vue.use(Alert)
Vue.use(Popconfirm)

Vue.prototype.$confirm = Modal.confirm
Vue.prototype.$message = message
Vue.prototype.$notification = notification
Vue.prototype.$info = Modal.info
Vue.prototype.$success = Modal.success
Vue.prototype.$error = Modal.error
Vue.prototype.$warning = Modal.warning

process.env.NODE_ENV !== 'production' && console.warn('[antd-pro] NOTICE: Antd use lazy-load.')
