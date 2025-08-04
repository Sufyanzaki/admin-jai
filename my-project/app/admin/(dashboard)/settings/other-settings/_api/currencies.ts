import {deleteRequest, getRequest, patchRequest, postRequest} from "@/admin-utils";

export interface Currency {
  id: string;
  currencyName: string;
  currencyCode: string;
  symbol?: string;
  textDirection: string;
}

export interface CurrencyFormat {
  defaultCurrencyId: number;
  symbolFormat: string;
  decimalSeparator: string;
  decimalPlaces: number;
}

type CurrencyPayload = Omit<Currency, "id">;

export async function getCurrencies(): Promise<Currency[]> {
  return getRequest<Currency[]>({
    url: "setting/currency",
    useAuth: true,
  });
}

export async function postCurrency(payload: CurrencyPayload): Promise<Currency> {
  const r = await postRequest<CurrencyPayload>({
    url: "setting/currency",
    data: payload,
    useAuth: true,
  });

  return r.response
}

export async function patchCurrency(id: string, payload: CurrencyPayload): Promise<Currency> {
  const r = await patchRequest<CurrencyPayload>({
    url: `setting/currency/${id}`,
    data: payload,
    useAuth: true,
  });
  return r.response;
}

export async function deleteCurrency(id: string) {
  return deleteRequest({
    url: `setting/currency/${id}`,
    useAuth: true,
  });
}

export async function getCurrencyById(id: string): Promise<Currency> {
  return await getRequest<Currency>({
    url: `setting/currency/${id}`,
    useAuth: true,
  });
}


export async function getCurrencyFormat(): Promise<CurrencyFormat> {
  return await getRequest<CurrencyFormat>({
    url: `setting/currency-setting`,
    useAuth: true,
  });
}

export async function patchCurrencyFormat(payload: CurrencyFormat): Promise<CurrencyFormat> {
  const r = await patchRequest<CurrencyFormat>({
    url: `setting/currency-setting`,
    data: payload,
    useAuth: true,
  });
  return r.response;
}