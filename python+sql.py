CREATE TABLE knooppunten(
	fid integer,
	objectid integer,
	knooppuntnr integer,
        	regio text,
        	provincie text,
        	soortknooppunt text,
        	puntid integer PRIMARY Key);

ALTER TABLE knooppunten
  ADD COLUMN geom
    geometry(Geometry,28992);

import psycopg2
conn = psycopg2.connect(host="localhost", port="5433", dbname="engineerKaartData", user="postgres", password="postgres")
cur = conn.cursor()

with open(r'C:\Users\Duco\Desktop\Jaar 4 - blok 1\Nieuwe map\Python\Fietsknooppunten\knoopjes.csv') as f:
    # Notice that we don't need the `csv` module.
    next(f) # Skip the header row.
    cur.copy_from(f, 'knooppunten', sep=";")

conn.commit()

import psycopg2
from osgeo import ogr # Lezen van shapefile
#from osgeo import ogr

# Function to import xyz data
def import_provincie_grens(file_name):

   # Open connection
    db_connection = psycopg2.connect(host="localhost", port="5433", dbname="engineerKaartData", user="postgres", password="postgres")
    cur = db_connection.cursor()

    # Open shape file
    driver = ogr.GetDriverByName('ESRI Shapefile')
    dataSource = driver.Open(r'C:\Users\Duco\Desktop\Jaar 4 - blok 1\Nieuwe map\Python\Grenzen\provincies\Provincies_(Bestuurlijke_Grenzen_2019).shp', 0)
    layer = dataSource.GetLayer()

    # Itereer over features
    for feature in layer: 

        # Ophalen attribuutwaardes en geometry
        name = feature.GetField("provincien")
        geom = feature.GetGeometryRef()
        geom_wkt = geom.ExportToWkt()
        print(geom_wkt)

        # insert
        sql = 'INSERT INTO public.provincies(name, geom) VALUES ( %s, ST_GeometryFromText(%s,28992))'
        cur.execute(sql,(name, geom_wkt))

    # Sla op
    db_connection.commit()

    # Close database
    db_connection.close()

# Start
import_provincie_grens(r'C:\Users\Duco\Desktop\Jaar 4 - blok 1\Nieuwe map\Python\Grenzen\provincies\Provincies_(Bestuurlijke_Grenzen_2019).shp')
