import {getRequest, postRequest} from "@/shared-lib";
import {RevenueDataDto} from "@/app/admin/(dashboard)/payments/_types/payment";

type Payload = {
    packageId: string;
    provider: string;
}

type Response = {
    data: {
        clientSecret: string;
        checkoutUrl: string;
    }
}

export async function createPayment(props: Payload): Promise<Response> {
    const r = await postRequest<Payload>({
        url: 'payment/create',
        data: props,
        useAuth: true
    });
    return r.response;
}


export async function getAllPayments(): Promise<RevenueDataDto> {
    return  await getRequest({
        url: 'users/packages',
        useAuth: true
    });
}