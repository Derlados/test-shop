module CartHelper
    def get_cart
        if (!cookies.has_key?(:CART))
            cookies[:CART] = JSON.generate([]);
        end
        
        return JSON.parse(cookies[:CART])
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

        puts "#######################################################################################################"
        puts JSON.generate(get_cart)
        @amount = (get_cart.detect {|ci| ci[0] == item_id})[1]

        return '%.2f' % (@item.price * @amount);
    end
end
