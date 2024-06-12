import axios from "axios";
import { TOTAL_VISITORS_URL, VISITORS_TODAY_URL } from "src/constant";
import { requestErrorHandler, requestHandler } from "..";
import { VisitorCountDto } from "./dto/response";

// function : 총 방문자 수 API 함수
export const getTotalVisitorsRequest = async () => {
  const result = await axios.get(TOTAL_VISITORS_URL)
    .then(requestHandler<VisitorCountDto>)
    .catch(requestErrorHandler);
  return result;
};

// function : 당일 방문자 수 API 함수
export const getVisitorsTodayRequest = async () => {
  const result = await axios.get(VISITORS_TODAY_URL)
    .then(requestHandler<VisitorCountDto>)
    .catch(requestErrorHandler);
  return result;
};
