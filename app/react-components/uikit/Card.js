// Vendor
import React, { PropTypes } from 'react';

// Custom
import theme from '../theme';

/*----------------------------------------------------------------------------*/

const styles = {
  card: {
    backgroundColor: 'white',
  },
  header: {
    padding: '1rem',
    color: theme.primary,
  },
};

const Card = ({ style, children, title, ...props }) => (
  <div style={{ ...styles.card, ...style }} {...props}>
    {title && <div style={styles.header}>{title}</div>}
    {children}
  </div>
);

Card.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
  title: PropTypes.node,
};

/*----------------------------------------------------------------------------*/

export default Card;
