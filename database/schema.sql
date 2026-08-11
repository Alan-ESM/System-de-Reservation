CREATE TABLE guests (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  city VARCHAR(50) NOT NULL CHECK (city IN ('Douala', 'Yaoundé')),
  qr_data TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_guests_city ON guests(city);
CREATE INDEX idx_guests_created ON guests(created_at DESC);
CREATE INDEX idx_guests_city_id ON guests(city ASC, id ASC);

ALTER TABLE guests ENABLE ROW LEVEL SECURITY;

CREATE POLICY guests_read ON guests FOR SELECT USING (true);
CREATE POLICY guests_insert ON guests FOR INSERT WITH CHECK (true);

CREATE OR REPLACE FUNCTION get_guests_by_city(p_city VARCHAR DEFAULT NULL)
RETURNS TABLE(id INT, first_name VARCHAR, last_name VARCHAR, city VARCHAR, created_at TIMESTAMP) AS $$
BEGIN
  RETURN QUERY
  SELECT g.id, g.first_name, g.last_name, g.city, g.created_at
  FROM guests g
  WHERE (p_city IS NULL OR g.city = p_city)
  ORDER BY g.city ASC, g.id ASC;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION count_guests_by_city()
RETURNS TABLE(city VARCHAR, count BIGINT) AS $$
BEGIN
  RETURN QUERY
  SELECT g.city, COUNT(*) FROM guests g GROUP BY g.city ORDER BY g.city ASC;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION insert_guest(p_first_name VARCHAR, p_last_name VARCHAR, p_city VARCHAR, p_qr_data TEXT)
RETURNS TABLE(id INT, qr_data TEXT, created_at TIMESTAMP) AS $$
BEGIN
  INSERT INTO guests (first_name, last_name, city, qr_data) 
  VALUES (p_first_name, p_last_name, p_city, p_qr_data)
  RETURNING guests.id, guests.qr_data, guests.created_at;
END;
$$ LANGUAGE plpgsql;