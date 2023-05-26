import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const DealsListItem = function (props: any) {
  const { deal } = props;
  const navigate = useNavigate();

  return (
    <Card className="deal-card" onClick={() => navigate(`/products/${deal.id}`)}>
      <Card.Img src={deal.image} className="deal-image" />
      <Row>
        <Col xs={6}>
          <Card.Text className="deal-discount">
            Up to {deal.discountPercent}% off
          </Card.Text>
        </Col>

        <Col xs={6}>
          <Card.Text className="top-deal">
            {deal.discountPercent > 20 ? 'Top deal' : 'Deal'}
          </Card.Text>
        </Col>
      </Row>
      <Card.Text className="deal-name">{deal.name}</Card.Text>
    </Card>
  );
};

export default DealsListItem;
