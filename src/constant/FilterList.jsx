export const FILTERLIST
 = [
    {
        key: "brand",
        title: "Brand",
        type: "checkbox", // kiểu filter: checkbox
        isOpen: true,
        options: ["Apple", "Samsung", "Xiaomi", "Oppo", "Huawei", "Vivo"],
    },
    {
        key: "ram",
        title: "RAM",
        type: "box", // kiểu filter: checkbox
        isOpen: true,
        options: ["2GB", "4GB", "6GB", "8GB", "12GB", "16GB"],
    },
    {
        key: "price",
        title: "Price",
        type: "range", // kiểu filter: range slider
        isOpen: true,
        min: 30000,
        max: 40000000, // giá trị tối thiểu & tối đa
        step: 1000000,
    },
];

