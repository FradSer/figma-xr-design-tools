import {
  Button,
  Container,
  Muted,
  render,
  Text,
  TextboxNumeric,
  useForm,
  VerticalSpace,
} from '@create-figma-plugin/ui'
import { emit, on } from '@create-figma-plugin/utilities'
import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'

import ByFrad from '../common/by-frad'

import { FormState, FOVCalculatorProps } from './utilities/types'
import { CloseUIHandler } from '../utilities/types'
import {
  SelectionChangedHandler,
  SubmitHandler,
} from '../fov-guide-generator/utilities/types'

function Plugin(props: FOVCalculatorProps) {
  const { formState, setFormState, initialFocus, handleSubmit } =
    useForm<FormState>(
      { ...props },
      {
        close: function () {
          emit<CloseUIHandler>('CLOSE_UI')
        },
        submit: function ({ hFov, vFov, distance, changeName }: FormState) {
          emit<SubmitHandler>('SUBMIT', { hFov, vFov, distance, changeName })
        },
        validate: function ({ distance }: FormState) {
          return distance !== null
        },
      }
    )

  useEffect(
    function () {
      return on<SelectionChangedHandler>(
        'SELECTION_CHANGED',
        function (hasSelection: boolean) {
          setFormState(hasSelection, 'hasSelection')
        }
      )
    },
    [setFormState]
  )

  const [horizontalFOVString, setHorizontalFOVString] = useState(
    props.hFov == null ? '60' : `${props.hFov}`
  )

  const [verticalFOVString, setVerticalFOVString] = useState(
    props.vFov == null ? '30' : `${props.vFov}`
  )

  const [distanceString, setDistanceString] = useState(
    props.distance == null ? '36' : `${props.distance}`
  )

  const { hasSelection } = formState

  return (
    <Container space="medium">
      <VerticalSpace space="large" />
      <Text>
        <Muted>Distance (cm)</Muted>
      </Text>
      <VerticalSpace space="small" />
      <TextboxNumeric
        {...initialFocus}
        name="distance"
        minimum={0}
        onNumericValueInput={setFormState}
        onValueInput={setDistanceString}
        value={distanceString}
        variant="border"
      />
      <VerticalSpace space="extraLarge" />
      <Button fullWidth onClick={handleSubmit} disabled={!hasSelection}>
        Calculate
      </Button>
      <VerticalSpace space="large" />
      <Text>
        <Muted>How to use:</Muted>
      </Text>
      <VerticalSpace space="small" />
      <Text>
        <Muted>Select an element and enter its expected distance.</Muted>
      </Text>
      <VerticalSpace space="large" />
      <ByFrad />
    </Container>
  )
}

export default render(Plugin)
