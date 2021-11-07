export interface Order {
    _id: string,
    user_id: string,
    item_id: string[],
    quantity_item: number[],
    total_price: string
}
