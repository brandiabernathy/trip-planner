import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
    colors: {
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
        }
    }
});
export default theme;