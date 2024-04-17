import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../index";
import { Container, Image } from "@chakra-ui/react";
import Loader from "./Loader";
import { HStack, VStack, Heading, Text } from "@chakra-ui/react";
import ErrorCom from "./ErrorCom";

const Exchange = () => {
  const [exchanges, setexchanges] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(false);

  useEffect(() => {
    axios.get(`${server}/exchanges`).then((res) => {
      try {
        console.log(res.data);
        setexchanges(res.data);
        setloading(false);
      } catch (error) {
        seterror(true);
        setloading(false);
      }
    });
  }, []);

  if (error) return <ErrorCom message={"Error while fatching exchanges"} />;

  return (
    <>
      <Container maxW={"container.xl"}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
              {exchanges.map((i) => (
                //<div>{i.name}</div>//instade of this simple div using as function component
                <ExchangeCard
                  key={i.id}
                  name={i.name}
                  img={i.image}
                  rank={i.trust_score_rank}
                  url={i.url}
                /> //this is Exchangecard component
              ))}
            </HStack>
          </>
        )}
      </Container>
    </>
  );
};

const ExchangeCard = ({ name, img, rank, url }) => (
  <a href={url} target={"blank"}>
    <VStack
      w={"52"}
      p={"8"}
      borderRadius={"xl"}
      shadow={"xl"}
      transition={"all 0.9s"}
      m={"4"}
      css={{
        "&:hover": {
          transform: "scale(1.2)",
        },
      }}
    >
      <Image
        src={img}
        w={"10"}
        h={"10"}
        objectFit={"contain"}
        alt={"Exchange"}
      />

      <Heading size={"md"} noOfLines={1}>
        {rank}
      </Heading>
      <Text noOfLines={1}>{name}</Text>
    </VStack>
  </a>
);
export default Exchange;
