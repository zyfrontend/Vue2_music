import registerElement from './element'
export function globalRegister(app) {
  app.use(registerElement)
}
