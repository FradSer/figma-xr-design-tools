import { EventHandler } from '@create-figma-plugin/utilities'

export interface CreateFrameHandler extends EventHandler {
  name: 'CREATE_FRAME'
  handler: (
    hFOVCount: number,
    vFOVCount: number,
    distanceCount: number,
    changeName: boolean
  ) => void
}
