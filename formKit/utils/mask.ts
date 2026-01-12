const digitRule = /\d/

export const applyMask = (value: string, mask: string) => {
  if (!mask) {
    return value
  }

  const rawChars = Array.from(value).filter((char) => digitRule.test(char))
  let rawIndex = 0
  let output = ''

  for (const maskChar of mask) {
    if (maskChar === '9') {
      if (rawIndex >= rawChars.length) {
        break
      }
      output += rawChars[rawIndex]
      rawIndex += 1
      continue
    }

    if (rawIndex < rawChars.length) {
      output += maskChar
    }
  }

  return output
}
