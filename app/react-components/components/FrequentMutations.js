import React from 'react';
import { compose, withState } from 'recompose';
import _ from 'lodash';
import { scaleOrdinal, schemeCategory10 } from 'd3';

import Column from '../uikit/Flex/Column';
import Row from '../uikit/Flex/Row';
import BarChart from '../charts/BarChart';
import theme from '../theme';
import { graphTitle } from '../theme/mixins';
import EntityPageHorizontalTable from './EntityPageHorizontalTable';
import SurvivalPlotWrapper from './SurvivalPlotWrapper';
import TogglableUl from '../uikit/TogglableUl';
import Tooltip from '../uikit/Tooltip';
import DownloadVisualizationButton from '../components/DownloadVisualizationButton';
import SurvivalIcon from '../theme/icons/SurvivalIcon';
import getSurvivalCurves from '../utils/getSurvivalCurves';

const impactBubble = {
  color: 'white',
  padding: '2px 5px',
  borderRadius: '8px',
  fontSize: '10px',
  fontWeight: 'bold',
  display: 'inline-block',
  width: '20px',
};

const impactColors = {
  HIGH: 'rgb(185, 36, 36)',
  MODERATE: 'rgb(193, 158, 54)',
  LOW: 'rgb(49, 161, 60)',
};

const colors = scaleOrdinal(schemeCategory10);

const styles = {
  hidden: {
    width: 0,
    height: 0,
    overflow: 'hidden',
  },
  impact: {
    HIGH: {
      ...impactBubble,
      backgroundColor: impactColors.HIGH,
    },
    MODERATE: {
      ...impactBubble,
      backgroundColor: impactColors.MODERATE,
    },
    LOW: {
      ...impactBubble,
      backgroundColor: impactColors.LOW,
    },
  },
};

const FrequentMutations = ({
  frequentMutations,
  numCasesAggByProject,
  totalNumCases,
  setSelectedSurvivalData,
  selectedSurvivalData,
  defaultSurvivalRawData,
  width,
  api,
  projectId,
  defaultSurvivalLegend,
  showSurvivalPlot,
}) => {
  const survivalData = showSurvivalPlot && {
    legend: selectedSurvivalData.legend || defaultSurvivalLegend,
    rawData: selectedSurvivalData.rawData || defaultSurvivalRawData,
  };

  return (
    <Column>
      {!!frequentMutations.length &&
        <div>
          <Row
            style={{
              paddingBottom: '2.5rem',
              ...(!showSurvivalPlot ? { justifyContent: 'center' } : {}),
            }}
          >
            <span>
              <div style={{ textAlign: 'right', marginRight: 50, marginLeft: 30 }}>
                <DownloadVisualizationButton
                  svg="#mutation-chart svg"
                  data={frequentMutations.map(fm => _.omit(fm, 'consequence_type'))}
                  slug="bar-chart"
                  noText
                  tooltipHTML="Download image or data"
                />
              </div>
              <div style={graphTitle}>Distribution of Most Frequent Mutations</div>
              <div id="mutation-chart" style={{ padding: '10px' }}>
                <BarChart
                  bandwidth={!showSurvivalPlot && 60}
                  data={frequentMutations.map(x => ({
                    label: x.genomic_dna_change,
                    value: (x.score),
                    tooltip: projectId
                      ? `<b>${x.genomic_dna_change}</b><br />
                        <b>${x.num_affected_cases_project} Case${x.num_affected_cases_project > 1 ? 's' : ''}
                          affected in ${projectId}</b><br />
                        <b>${x.num_affected_cases_project} / ${numCasesAggByProject[projectId]}
                        (${((x.num_affected_cases_project / numCasesAggByProject[projectId]) * 100).toFixed(2)}%)</b>`
                      : `<b>${x.genomic_dna_change}</b><br />
                        <b>${x.num_affected_cases_all} Case${x.num_affected_cases_all > 1 ? 's' : ''}
                          affected in all projects</b><br />
                        <b>${x.num_affected_cases_all} / ${totalNumCases}
                        (${((x.num_affected_cases_all / totalNumCases) * 100).toFixed(2)}%)`,
                    href: `mutations/${x.ssm_id}`,
                  }))}
                  margin={{ top: 30, right: 50, bottom: 105, left: 40 }}
                  height={250}
                  yAxis={{ title: '# Affected Cases' }}
                  styles={{
                    xAxis: { stroke: theme.greyScale4, textFill: theme.greyScale3 },
                    yAxis: { stroke: theme.greyScale4, textFill: theme.greyScale3 },
                    bars: { fill: theme.secondary },
                    tooltips: {
                      fill: '#fff',
                      stroke: theme.greyScale4,
                      textFill: theme.greyScale3,
                    },
                  }}
                />
              </div>
            </span>
            {showSurvivalPlot && survivalData.rawData && (
              <span style={{ flexGrow: 1, width: '50%' }}>
                <SurvivalPlotWrapper
                  {...survivalData}
                  onReset={() => setSelectedSurvivalData({})}
                  height={240}
                  width={width}
                />
              </span>
            )}
          </Row>
          <EntityPageHorizontalTable
            headings={[
              {
                key: 'genomic_dna_change',
                title: 'DNA Change',
                className: 'id-cell',
                style: { whiteSpace: 'pre-line' },
              },
              { key: 'mutation_subtype', title: 'Type' },
              { key: 'consequence_type', title: 'Consequences' },
              ...(projectId ? [{
                key: 'num_affected_cases_project',
                title: <span># Affected Cases<br />in {numCasesAggByProject[projectId]} {projectId} Cases</span>,
              }] : []),
              {
                key: 'num_affected_cases_all',
                title: projectId
                  ? <span># Affected Cases<br />in {totalNumCases} from All Projects</span>
                  : <span># Affected Casesin {totalNumCases}</span>,
              },
              {
                key: 'impact',
                title: 'Impact',
                style: { textAlign: 'center' },
              },
              ...(showSurvivalPlot ? [{
                title: 'Survival Analysis',
                key: 'survival_plot',
                style: { textAlign: 'center', width: '100px' },
              }] : []),
            ]}
            data={frequentMutations.map(x => ({
              ...x,
              genomic_dna_change: <a href={`/mutations/${x.ssm_id}`}>{x.genomic_dna_change}</a>,
              ...(projectId ? { num_affected_cases_project:
                `${x.num_affected_cases_project}
                (${((x.num_affected_cases_project / numCasesAggByProject[projectId]) * 100).toFixed(2)}%)`,
              } : {}),
              num_affected_cases_all: (
                <TogglableUl
                  items={[
                    `${x.num_affected_cases_all} (${((x.num_affected_cases_all / totalNumCases) * 100).toFixed(2)}%)`,
                    ...Object.entries(x.num_affected_cases_by_project)
                      .map(([k, v]) => `${k}: ${v} (${((v / totalNumCases) * 100).toFixed(2)}%)`),
                  ]}
                />
              ),
              impact: !['LOW', 'MODERATE', 'HIGH'].includes(x.impact) ? null : (
                <Tooltip innerHTML={x.impact}>
                  <span
                    style={styles.impact[x.impact]}
                  >
                    {x.impact.slice(0, 1)}
                  </span>
                </Tooltip>
              ),
              ...(showSurvivalPlot ? {
                survival_plot: (
                  <Tooltip innerHTML={`Click icon to plot ${x.genomic_dna_change}`}>
                    <button
                      onClick={() => {
                        if (x.ssm_id !== selectedSurvivalData.id) {
                          getSurvivalCurves({
                            field: 'gene.ssm.ssm_id',
                            value: x.ssm_id,
                            slug: x.genomic_dna_change,
                            api,
                            projectId,
                          })
                            .then(setSelectedSurvivalData);
                        } else {
                          setSelectedSurvivalData({});
                        }
                      }}
                    >
                      <span
                        style={{
                          color: colors(selectedSurvivalData.id === x.ssm_id ? 1 : 0),
                          cursor: 'pointer',
                        }}
                      >
                        <SurvivalIcon />
                        <div style={styles.hidden}>add to survival plot</div>
                      </span>
                    </button>
                  </Tooltip>
                ),
              } : {}),
            }))}
          />
        </div>
      }
      {!frequentMutations.length &&
        <span style={{ padding: '2rem' }}>No mutation data to display</span>
      }
    </Column>
  );
};

const enhance = compose(
  withState('selectedSurvivalData', 'setSelectedSurvivalData', {})
);

export default enhance(FrequentMutations);
