import type { UserConfig } from '@commitlint/types'

const config: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {},
  ignores: [(commit) => commit.startsWith('Merge ')]
}

export default config
