import {
  loadSettingsAsync,
  once,
  saveSettingsAsync,
  showUI,
} from '@create-figma-plugin/utilities'

import { SubmitHandler } from './utilities/types'
import { CloseUIHandler, Settings } from '../utilities/types'
import { convertFOVDistanceToLength } from './utilities/convert-fov-distance-to-length'
import { defaultSettings } from '../utilities/settings'

export default async function () {
  const settings = await loadSettingsAsync(defaultSettings)

  once<SubmitHandler>('SUBMIT', async function (settings: Settings) {
    await saveSettingsAsync(settings)

    const { hFov, vFov, distance, changeName } = settings

    const nodes: Array<SceneNode> = []

    const rectangle = figma.createRectangle()
    const selectedNodes = figma.currentPage.selection

    let width = convertFOVDistanceToLength(hFov, distance)
    let height = convertFOVDistanceToLength(vFov, distance)
    rectangle.resize(width, height)
    rectangle.fills = [{ type: 'SOLID', color: { r: 1, g: 0, b: 0 } }]
    rectangle.opacity = 0.25
    rectangle.locked = true

    if (changeName) {
      rectangle.name = `_FOVGuide: H ${hFov}º, V ${vFov}º, D ${distance}cm`
    }

    rectangle.constraints = {
      horizontal: 'CENTER',
      vertical: 'CENTER',
    }

    if (selectedNodes.length == 1 && selectedNodes[0].type === 'FRAME') {
      const selectedFrame = selectedNodes[0]
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
      frame.clipsContent = false
      nodes.push(frame)
    }

    figma.currentPage.selection = nodes
    figma.viewport.scrollAndZoomIntoView(nodes)
    figma.closePlugin()
  })
  once<CloseUIHandler>('CLOSE_UI', function () {
    figma.closePlugin()
  })
  showUI(
    {
      height: 320,
      width: 260,
    },
    { ...settings, hasSelection: true }
  )
}
