import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import {
  Container,
  Box,
  RadioGroup,
  HStack,
  Radio,
  VStack,
  Text,
  Image,
  StatNumber,
  StatLabel,
  Stat,
  StatArrow,
  StatHelpText,
  Badge,
  Progress,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import { server } from "../index";
import { useParams } from "react-router";
import ErrorCom from "./ErrorCom";
import Chart from "./Chart";

const CoinDetails = () => {
  const params = useParams();
  const [coin, setcoin] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(false);
  const [currency, setcurrency] = useState("inr");
  const [days, setdays] = useState("24H");
  const [chartarr, setchartarr] = useState([]);

  const currencysymbol =
    currency === "inr" ? "₹" : currency === "euro" ? "€" : "$";

  const chartbtns = ["24H", "7D", "15D", "30D", "60D", "1y", "Max"];

  const switch_chart_bybtn = (key) => {
    switch (key) {
      case "24h":
        setdays("24h");
        break;
      case "7D":
        setdays("7D");
        break;
      case "15D":
        setdays("15D");
        break;
      case "30D":
        setdays("30D");
        break;
      case "60D":
        setdays("60D");
        break;
      case "1y":
        setdays("365d");
        break;
      case "Max":
        setdays("Max");
        break;

      default:
        setdays("24h");
        break;
    }
  };

  useEffect(() => {
    const fetchcoin = async () => {
      const { data } = await axios.get(`${server}/coins/${params.id}`);
      const { data: chartdata } = await axios.get(
        `${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`
      );
      try {
        setcoin(data);
        setchartarr(chartdata.prices);
        setloading(false);
      } catch (error) {
        seterror(true);
        setloading(false);
      }
    };
    fetchcoin();
  }, [params.id, currency, days]);

  if (error) return <ErrorCom message={"Error while fatching coins..."} />;

  return (
    <>
      <Container maxW={"container.lg"} alignItems={"center"}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <Box width={"full"} borderwidth={"1"}>
              <Chart currency={currencysymbol} arr={chartarr} days={days} />
            </Box>
            <HStack p={"4"}>
              {chartbtns.map((i) => (
                <Button key={i} onClick={() => switch_chart_bybtn(i)}>
                  {i}
                </Button>
              ))}
            </HStack>

            <RadioGroup value={currency} onChange={setcurrency} p={"5"}>
              <HStack spacing={"5"}>
                <Radio value={"inr"}>₹ INR</Radio>
                <Radio value={"euro"}>€ EUR</Radio>
                <Radio value={"usd"}>$ USD</Radio>
              </HStack>
            </RadioGroup>

            <VStack alignItems={"flex-start"} p={"10"} spacing={"3"}>
              <Text alignSelf={"center"} fontSize={"sm"} opacity={"0.9"}>
                Last Update On{" "}
                {Date(coin.market_data.last_updated).split("G")[0]}
              </Text>

              <Image
                src={coin.image.large}
                w={"18"}
                h={"20"}
                objectFit={"contain"}
              />

              <Stat>
                <StatLabel>{coin.name}</StatLabel>
                <StatNumber>
                  {currencysymbol}
                  {coin.market_data.current_price[currency]}
                </StatNumber>

                <StatHelpText>
                  <StatArrow
                    type={
                      coin.market_data.price_change_percentage_24h > 0
                        ? "increase"
                        : "decrease"
                    }
                  />
                  {coin.market_data.price_change_percentage_24h}%
                </StatHelpText>
              </Stat>

              <Badge
                bgColor={"blackAlpha.900"}
                fontSize={"2xl"}
                color={"white"}
              >{`#${coin.market_cap_rank}`}</Badge>

              <CustomBar
                high={`${currencysymbol}${coin.market_data.high_24h[currency]}`}
                low={`${currencysymbol}${coin.market_data.low_24h[currency]}`}
              />

              <Box w={"full"} p={"4"}>
                <Item
                  title={"Max Supply"}
                  value={coin.market_data.max_supply}
                />
                <Item
                  title={"Circulating Supply"}
                  value={coin.market_data.circulating_supply}
                />
                <Item
                  title={"Market Cap"}
                  value={`${currencysymbol}${coin.market_data.market_cap[currency]}`}
                />
                <Item
                  title={"All Time High"}
                  value={`${currencysymbol}${coin.market_data.ath[currency]}`}
                />
                <Item
                  title={"All Time Low"}
                  value={`${currencysymbol}${coin.market_data.atl[currency]}`}
                />
              </Box>
            </VStack>
          </>
        )}
      </Container>
    </>
  );
};

const Item = ({ title, value }) => (
  <HStack justifyContent={"space-between"} w={"full"} my={"4"}>
    <Text fontFamily={"Bebas Neue"}>{title} </Text>
    <Text fontFamily={"Bebas Neue"}>{value} </Text>
  </HStack>
);

const CustomBar = ({ high, low }) => (
  <VStack w={"full"}>
    <Progress w={"full"} colorScheme={"green"} value={60} />
    <HStack justifyContent={"space-between"} w={"full"}>
      <Badge children={low} colorScheme={"red"} />
      <Text fontSize={"sm"}>24H Ranges</Text>
      <Badge children={high} colorScheme={"green"} />
    </HStack>
  </VStack>
);

export default CoinDetails;
