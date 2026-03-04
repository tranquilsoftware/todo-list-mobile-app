export const colors = {
  background: '#F5F5F5',
  surface: 'white',
  textPrimary: '#212121',
  textSecondary: '#616161',
  textMuted: '#9E9E9E',
  divider: '#EEEEEE',
  shadow: '#000',
  danger: '#f44336',
  success: '#4CAF50',
  icon: '#666',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
} as const;

export const radii = {
  md: 8,
} as const;

export const typography = {
  input: 16,
  title: 16,
  body: 14,
  lineHeightBody: 20,
} as const;

export const shadows = {
  card: {
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
} as const;
