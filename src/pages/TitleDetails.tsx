import { Badge, Button, Grid, Heading, Text, VStack } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { Title } from "../models/Title";

import { TileLayer, Marker, Popup } from "react-leaflet";
import { MapContainer } from "react-leaflet";

const TitleDetails: FunctionComponent = () => {
  const title = useLoaderData() as Title;

  return (
    <>
      <Button colorScheme="teal" style={{ margin: "1rem", display: "flex" }}>
        <Link to={"/"}>Back</Link>
      </Button>

      <Grid
        h="600px"
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(2, 1fr)"
        gap={4}
      >
        <VStack>
          <Heading size="lg">
            {title?.["Title Number"]}{" "}
            <Badge colorScheme="green" ml="1">
              {title?.Tenure}
            </Badge>
          </Heading>
          <Text fontSize="md">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo,
            accusantium! Voluptates impedit recusandae rerum hic aperiam eos
            accusamus ratione? Magni adipisci quas sit hic iste eveniet
            similique quaerat labore commodi. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Natus ad minima fugiat. Aliquam
            voluptas beatae doloribus saepe blanditiis illum ea voluptate
            quaerat nostrum expedita? Consectetur eius quod nobis tempore nulla!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
            minima reprehenderit et deleniti architecto officiis veniam
            excepturi accusamus quae assumenda animi nam distinctio nisi
            laboriosam adipisci, earum eos! Aut, sint.
          </Text>
        </VStack>
        <MapContainer
          center={[title.Y, title.X]}
          zoom={30}
          scrollWheelZoom={false}
          style={{ height: "600px" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[title.Y, title.X]}>
            <Popup>{title["Property Address"]}</Popup>
          </Marker>
        </MapContainer>
      </Grid>
    </>
  );
};

export default TitleDetails;
