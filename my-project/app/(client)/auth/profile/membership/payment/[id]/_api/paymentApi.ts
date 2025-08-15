import {postRequest} from "@/shared-lib";

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