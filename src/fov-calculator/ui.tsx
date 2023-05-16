import {
  Button,
  Columns,
  Container,
  Muted,
  render,
  Text,
  TextboxNumeric,
  VerticalSpace,
} from '@create-figma-plugin/ui'
import { emit } from '@create-figma-plugin/utilities'
import { h } from 'preact'
import { useCallback, useState } from 'preact/hooks'

import ByFrad  from '../common/by-frad'

import { FOVCalculatorHandler } from './types'
import { CloseHandler } from '../types'

function Plugin() {
  const [distanceCount, setDistanceCount] = useState<number | null>(36)

  const [distanceString, setDistanceString] = useState('36')

  const handleCalculatorFOVButtonClick = useCallback(
    function () {
      if (distanceCount !== null) {
        emit<FOVCalculatorHandler>('FOV_CALCULATOR', distanceCount)
      }
    },
    [distanceCount]
  )

  const handleCloseButtonClick = useCallback(function () {
    emit<CloseHandler>('CLOSE')
  }, [])

  return (
    <Container space="medium">
      <VerticalSpace space="large" />
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
      <VerticalSpace space="extraLarge" />
      <Columns space="extraSmall">
        <Button fullWidth onClick={handleCalculatorFOVButtonClick}>
          Calculate
        </Button>
        <Button fullWidth onClick={handleCloseButtonClick} secondary>
          Close
        </Button>
      </Columns>
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
