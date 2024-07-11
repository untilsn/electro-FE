import { useSelector } from "react-redux";

export function useCheckCart(item) {
  const { cartArray } = useSelector((state) => state.store);
  const isCart = cartArray.some(
    (items, index) => items.productId == item.productId
  );
  return isCart;
}
