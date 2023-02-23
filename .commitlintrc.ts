import type { UserConfig } from '@commitlint/types'

const config: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {},
  plugins: [
    {
      rules: {
        lzw: ({ header }) => {
          const PrefixRegex = /^(\[[bBtT][0-9]+])/
          if (!PrefixRegex.test(header)) {
            return [
              false,
              `
              \x1b[1;41;33m       您本次版本提交不符合日志提交规范!!!     \x1b[0m
              \x1b[1;41;33m    提交规则:                                  \x1b[0m
              \x1b[1;41;33m       [任务号/bug号];提交描述:                \x1b[0m
              \x1b[1;41;33m       [任务号/bug号]必填,如果不存在填写[0]    \x1b[0m
              \x1b[1;41;33m    e.g:(任务号前加t,BUG号前加b)               \x1b[0m
              \x1b[1;41;33m       [b1372]解决:...                         \x1b[0m
              \x1b[1;41;33m       [t1373]增加:...                         \x1b[0m
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
  ignores: [
    // skip "Merge xxx"
    (commit) => commit.startsWith('Merge ')
  ],
  parserPreset: {
    parserOpts: {
      // "[txxxx] feat: asdasdasd"
      // headerPattern: /^(\[[bBtT][0-9]+]) (\w*)(?:\((.*)\))?!?: (.*)$/,
      headerCorrespondence: ['type', 'scope', 'subject']
    }
  }
}

export default config
