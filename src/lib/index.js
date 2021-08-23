import {
  asText,
  asHTML,
  asLink,
  asDate,
  documentAsLink,
} from '@prismicio/helpers'
import MagicString from 'magic-string'
import { setClientOptions, initClient } from './client.js'
import createPreview from './createPreview.js'
import * as regexes from './regexes.js'
import * as strings from './templateLiterals.js'

const isInSrc = (filename) => {
  const srcDir = `${process.cwd()}/src/`
  return filename.indexOf(srcDir) >= 0
}

const usePrismic = ({ repoName, routes, accessToken, options, slices }) => {
  return {
    markup: ({ content, filename }) => {
      const hasSliceZone = content.indexOf('SliceZone') >= 0
      const hasPrismic = content.indexOf('prismic') >= 0
      if (isInSrc(filename) && (hasSliceZone || hasPrismic)) {
        // Will not insert prismic if there is no script tag. Must create script tag if there is none.
        const ms = new MagicString(content, { filename })

        const match = content.match(regexes.scriptTag)
        const startScript = match[0].length

        if (hasSliceZone) {
          ms.appendRight(startScript, strings.importSliceZone())
        }

        if (hasPrismic) {
          // Routes / options are not working
          ms.appendRight(
            startScript,
            strings.importPrismic() +
              strings.initClient(repoName, routes, options),
          )
        }
        return {
          code: ms.toString(),
          map: ms.generateMap(),
        }
      }
      return {
        code: content,
      }
    },
  }
}

const prismic = {
  asText,
  asHTML,
  asLink,
  documentAsLink,
  asDate,
  initClient,
  setClientOptions,
  createPreview,
}

export { usePrismic, prismic }
