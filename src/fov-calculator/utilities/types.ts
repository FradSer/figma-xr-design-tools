import { EventHandler } from '@create-figma-plugin/utilities'
import { Settings } from '../../utilities/types'

export type FOVCalculatorProps = Settings & {
  hasSelection: boolean
}

export type FormState = FOVCalculatorProps

export interface SelectionChangedHandler extends EventHandler {
  name: 'SELECTION_CHANGED'
  handler: (hasSelection: boolean) => void
}

export interface SubmitHandler extends EventHandler {
  name: 'SUBMIT'
  handler: (settings: Settings) => void
}
