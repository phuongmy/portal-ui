import { css } from 'glamor';

import theme from './index';

export const center = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export const zDepth1 = {
  boxShadow: '0 2px 5px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12)',
};

export const buttonLike = {
  ...center,
  padding: '6px 12px',
  fontSize: '14px',
  borderRadius: '4px',
  border: '1px solid transparent',
};

export const dropdown = {
  ...zDepth1,
  position: 'absolute',
  zIndex: 1,
  minWidth: '165px',
  backgroundColor: 'white',
  textAlign: 'left',
  right: 0,
};

export const dropdownButton = {
  backgroundColor: 'white',
  padding: '0.3rem 0.5rem',
  border: '1px solid rgb(204, 204, 204)',
  cursor: 'pointer',
  alignItems: 'center',
};

export const dropdownLink = {
  padding: '0.2rem 0.5rem',
  textDecoration: 'none',
  width: '100%',
};

export const graphTitle = {
  textAlign: 'center',
  color: theme.greyScale3,
  fontSize: '1.4rem',
  fontWeight: 300,
};

export const visualizingButton = {
  padding: 0,
  color: '#333',
  backgroundColor: '#fff',
  borderColor: '#ccc',
  marginRight: 12,
  minWidth: 40,
  minHeight: 28,
  display: 'inline-flex',
  outline: 'none',
};

export const margin = (left, right) => {
  if (left && right) {
    return { margin: '0 0.5rem' };
  } else if (left) {
    return { marginLeft: '0.5rem' };
  } else if (right) {
    return { marginRight: '0.5rem' };
  }
  return {};
};

export const clickable = css({
  color: 'rgb(38, 134, 195)',
  cursor: 'pointer',
  ':hover': {
    color: 'rgb(35, 92, 124)',
  },
});
