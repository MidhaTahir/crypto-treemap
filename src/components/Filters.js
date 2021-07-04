import { TYPE_OF, PERFORMANCE, BLOCK_SIZE } from '../utils/constants';
import { Dropdown, Form } from 'semantic-ui-react';
import { arrayToObject } from '../utils/utils';
import { useFilters } from '../context/filtersContext';

function Filters() {
  const { state: filter, actions } = useFilters();

  const onTypeChange = (e, { value }) => actions.setType(value);
  const onPerformanceChange = (e, { value }) => actions.setPerformance(value);
  const onBlockSizeChange = (e, { value }) => actions.setBlockSize(value);

  const dropDownOptions = {
    selection: true,
    button: true,
    className: 'icon',
    floating: true,
    labeled: true,
  };

  return (
    <Form>
      <Form.Group>
        {/* <Form.Field>
          <Dropdown
            {...dropDownOptions}
            placeholder="Type"
            icon="bitcoin"
            defaultValue={filter.type}
            onChange={onTypeChange}
            options={arrayToObject(TYPE_OF)}
          />
        </Form.Field>
        <Form.Field>
          <Dropdown
            {...dropDownOptions}
            placeholder="Performance"
            icon="clock"
            defaultValue={filter.performance}
            onChange={onPerformanceChange}
            options={arrayToObject(Object.keys(PERFORMANCE))}
          />
        </Form.Field> */}
        <Form.Field>
          <Dropdown
            {...dropDownOptions}
            placeholder="Block Size"
            icon="block layout"
            defaultValue={filter.blockSize}
            onChange={onBlockSizeChange}
            options={arrayToObject(Object.keys(BLOCK_SIZE))}
          />
        </Form.Field>
      </Form.Group>
    </Form>
  );
}

export default Filters;
