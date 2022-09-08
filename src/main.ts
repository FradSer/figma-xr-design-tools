import { once, showUI } from '@create-figma-plugin/utilities'

import { CloseHandler, CreateFrameHandler } from './types'

function convertFOV(fov: number, distance: number) {
  console.log(fov, distance)

  const vault = Math.ceil(
    2 * (distance / 100) * Math.tan((fov / 2) * (Math.PI / 180)) * 1000
  )

  if (vault % 2 != 0) {
    return vault + 1
  }
  return vault
}

export default function () {
  once<CreateFrameHandler>(
    'CREATE_FRAME',
    function (hFOVCount: number, vFOVCount: number, distanceCount: number) {
      const nodes: Array<SceneNode> = []
      const frame = figma.createFrame()

      let width = convertFOV(hFOVCount, distanceCount)
      let height = convertFOV(vFOVCount, distanceCount)
      frame.resize(width, height)
      figma.currentPage.appendChild(frame)
      nodes.push(frame)

      figma.currentPage.selection = nodes
      figma.viewport.scrollAndZoomIntoView(nodes)
      figma.closePlugin()
    }
  )
  once<CloseHandler>('CLOSE', function () {
    figma.closePlugin()
  })
  showUI({
    height: 300,
    width: 240,
  })
}
