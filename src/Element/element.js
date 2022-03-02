import { ElButton, ElAside, ElMenu, ElMenuItem } from 'element-plus'

const components = [ElButton, ElAside, ElMenu, ElMenuItem]
export default function (app) {
  for (const component of components) {
    app.component(component.name, component)
  }
}
