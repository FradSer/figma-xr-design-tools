import { EventHandler } from '@create-figma-plugin/utilities'

export interface CreateFrameHandler extends EventHandler {
  name: 'CREATE_FRAME'
  handler: (hFOVCount: number, vFOVCount: number, distanceCount: number) => void
}

export interface CloseHandler extends EventHandler {
  name: 'CLOSE'
  handler: () => void
}
