# Class for management user cart. Cart saves in signed cookies by key CART
# Cookie data format <<number, number>, ...>. First arg - item_id, second - quantity
module CartHelper
    def get_cart
        if (!cookies.signed[:CART])
            cookies.signed[:CART] = []
        end
        
        return cookies.signed[:CART]
    end

    def cart_new_item(item_id, quantity)
        @cart = get_cart
        @cart.push([item_id, quantity])

        cookies.signed[:CART] = @cart
    end

    def cart_edit_item(item_id, quantity)
        @cart = get_cart
        @cart = @cart.map { |c| c[0] == item_id ?  [item_id, quantity] : c }

        cookies.signed[:CART] = @cart
    end

    def delete_cart_item(item_id)
        @cart = get_cart
        @cart.delete_if {|c| c[0] == item_id } 

        cookies.signed[:CART] = @cart
    end

    def get_cart_item_ids
        @items = get_cart;

        @ids = []
        @items.each do |item|
            @ids.push(item[0])
        end

        return @ids
    end

    def get_amount_of_items
        @items = get_cart;

        @amount = 0;
        @items.each do |item|
            @amount += item[1];
        end

        return @amount
    end

    def calculate_total
        @all_items = Item.all
        @cart_items = get_cart
 
        @total = 0;
        @cart_items.each do |cart_item|
            @item = @all_items.detect {|i| i.id == cart_item[0]}
            @total += cart_item[1] * @item.price
        end

        return '%.2f' % @total
    end

    def calculate_one(item_id)
        @item = Item.find(item_id)

        @amount = (get_cart.detect {|ci| ci[0] == item_id})[1]

        return '%.2f' % (@item.price * @amount);
    end

    def clear_cart
        cookies.signed[:CART] = []
    end

    def cart_has_item(item_id)
        return !(get_cart_item_ids.detect {|id| id == item_id}).nil?
    end

end
