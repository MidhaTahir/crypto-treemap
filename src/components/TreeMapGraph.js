import { ResponsiveTreeMap } from '@nivo/treemap';
import { useEffect, useState } from 'react';
import { API_URI } from '../api';
import { formatData } from '../utils/utils';

const TreeMapGraph = () => {
  const [response, setResponse] = useState([]);

  useEffect(() => {
    fetch(`${API_URI}`)
      .then(res => res.json())
      .then(data => setResponse(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <ResponsiveTreeMap
      data={formatData(response)}
      identity="name"
      value="value"
      colors={params => {
        return params.data.color;
      }}
      margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
      labelSkipSize={12}
      labelTextColor={{ from: 'color', modifiers: [['darker', 1.2]] }}
      parentLabelTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
      borderColor={{ from: 'color' }}
    />
  );
};

export default TreeMapGraph;
