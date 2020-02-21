import React from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import theme from 'styled-theming';

import useTheme from '../../hooks/useTheme';
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';

export const getBackground = theme('mode', {
  light: '#d6deeb',
  dark: '#011627',
});

export const getTextColor = theme('mode', {
  light: '#011627',
  dark: '#d6deeb',
});

const duration = 0.5;

const variants = {
  initial: {
    opacity: 0,
    transition: {
      duration,
      delay: duration,
      when: 'beforeChildren',
    },
  },
  enter: {
    opacity: 1,
    transition: {
      duration,
      delay: duration,
      when: 'beforeChildren',
    },
  },
  exit: {
    opacity: 0,
    transition: { duration },
  },
};

const Style = createGlobalStyle`
    body {
        background-color: ${getBackground};
        color: ${getTextColor};
        font-family: "brandon-grotesque", sans-serif;
        font-size: 1.25rem;
        transition: 0.5s;
    }

    a {
      color: inherit;
      text-decoration: none;
      transition: 0.5s;
    }

    .menu-background {
      background: ${getTextColor};
    }
`;

interface IProps {
  children: React.ReactNode;
  location: any;
}

const Layout = ({ children, location }: IProps) => {
  const theme = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <>
        <Style />
        <Header />
        <AnimatePresence>
          <motion.main
            key={location?.pathname}
            variants={variants}
            initial="initial"
            animate="enter"
            exit="exit"
          >
            {children}
          </motion.main>
        </AnimatePresence>
        <Footer />
      </>
    </ThemeProvider>
  );
};

export default Layout;
