export class Product {
    private readonly id: string;
    private readonly title: string;
    private readonly image: string; // base64, link or path
    private readonly price: number; // base currency €
    private readonly description: string;

    constructor(id_, title_, description_, price_, image_) {
        this.id = id_;
        this.title = title_;
        this.image = image_;
        this.price = price_;
        this.description = description_;
    }

    getId() {
        return this.id;
    }

    getTitle() {
        return this.title;
    }

    getImage() {
        return this.image;
    }

    getDescription() {
        return this.description;
    }

    getPrice() {
        return this.price;
    }
}
