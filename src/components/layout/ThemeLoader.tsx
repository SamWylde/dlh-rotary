import React from 'react'

type Props = {
  activeTheme?: string
  customAccentColor?: string | null
}

const isValidHexColor = (value: string): boolean => /^#[0-9a-fA-F]{3,8}$/.test(value)

export const ThemeLoader = ({ activeTheme = 'rotary-classic', customAccentColor }: Props) => (
  <>
    <link href={`/themes/${activeTheme}.css`} rel="stylesheet" />
    {customAccentColor && isValidHexColor(customAccentColor) ? (
      <style>{`:root { --color-accent: ${customAccentColor}; }`}</style>
    ) : null}
  </>
)