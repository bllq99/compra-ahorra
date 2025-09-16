package com.spring.security.jwt.model;

import lombok.Data;

@Data
public class ProductModel {
    Integer product_id;
    String name;
    String category;
    String image_url;
    Integer price;
}
