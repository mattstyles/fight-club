import * as SliderPrimitive from '@radix-ui/react-slider'

import {styled} from '~/theme'

const StyledRoot = styled(SliderPrimitive.Root, {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  userSelect: 'none',
  touchAction: 'none',
  width: 200,

  '&[data-orientation="horizontal"]': {
    height: 20,
  },

  '&[data-orientation="vertical"]': {
    flexDirection: 'column',
    width: 20,
    height: 100,
  },
})

const StyledTrack = styled(SliderPrimitive.Track, {
  backgroundColor: '$black',
  position: 'relative',
  flexGrow: 1,
  borderRadius: '9999px',

  '&[data-orientation="horizontal"]': {height: 3},
  '&[data-orientation="vertical"]': {width: 3},
})

const StyledRange = styled(SliderPrimitive.Range, {
  position: 'absolute',
  backgroundColor: 'white',
  borderRadius: '9999px',
  height: '100%',
})

const StyledThumb = styled(SliderPrimitive.Thumb, {
  all: 'unset',
  display: 'block',
  width: 20,
  height: 20,
  backgroundColor: 'white',
  boxShadow: `0 2px 10px rgba(0, 0, 0, 0.2)`,
  borderRadius: 10,
  '&:hover': {backgroundColor: '$gray5'},
  '&:focus': {boxShadow: `0 0 0 5px rgba(0, 0, 0, 0.2)`},
})

type Props = {
  defaultValue: number
  min: number
  max: number
  step: number
  onChange: (value: number) => void
}
export function Slider({defaultValue, min, max, onChange, step}: Props) {
  return (
    <StyledRoot
      {...{
        defaultValue: [defaultValue],
        min,
        max,
        step,
        onValueChange: ([value]) => onChange(value),
      }}>
      <StyledTrack>
        <StyledRange />
      </StyledTrack>
      <StyledThumb />
    </StyledRoot>
  )
}
