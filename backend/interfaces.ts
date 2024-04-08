export interface Country {
  country_name: String;
}

export interface City {
  city_name: String;
  country: Number;
}

export interface Hotel {
  hotel_name: String;
  hotel_address: String;
  city: Number;
  link: String | undefined;
}

export interface Restaurant {
  restaurant_name: String;
  restaurant_address: String;
  city: Number;
  link: String | undefined;
}

export interface Trip {
  trip_name: String;
  trip_description: String | undefined;
  city: Number;
  price: Number;
  sale: Number | undefined;
  hotel: Number | undefined;
  restaurant: Number | undefined;
}
