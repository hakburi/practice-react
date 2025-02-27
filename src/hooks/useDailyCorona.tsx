import {useEffect, useState} from 'react';
import coronaApiProps from '../interfaces/coronaApiProps.interface';
import axios from "axios";
import moment from "moment";
import {DAILY_CORONA_STATUS_API_SERVICE_KEY} from "../constants";

export default function useDailyCorona(): coronaApiProps[] | undefined {
  const [items, setItems] = useState<coronaApiProps[]>();

  const params = setParams();

  async function setCorona() {
    await axios
      .get('/openapi/service/rest/Covid19/getCovid19SidoInfStateJson', {
        params,
      })
      .then(response => {
        setItems(JSON.parse(JSON.stringify(response.data)).response.body.items.item);
      });
  }

  useEffect(() => {
    let isLoading = true;
    if (isLoading) {
      setCorona();
    }
    return () => {
      isLoading = false;
    }
  }, []);

  return items;
}

function setParams() {
  const date = getNowDate();
  const params = {
    ServiceKey: DAILY_CORONA_STATUS_API_SERVICE_KEY,
    pageNo: 1,
    numOfRows: 20,
    startCreateDt: date,
    endCreateDt: date,
  };
  return params;
}

function getNowDate(): string {
  return moment().format('YYYYMMDD');
}
