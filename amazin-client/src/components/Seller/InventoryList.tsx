import React from 'react';
import { Button, Table } from 'react-bootstrap';
import InventoryListItem from './InventoryListItem';

type Props = {
  inventory: any[];
  inventoryUpdated: boolean;
  setInventoryUpdated: any;
};

export default function InventoryList(props: Props) {
  const { inventory, inventoryUpdated, setInventoryUpdated } =
    props;

  const handleSave = () => {
    setInventoryUpdated(true);
  };

  const inventoryList = inventory.map((item) => {
    return (
      <InventoryListItem
        key={item.id}
        product={item}
        inventoryUpdated={inventoryUpdated}
        setInventoryUpdated={setInventoryUpdated}
      />
    );
  });

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>
            <input type="checkbox" />
          </th>
          <th>Status</th>
          <th>Image</th>
          <th>SKU</th>
          <th>Product Name</th>
          <th>Date Created</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>
            <Button variant="warning" onClick={handleSave}>
              Save all
            </Button>
          </th>
        </tr>
      </thead>
      <tbody>{inventoryList}</tbody>
    </Table>
  );
}