import { EventHandler } from '@create-figma-plugin/utilities'

export interface FOVCalculatorHandler extends EventHandler {
  name: 'FOV_CALCULATOR'
  handler: (distanceCount: number) => void
}
