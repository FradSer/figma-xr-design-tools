import {
  Button,
  Container,
  Muted,
  render,
  Text,
  TextboxNumeric,
  Toggle,
  useForm,
  VerticalSpace,
} from '@create-figma-plugin/ui'
import { emit, on } from '@create-figma-plugin/utilities'
import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'

import ByFrad from '../common/by-frad'

import {
  FormState,
  SelectionChangedHandler,
  FOVGuideGeneratorProps,
  SubmitHandler,
} from './utilities/types'
import { CloseUIHandler } from '../utilities/types'

function Plugin(props: FOVGuideGeneratorProps) {
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
        validate: function ({
          hasSelection,
          hFov,
          vFov,
          distance,
          changeName,
        }: FormState) {
          return (
            hasSelection &&
            hFov !== null &&
            vFov !== null &&
            distance !== null &&
            changeName !== null
          )
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

  const { changeName } = formState

  return (
    <Container space="medium">
      <VerticalSpace space="large" />
      <Text>
        <Muted>Horizontal FOV (º)</Muted>
      </Text>
      <VerticalSpace space="small" />
      <TextboxNumeric
        {...initialFocus}
        name="hFov"
        minimum={0}
        onNumericValueInput={setFormState}
        onValueInput={setHorizontalFOVString}
        value={horizontalFOVString}
        variant="border"
      />
      <VerticalSpace space="small" />
      <Text>
        <Muted>Vertical FOV (º)</Muted>
      </Text>
      <VerticalSpace space="small" />
      <TextboxNumeric
        name="vFov"
        minimum={0}
        onNumericValueInput={setFormState}
        onValueInput={setVerticalFOVString}
        value={verticalFOVString}
        variant="border"
      />
      <VerticalSpace space="small" />
      <Text>
        <Muted>Distance (cm)</Muted>
      </Text>
      <VerticalSpace space="small" />
      <TextboxNumeric
        name="distance"
        minimum={0}
        onNumericValueInput={setFormState}
        onValueInput={setDistanceString}
        value={distanceString}
        variant="border"
      />
      <VerticalSpace space="small" />
      <Toggle name="changeName" onValueChange={setFormState} value={changeName}>
        <Text>
          <Muted>Add above information to guide</Muted>
        </Text>
      </Toggle>
      <VerticalSpace space="extraLarge" />
      <Button fullWidth onClick={handleSubmit}>
        Create
      </Button>
      <VerticalSpace space="large" />
      <ByFrad />
    </Container>
  )
}

export default render(Plugin)
