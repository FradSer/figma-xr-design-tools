import { once, showUI } from '@create-figma-plugin/utilities'

import { CreateFrameHandler } from './types'
import { CloseHandler } from '../types'

import { convertFOVDistanceToLength } from './utilities/convert-fov-distance-to-length'

export default function () {
  once<CreateFrameHandler>(
    'CREATE_FRAME',
    function (
      hFOVCount: number,
      vFOVCount: number,
      distanceCount: number,
      changeName: boolean
    ) {
      const nodes: Array<SceneNode> = []

      const rectangle = figma.createRectangle()
      const selectedNodes = figma.currentPage.selection

      let width = convertFOVDistanceToLength(hFOVCount, distanceCount)
      let height = convertFOVDistanceToLength(vFOVCount, distanceCount)
      rectangle.resize(width, height)
      rectangle.fills = [{ type: 'SOLID', color: { r: 1, g: 0, b: 0 } }]
      rectangle.opacity = 0.25
      rectangle.locked = true

      if (changeName) {
        let name = `_FOVGuide: H ${hFOVCount}º, V ${vFOVCount}º, D ${distanceCount}cm`
        rectangle.name = name
      }

      rectangle.constraints = {
        horizontal: 'CENTER',
        vertical: 'CENTER',
      }

      if (selectedNodes.length == 1 && selectedNodes[0].type === 'FRAME') {
        const selectedFrame = selectedNodes[0] as FrameNode
        if (selectedFrame.clipsContent) {
          selectedFrame.clipsContent = false
        }
        selectedFrame.appendChild(rectangle)
        rectangle.x = (selectedFrame.width - rectangle.width) / 2
        rectangle.y = (selectedFrame.height - rectangle.height) / 2
        nodes.push(selectedFrame)
      } else {
        const frame = figma.createFrame()
        frame.resize(width, height)
        frame.appendChild(rectangle)
        nodes.push(frame)
      }

      figma.currentPage.selection = nodes
      figma.viewport.scrollAndZoomIntoView(nodes)
      figma.closePlugin()
    }
  )
  once<CloseHandler>('CLOSE', function () {
    figma.closePlugin()
  })
  showUI({
    height: 320,
    width: 260,
  })
}
