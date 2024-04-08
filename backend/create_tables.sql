CREATE TABLE Trips (
    id SMALLINT NOT NULL AUTO_INCREMENT,
    trip_name varchar(255) NOT NULL,
    trip_description TEXT NULL,
    city SMALLINT NOT NULL,
    price MEDIUMINT NOT NULL,
    sale TINYINT NOT NULL DEFAULT 0,
    CONSTRAINT CHK_sale CHECK (sale>=0 AND sale<100),
    hotel SMALLINT NULL,
    restaurant SMALLINT NULL,
    UNIQUE (trip_name),

    PRIMARY KEY (id),

    FOREIGN KEY (city)
      REFERENCES Cities(id)
      ON DELETE RESTRICT ON UPDATE CASCADE,

    FOREIGN KEY (hotel)
      REFERENCES Hotels(id)
      ON DELETE RESTRICT ON UPDATE CASCADE,

    FOREIGN KEY (restaurant)
      REFERENCES Restaurants(id)
      ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE Countries (
    id SMALLINT NOT NULL AUTO_INCREMENT,
    country_name varchar(255),
    UNIQUE (county_name),
    PRIMARY KEY (id)
);

CREATE TABLE Cities (
    id SMALLINT NOT NULL AUTO_INCREMENT,
    city_name varchar(255) NOT NULL,
    country SMALLINT NOT NULL,
    UNIQUE (city_name),
    PRIMARY KEY (id),

    FOREIGN KEY (country)
      REFERENCES Countries(id)
      ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE Hotels (
    id SMALLINT NOT NULL AUTO_INCREMENT,
    hotel_name varchar(255) NOT NULL,
    hotel_address varchar(255) NOT NULL,
    city SMALLINT NOT NULL,
    link varchar(255) NULL,
    CONSTRAINT uq_hotels UNIQUE(hotel_name, hotel_address, city),
    UNIQUE (link),
    PRIMARY KEY (id),

    FOREIGN KEY (city)
      REFERENCES Cities(id)
      ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE Restaurants (
    id SMALLINT NOT NULL AUTO_INCREMENT,
    restaurant_name varchar(255) NOT NULL,
    restaurant_address varchar(255) NOT NULL,
    city SMALLINT NOT NULL,
    link varchar(255) NULL,
    CONSTRAINT uq_hotels UNIQUE(restaurant_name, restaurant_address, city),
    UNIQUE (link),
    PRIMARY KEY (id),

    FOREIGN KEY (city)
      REFERENCES Cities(id)
      ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE Users (
    id SMALLINT NOT NULL AUTO_INCREMENT,
    username varchar(255) NOT NULL,
    user_password varchar(255) NOT NULL,
    UNIQUE (username),
    PRIMARY KEY (id)
);
