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
import { useCallback, useState, useEffect } from 'preact/hooks'

import { FOVCalculatorHandler } from './types'
import { CloseHandler } from '../types'

function Plugin() {
  const [distanceCount, setDistanceCount] = useState<number | null>(60)

  const [distanceString, setDistanceString] = useState('60')

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

      <Text align="right">
        <Muted>Made with ❤️ by Lark Innovations</Muted>
      </Text>
    </Container>
  )
}

export default render(Plugin)
