export const FILTERLIST
 = [
    {
        key: "brand",
        title: "Brand",
        type: "checkbox", 
        isOpen: true,
        options: ["Apple", "Samsung", "Xiaomi", "Oppo", "Huawei", "Vivo"],
    },
    {
        key: "ram",
        title: "RAM",
        type: "box", 
        isOpen: true,
        options: ["2GB", "4GB", "6GB", "8GB", "12GB", "16GB"],
    },
    {
        key: "price",
        title: "Price",
        type: "range", 
        isOpen: true,
        min: 30000,
        max: 40000000, 
        step: 1000000,
    },
];

