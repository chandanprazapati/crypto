import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../index";
import { Container, Image, Button, RadioGroup, Radio } from "@chakra-ui/react";
import Loader from "./Loader";
import { HStack, VStack, Heading, Text } from "@chakra-ui/react";
import ErrorCom from "./ErrorCom";
import { Link } from "react-router-dom";

const Coins = () => {
  const [coins, setcoins] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(false);
  const [page, setpage] = useState(1);
  const [currency, setcurrency] = useState("inr");

  const currencysymbol =
    currency === "inr" ? "₹" : currency === "euro" ? "€" : "$";

  //Button function
  const changepage = (page) => {
    setpage(page);
    setloading(true);
  };

  const pg_btns = new Array(132).fill(1);

  useEffect(() => {
    axios
      .get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`)
      .then((res) => {
        try {
          setcoins(res.data);
          setloading(false);
        } catch (error) {
          seterror(true);
          setloading(false);
        }
      });
  }, [currency, page]);

  if (error) return <ErrorCom message={"Error while fatching coins..."} />;

  return (
    <>
      <Container maxW={"container.xl"}>
        {loading ? (
          <>
            <Loader />
            <ErrorCom />
          </>
        ) : (
          <>
            <RadioGroup value={currency} onChange={setcurrency} p={"5"}>
              <HStack spacing={"5"}>
                <Radio value={"inr"}>₹ INR</Radio>
                <Radio value={"euro"}>€ EUR</Radio>
                <Radio value={"usd"}>$ USD</Radio>
              </HStack>
            </RadioGroup>

            <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
              {coins.map((i) => (
                //<div>{i.name}</div>//instade of this simple div using as function component
                <CoinCard
                  id={i.id}
                  key={i.id}
                  name={i.name}
                  img={i.image}
                  price={i.current_price}
                  symbol={i.symbol}
                  currencysymbol={currencysymbol}
                /> //this is Exchangecard component
              ))}
            </HStack>
            <HStack w={"full"} overflow={"auto"} p={"8"}>
              {pg_btns.map((item, index) => (
                <Button
                  key={index}
                  bgColor={"blackAlpha.900"}
                  color={"white"}
                  onClick={() => changepage(index + 1)}
                >
                  {index + 1}
                </Button>
              ))}
            </HStack>
          </>
        )}
      </Container>
    </>
  );
};

const CoinCard = ({ id, name, img, symbol, price, currencysymbol = "₹" }) => (
  <Link to={`/coin/${id}`} target={"blank"}>
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
        {symbol}
      </Heading>
      <Text noOfLines={1}>{name}</Text>
      <Text noOfLines={1}>{price ? `${currencysymbol}${price}` : "NA"}</Text>
    </VStack>
  </Link>
);

export default Coins;
