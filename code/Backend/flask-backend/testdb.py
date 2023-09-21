# Parse the database URL from the environment variable
database_url = os.environ.get('DATABASE_URL')
result = urlparse(database_url)

# Create a dictionary with the database configuration
db_config = {
    'user': result.username,
    'password': result.password,
    'dbname': result.path[1:],
    'host': result.hostname,
    'port': result.port
}

# Connect to the PostgreSQL database using psycopg2
conn = psycopg2.connect(**db_config)

# Create a cursor
cursor = conn.cursor()

# Create a table
create_table_query = """
CREATE TABLE IF NOT EXISTS example_table (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    age INT
);
"""

cursor.execute(create_table_query)

# Commit changes and close cursor and connection
conn.commit()
cursor.close()
conn.close()