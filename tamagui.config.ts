import { createTamagui } from 'tamagui'
import { shorthands } from '@tamagui/shorthands'
import { themes, tokens } from '@tamagui/themes'

const GenJyuuGothic = {
  family: 'GenJyuuGothic',
  weights: {
    400: '400',
    500: '500'
  },
  size: {
    6: 15,
    true: 15,
  },
}

const config = createTamagui({
  fonts: {
    body: GenJyuuGothic,
    heading: GenJyuuGothic,
  },
  themes,
  tokens,
  shorthands,
})

export type AppConfig = typeof config

declare module 'tamagui' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface TamaguiCustomConfig extends AppConfig { }
}

export default config