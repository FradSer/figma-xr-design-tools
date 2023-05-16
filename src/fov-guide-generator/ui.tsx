import {
  Button,
  Columns,
  Container,
  Muted,
  render,
  Text,
  TextboxNumeric,
  Toggle,
  VerticalSpace,
} from '@create-figma-plugin/ui'
import { emit } from '@create-figma-plugin/utilities'
import { h } from 'preact'
import { useCallback, useState } from 'preact/hooks'

import ByFrad  from '../common/by-frad'

import { CreateFrameHandler } from './types'
import { CloseHandler } from '../types'

function Plugin() {
  const [hFOVCount, setHFOVCount] = useState<number | null>(60)
  const [vFOVCount, setVFOVCount] = useState<number | null>(30)
  const [distanceCount, setDistanceCount] = useState<number | null>(36)
  const [changeName, setChangeName] = useState<boolean>(true)

  const [horizontalFOVString, setHorizontalFOVString] = useState('60')
  const [verticalFOVString, setVerticalFOVString] = useState('30')
  const [distanceString, setDistanceString] = useState('36')

  const handleCreateFrameButtonClick = useCallback(
    function () {
      if (
        hFOVCount !== null &&
        vFOVCount !== null &&
        distanceCount !== null &&
        changeName !== null
      ) {
        emit<CreateFrameHandler>(
          'CREATE_FRAME',
          hFOVCount,
          vFOVCount,
          distanceCount,
          changeName
        )
      }
    },
    [hFOVCount, vFOVCount, distanceCount, changeName]
  )

  function handleChangeName(value: boolean) {
    setChangeName(value)
  }

  const handleCloseButtonClick = useCallback(function () {
    emit<CloseHandler>('CLOSE')
  }, [])
  return (
    <Container space="medium">
      <VerticalSpace space="large" />
      <Text>
        <Muted>Horizontal FOV (º)</Muted>
      </Text>
      <VerticalSpace space="small" />
      <TextboxNumeric
        onNumericValueInput={setHFOVCount}
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
        onNumericValueInput={setVFOVCount}
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
        onNumericValueInput={setDistanceCount}
        onValueInput={setDistanceString}
        value={distanceString}
        variant="border"
      />
      <VerticalSpace space="small" />
      <Toggle onValueChange={handleChangeName} value={changeName}>
        <Text>
          <Muted>Add above information to guide</Muted>
        </Text>
      </Toggle>
      <VerticalSpace space="extraLarge" />
      <Columns space="extraSmall">
        <Button fullWidth onClick={handleCreateFrameButtonClick}>
          Create
        </Button>
        <Button fullWidth onClick={handleCloseButtonClick} secondary>
          Close
        </Button>
      </Columns>
      <VerticalSpace space="large" />
      <ByFrad />
    </Container>
  )
}

export default render(Plugin)
