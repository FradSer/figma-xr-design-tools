import { EventHandler } from '@create-figma-plugin/utilities'

export type Settings = {
  hFov: null | number
  vFov: null | number
  distance: null | number
  changeName: boolean
}

export interface CloseUIHandler extends EventHandler {
  name: 'CLOSE_UI'
  handler: () => void
}
