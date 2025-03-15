import { StyledOrder, ProductRow, Address } from "@/styles/SingleOrder.styles";

export default function SingleOrder({ line_items, createdAt, ...rest }) {
  return (
    <StyledOrder>
      <div>
        <time>{new Date(createdAt).toLocaleString("sv-SE")}</time>
        <Address>
          {rest.name}<br />
          {rest.email}<br />
          {rest.streetAddress}<br />
          {rest.postalCode} {rest.city}, {rest.country}
        </Address>
      </div>
      <div>
        {line_items.map(item => (
          <ProductRow key={item.price_data.product_data.name}>
            <span>{item.quantity} x </span>
            {item.price_data.product_data.name}
          </ProductRow>
        ))}
      </div>
    </StyledOrder>
  );
}
