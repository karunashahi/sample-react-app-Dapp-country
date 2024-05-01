import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Input,
  Button,
} from "@nextui-org/react";
import { useState } from "react";
// import { TiWeatherDownpour, TiWeatherSunny } from "react-icons/ti";
import { getCountryData } from "../api/actions";

const CountryCard: React.FC = () => {
  const [data, setData] = useState<CountryData>();
  const [loadingState, setLoadingState] = useState(false);
  const [Country, setCountry] = useState("");
  const [error, setError] = useState("");

  const handleSearch = () => {
    console.log("Fetching Country Data...");
    console.log(Country);
    setLoadingState(true);
    getCountryData(Country)
      .then((res) => {
        setError("");
        if (res) {
          console.log(res);
          setData(res);
          setLoadingState(false);
        }
      })
      .catch((error) => {
        console.error(error);
        setLoadingState(false);
        setData(undefined);
        setError(error);
      });
  };

  return (
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <div className="flex flex-col w-full p-2 space-y-4">
            <Input
              id="Countryname"
              type="text"
              label="Country"
              value={Country}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setCountry(e.target.value);
              }}
            />
            <Button
              className=""
              color="primary"
              isLoading={loadingState}
              type="submit"
            >
              Search
            </Button>
          </div>
        </form>
      </CardHeader>
      <Divider />
      {data ? (
        <CardBody>
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold">{data.Country}</h1>
          {data.Population > 50 && data.Area > 50 ? (
            <div>
              {/* <RiEmotionHappyLine className="w-36 h-36" /> */}
            </div>
          ) : (
            <div>
              {/* <RiEmotionUnhappyLine className="w-36 h-36" /> */}
            </div>
          )}
          <p className="text-xl">Population: {data.Population} </p>
          <p className="text-lg">Area: {data.Area} sq mi</p>
          <p className="text-lg">Expenses: {data.Expenses} </p>
          <p className="text-lg">Safety: {data.Safety} </p>
        </div>
      </CardBody>
      ) : (
        <CardBody>
          <div className="flex flex-col items-center">
            <p className="text-xl font-bold">Please enter a name of Country</p>
          </div>
        </CardBody>
      )}
      <Divider />
      <CardFooter>
        <div className="flex flex-col items-left">
          {error && <p className="text-xs text-red-600 ">{error}</p>}
          {data && (
            <p className="text-xs  text-gray-600 ">Last update successful.</p>
          )}
          {!data && (
            <p className="text-xs  text-gray-600 ">Waiting for input...</p>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default CountryCard;
