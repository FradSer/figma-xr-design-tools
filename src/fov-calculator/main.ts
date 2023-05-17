import {
  once,
  on,
  showUI,
  loadSettingsAsync,
  saveSettingsAsync,
  emit,
} from '@create-figma-plugin/utilities'

import { SelectionChangedHandler, SubmitHandler } from './utilities/types'
import { CloseUIHandler, Settings } from '../utilities/types'
import { defaultSettings } from '../utilities/settings'
import { convertLengthDistanceToFOV } from './utilities/convert-length-distance-to-fov'

export default async function () {
  const settings = await loadSettingsAsync(defaultSettings)

  on<SubmitHandler>('SUBMIT', async function (settings: Settings) {
    await saveSettingsAsync(settings)

    const { vFov, hFov, distance, changeName } = settings

    const selectedNodes = figma.currentPage.selection
    const selectedNode = selectedNodes[0]

    if (selectedNodes.length == 0) {
      figma.notify('Please select a element.')
      return
    }

    let width = selectedNode.width
    let height = selectedNode.height

    let hFOV = convertLengthDistanceToFOV(width, distance)
    let vFOV = convertLengthDistanceToFOV(height, distance)

    figma.notify(`FOV: H ${hFOV}º, V ${vFOV}º`)
  })

  once<CloseUIHandler>('CLOSE_UI', function () {
    figma.closePlugin()
  })

  figma.on('selectionchange', function () {
    emit<SelectionChangedHandler>(
      'SELECTION_CHANGED',
      figma.currentPage.selection.length > 0
    )
  })

  showUI(
    {
      height: 240,
      width: 260,
    },
    { ...settings, hasSelection: figma.currentPage.selection.length > 0 }
  )
}
