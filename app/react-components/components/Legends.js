import React from 'react';

import Row from '../uikit/Flex/Row';
import Column from '../uikit/Flex/Column';

const styles = {
    table: {
        border: '1px solid #e6e6e6',
        fontSize: '1.28rem',
        background: 'rgba(242, 242, 242, 0.38)',
        display: 'inline-flex'
    },
    td: {
        padding: 6,
    },
    cell: {
        paddingTop: 4,
        paddingBottom: 4,
    },
    color: {
        marginRight: 5,
        display: 'inline-block',
        width: 15,
        height: 15,
        verticalAlign: 'middle',
    }
}

export const StepLegend = ({steps = [0.25, 0.5, 0.75, 1], color = '#D33682', leftLabel = 'Less', rightLabel = 'More'}) => (
  <Row style={styles.table}>
    <Column style={styles.td}>{leftLabel}</Column>
    <Row style={styles.td}>
      {
        steps.map(opacity => (
            <div style={{ ...styles.color, background: color, opacity }} key={opacity} />
          ))
      }
    </Row>
    <Column style={styles.td}>{rightLabel}</Column>
  </Row>
);

export const SwatchLegend = ({colorMap}) => {
  const labels = _.map(colorMap, (color, key) => (
    <div style={styles.cell} key={key}>
      <div style={{ ...styles.color, background: color }} />
      <span>{key.replace(/_/g, ' ')}</span>
    </div>
  ));

  return (
    <Row style={styles.table}>
      <Column style={styles.td}>{labels.slice(0, 2)}</Column>
      <Column style={styles.td}>{labels.slice(2, 4)}</Column>
      <Column style={styles.td}>{labels.slice(4, 6)}</Column>
    </Row>
  );
};

export default {
    StepLegend,
    SwatchLegend,
};