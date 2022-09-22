import {
  once,
  on,
  showUI,
  formatErrorMessage,
  formatSuccessMessage,
} from '@create-figma-plugin/utilities'

import { FOVCalculatorHandler } from './types'
import { CloseHandler } from '../types'

function convertLengthDistanceToFOV(length: number, distance: number) {
  if (length == 0 || distance == 0) {
    return null
  }

  return (
    (Math.atan(length / 2 / (distance / 100) / 1000) / (Math.PI / 180)) *
    2
  ).toFixed(2)
}

export default function () {
  on<FOVCalculatorHandler>('FOV_CALCULATOR', function (distanceCount: number) {
    const selectedNodes = figma.currentPage.selection
    const selectedNode = selectedNodes[0]

    if (selectedNodes.length == 0) {
      figma.notify('Please select a element.')
      return
    }

    let width = selectedNode.width
    let height = selectedNode.height

    let hFOV = convertLengthDistanceToFOV(width, distanceCount)
    let vFOV = convertLengthDistanceToFOV(height, distanceCount)

    figma.notify(`FOV: H ${hFOV}º, V ${vFOV}º`)
  })

  once<CloseHandler>('CLOSE', function () {
    figma.closePlugin()
  })

  showUI({
    height: 180,
    width: 260,
  })
}
