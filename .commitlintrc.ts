import type { UserConfig } from '@commitlint/types'

const config: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {},
  plugins: [
    {
      rules: {
        commit: ({ header }) => {
          const PrefixRegex = /^(\[[bBtT][0-9]+])/
          if (!PrefixRegex.test(header)) {
            return [
              false,
              `
              \x1b[1;41;33m       您本次版本提交不符合日志提交规范!!!     \x1b[0m
              `
            ]
          }
          // max length
          const minLen = 4
          if (header.length < minLen) {
            return [
              false,
              `Message长度不得少于${minLen}字符,当前提交message长度: ${header.length}字符`
            ]
          }

          return [true]
        }
      }
    }
  ],
  ignores: [(commit) => commit.startsWith('Merge ')],
  parserPreset: {
    parserOpts: {
      headerPattern: /^(\[[bBtT][0-9]+]) (\w*)(?:\((.*)\))?!?: (.*)$/,
      headerCorrespondence: ['type', 'scope', 'subject']
    }
  }
}

export default config
