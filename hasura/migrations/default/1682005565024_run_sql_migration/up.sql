SET check_function_bodies = false
;

CREATE TABLE klub
  (id serial NOT NULL, "name" text NOT NULL, CONSTRAINT klub_pkey PRIMARY KEY(id))
  ;

CREATE TABLE address(
  id serial NOT NULL,
  city text NOT NULL,
  country text NOT NULL,
  line1 text NOT NULL,
  CONSTRAINT address_pkey PRIMARY KEY(id)
);

CREATE TABLE klubaddress(
klub_id integer NOT NULL, address_id integer NOT NULL,
  CONSTRAINT klubaddress_pkey PRIMARY KEY(address_id, klub_id)
);

ALTER TABLE klubaddress
  ADD CONSTRAINT klubaddress_klub_id_fkey
    FOREIGN KEY (klub_id) REFERENCES klub (id);

ALTER TABLE klubaddress
  ADD CONSTRAINT klubaddress_address_id_fkey
    FOREIGN KEY (address_id) REFERENCES address (id);
