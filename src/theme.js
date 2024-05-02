import { extendTheme } from "@chakra-ui/react";
import "@fontsource/questrial";

export const theme = extendTheme({
    colors: {
        brand: {
            primary: '#5276a7',
            primaryDark: "#395274",
            success: "#3fa569",
            fail: "#e61212",
        },
        gray: {
            100: '#f5f5f5',
            200: '#e5e5e5',
            300: '#d4d4d4',
            400: '#a1a1aa',
            500: '#737373',
            600: '#525252',
            700: '#404040',
            800: '#27272a',
            900: '#171717'
        },
    },
    fonts: {
        heading: "Questrial, sans-serif",
        body: "Questrial, sans-serif",
    },
    fontSizes: {
    },
    lineHeights: {
    },
    components: {
        Card: {
            baseStyle: {
                body: {
                    padding: 0,
                }
            }
        },
        Tag: {
            baseStyle: {
                container: {
                    margin: 1,
                    bgColor: 'gray.100'
                },
            }
        },
        Button: {
            baseStyle: {
                fontWeight: 'normal'
            },
            defaultProps: {
                variant: 'primary',
            },
            variants: {
                primary: {
                    bgColor: 'brand.primary',
                    color: 'white',
                    _hover: {
                        bgColor: 'brand.primaryDark',
                    },
                },
                secondary: {
                    bgColor: 'transparent',
                    color: 'var(--chakra-colors-chakra-body-text',
                }
            }
        },
    }
});
export default theme;