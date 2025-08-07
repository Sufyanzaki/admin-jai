import {deleteRequest, getRequest, patchRequest, postRequest} from "@/shared-lib";
import {CurrencyDto, CurrencyFormatDto} from "@/app/admin/(dashboard)/settings/other-settings/_types/system-settings";

type Payload = Partial<CurrencyDto>;
type FormatPayload = Partial<CurrencyFormatDto>;

export async function getCurrencies(): Promise<CurrencyDto[]> {
  return getRequest({
    url: "setting/currency",
    useAuth: true,
  });
}

export async function postCurrency(payload: Payload): Promise<CurrencyDto> {
  const r = await postRequest<Payload>({
    url: "setting/currency",
    data: payload,
    useAuth: true,
  });

  return r.response
}

export async function patchCurrency(id: string, payload: Payload): Promise<CurrencyDto> {
  const r = await patchRequest<Payload>({
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

export async function getCurrencyById(id: string): Promise<CurrencyDto> {
  return await getRequest({
    url: `setting/currency/${id}`,
    useAuth: true,
  });
}


export async function getCurrencyFormat(): Promise<CurrencyFormatDto> {
  return await getRequest({
    url: `setting/currency-setting`,
    useAuth: true,
  });
}

export async function patchCurrencyFormat(payload: FormatPayload): Promise<CurrencyFormatDto> {
  const r = await patchRequest<FormatPayload>({
    url: `setting/currency-setting`,
    data: payload,
    useAuth: true,
  });
  return r.response;
}