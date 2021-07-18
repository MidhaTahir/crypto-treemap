import {
  TYPE,
  CATEGORY,
  PERFORMANCE,
  BLOCK_SIZE,
  STATUS,
} from '../utils/constants';
import { Dropdown, Form, Label } from 'semantic-ui-react';
import { arrayToObject } from '../utils/utils';
import { useFilters } from '../context/filtersContext';

function Filters() {
  const { state: filter, actions } = useFilters();

  const onTypeChange = (e, { value }) => actions.setType(value);
  const onCategoryChange = (e, { value }) => actions.setCategory(value);
  const onPerformanceChange = (e, { value }) => actions.setPerformance(value);
  const onBlockSizeChange = (e, { value }) => actions.setBlockSize(value);
  const onStatusChange = (e, { value }) => actions.setStatus(value);

  const dropDownOptions = {
    selection: true,
    button: true,
    className: 'icon',
    floating: true,
    labeled: true,
  };

  return (
    <>
      <Form>
        <Form.Group>
          <Form.Field>
            <Label>
              Type:{' '}
              <Dropdown
                {...dropDownOptions}
                placeholder="Type"
                icon="bitcoin"
                defaultValue={filter.type}
                onChange={onTypeChange}
                options={arrayToObject(Object.keys(TYPE))}
              />
            </Label>
          </Form.Field>
          <Form.Field>
            <Label>
              Category:{' '}
              <Dropdown
                {...dropDownOptions}
                placeholder="Category"
                icon="slack"
                defaultValue={filter.category}
                onChange={onCategoryChange}
                options={arrayToObject(Object.keys(CATEGORY))}
              />
            </Label>
          </Form.Field>
          <Form.Field>
            <Label>
              Performance:{' '}
              <Dropdown
                {...dropDownOptions}
                placeholder="Performance"
                icon="clock"
                defaultValue={filter.performance}
                onChange={onPerformanceChange}
                options={arrayToObject(Object.keys(PERFORMANCE))}
              />
            </Label>
          </Form.Field>
          <Form.Field>
            <Label>
              Block :{' '}
              <Dropdown
                {...dropDownOptions}
                placeholder="Block Size"
                icon="block layout"
                defaultValue={filter.blockSize}
                onChange={onBlockSizeChange}
                options={arrayToObject(Object.keys(BLOCK_SIZE))}
              />
            </Label>
          </Form.Field>
          <Form.Field>
            <Label>
              Status :{' '}
              <Dropdown
                {...dropDownOptions}
                placeholder="Gainers And Losers"
                icon="arrows alternate vertical"
                defaultValue={filter.status}
                onChange={onStatusChange}
                options={arrayToObject(Object.keys(STATUS))}
              />
            </Label>
          </Form.Field>
        </Form.Group>
      </Form>
    </>
  );
}

export default Filters;
