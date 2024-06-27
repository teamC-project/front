import axios from "axios";

import { 
    requestHandler, 
    bearerAuthorization, 
    requestErrorHandler
} from "..";
import { VisitorCountDto } from "./dto/response";

import { TOTAL_VISITORS_URL, VISITORS_TODAY_URL } from "src/constant";

export const getTotalVisitorsRequest = async (accessToken: string) => {
    const result = await axios.get(TOTAL_VISITORS_URL, bearerAuthorization(accessToken))
        .then(requestHandler<VisitorCountDto>)
        .catch(requestErrorHandler);
    return result;
};

export const getVisitorsTodayRequest = async (accessToken: string) => {
    const result = await axios.get(VISITORS_TODAY_URL, bearerAuthorization(accessToken))
        .then(requestHandler<VisitorCountDto>)
        .catch(requestErrorHandler);
    return result;
};
