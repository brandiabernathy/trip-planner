import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
    colors: {
        brand: {
            primary: "#2a7a8b",
            primaryDark: "#1e5864",
            success: "#3fa569",
            fail: "#e61212",
        },
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
                    margin: 1
                },
            }
        },
        Button: {
            defaultProps: {
                variant: 'primary',
            },
            variants: {
                primary: {
                    bgColor: 'brand.primary',
                    color: 'white',
                    fontSize: 'normal',
                    _hover: {
                        bgColor: 'brand.primaryDark',
                        _disabled: {
                            bgColor: 'brand.primary',
                        }
                    },
                    _disabled: {
                        opacity: 0.5,
                    }
                },
            }
        },
    }
});
export default theme;