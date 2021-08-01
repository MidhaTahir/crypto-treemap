import {
  TYPE,
  PERFORMANCE,
  BLOCK_SIZE,
  STATUS,
  TILES,
} from '../utils/constants';
import { Dropdown, Form, Label } from 'semantic-ui-react';
import { arrayToObject } from '../utils/utils';
import { useFilters } from '../context/filtersContext';
import CustomSlider from './CustomSlider';
import { useCategories } from '../context/categoriesContext';

function Filters() {
  const { state: filter, actions } = useFilters();
  const { categories } = useCategories();

  const onTypeChange = (e, { value }) => actions.setType(value);
  const onCategoryChange = (e, { value }) => actions.setCategory(value);
  const onTilesChange = (e, { value }) => actions.setTiles(value);
  const onPerformanceChange = (e, { value }) => actions.setPerformance(value);
  const onBlockSizeChange = (e, { value }) => actions.setBlockSize(value);
  const onStatusChange = (e, { value }) => actions.setStatus(value);

  const dropDownOptions = {
    selection: true,
    button: true,
    className: 'icon',
    floating: true,
    labeled: true,
    style: { marginTop: '5px' },
  };

  return (
    <>
      <Form>
        <Form.Group>
          <Form.Field>
            <Label>
              Type{' '}
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
              Category{' '}
              <Dropdown
                {...dropDownOptions}
                placeholder="Category"
                icon="slack"
                defaultValue={filter.category}
                onChange={onCategoryChange}
                options={arrayToObject(Object.keys(categories))}
              />
            </Label>
          </Form.Field>
          <Form.Field>
            <Label>
              No. of Tiles{' '}
              <Dropdown
                {...dropDownOptions}
                placeholder="Tiles"
                icon="slack"
                defaultValue={filter.tiles}
                onChange={onTilesChange}
                options={arrayToObject(Object.keys(TILES))}
              />
            </Label>
          </Form.Field>
          <Form.Field>
            <Label>
              Performance{' '}
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
              Block{' '}
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
              Status{' '}
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
          <CustomSlider />
        </Form.Group>
      </Form>
    </>
  );
}

export default Filters;
