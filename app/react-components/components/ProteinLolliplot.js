import React from 'react';
import moment from 'moment';
import { insertRule } from 'glamor';

import Column from '../uikit/Flex/Column';
import Row from '../uikit/Flex/Row';
import Button from '../uikit/Button';
import Dropdown from '../uikit/Dropdown';
import withDropdown from '../uikit/withDropdown';
import DownloadVisualizationButton from '../components/DownloadVisualizationButton';
import { visualizingButton } from '../theme/mixins';

const rootId = 'protein-viewer-root';

insertRule(`
  #${rootId} text { user-select: none; }
`);

export const zDepth1 = {
  boxShadow: '0 2px 5px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12)',
};

export const dropdown = {
  ...zDepth1,
  position: 'absolute',
  zIndex: 1,
  minWidth: '165px',
  backgroundColor: 'white',
  textAlign: 'left',
  marginTop: '1rem',
  right: 0,
  outline: 'none',
  maxHeight: '200px',
  overflow: 'auto',
};

const styles = {
  heading: {
    flexGrow: 1,
    fontSize: '2.2rem',
    marginBottom: 7,
    marginTop: 7,
    display: 'flex',
    alignItems: 'center',
  },
};

const ProteinLolliplot = ({
  gene,
  $scope,
  reset,
}) => (
  <Column>
    <Row>
      <h1 style={{ ...styles.heading, padding: '1rem' }} id="protein">
        <img src="images/double-helix.svg" alt="GDC cBio Portal" style={{ marginRight: '1rem', width: '12px' }} />
        Protein
      </h1>
    </Row>
    <Row style={{ marginBottom: '2rem', padding: '0 2rem' }} spacing="1rem">
      <span style={{ alignSelf: 'center' }}>
        Transcript:
      </span>
      <Dropdown
        selected={
          <span
            style={{
              fontWeight: $scope.geneTranscript.id === gene.canonical_transcript_id
                ? 'bold' : 'initial',
            }}
          >
            {$scope.geneTranscript.id} ({$scope.geneTranscript.length_amino_acid} aa)
          </span>
        }
      >
        {$scope.transcripts
        .filter(t => t.id === gene.canonical_transcript_id)
        .map(t =>
          <Row
            key={t.id}
            style={{
              fontWeight: 'bold',
              ...($scope.geneTranscript.id === t.id && {
                backgroundColor: 'rgb(44, 136, 170)',
                color: 'white',
              }),
            }}
            onClick={() => $scope.selectTranscript(t.id)}
          >
            {t.id} ({t.length_amino_acid} aa)
          </Row>
        )}
        {$scope.transcripts
        .filter(t => t.length_amino_acid && t.id !== gene.canonical_transcript_id)
        .map(t =>
          <Row
            key={t.id}
            style={{
              ...($scope.geneTranscript.id === t.id && {
                backgroundColor: 'rgb(44, 136, 170)',
                color: 'white',
              }),
            }}
            onClick={() => $scope.selectTranscript(t.id)}
          >
            {t.id} ({t.length_amino_acid} aa)
          </Row>
        )}
      </Dropdown>
      <Button
        style={visualizingButton}
        onClick={reset}
        leftIcon={<i className="fa fa-refresh" />}
      >
        Reset
      </Button>
      <DownloadVisualizationButton
        svg="#protein-viewer-root svg.chart"
        data={$scope.proteinLolliplotData}
        stylePrefix="#protein-viewer-root"
        slug={`protein_viewer-${gene.symbol}-${moment().format('YYYY-MM-DD')}`}
      />
    </Row>
    <div style={{ padding: '0 3rem' }} id={rootId} />
  </Column>
);

export default withDropdown(ProteinLolliplot);
