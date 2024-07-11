import { useSelector } from "react-redux";

export function useCheckFavorite(item) {
  const { wishlistArray } = useSelector((state) => state.store);
  const isFavorite = wishlistArray.some(
    (items, index) => items.productId == item.productId
  );
  return isFavorite;
}
