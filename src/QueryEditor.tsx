import defaults from 'lodash/defaults';

import React, { ChangeEvent, PureComponent } from 'react';
import { LegacyForms } from '@grafana/ui';
//import { Label } from '@grafana/ui';
import { InlineFormLabel } from '@grafana/ui';
//<Label description="Option description">Option name</Label>
import { QueryEditorProps } from '@grafana/data';
import { DataSource } from './DataSource';
import { defaultQuery, MoogsoftDataSourceOptions, MoogsoftQuery } from './types';

const { FormField } = LegacyForms;
const { Select } = LegacyForms;
import { SelectableValue } from '@grafana/data';

type Props = QueryEditorProps<DataSource, MoogsoftQuery, MoogsoftDataSourceOptions>;

export class QueryEditor extends PureComponent<Props> {
  onQueryFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onChange, query } = this.props;
    onChange({ ...query, queryFilter: event.target.value });
  };

  onQueryCategoryChange =  (event: SelectableValue<string>) => {
    const { onChange, query } = this.props;
    onChange({ ...query, selectedQueryCategory: event});
  };

  onAlertCategoryChange =  (event: SelectableValue<string>) => {
    const { onChange, query } = this.props;
    onChange({ ...query, alertCategory: event});
  };

  onQueryTypeChange =  (event: SelectableValue<string>) => {
    const { onChange, query } = this.props;
    onChange({ ...query, resultCategory: event});
  };

  onAggregationTypeChange =  (event: SelectableValue<string>) => {
    const { onChange, query } = this.props;
    console.log("this.props : " + JSON.stringify(this.props));
    console.log("event : " + JSON.stringify(event));
    onChange({ ...query, aggregationCriteria: event});
  };

  onConstantChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onChange, query, onRunQuery } = this.props;
    onChange({ ...query, constant: parseFloat(event.target.value) });
    // executes the query
    onRunQuery();
  };

  onFrequencyChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onChange, query, onRunQuery } = this.props;
    onChange({ ...query, frequency: parseFloat(event.target.value) });
    // executes the query
    onRunQuery();
  };

  const options = [
    { label: "Basic option", value: 0 },
    { label: "Option with description", value: 1, description: "this is a description" },
    {
      label: "Option with description and image",
      value: 2,
      description: "This is a very elaborate description, describing all the wonders in the world.",
      imgUrl: "https://placekitten.com/40/40",
    },
  ];

  

  render() {
    const query = defaults(this.props.query, defaultQuery);
    const { queryFilter } = query;

    const { selectedQueryCategory } = query;
    const { alertCategory } = query;
    const { resultCategory } = query;
    const { aggregationCriteria } = query;

    const queryCategoryOption = [
      { label: "Alerts", value: 'Alerts', description: "Get alerts information."},
      { label: "Geolocation Alerts", value: 'Geolocation Alerts', description: "Get the alerts information with their geolocations." },
      { label: "Metrics", value: 'Metrics',  description: "Get metrics information." }
    ];

    const alertCategoryOption = [
      { label: "Alerts", value: 'alerts', description: "Get alerts information."},
      { label: "Incidents", value: 'incidents', description: "Get incidents information." }
    ];
  
    const resultCategoryOption = [
      { label: "Aggregate", value: 'aggregate', description: "Get aggregate results by source"},
      { label: "List All", value: 'all', description: "Get all results." },
      { label: "Total", value: 'total', description: "Get total number of results." },
      { label: "Noise reduction", value: 'noiseReduction', description: "Noise reduction percentage." },
      { label: "MTTR", value: 'mttr', description: "Get total number of results." }
    ];

    const aggregationTypeOption = [
      { label: "Status", value: 'status', description: "Aggregate incidents by status."},
      { label: "Severity", value: 'severity', description: "Aggregate incidents by severity." },
      { label: "Source", value: 'source', description: "Aggregate alerts by source." },
      { label: "Class", value: 'class', description: "Aggregate alerts by class." },
      { label: "Manager", value: 'manager', description: "Aggregate alerts by manager." }
    ];

    return (
      <div className="gf-form">
        <InlineFormLabel className="width-10" tooltip="Category for the query such as Alerts, Geografical alerts">Query Category</InlineFormLabel>
        
        <Select
          options = {queryCategoryOption}
          value={selectedQueryCategory || ''}
          allowCustomValue
          onChange = {this.onQueryCategoryChange}
        />

        <InlineFormLabel className="width-10" tooltip="Type of alerts">Alert Type</InlineFormLabel>
        <Select
          options = {alertCategoryOption}
          value={alertCategory || ''}
          allowCustomValue
          onChange = {this.onAlertCategoryChange}
        />

        <InlineFormLabel className="width-10" tooltip="Result Type">Result Type</InlineFormLabel>
        <Select
          options = {resultCategoryOption}
          value={resultCategory || ''}
          allowCustomValue
          onChange = {this.onQueryTypeChange}
        />

        <InlineFormLabel className="width-10" tooltip="Incident Aggregation Parameter">Aggregation criteria</InlineFormLabel>
        <Select
          options = {aggregationTypeOption}
          value={aggregationCriteria || ''}
          allowCustomValue
          onChange = {this.onAggregationTypeChange}
        />

        <FormField
          labelWidth={8}
          value={queryFilter || ''}
          onChange={this.onQueryFilterChange}
          label="Query Filter"
          tooltip="Filter for the query"
        />
      </div>
    );
  }
}
