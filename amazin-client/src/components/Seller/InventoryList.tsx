import React, { useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import InventoryListItem from './InventoryListItem';

type Props = {
  inventory: any[];
  inventoryUpdated: boolean;
  setInventoryUpdated: any;
};

export default function InventoryList(props: Props) {
  const { inventory, inventoryUpdated, setInventoryUpdated } = props;

  useEffect(() => {
    setInventoryUpdated(false);
  }, [inventoryUpdated, setInventoryUpdated]);

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
    <Table striped bordered hover className="inventory-table">
      <thead>
        <tr className="inventory-table">
          <th>Status</th>
          <th>Product ID</th>
          <th>Date Created</th>
          <th>Image</th>
          <th>Product Name</th>
          <th>Description</th>
          <th>Quantity</th>
          <th>Price ($)</th>
          <th>Sales Discount (%)</th>
          <th>Sales Start Date</th>
          <th>Sales End Date</th>
          <th>
            <Button variant="warning" size="sm" onClick={handleSave}>
              Save all
            </Button>
          </th>
        </tr>
      </thead>
      <tbody>{inventoryList}</tbody>
    </Table>
  );
}
