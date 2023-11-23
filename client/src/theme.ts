import { extendTheme, type ThemeConfig } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import { Dict } from '@chakra-ui/utils';
import { defineStyleConfig } from '@chakra-ui/react';
import {
  tabsAnatomy,
  accordionAnatomy,
  avatarAnatomy,
  inputAnatomy,
  alertAnatomy,
  selectAnatomy
} from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

//________________________________________________________________
// Accordion
//________________________________________________________________
function alertTheme() {
  const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
    alertAnatomy.keys
  );

  const baseStyle = definePartsStyle({
    container: {
      borderRadius: 'md'
    }
  });

  return defineMultiStyleConfig({
    baseStyle
  });
}
//________________________________________________________________
// Accordion
//________________________________________________________________
function accordionTheme() {
  const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
    accordionAnatomy.keys
  );

  const baseStyle = definePartsStyle({
    button: {
      borderRadius: ' 5px 5px  0 0',
      p: '2',
      fontWeight: '600',
      bg: 'gray.50',
      textAlign: 'left',
      _dark: {
        bg: 'gray.800',
        borderColor: 'gray.700'
      },

      _hover: {
        bg: 'gray.200',
        _dark: {
          bg: 'gray.700'
        }
      }
    },
    panel: {
      pb: '4',
      bg: 'teal.500',
      color: 'gray.50',
      textAlign: 'left',
      borderRadius: '0 0 5px 5px ',
      _dark: {
        bg: 'teal.200',
        color: 'gray.800'
      }
    }
  });

  return defineMultiStyleConfig({
    baseStyle
  });
}

//________________________________________________________________
// Avatar
//________________________________________________________________
function avatarTheme() {
  const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
    avatarAnatomy.keys
  );

  const baseStyle = definePartsStyle({
    container: {
      bg: 'teal.500',
      borderRadius: 'md',
      borderWidth: '2px',
      borderStyle: 'solid',
      borderColor: 'teal.500',
      _dark: {
        borderColor: 'teal.200'
      }
    }
  });

  return defineMultiStyleConfig({
    baseStyle
  });
}
//________________________________________________________________
// Tabs
//________________________________________________________________
function tabsTheme() {
  const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
    tabsAnatomy.keys
  );
  const baseStyle = definePartsStyle({
    tab: {
      borderRadius: 'md',
      _selected: {
        color: 'white',
        bg: 'teal.500'
      },
      _dark: {
        _selected: {
          color: 'gray.800',
          bg: 'teal.200'
        }
      }
    },
    tabpanel: {
      padding: '0'
    }
  });

  return defineMultiStyleConfig({
    baseStyle,
    defaultProps: {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      align: 'center',
      variant: '"enclosed-colored',
      colorScheme: 'teal'
    }
  });
}
//________________________________________________________________
//  Input
//________________________________________________________________
function inputTheme() {
  const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
    inputAnatomy.keys
  );
  const baseStyle = definePartsStyle({
    field: {
      _placeholder: {
        color: 'gray.500'
      }
    },
    addon: {
      color: 'teal.500',
      _dark: {
        color: 'teal.200'
      }
    }
  });

  return defineMultiStyleConfig({
    defaultProps: {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      focusBorderColor: 'teal.500'
    },
    baseStyle
  });
}
//________________________________________________________________
// Button
//________________________________________________________________
const Button = defineStyleConfig({
  defaultProps: {
    colorScheme: 'teal'
  }
});
//________________________________________________________________
// Select
//________________________________________________________________
function selectTheme() {
  const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
    selectAnatomy.keys
  );

  const baseStyle = definePartsStyle({
    field: {
      background: 'gray.200',
      borderRadius: 'md',
      color: 'gray.800',
      _dark: {
        color: 'white',
        bg: 'gray.500',
        borderColor: 'teal.700'
      },
      borderColor: 'teal.700',
      _focusWithin: {
        ringColor: 'teal.500',
        ring: '1px',
        borderColor: 'gray.800',
        _dark: {
          borderColor: 'teal.500'
        }
      }
    },
    icon: {
      color: 'gray.800',
      _dark: {
        color: 'white'
      }
    }
  });

  return defineMultiStyleConfig({
    defaultProps: {
      variant: 'teal'
    },
    baseStyle
  });
}

//________________________________________________________________
// Link
//________________________________________________________________
const Link = defineStyleConfig({
  baseStyle: {
    color: 'teal.500',
    _dark: {
      color: 'teal.300'
    },
    _hover: {
      color: 'teal.700',
      _dark: {
        color: 'teal.100'
      }
    }
  }
});
//________________________________________________________________
// Text
//________________________________________________________________
const Text = defineStyleConfig({
  baseStyle: {
    color: 'gray.600',
    _dark: {
      color: 'gray.300'
    },
    fontSize: { base: 'sm', md: 'md' }
  }
});
//________________________________________________________________
// From Label
//________________________________________________________________
const FormLabel = defineStyleConfig({
  baseStyle: {
    margin: '0',
    padding: '0'
  }
});

//________________________________________________________________
// Color Mode
//________________________________________________________________
const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: true
};

//________________________________________________________________
// Global Styles
//________________________________________________________________
const theme = extendTheme({
  config,
  styles: {
    global: (props: Dict) => ({
      html: {
        fontSize: { base: '88%', md: '93%', xl: '100%' }
      },
      body: {
        backgroundColor: mode('gray.100', 'gray.800')(props)
      }
    })
  },
  components: {
    Button,
    Link,
    FormLabel,
    Text,
    Select: selectTheme(),
    Alert: alertTheme(),
    Input: inputTheme(),
    Avatar: avatarTheme(),
    Accordion: accordionTheme(),
    Tabs: tabsTheme()
  }
});

export { theme };
